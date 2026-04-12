## Manejo de errores en transacciones con Node.js

### ¿Está la aplicación preparada?

La aplicación implementa una estrategia de manejo de errores en capas:

```
[Model]               → lanza errores enriquecidos con detalles de PG
    ↓
[Controller]          → captura con try/catch y delega con next(error)
    ↓
[Middleware global]   → formatea la respuesta HTTP y loguea en consola
    ↓
[Proceso Node.js]     → uncaughtException / unhandledRejection como red de seguridad
```

### Tipos de errores cubiertos

| Tipo de error | Cómo se captura | Respuesta HTTP |
|---|---|---|
| Email/id no encontrado | `rowCount === 0` → error manual con `statusCode 404` | 404 |
| Clave foránea violada (`23503`) | `construirErrorDetallado` | 409 |
| Registro duplicado (`23505`) | `construirErrorDetallado` | 409 |
| Campo obligatorio nulo (`23502`) | `construirErrorDetallado` | 400 |
| Saldo insuficiente (`23514`) | CHECK constraint en DB → `construirErrorDetallado` | 400 |
| Error de conexión / red (`ECONNRESET`, etc.) | `construirErrorDetallado` + retry + circuit breaker | 503 |
| Error SQL genérico de PG | `construirErrorDetallado` con código y detalle | 500 |
| Error de conexión / timeout | Pool listener + `verificarConexion()` al arrancar | — |
| Promesa rechazada sin catch | `process.on('unhandledRejection')` | — |
| Excepción síncrona no capturada | `process.on('uncaughtException')` + cierre seguro del pool | — |

### Seguridad en las respuestas de error

```javascript
res.status(statusCode).json({
    ok: false,
    mensaje: err.message,
    // El stack trace SOLO se expone en desarrollo, nunca en producción
    ...(process.env.NODE_ENV !== 'produccion' && { stack: err.stack })
});
```

---

## Explicación simple para alumnos

### 1. Retry — "Vuelve a intentarlo"

**Dónde está implementado:** `models/Cliente.js` → función `conReintento()` (líneas iniciales del archivo), utilizada dentro de cada función exportada.

Imagina que le pides algo a alguien y no te responde. No te rindes al primer intento — esperas un momento y vuelves a preguntar.

```
Intento 1 → sin respuesta → espero 300ms
Intento 2 → sin respuesta → espero 600ms  (el doble = backoff exponencial)
Intento 3 → sin respuesta → "Error: la DB no responde"
```

**¿Cuándo se activa?** Solo para errores de RED (conexión cortada, timeout, DB reiniciando). Nunca para errores de datos como "email no encontrado" — eso no se va a arreglar solo con reintentar.

Códigos que activan el reintento: `ECONNRESET`, `ECONNREFUSED`, `ETIMEDOUT`, `57P03`, `53300`, `08006`, `08001`, `08004`.

---

### 2. Circuit Breaker — "El disyuntor eléctrico de tu casa"

**Dónde está implementado:** `config/db.js` → método `ejecutar(fn)` de la clase `ConexionDB`, usado en cada función de `Cliente.js` como capa exterior.

Es exactamente la misma idea que el disyuntor eléctrico del tablero de tu casa: cuando detecta demasiados fallos, **corta el paso** para proteger el sistema.

```
Estado CERRADO     → deja pasar todas las operaciones (comportamiento normal)
     ↓ (5 fallos consecutivos)
Estado ABIERTO     → rechaza inmediatamente con HTTP 503 durante 30s
     ↓ (pasados los 30s)
Estado SEMI-ABIERTO → permite UN intento de prueba
     ↓ éxito → vuelve a CERRADO
     ↓ fallo → vuelve a ABIERTO (reinicia el timer)
```

Variables de entorno opcionales para configurar:
```env
CB_UMBRAL_FALLOS=5        # fallos consecutivos para abrir el circuito
CB_TIEMPO_APERTURA=30000  # ms que permanece abierto antes de probar
```

---

### Flujo completo de cada operación

```
Petición HTTP
      ↓
  Controller (try/catch + next)
      ↓
  db.ejecutar()          ← config/db.js   — Circuit Breaker: ¿está la DB viva?
      ↓
  conReintento()         ← models/Cliente.js — Retry: reintenta si falla la red
      ↓
  Query real a PostgreSQL
      ↓ error de negocio (404, 409...)
  construirErrorDetallado() ← models/Cliente.js — enriquece el error con detalles PG
      ↓
  Middleware global       ← server.js      — formatea y responde al cliente
```

---

### Tabla de pruebas para evidenciar cada comportamiento

| # | Error a generar | Cómo provocarlo | Respuesta esperada | Dónde se maneja |
|---|---|---|---|---|
| 1 | Usuario no encontrado | `GET /api/clientes/:id` con id inexistente | `404` + mensaje claro | `rowCount === 0` en `Cliente.js` |
| 2 | Email duplicado | `POST /api/clientes` con email ya registrado | `409` "Ya existe un registro..." | Código PG `23505` en `construirErrorDetallado` |
| 3 | Campo obligatorio nulo | `POST /api/clientes` sin enviar `email` en el body | `400` "El campo email es obligatorio..." | Código PG `23502` en `construirErrorDetallado` |
| 4 | Saldo insuficiente | `POST /api/clientes/transferir` con monto mayor al saldo del origen | `400` "La operación viola una restricción..." | Código PG `23514` (CHECK constraint DB) |
| 5 | Email origen no existe | `POST /api/clientes/transferir` con `email_origen` inventado | `404` "No se encontró ningún usuario..." | `rowCount === 0` en `transferirSaldo` |
| 6 | Emails iguales | `POST /api/clientes/transferir` con mismo email en origen y destino | `400` "El email de origen y destino no pueden ser iguales" | Validación en `clientesController.js` |
| 7 | Monto inválido | `POST /api/clientes/transferir` con `monto: -100` o `monto: "abc"` | `400` "El saldo debe ser un número entero positivo" | `validarNum()` en `clientesController.js` |
| 8 | Retry automático | Detener PostgreSQL brevemente y hacer una petición | Ver en consola `[Retry] Intento 1/3...` | `conReintento()` en `Cliente.js` |
| 9 | Circuit Breaker abierto | Detener PostgreSQL y hacer 5+ peticiones seguidas | A partir del 6to: `503` "Base de datos no disponible temporalmente" | `db.ejecutar()` en `config/db.js` |
| 10 | Circuit Breaker semi-abierto | Tras el estado ABIERTO, esperar 30s y hacer una petición | Consola muestra `[CircuitBreaker] Estado → SEMI-ABIERTO` | `db.ejecutar()` en `config/db.js` |

---

### Analogía de restaurante para resumir todo

| Concepto | Analogía |
|---|---|
| **Pool** | Las mesas del restaurante (recursos compartidos) |
| **Cliente dedicado** | Te reservan una mesa solo para ti durante toda tu cena |
| **Retry** | El mesero vuelve a la cocina si el plato aún no está listo |
| **Circuit Breaker** | El restaurante cierra la puerta si la cocina se incendió — no tiene sentido que sigas formando fila |

---

### Retry automático — detalle técnico

Implementado en `models/Cliente.js` → función `conReintento()`:

```
Intento 1 → falla (ECONNRESET) → espera 300ms
Intento 2 → falla (ECONNRESET) → espera 600ms
Intento 3 → falla (ECONNRESET) → lanza error definitivo
```

### Circuit Breaker — detalle técnico

Implementado en `config/db.js` → método `ejecutar(fn)`:

```env
CB_UMBRAL_FALLOS=5        # fallos consecutivos para abrir el circuito
CB_TIEMPO_APERTURA=30000  # ms que permanece abierto antes de probar
```

### Bugs corregidos durante la revisión

| Archivo | Bug | Corrección |
|---|---|---|
| `models/Cliente.js` → `nuevoCliente` | Usaba `pool.query()` en vez de `client.query()` — el cliente reservado nunca ejecutaba el query | Cambiado a `client.query()` |
| `models/Cliente.js` → `editarCliente` | Mismo problema: `pool.query()` en vez de `client.query()` | Cambiado a `client.query()` |
| `models/Cliente.js` → `editarCliente` | Referencia a `tarea.id` (variable inexistente) → `ReferenceError` en runtime | Corregido a `id` |
| `models/Cliente.js` → `transferirSaldo` | Mensaje de error del destino mostraba `emailOrigen` | Corregido a `emailDestino` |
| `models/Cliente.js` → `construirErrorDetallado` | No manejaba `23505` (duplicado) ni `23502` (nulo) ni `23514` (check violation) | Añadidos los tres códigos con mensajes claros y status HTTP correcto |
| `models/Cliente.js` → `transferirSaldo` | Sin validación de saldo negativo post-UPDATE | Añadida validación con `ROLLBACK` automático |

---

## Transacciones en PostgreSQL

### Autocommit

Por defecto PostgreSQL opera en modo **autocommit activado**: cada sentencia SQL individual es automáticamente una transacción completa que se confirma al instante.

```sql
-- Sin BEGIN, este UPDATE se graba de inmediato, sin vuelta atrás
UPDATE usuarios SET saldo = saldo - 100 WHERE email = 'a@mail.com';
-- ↑ COMMIT automático aquí
```

### ¿Qué hace `BEGIN`?

`BEGIN` **suspende el autocommit** para esa conexión. PostgreSQL acumula todos los cambios en memoria sin grabarlos a disco hasta recibir `COMMIT`, o los descarta con `ROLLBACK`.

```
BEGIN
  ├─ UPDATE saldo origen  → cambio pendiente en memoria
  ├─ UPDATE saldo destino → cambio pendiente en memoria
  └─ COMMIT               → ambos cambios se graban juntos (unidad atómica)
```

Esto garantiza las propiedades **ACID** — o todo ocurre, o nada ocurre.

---

### Pool vs Cliente

| | `pool.query()` | `client = pool.connect()` |
|---|---|---|
| Conexión | Una nueva por cada query | Misma conexión persistente |
| Autocommit | Siempre activo | Controlado por `BEGIN/COMMIT` |
| Uso en transacciones | **No funciona** | **Correcto** |

**Por qué `pool.query()` no sirve para transacciones:**

```
pool.query('BEGIN');    → conexión A → BEGIN → devuelta al pool
pool.query('UPDATE ...')→ conexión B ← otra diferente, no sabe del BEGIN
pool.query('COMMIT');  → conexión C ← tampoco sabe nada
```

**Con cliente dedicado, todos los queries van por la misma conexión:**

```javascript
const client = await pool.connect(); // reservo la conexión A

await client.query('BEGIN');          // A → BEGIN
await client.query('UPDATE ...');     // A → UPDATE (conoce el BEGIN)
await client.query('COMMIT');         // A → COMMIT (todo en la misma sesión)

client.release(); // devuelvo la conexión al pool
```

---

### SAVEPOINT — punto de guardado parcial

Un `SAVEPOINT` es un **punto de guardado dentro de una transacción ya iniciada**. Permite deshacer solo una parte de la transacción en lugar de todo el `ROLLBACK` completo.

**¿Cuándo usarlo?**

Cuando dentro de una misma transacción tienes operaciones opcionales o de riesgo que podrían fallar, pero no quieres perder el trabajo previo ya realizado.

**Ejemplo real — registrar transferencia con log opcional:**

```javascript
await client.query('BEGIN');

// Paso 1: restar saldo origen (obligatorio)
await client.query('UPDATE usuarios SET saldo = saldo - $1 WHERE email = $2', [monto, emailOrigen]);

// Paso 2: sumar saldo destino (obligatorio)
await client.query('UPDATE usuarios SET saldo = saldo + $1 WHERE email = $2', [monto, emailDestino]);

// Creamos un punto de guardado antes de la operación opcional
await client.query('SAVEPOINT antes_de_log');

try {
    // Paso 3: insertar en tabla de auditoría (opcional, puede no existir)
    await client.query('INSERT INTO auditoria (origen, destino, monto) VALUES ($1, $2, $3)', [emailOrigen, emailDestino, monto]);
} catch (error) {
    // Solo deshacemos el log, NO la transferencia
    await client.query('ROLLBACK TO SAVEPOINT antes_de_log');
}

// Los pasos 1 y 2 se confirman aunque el log haya fallado
await client.query('COMMIT');
```

**Diferencia clave:**

| Comando | Efecto |
|---|---|
| `ROLLBACK` | Deshace **toda** la transacción desde `BEGIN` |
| `ROLLBACK TO SAVEPOINT nombre` | Deshace solo desde el punto guardado, el resto se conserva |
| `RELEASE SAVEPOINT nombre` | Elimina el savepoint (ya no es necesario), pero no deshace nada |
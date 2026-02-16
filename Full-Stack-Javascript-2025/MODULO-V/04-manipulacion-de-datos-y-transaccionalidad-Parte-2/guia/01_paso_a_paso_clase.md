# 01 — Paso a paso de la clase (MySQL) — Integridad referencial + Transacciones (Parte II)

> Esta guía está pensada para estudiantes que están aprendiendo. Por eso verás:
> - Mucha explicación “en simple”
> - Patrón seguro: **SELECT → (UPDATE/DELETE) → SELECT**
> - Ejemplos validados en MySQL 8+

---

## 0) Contexto: el problema típico que rompe todo

**Situación real:**
- Tienes una tabla **padre** (por ejemplo: `usuarios`)
- Tienes una tabla **hija** (por ejemplo: `pedidos` o `transacciones`)
- La tabla hija tiene una **FOREIGN KEY** que apunta al padre.

Entonces, si intentas **borrar** un usuario que tiene pedidos/transacciones…

✅ La base de datos te protege (integridad referencial)
❌ Pero si no entiendes el mensaje, parece un error “misterioso”.

**Objetivo de hoy:** entender y practicar 3 comportamientos:
- **RESTRICT**: no deja borrar el padre si hay hijos.
- **CASCADE**: al borrar el padre, borra automáticamente los hijos.
- **SET NULL**: al borrar el padre, deja el vínculo en NULL.

Y después, usar **transacciones** para no dejar datos a medias.

---

## 1) Setup: crear la base y las tablas

Ejecuta el archivo:
- `sql/00_setup_bd_parte2.sql`

### 1.1 ¿Qué crea? (en simple)
Crea una BD llamada `alke_wallet_ri` con estas tablas:

**Tabla padre**
- `usuarios` (tiene `user_id` como PRIMARY KEY)

**Tablas hijas (3 versiones del mismo caso)**
- `transacciones_restrict` → FK con **ON DELETE RESTRICT**
- `transacciones_cascade` → FK con **ON DELETE CASCADE**
- `transacciones_setnull` → FK con **ON DELETE SET NULL**

> ¿Por qué 3 tablas? Para que puedas ver los 3 comportamientos **sin alterar constraints** en cada paso.

---

## 2) Cargar datos de demostración

Ejecuta:
- `sql/01_datos_demo.sql`

### 2.1 Qué datos quedan
- 3 usuarios: Ana (saldo 50.000), Beto (saldo 20.000), Carla (saldo 0)
- 1 transacción “de ejemplo” en cada tabla hija, referenciando a Ana y Beto.

Verifica (patrón seguro):

```sql
USE alke_wallet_ri;

SELECT * FROM usuarios;
SELECT * FROM transacciones_restrict;
SELECT * FROM transacciones_cascade;
SELECT * FROM transacciones_setnull;
```

---

## 3) Integridad referencial: caso RESTRICT (el típico error)

Ejecuta:
- `sql/02_integridad_referencial_RESTRICT.sql`

### 3.1 ¿Qué buscamos enseñar?
Que MySQL evita “registros huérfanos”.

- Si borras a **Ana** (padre)
- pero existe una transacción que la usa (hija)

… entonces **no deja borrar**.

### 3.2 Qué verás
1) Primero un SELECT para confirmar que Ana existe.
2) Luego se intenta borrar a Ana.
3) MySQL responde con un error de FK (esto es BUENO: la BD te está protegiendo).

### 3.3 ¿Cómo se resuelve en la vida real?
Tienes 3 caminos (depende del negocio):

**Camino A — Borrar primero las hijas, después el padre**
```sql
START TRANSACTION;

-- 1) Borro hijos
DELETE FROM transacciones_restrict
WHERE emisor_id = 1 OR receptor_id = 1;

-- 2) Borro padre
DELETE FROM usuarios
WHERE user_id = 1;

COMMIT;
```

**Camino B — Diseñar la FK con CASCADE**
- Lo vemos en el siguiente punto.

**Camino C — Diseñar la FK con SET NULL**
- Lo vemos más abajo.

---

## 4) Integridad referencial: caso CASCADE (borro padre → borro hijos)

Ejecuta:
- `sql/03_integridad_referencial_CASCADE.sql`

### 4.1 Idea
Con CASCADE, la base de datos hace el trabajo por ti:
- Borras el usuario
- MySQL borra automáticamente transacciones que lo referencian

### 4.2 Riesgo (importante)
CASCADE es potente, pero:
- si te equivocas de WHERE
- puedes borrar más cosas de las que querías

Por eso el patrón seguro es obligatorio:
- **SELECT** para ver qué vas a borrar
- luego **DELETE**

---

## 5) Integridad referencial: caso SET NULL (borro padre → dejo vínculo en NULL)

Ejecuta:
- `sql/04_integridad_referencial_SET_NULL.sql`

### 5.1 Idea
A veces NO quieres borrar la transacción (por auditoría / historial).

Entonces:
- Borras el usuario
- La FK en la transacción queda como NULL

### 5.2 Requisito
Para que funcione, la columna FK debe permitir NULL.

---

## 6) Transacciones: el caso más entendible (transferir saldo)

**Escenario:** Ana transfiere 10.000 a Beto.

Eso implica **múltiples pasos**:
1) Restar saldo a Ana
2) Sumar saldo a Beto
3) Insertar una fila en la tabla de transacciones

Si alguno falla, NO queremos que quede:
- Ana con menos saldo
- pero Beto sin recibir

Eso se llama **operación atómica**: “todo o nada”.

### 6.1 Transferencia correcta (COMMIT)
Ejecuta:
- `sql/05_transaccion_transferencia_ok.sql`

Qué hace:
- `START TRANSACTION;`
- actualiza saldos
- inserta transacción
- verifica con SELECT
- `COMMIT;`

### 6.2 Transferencia con error (ROLLBACK)
Ejecuta:
- `sql/06_transaccion_transferencia_error.sql`

Qué hace:
- inicia transacción
- realiza un UPDATE
- intenta insertar una transacción con un usuario inexistente (FK inválida)
- se produce error
- ejecuta `ROLLBACK;`

✅ Resultado esperado: nada queda “a medias”.

---

## 7) Cierre: checklist

Al terminar, el/la estudiante debería poder explicar:
- Qué es **padre** y qué es **hija**.
- Qué es una **FOREIGN KEY** y para qué sirve.
- Qué pasa al borrar un padre con hijos en:
  - RESTRICT
  - CASCADE
  - SET NULL
- Por qué una transferencia se hace dentro de una **transacción**.
- Qué diferencia hay entre **COMMIT** (guardar) y **ROLLBACK** (deshacer).

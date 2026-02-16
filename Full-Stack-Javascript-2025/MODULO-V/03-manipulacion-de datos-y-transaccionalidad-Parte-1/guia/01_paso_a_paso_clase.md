# 01 — Paso a paso de la clase (MySQL) — DML + Transacciones (Parte I)

Esta guía sigue el flujo de la presentación:
- DML (INSERT / UPDATE / DELETE / SELECT + WHERE)
- AutoCommit y transaccionalidad (COMMIT / ROLLBACK)

---

## 0) Contexto (qué problema estamos resolviendo)
Vamos a simular una mini-billetera tipo **“Alke Wallet”**:
- **Usuarios** con saldo.
- **Monedas** para representar divisa/símbolo.
- **Transacciones** entre usuarios.

La idea NO es construir un sistema completo, sino practicar:
- **INSERT** para crear datos.
- **SELECT + WHERE** para verificar.
- **UPDATE** para modificar.
- **DELETE** para eliminar (con cuidado).
- **Transacciones** para no dejar datos “a medias”.

---

## 1) Crear Base de Datos y Tablas (setup)
Ejecuta el archivo:
- `sql/00_setup_bd.sql`

### ¿Qué crea?
- Base de datos: `alke_wallet`
- Tabla: `usuarios`
- Tabla: `monedas`
- Tabla: `transacciones`

### Claves importantes (en simple)
- `AUTO_INCREMENT`: MySQL genera el ID automáticamente.
- `PRIMARY KEY`: identificador único.
- `FOREIGN KEY`: asegura que una transacción solo pueda referenciar usuarios existentes.

---

## 2) Insertar datos (INSERT)
Ejecuta:
- `sql/01_inserts_demo.sql`

### 2.1 Insertar un usuario (concepto)
La idea base es:

```sql
INSERT INTO usuarios (nombre, correo, contrasena, saldo)
VALUES ('Juan', 'juan@example.com', '1234', 50000);
```

- Insertas una fila.
- Si `user_id` es AUTO_INCREMENT, **no lo escribes**: MySQL lo asigna.

### 2.2 Insertar varias filas (muy común)
```sql
INSERT INTO monedas (currency_name, currency_symbol)
VALUES
  ('Peso chileno', 'CLP'),
  ('Dólar', 'USD'),
  ('Euro', 'EUR');
```

---

## 3) Verificar con SELECT + WHERE (y por qué es clave)
Ejecuta:
- `sql/02_selects_y_where.sql`

### 3.1 “SELECT antes de tocar datos”
Antes de UPDATE o DELETE, haz un SELECT:

```sql
SELECT * FROM usuarios
WHERE correo = 'juan@example.com';
```

Esto evita “accidentes” (actualizar/borrar más de lo que querías).

---

## 4) Borrar información (DELETE) — con seguridad
Ejecuta:
- `sql/03_delete_demo.sql`

### 4.1 Patrón seguro: SELECT → DELETE
1) Primero ves qué vas a borrar:
```sql
SELECT * FROM usuarios
WHERE created_at < '2020-01-01';
```

2) Luego borras:
```sql
DELETE FROM usuarios
WHERE created_at < '2020-01-01';
```

> Si NO pones WHERE, borras todas las filas.

---

## 5) Actualizar información (UPDATE) — con seguridad
Ejecuta:
- `sql/04_update_demo.sql`

### 5.1 Patrón seguro: SELECT → UPDATE
1) Primero revisas:
```sql
SELECT user_id, nombre, saldo FROM usuarios
WHERE saldo < 20000;
```

2) Luego actualizas:
```sql
UPDATE usuarios
SET saldo = saldo + 5000
WHERE saldo < 20000;
```

---

## 6) Transacciones y AutoCommit (COMMIT / ROLLBACK)
Ejecuta:
- `sql/05_transacciones_autocommit.sql`

### 6.1 ¿Qué es AutoCommit?
- Si **autocommit = 1**, cada INSERT/UPDATE/DELETE se guarda inmediatamente.
- Si **autocommit = 0**, los cambios quedan “en borrador” hasta que hagas **COMMIT**.
- Si algo sale mal, puedes hacer **ROLLBACK** y volver atrás.

### 6.2 Ejemplo guiado
1) Apaga autocommit
2) Haz cambios
3) Verifica con SELECT
4) Decide: COMMIT (guardar) o ROLLBACK (deshacer)

---

## 7) Cierre (checklist rápido)
Antes de terminar, cada estudiante debería poder:
- Insertar registros (INSERT).
- Verificar con SELECT + WHERE.
- Actualizar con UPDATE + WHERE.
- Eliminar con DELETE + WHERE.
- Explicar qué hace autocommit, y para qué sirve COMMIT/ROLLBACK.

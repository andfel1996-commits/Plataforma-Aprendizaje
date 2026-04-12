# Guía paso a paso — Clase DDL (Definición de tablas)

Duración sugerida: **4 horas** (incluye 1 break de 10–15 min)

> Objetivo práctico: construir una mini base de datos **“Club de Lectura”** con 3 tablas relacionadas:
- `socios`
- `libros`
- `prestamos` (relaciona socios + libros)

La idea NO es memorizar, sino **aprender el flujo mental**:
1) Diseñar columnas y tipos  
2) Agregar restricciones (NOT NULL / DEFAULT / UNIQUE)  
3) Definir PK  
4) Definir FK  
5) Probar cambios con ALTER  
6) Diferenciar DROP vs TRUNCATE  

---

## 0) Preparación (10 min)

- Abre tu cliente SQL (DBeaver / Workbench / phpMyAdmin).
- Abre `sql/00_setup_bd.sql`.
- Ejecuta y verifica:
  - se creó la base `ddl_clase05`
  - quedó seleccionada con `USE ddl_clase05;`

**Checkpoint**
- Ejecuta: `SHOW TABLES;`  
  Debe estar vacío (aún).

---

## 1) DDL: CREATE TABLE básico (35 min)

Abre `sql/01_create_basico.sql`.

Conceptos que aparecen:
- tipos de datos: `INT`, `VARCHAR`, `DATE`, `DATETIME`
- `NOT NULL` vs `NULL`
- `DEFAULT`
- `UNIQUE`
- `AUTO_INCREMENT`
- `COMMENT` en columnas (para documentación)

**Qué mirar en la práctica**
- ¿Qué pasa si intentas insertar un socio sin email cuando `email` es `NOT NULL`?
- ¿Qué pasa si repites un email cuando `email` es `UNIQUE`?

> Nota: esta clase es de DDL, pero usamos **INSERT mínimos** para “probar” restricciones.

**Checkpoint**
- `DESCRIBE socios;`
- `SHOW CREATE TABLE socios;`

---

## 2) PK y FK: creando relaciones (45 min)

Abre `sql/02_create_relaciones_pk_fk.sql`.

Aquí construimos:
- `libros` con PK
- `prestamos` con PK y dos FK:
  - `prestamos.socio_id` → `socios.socio_id`
  - `prestamos.libro_id` → `libros.libro_id`

Además discutimos:
- ¿Qué significa integridad referencial?
- ¿Por qué una FK evita “préstamos huérfanos”?

**Checkpoint**
- `SHOW CREATE TABLE prestamos;`  
  Verifica que existan las `FOREIGN KEY`.

---

## 3) ALTER TABLE: el “taller” de modificaciones (50 min)

Abre `sql/03_alter_table_modo_taller.sql`.

Objetivo: simular cambios típicos de un proyecto real:
- Agregar una columna nueva (ADD)
- Cambiar tipo de dato (MODIFY)
- Renombrar columna (CHANGE)
- Agregar restricción UNIQUE (ADD CONSTRAINT)
- Eliminar columna (DROP COLUMN)

**Errores comunes**
- Intentar cambiar una columna a `NOT NULL` cuando ya hay filas con `NULL`.
- Renombrar columnas sin revisar el tipo (en MySQL `CHANGE` exige repetir el tipo).

**Checkpoint**
- `DESCRIBE socios;`
- `SHOW CREATE TABLE socios;`

---

## 4) DROP vs TRUNCATE vs RENAME + COMMENT (35 min)

Abre `sql/04_drop_truncate_rename_comment.sql`.

Aprendemos a:
- `TRUNCATE` (vaciar datos, conservar estructura)
- `DROP TABLE` (eliminar estructura + datos)
- `RENAME TABLE` (cambiar nombre de tabla)
- `ALTER TABLE ... COMMENT` (documentar a nivel tabla)

**Pregunta rápida al curso**
- Si quieres “vaciar para cargar de nuevo”, ¿usas DELETE o TRUNCATE? ¿por qué?

---

## 5) Break (10–15 min)

---

## 6) Reto práctico (35–45 min)

- Abre `sql/05_reto_practico.sql`.
- Completa los TODO (son “huecos” intencionales).
- Si te atoras, mira `guia/03_soluciones.md` o el script `sql/06_reto_practico_soluciones.sql`.

---

## 7) Cierre (10 min)

Checklist final (en voz alta):
- ¿Qué hace DDL y qué NO hace?
- ¿Qué diferencia hay entre `DROP` y `TRUNCATE`?
- ¿Qué garantiza una `PRIMARY KEY`?
- ¿Qué garantiza una `FOREIGN KEY`?
- ¿Por qué `NOT NULL` y `DEFAULT` ayudan a la calidad de datos?

Siguiente clase (puente):
- DML (INSERT/UPDATE/DELETE) más profundo + consultas (SELECT) para explotar relaciones.

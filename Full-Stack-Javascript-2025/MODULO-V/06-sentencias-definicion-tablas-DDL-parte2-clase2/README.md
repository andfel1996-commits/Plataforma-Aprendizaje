# AE4 — Sentencias para la definición de tablas (DDL) — Parte II (Clase 2) — MySQL/MariaDB

Material de apoyo para **Clase de Base de Datos**.  
Continuación práctica de DDL enfocada en **errores comunes reales** al usar `ALTER TABLE`, y una introducción **suave** a **índices** y **vistas**.

> Idea fuerza: DDL cambia la **estructura** (tablas/columnas/restricciones).  
> DML cambia los **datos** (INSERT/UPDATE/DELETE).  
> Hoy vamos a mezclar ambos **solo cuando sea necesario**, por ejemplo: *“sanear datos antes de poner NOT NULL”*.

---

## Objetivos de aprendizaje (al final de la clase podrás)
- Modificar tablas con `ALTER TABLE` (ADD / CHANGE / MODIFY / DROP).
- Entender el error típico al pasar de `NULL` → `NOT NULL` y cómo resolverlo con **saneamiento (UPDATE)**.
- Crear y validar **índices** básicos (`CREATE INDEX`, `SHOW INDEX`) y verificar uso con `EXPLAIN`.
- Crear y usar **vistas** (`CREATE VIEW`) como “SELECT guardados” para reportes simples.

---

## Estructura del material
- `guia/01_paso_a_paso_clase.md` → Guion de clase (paso a paso, con tiempos y checkpoints).
- `guia/02_ejercicios_practica.md` → Ejercicios para practicar.
- `guia/03_soluciones.md` → Soluciones explicadas (sin saltos).
- `sql/` → Scripts SQL **ultra comentados**.

### Scripts (orden recomendado)
1. `sql/00_setup_bd.sql`  
2. `sql/01_alter_saneamiento_not_null_default.sql`  
3. `sql/02_create_index_y_explain.sql`  
4. `sql/03_create_view.sql`  
5. `sql/04_reto_practico_clase2.sql` (para que el alumno complete)  
6. `sql/05_reto_practico_clase2_soluciones.sql`

---

## Cómo ejecutar (DBeaver / Workbench / phpMyAdmin)
1) Ejecuta `sql/00_setup_bd.sql` (crea la BD de la clase).  
2) Ejecuta los scripts en orden.  
3) Cada bloque tiene comentarios con:
   - qué verificar (DESCRIBE / SHOW CREATE TABLE / SELECT / EXPLAIN),
   - qué error es común,
   - cómo solucionarlo.

---

## Reglas simples para estudiantes (sin tecnicismos)
- **Antes de poner NOT NULL**, revisa si existen `NULL` en esa columna.
- Si hay `NULL`, primero **UPDATE** para reemplazarlos, y recién después `ALTER TABLE ... NOT NULL`.
- Un **índice** es como el índice de un libro: ayuda a encontrar filas más rápido cuando haces `WHERE`.
- Una **vista** es como un “atajo” a un `SELECT` frecuente: no duplica datos, solo guarda la consulta.


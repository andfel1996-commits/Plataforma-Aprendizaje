# Ejercicios de práctica — DDL (Definición de tablas)

> Trabaja sobre la base `ddl_clase05` creada en `sql/00_setup_bd.sql`.

## A) Tipos de datos y nulidad
1. Crea una tabla `categorias` con:
   - `categoria_id` (INT, PK, auto incremental)
   - `nombre` (VARCHAR(60), NOT NULL, UNIQUE)
   - `descripcion` (VARCHAR(255), NULL)
2. Agrega un `COMMENT` a la tabla `categorias` explicando su propósito.

## B) PK y FK
3. Crea una tabla `libros_categoria` para relacionar libros con categorías:
   - `libro_id` (FK a `libros`)
   - `categoria_id` (FK a `categorias`)
   - PK compuesta (`libro_id`, `categoria_id`)
4. ¿Qué ventaja tiene usar una tabla puente (N a N)?

## C) ALTER TABLE (casos reales)
5. En `socios`, agrega una columna `telefono` (VARCHAR(20), NULL).
6. Cambia `socios.telefono` para que sea `NOT NULL` con `DEFAULT 'SIN-TELEFONO'`.
7. Renombra la columna `socios.apellido` a `socios.apellidos` (mantén el tipo).

## D) Eliminación segura
8. Vacía la tabla `prestamos` sin eliminar su estructura.
9. Elimina la tabla `libros_categoria` (si existe).
10. ¿Cuándo NO conviene usar `DROP TABLE`?

---

## Desafío (opcional)
11. Agrega una restricción para que `prestamos.fecha_devolucion` sea mayor o igual a `prestamos.fecha_prestamo`.
   - Pista: `CHECK` (ojo con la versión del motor).

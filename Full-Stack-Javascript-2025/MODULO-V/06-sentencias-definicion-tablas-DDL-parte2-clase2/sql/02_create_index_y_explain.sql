-- =========================================================
-- 02_create_index_y_explain.sql
-- ---------------------------------------------------------
-- Objetivo: crear un índice y verificar (suavemente) si se usa.
-- Importante: con pocas filas MySQL puede decidir que da lo mismo.
-- Por eso incluimos un ejemplo con USE INDEX (solo para demo).
-- =========================================================

USE ddl_clase06;

-- 1) Ver índices actuales (PK + UNIQUE(isbn) ya crean índices)
SHOW INDEX FROM catalogo_libros;

-- 2) Crear índice para búsquedas por titulo
CREATE INDEX idx_libros_titulo
ON catalogo_libros (titulo);

-- 3) Confirmar
SHOW INDEX FROM catalogo_libros;

-- 4) Consulta típica del "frontend": buscar por título exacto
SELECT *
FROM catalogo_libros
WHERE titulo = 'Clean Code';

-- 5) Ver el plan (EXPLAIN)
--    Mira solo:
--    - key: el índice usado
--    - type: ALL (escaneo) o ref/range (usa índice)
EXPLAIN
SELECT *
FROM catalogo_libros
WHERE titulo = 'Clean Code';

-- 6) Demo opcional: forzar uso del índice (solo para enseñar)
EXPLAIN
SELECT *
FROM catalogo_libros USE INDEX (idx_libros_titulo)
WHERE titulo = 'Clean Code';

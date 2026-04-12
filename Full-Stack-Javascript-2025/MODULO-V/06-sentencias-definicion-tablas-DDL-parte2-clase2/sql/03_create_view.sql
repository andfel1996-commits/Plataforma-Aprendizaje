-- =========================================================
-- 03_create_view.sql
-- ---------------------------------------------------------
-- Objetivo: crear una vista (VIEW) para consultas repetidas.
-- Una vista es un "SELECT con nombre". No duplica datos.
-- =========================================================

USE ddl_clase06;

-- 1) Crear una vista de resumen del catálogo
CREATE OR REPLACE VIEW vw_catalogo_resumen AS
SELECT
  libro_id,
  titulo,
  autor,
  anio_publicacion,
  genero
FROM catalogo_libros;

-- 2) Usar la vista
SELECT * FROM vw_catalogo_resumen;

-- 3) Insertar un libro y ver que aparece en la vista
INSERT INTO catalogo_libros (titulo, autor, isbn, anio_publicacion, genero)
VALUES ('El Aleph','Jorge Luis Borges','978-9875662895',1945,'cuento');

SELECT * FROM vw_catalogo_resumen;

-- 4) Si quieres eliminar la vista:
-- DROP VIEW IF EXISTS vw_catalogo_resumen;

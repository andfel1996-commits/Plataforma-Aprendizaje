-- =========================================================
-- 05_reto_practico.sql (PARA COMPLETAR - MISMAS ACCIONES, OTRAS TABLAS)
-- ---------------------------------------------------------
-- Objetivo: practicar lo visto en la demo, pero en TABLAS DIFERENTES:
-- - CREATE TABLE
-- - ALTER TABLE (ADD COLUMN)
-- - UPDATE (saneamiento)
-- - ALTER TABLE (MODIFY: NOT NULL + DEFAULT)
-- - TRUNCATE
-- - DROP TABLE IF EXISTS
--
-- Instrucciones:
-- 1) Lee cada TODO
-- 2) Completa la sentencia
-- 3) Verifica con DESCRIBE / SHOW CREATE TABLE / SELECT COUNT(*)
-- =========================================================

USE ddl_clase05;

-- ---------------------------------------------------------
-- TODO 1: Crea tabla "autores"
-- Requisitos:
-- - autor_id INT PK auto_increment
-- - nombre VARCHAR(80) NOT NULL
-- - pais VARCHAR(60) NULL
-- - created_at DATE NOT NULL DEFAULT (CURDATE())
-- - COMMENT a la tabla (propósito)
--
-- Nota: si tu motor no acepta CURDATE() como DEFAULT en DATE,
-- usa DEFAULT (CURRENT_DATE) o elimina created_at del reto.
-- ---------------------------------------------------------
-- ESCRIBE AQUÍ tu CREATE TABLE autores...


-- ---------------------------------------------------------
-- TODO 2: ALTER TABLE catalogo_libros
-- Requisitos:
-- - Agrega columna autor_id INT NULL
-- - Agrega FK (autor_id) -> autores(autor_id)
--   * IMPORTANTE: autor_id debe existir en autores (PK)
-- ---------------------------------------------------------
-- ESCRIBE AQUÍ tu ALTER TABLE (ADD COLUMN autor_id)...
-- ESCRIBE AQUÍ tu ALTER TABLE (ADD CONSTRAINT fk_libros_autor)...


-- ---------------------------------------------------------
-- TODO 3: ALTER TABLE catalogo_libros   (NO socios)
-- - Agrega columna "isbn" VARCHAR(20) NULL
-- ---------------------------------------------------------
-- ESCRIBE AQUÍ tu ALTER TABLE...


-- ---------------------------------------------------------
-- TODO 4: catalogo_libros (NO socios)
-- - Cambia "isbn" a NOT NULL con DEFAULT 'SIN-ISBN'
--   (si hay NULL, recuerda actualizar antes)
--
-- Pista: primero UPDATE para los registros existentes con NULL,
-- luego ALTER TABLE MODIFY para cambiar la regla.
-- ---------------------------------------------------------
-- ESCRIBE AQUÍ tu UPDATE + ALTER...


-- ---------------------------------------------------------
-- TODO 5: TRUNCATE   (NO prestamos)
-- - Vacía la tabla "resenas" (si existe)
--
-- Para que tenga sentido, asumimos que existe una tabla:
-- resenas(resena_id PK, socio_id FK, libro_id FK, comentario, fecha)
-- Si no existe en tu bundle actual, la creamos en el TODO 0 opcional (abajo).
-- ---------------------------------------------------------
-- ESCRIBE AQUÍ tu TRUNCATE...


-- ---------------------------------------------------------
-- TODO 6: DROP TABLE  (NO categorias_libros)
-- - Elimina la tabla "resenas" (si existe)
-- ---------------------------------------------------------
-- ESCRIBE AQUÍ tu DROP...


-- ---------------------------------------------------------
-- Verificación (no borres esto)
-- ---------------------------------------------------------
SHOW TABLES;

-- Opcional: verificaciones recomendadas
-- DESCRIBE autores;
-- DESCRIBE catalogo_libros;
-- SHOW CREATE TABLE catalogo_libros;
-- SELECT COUNT(*) FROM resenas;

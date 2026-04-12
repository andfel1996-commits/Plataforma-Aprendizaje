-- =========================================================
-- 04_drop_truncate_rename_comment_MEJORADO.sql
-- ---------------------------------------------------------
-- Tema: TRUNCATE vs DROP vs RENAME + COMMENT (MySQL/MariaDB)
-- Objetivo: entender impacto en datos, estructura y dependencias (FK).
-- Modo demo: ejecutar por BLOQUES, en este orden, para no romper el flujo.
-- =========================================================

USE ddl_clase05;

-- =========================================================
-- BLOQUE 0) Diagnóstico inicial (SIEMPRE partir mirando)
-- ---------------------------------------------------------
-- 1) ¿Qué tablas existen?
-- 2) ¿Cuántos registros hay?
-- 3) ¿Cómo se llaman las PK/FK?
-- =========================================================
SHOW TABLES;

SELECT COUNT(*) AS total_socios     FROM socios;
SELECT COUNT(*) AS total_libros     FROM libros;
SELECT COUNT(*) AS total_prestamos  FROM prestamos;

-- (Opcional) ver estructura rápida
DESCRIBE socios;
DESCRIBE libros;
DESCRIBE prestamos;


-- =========================================================
-- BLOQUE 1) COMMENT (seguro: no afecta datos ni relaciones)
-- ---------------------------------------------------------
-- COMMENT sirve para DOCUMENTAR.
-- No cambia filas, no cambia columnas, no cambia FKs.
-- =========================================================
ALTER TABLE socios
  COMMENT = 'Socios del Club de Lectura (documentación actualizada)';

-- Verificamos el comment (MySQL/MariaDB)
SHOW TABLE STATUS LIKE 'socios';

-- Verificamos el comment (MySQL/MariaDB)
SELECT table_name, table_comment
FROM information_schema.tables
WHERE table_schema = DATABASE()
  AND table_name = 'socios';


-- =========================================================
-- BLOQUE 2) TRUNCATE (borra TODAS las filas, mantiene estructura)
-- ---------------------------------------------------------
-- TRUNCATE:
-- - elimina todos los registros (reset auto_increment usualmente)
-- - es más rápido que DELETE sin WHERE
-- Riesgo:
-- - si hay FK desde otra tabla apuntando a esta, puede fallar
--   (o requerir borrar primero la tabla hija).
--
-- En este modelo, prestamos suele depender de socios/libros,
-- por eso TRUNCATE prestamos es relativamente "seguro" como demo.
-- =========================================================
TRUNCATE TABLE prestamos;

-- Verificamos: la tabla existe pero está vacía
SELECT COUNT(*) AS prestamos_total FROM prestamos;


-- =========================================================
-- BLOQUE 3) RENAME TABLE (cambia el nombre; ojo con dependencias)
-- ---------------------------------------------------------
-- Renombrar es común en refactors:
-- libros -> catalogo_libros
--
-- Importante para el demo:
-- - Renombrar una tabla referenciada por FK puede generar confusión.
-- - Para que el demo no se rompa, haremos lo siguiente:
--   (A) Renombramos libros
--   (B) Re-creamos prestamos con FK apuntando al nombre nuevo
--
-- Para evitar errores por existencia previa, borramos si ya existe
-- (porque si ya corriste el script una vez, la tabla puede estar creada).
-- =========================================================

-- (A) Si ya existe catalogo_libros por una corrida anterior, la eliminamos
-- OJO: esto eliminará esa tabla. En demo controlado está bien.
DROP TABLE IF EXISTS catalogo_libros;

-- Renombramos libros -> catalogo_libros
RENAME TABLE libros TO catalogo_libros;

SHOW TABLES;


-- =========================================================
-- BLOQUE 4) DROP + CREATE (ajustar FKs sin enredar a los alumnos)
-- ---------------------------------------------------------
-- Problema didáctico típico:
-- - prestamos tenía FK a libros(libro_id)
-- - ahora la tabla se llama catalogo_libros
-- Solución simple para el demo:
-- - borramos prestamos (estructura + datos)
-- - la recreamos con FK correcta al nuevo nombre
--
-- Nota: como ya hicimos TRUNCATE, prestamos está vacía,
-- así que el DROP no nos hace perder datos “valiosos” del demo.
-- =========================================================
DROP TABLE IF EXISTS prestamos;

CREATE TABLE prestamos (
  prestamo_id INT AUTO_INCREMENT PRIMARY KEY,
  socio_id INT NOT NULL,
  libro_id INT NOT NULL,
  fecha_prestamo DATE NOT NULL,
  fecha_devolucion DATE NULL,
  estado ENUM('prestado','devuelto','atrasado') NOT NULL DEFAULT 'prestado',

  CONSTRAINT fk_prestamo_socio
    FOREIGN KEY (socio_id) REFERENCES socios(socio_id),

  CONSTRAINT fk_prestamo_libro
    FOREIGN KEY (libro_id) REFERENCES catalogo_libros(libro_id)

) COMMENT = 'Préstamos (FK actualizada tras RENAME de libros)';

-- Verificamos estructura y FK
SHOW CREATE TABLE prestamos;


-- =========================================================
-- BLOQUE 5) INSERT de validación (comprobar que FK funciona)
-- ---------------------------------------------------------
-- 1) Tomamos un socio_id y un libro_id reales
-- 2) Insertamos un préstamo
--
-- Si esto falla:
-- - no existe socio_id o libro_id
-- - o las PK se llaman distinto
-- =========================================================

-- Buscar IDs reales para usar en el insert
SELECT socio_id FROM socios ORDER BY socio_id LIMIT 1;
SELECT libro_id FROM catalogo_libros ORDER BY libro_id LIMIT 1;

-- Insert con subqueries (evita “inventar” IDs)
INSERT INTO prestamos (socio_id, libro_id, fecha_prestamo, estado)
VALUES (
  (SELECT socio_id FROM socios ORDER BY socio_id LIMIT 1),
  (SELECT libro_id FROM catalogo_libros ORDER BY libro_id LIMIT 1),
  -- CURDATE() en MySQL/MariaDB devuelve la fecha de hoy del servidor, sin hora.
  CURDATE(),
  'prestado'
);

SELECT * FROM prestamos;


-- =========================================================
-- BLOQUE 6) DROP TABLE (irreversible, siempre al final)
-- ---------------------------------------------------------
-- DROP elimina:
-- - estructura de la tabla
-- - y todos los datos
-- Se usa cuando ya no se necesita la tabla.
-- =========================================================
DROP TABLE IF EXISTS libros_categoria;

-- Estado final
SHOW TABLES;

-- Ver definiciones principales
SHOW CREATE TABLE socios;
SHOW CREATE TABLE catalogo_libros;
SHOW CREATE TABLE prestamos;

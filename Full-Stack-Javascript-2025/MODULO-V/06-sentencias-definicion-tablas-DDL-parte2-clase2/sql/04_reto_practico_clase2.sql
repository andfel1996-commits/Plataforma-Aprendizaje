-- =========================================================
-- 04_reto_practico_clase2.sql (PARA COMPLETAR)
-- ---------------------------------------------------------
-- Objetivo: practicar DDL Parte II (Clase 2) con TODOs.
-- - ALTER TABLE (ADD / CHANGE / MODIFY)
-- - UPDATE (saneamiento)
-- - CREATE INDEX
-- - CREATE VIEW
--
-- Instrucciones:
-- 1) Lee cada TODO
-- 2) Completa la sentencia
-- 3) Verifica con DESCRIBE / SHOW INDEX / SELECT / EXPLAIN
-- =========================================================

USE ddl_clase06;

-- ---------------------------------------------------------
-- TODO 1: Agrega columna "direccion" a socios
-- - direccion VARCHAR(160) NULL
-- ---------------------------------------------------------
-- ALTER TABLE socios ...

-- Check:
-- DESCRIBE socios;

-- ---------------------------------------------------------
-- TODO 2: Inserta 2 socios (uno sin telefono)
-- Pista: telefono tiene DEFAULT 'SIN-TELEFONO'
-- ---------------------------------------------------------
-- INSERT INTO socios (...)

-- Check:
-- SELECT * FROM socios;

-- ---------------------------------------------------------
-- TODO 3: Sanea teléfonos vacíos
-- Contexto: algunos alumnos escriben '' (cadena vacía)
-- Queremos reemplazar '' por 'SIN-TELEFONO'
-- ---------------------------------------------------------
-- UPDATE socios ...

-- Check:
-- SELECT socio_id, telefono FROM socios;

-- ---------------------------------------------------------
-- TODO 4: Crea un índice para buscar socios por apellidos
-- - idx_socios_apellidos
-- ---------------------------------------------------------
-- CREATE INDEX ...

-- Check:
-- SHOW INDEX FROM socios;

-- ---------------------------------------------------------
-- TODO 5: Crea una vista "vw_socios_contacto"
-- Debe devolver: socio_id, nombre, apellidos, email, telefono
-- ---------------------------------------------------------
-- CREATE OR REPLACE VIEW ...

-- Check:
-- SELECT * FROM vw_socios_contacto;

-- ---------------------------------------------------------
-- TODO 6 (opcional): Verificar uso del índice con EXPLAIN
-- Buscar por apellidos (usa el índice si MySQL lo decide)
-- ---------------------------------------------------------
-- EXPLAIN SELECT * FROM socios WHERE apellidos = 'Rojas';

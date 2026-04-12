-- =========================================================
-- 01_alter_saneamiento_not_null_default.sql
-- ---------------------------------------------------------
-- Objetivo: entender el error típico al cambiar NULL -> NOT NULL
-- y solucionarlo con saneamiento (UPDATE) antes del ALTER.
-- =========================================================

USE ddl_clase06;

-- ---------------------------------------------------------
-- 1) Agregar columna telefono permitiendo NULL (como suele ocurrir)
-- ---------------------------------------------------------
ALTER TABLE socios
  ADD COLUMN telefono VARCHAR(20) NULL;

-- Ver estructura
DESCRIBE socios;

-- ---------------------------------------------------------
-- 2) Dejar "a propósito" algunos NULL para reproducir el problema
-- ---------------------------------------------------------
-- Simulamos que alguien insertó/actualizó sin teléfono:
UPDATE socios
SET telefono = NULL
WHERE socio_id IN (1,3);

SELECT socio_id, nombre, apellidos, email, telefono
FROM socios;

-- ---------------------------------------------------------
-- 3) Ahora intentamos convertir a NOT NULL + DEFAULT
--    (Esto FALLARÁ si existen NULL)
-- ---------------------------------------------------------
-- Descomenta para ver el error:
-- ALTER TABLE socios
--   MODIFY COLUMN telefono VARCHAR(20) NOT NULL DEFAULT 'SIN-TELEFONO';

-- ---------------------------------------------------------
-- 4) SOLUCIÓN CORRECTA (2 pasos)
-- ---------------------------------------------------------
-- Paso A: saneamiento (reemplazar NULL por un valor)
UPDATE socios
SET telefono = 'SIN-TELEFONO'
WHERE telefono IS NULL;

-- Verificar que no queden NULL
SELECT COUNT(*) AS nulls_telefono
FROM socios
WHERE telefono IS NULL;

-- Paso B: ahora sí aplicamos NOT NULL + DEFAULT
ALTER TABLE socios
  MODIFY COLUMN telefono VARCHAR(20) NOT NULL DEFAULT 'SIN-TELEFONO';

-- Check final
DESCRIBE socios;
SELECT socio_id, nombre, telefono FROM socios;

-- ---------------------------------------------------------
-- 5) Prueba de inserción: si NO mandas teléfono, debería tomar el DEFAULT
-- ---------------------------------------------------------
INSERT INTO socios (nombre, apellidos, email)
VALUES ('Ana','Muñoz','ana.munoz@club.cl');

SELECT socio_id, nombre, telefono
FROM socios
WHERE email='ana.munoz@club.cl';

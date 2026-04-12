-- =========================================================
-- 03_alter_table_modo_taller_MEJORADO.sql
-- ---------------------------------------------------------
-- Tema: ALTER TABLE (MySQL/MariaDB)
-- Objetivo: demo guiada, en orden, sin romper el flujo.
-- Recomendación: ejecutar BLOQUE por BLOQUE (selecciona el bloque y ejecuta).
-- =========================================================

USE ddl_clase05;

-- =========================================================
-- BLOQUE 0) Diagnóstico inicial (siempre partir mirando)
-- =========================================================
DESCRIBE socios;

SELECT COUNT(*) AS total_socios FROM socios;

-- (Opcional) mirar algunas filas
SELECT * FROM socios LIMIT 5;


-- =========================================================
-- BLOQUE 1) ADD COLUMN (agregar columna nueva)
-- ---------------------------------------------------------
-- Estrategia didáctica:
-- - Primero agregamos la columna como NULL (opcional).
-- - Así NO falla aunque existan filas antiguas.
-- =========================================================
ALTER TABLE socios
  ADD COLUMN telefono VARCHAR(20) NULL;

-- Verificamos que ya existe
DESCRIBE socios;

-- Insert de prueba (si tu tabla socios tiene otras columnas NOT NULL,
-- AJUSTA este INSERT a tu estructura real)
-- La idea: insertar un socio con telefono NULL (permitido en este punto)
INSERT INTO socios (nombre, apellidos, email, telefono)
VALUES ('Diego', 'Muñoz', 'diego.munoz+add@club.cl', NULL);

SELECT id_socio, nombre, telefono
FROM socios
WHERE email = 'diego.munoz+add@club.cl';


-- =========================================================
-- BLOQUE 2) Saneamiento de datos antes de NOT NULL
-- ---------------------------------------------------------
-- Problema típico real:
-- - Si existen filas con telefono = NULL y pasamos a NOT NULL,
--   el ALTER puede FALLAR.
-- Solución:
-- - Antes, reemplazamos los NULL por un valor estándar.
-- =========================================================
UPDATE socios
SET telefono = 'SIN-TELEFONO'
WHERE telefono IS NULL;

-- Verificamos que ya no hay NULL
SELECT COUNT(*) AS telefonos_null
FROM socios
WHERE telefono IS NULL;

-- (Opcional) mirar algunos
SELECT id_socio, nombre, telefono
FROM socios
ORDER BY id_socio DESC
LIMIT 5;


-- =========================================================
-- BLOQUE 3) MODIFY COLUMN (cambiar regla de la columna)
-- ---------------------------------------------------------
-- Objetivo:
-- - telefono obligatorio (NOT NULL)
-- - valor por defecto (DEFAULT) para futuros INSERT donde no lo envíen
-- =========================================================
ALTER TABLE socios
  MODIFY COLUMN telefono VARCHAR(20) NOT NULL DEFAULT 'SIN-TELEFONO';

DESCRIBE socios;

-- ====== Prueba A: Insert SIN telefono -> debe usar DEFAULT ======
INSERT INTO socios (nombre, apellidos, email)
VALUES ('Elena', 'Soto', 'elena.soto+default@club.cl');

SELECT id_socio, nombre, telefono
FROM socios
WHERE email = 'elena.soto+default@club.cl';

-- ====== Prueba B: Intentar insertar NULL -> debe FALLAR ======
-- (Ejecuta solo si quieres mostrar el error en vivo)
-- INSERT INTO socios (nombre, apellidos, email, telefono)
-- VALUES ('Marcelo', 'Rivas', 'marcelo.rivas+null@club.cl', NULL);


-- =========================================================
-- BLOQUE 4) CHANGE COLUMN (renombrar columna)
-- ---------------------------------------------------------
-- Importante en MySQL:
-- - CHANGE COLUMN exige repetir el tipo completo.
-- Ejemplo: apellidos -> apellido (o al revés)
-- OJO: Ajusta a tu caso real (en tu script original era apellido -> apellidos)
-- =========================================================
-- Si tu columna actual se llama "apellido", usa esto:
-- ALTER TABLE socios
--   CHANGE COLUMN apellido apellidos VARCHAR(60) NOT NULL;

-- Si tu columna actual YA es "apellidos" y quieres dejarla igual, omite.

DESCRIBE socios;


-- =========================================================
-- BLOQUE 5) UNIQUE (restricción de unicidad)
-- ---------------------------------------------------------
-- Antes de crear UNIQUE, SIEMPRE revisar duplicados.
-- Porque si hay repetidos, el ALTER FALLA.
-- =========================================================

-- 1) Revisión de duplicados de telefono
SELECT telefono, COUNT(*) AS repeticiones
FROM socios
GROUP BY telefono
HAVING COUNT(*) > 1;

-- 2) Recomendación docente:
-- - NO conviene que 'SIN-TELEFONO' sea UNIQUE porque se repetirá muchísimo.
-- - Mejor hacer UNIQUE solo para teléfonos reales.
-- En MySQL/MariaDB podemos hacerlo con un índice UNIQUE funcional
-- (si tu versión lo soporta) o con estrategia alternativa.
--
-- Para demo simple (y no romper):
-- - Quitamos la unicidad del placeholder, o NO creamos UNIQUE en telefono.
--
-- Si aún quieres demostrar UNIQUE, hazlo sobre email (más realista):
ALTER TABLE socios
  ADD CONSTRAINT uq_socios_email UNIQUE (email);

SHOW CREATE TABLE socios;


-- =========================================================
-- BLOQUE 6) DROP COLUMN (destructivo: siempre al final)
-- ---------------------------------------------------------
-- Quitar columnas elimina datos. En demo, hacerlo al final.
-- =========================================================
-- Ejemplo: decidimos eliminar fecha_nacimiento (si existe)
-- OJO: si NO existe, fallará.
-- ALTER TABLE socios
--   DROP COLUMN fecha_nacimiento;

DESCRIBE socios;

-- Resultado final (muestra últimas filas creadas)
SELECT id_socio, nombre, telefono, email
FROM socios
ORDER BY id_socio DESC
LIMIT 10;

-- =========================================================
-- 01_create_basico.sql
-- ---------------------------------------------------------
-- Tema: CREATE TABLE + tipos + nulidad + defaults + unique
-- Escenario: "Club de Lectura"
-- Tabla: socios
-- =========================================================

USE ddl_clase05;

-- Limpieza por si re-ejecutas el script varias veces
DROP TABLE IF EXISTS socios;

CREATE TABLE socios (
  -- socio_id: identificador único del socio.
  -- INT: número entero.
  -- AUTO_INCREMENT: se incrementa solo.
  -- PRIMARY KEY: no se repite y no puede ser NULL.
  socio_id INT AUTO_INCREMENT PRIMARY KEY,

  -- nombre: texto corto. NOT NULL = obligatorio.
  nombre VARCHAR(60) NOT NULL,

  -- apellido: texto corto. NOT NULL = obligatorio.
  apellido VARCHAR(60) NOT NULL,

  -- fecha_nacimiento: DATE guarda solo fecha (YYYY-MM-DD).
  -- Puede ser NULL porque tal vez el socio no la entrega.
  fecha_nacimiento DATE NULL,

  -- email: obligatorio y ÚNICO.
  email VARCHAR(120) NOT NULL UNIQUE,

  -- activo: en MySQL suele representarse como TINYINT(1)
  -- DEFAULT 1: si no indico valor, queda activo.
  activo TINYINT(1) NOT NULL DEFAULT 1,

  -- creado_en: fecha y hora al insertar.
  -- DEFAULT CURRENT_TIMESTAMP: el motor coloca la hora actual.
  creado_en DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) COMMENT='Tabla de socios del Club de Lectura (ejemplo DDL)';

-- ============================================
-- PROBAR (DML mínimo para verificar restricciones)
-- ============================================

-- 1) Insert correcto
INSERT INTO socios (nombre, apellido, fecha_nacimiento, email)
VALUES ('Ana', 'Pérez', '1999-04-12', 'ana.perez@correo.cl');

-- 2) Insert sin fecha_nacimiento (permite NULL)
INSERT INTO socios (nombre, apellido, email)
VALUES ('Luis', 'Gómez', 'luis.gomez@correo.cl');

-- 3) (Prueba guiada) ¿Qué pasa si repito el email?
--    Descomenta para ver el error de UNIQUE.
-- INSERT INTO socios (nombre, apellido, email)
-- VALUES ('Ana', 'Repetida', 'ana.perez@correo.cl');

-- 4) (Prueba guiada) ¿Qué pasa si no envío email?
--    Descomenta para ver el error de NOT NULL.
-- INSERT INTO socios (nombre, apellido)
-- VALUES ('Sin', 'Email');

-- Ver resultado
SELECT * FROM socios;

-- Inspección de estructura (clave para entender DDL)
DESCRIBE socios;
SHOW CREATE TABLE socios;

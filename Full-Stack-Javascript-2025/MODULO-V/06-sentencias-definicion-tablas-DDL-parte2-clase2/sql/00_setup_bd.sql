-- =========================================================
-- 00_setup_bd.sql
-- ---------------------------------------------------------
-- Objetivo: crear una base de datos LIMPIA para la clase 2
-- (DDL Parte II) y poblarla con datos mínimos.
-- =========================================================

DROP DATABASE IF EXISTS ddl_clase06;
CREATE DATABASE ddl_clase06 CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE ddl_clase06;

-- ---------------------------------------------------------
-- Tabla: socios (para practicar ALTER + saneamiento)
-- ---------------------------------------------------------
DROP TABLE IF EXISTS socios;

CREATE TABLE socios (
  socio_id INT AUTO_INCREMENT PRIMARY KEY,
  nombre   VARCHAR(80)  NOT NULL,
  apellidos VARCHAR(80) NOT NULL,
  email    VARCHAR(120) NOT NULL UNIQUE,
  creado_en DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) COMMENT='Socios del club (tabla para ejercicios de ALTER y restricciones)';

-- Insertamos algunos registros iniciales
INSERT INTO socios (nombre, apellidos, email) VALUES
('Javier','Rojas','javi.rojas@club.cl'),
('Carla','Soto','carla.soto@club.cl'),
('Juan','Perez','juan.perez@club.cl');

-- ---------------------------------------------------------
-- Tabla: catalogo_libros (para INDEX + VIEW)
-- ---------------------------------------------------------
DROP TABLE IF EXISTS catalogo_libros;

CREATE TABLE catalogo_libros (
  libro_id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(120) NOT NULL,
  autor  VARCHAR(120) NOT NULL,
  isbn   VARCHAR(20)  NULL UNIQUE,
  anio_publicacion SMALLINT NULL,
  genero ENUM('novela','cuento','poesia','ensayo','tecnico') NOT NULL DEFAULT 'novela',
  creado_en DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) COMMENT='Catálogo de libros disponibles (tabla para INDEX y VIEW)';

INSERT INTO catalogo_libros (titulo, autor, isbn, anio_publicacion, genero) VALUES
('Cien años de soledad','Gabriel García Márquez','978-0307474728',1967,'novela'),
('Clean Code','Robert C. Martin','978-0132350884',2008,'tecnico');

-- Check rápido
SELECT 'OK setup' AS estado;
SHOW TABLES;

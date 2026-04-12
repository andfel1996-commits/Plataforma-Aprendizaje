-- =========================================================
-- 01_modelo_fisico.sql
-- Modelo físico: ejemplo N:N (Usuario - Proyecto)
-- Compatible: MySQL / MariaDB
-- =========================================================

DROP DATABASE IF EXISTS modelacion_demo;
CREATE DATABASE modelacion_demo CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE modelacion_demo;

-- -----------------------------
-- Tabla: usuario (entidad fuerte)
-- -----------------------------
CREATE TABLE usuario (
  usuario_id INT AUTO_INCREMENT PRIMARY KEY,
  nombre     VARCHAR(80) NOT NULL,
  email      VARCHAR(120) NOT NULL UNIQUE
) ENGINE=InnoDB;

-- -----------------------------
-- Tabla: proyecto (entidad fuerte)
-- -----------------------------
CREATE TABLE proyecto (
  proyecto_id INT AUTO_INCREMENT PRIMARY KEY,
  nombre      VARCHAR(120) NOT NULL
) ENGINE=InnoDB;

-- ---------------------------------------------------------
-- Tabla intermedia: usuario_proyecto (resuelve N:N)
-- PK compuesta: evita duplicados (mismo usuario en mismo proyecto)
-- ---------------------------------------------------------
CREATE TABLE usuario_proyecto (
  usuario_id  INT NOT NULL,
  proyecto_id INT NOT NULL,
  rol         VARCHAR(40) NULL,
  PRIMARY KEY (usuario_id, proyecto_id),
  CONSTRAINT fk_up_usuario
    FOREIGN KEY (usuario_id) REFERENCES usuario(usuario_id)
    ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT fk_up_proyecto
    FOREIGN KEY (proyecto_id) REFERENCES proyecto(proyecto_id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- Datos demo
INSERT INTO usuario (nombre, email) VALUES
('Ana', 'ana@mail.com'),
('Juan', 'juan@mail.com');

INSERT INTO proyecto (nombre) VALUES
('Sitio Web'),
('App Móvil');

-- Asignaciones (N:N)
INSERT INTO usuario_proyecto (usuario_id, proyecto_id, rol) VALUES
(1, 1, 'Frontend'),
(1, 2, 'QA'),
(2, 1, 'Backend');

-- Prueba JOIN
SELECT u.nombre AS usuario, p.nombre AS proyecto, up.rol
FROM usuario_proyecto up
JOIN usuario u   ON u.usuario_id = up.usuario_id
JOIN proyecto p  ON p.proyecto_id = up.proyecto_id
ORDER BY u.usuario_id, p.proyecto_id;

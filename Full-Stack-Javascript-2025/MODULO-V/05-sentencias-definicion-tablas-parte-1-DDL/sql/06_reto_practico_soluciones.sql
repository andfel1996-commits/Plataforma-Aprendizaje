-- =========================================================
-- 05_reto_practico_SOLUCION.sql
-- =========================================================

USE ddl_clase05;

-- ---------------------------------------------------------
-- TODO 1 (SOLUCIÓN): CREATE TABLE autores
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS autores (
  autor_id INT AUTO_INCREMENT PRIMARY KEY,
  nombre   VARCHAR(80) NOT NULL,
  pais     VARCHAR(60) NULL,
  -- Si tu motor NO acepta CURDATE() aquí, cambia por CURRENT_DATE
  created_at DATE NOT NULL DEFAULT (CURRENT_DATE)
) COMMENT='Autores del catálogo (tabla de apoyo para practicar FK y ALTER)';

-- Verificación rápida
DESCRIBE autores;


-- ---------------------------------------------------------
-- TODO 2 (SOLUCIÓN): ALTER TABLE catalogo_libros
--  - ADD COLUMN autor_id
--  - ADD FK a autores(autor_id)
-- ---------------------------------------------------------
ALTER TABLE catalogo_libros
  ADD COLUMN autor_id INT NULL;

ALTER TABLE catalogo_libros
  ADD CONSTRAINT fk_libros_autor
  FOREIGN KEY (autor_id) REFERENCES autores(autor_id);

-- Verificación rápida
DESCRIBE catalogo_libros;
SHOW CREATE TABLE catalogo_libros;


-- ---------------------------------------------------------
-- TODO 3 (SOLUCIÓN): ALTER TABLE catalogo_libros
--  - ADD COLUMN isbn
-- ---------------------------------------------------------
ALTER TABLE catalogo_libros
  ADD COLUMN isbn VARCHAR(20) NULL;

DESCRIBE catalogo_libros;


-- ---------------------------------------------------------
-- TODO 4 (SOLUCIÓN): UPDATE + ALTER (MODIFY)
--  - Saneamiento (NULL -> 'SIN-ISBN')
--  - Regla futura (NOT NULL + DEFAULT)
-- ---------------------------------------------------------
UPDATE catalogo_libros
SET isbn = 'SIN-ISBN'
WHERE isbn IS NULL;

ALTER TABLE catalogo_libros
  MODIFY COLUMN isbn VARCHAR(20) NOT NULL DEFAULT 'SIN-ISBN';

DESCRIBE catalogo_libros;


-- ---------------------------------------------------------
-- TODO 0 opcional (ENTREGADO): si NO existe resenas, créala
-- (Esto es para que TODO 5 y 6 tengan sentido en cualquier DB)
-- ---------------------------------------------------------
CREATE TABLE IF NOT EXISTS resenas (
  resena_id INT AUTO_INCREMENT PRIMARY KEY,
  socio_id INT NOT NULL,
  libro_id INT NOT NULL,
  comentario VARCHAR(255) NOT NULL,
  fecha DATE NOT NULL DEFAULT (CURRENT_DATE),
  CONSTRAINT fk_resena_socio FOREIGN KEY (socio_id) REFERENCES socios(socio_id),
  CONSTRAINT fk_resena_libro FOREIGN KEY (libro_id) REFERENCES catalogo_libros(libro_id)
) COMMENT='Reseñas (tabla de apoyo para practicar TRUNCATE y DROP)';


-- ---------------------------------------------------------
-- TODO 5 (SOLUCIÓN): TRUNCATE resenas
-- ---------------------------------------------------------
TRUNCATE TABLE resenas;

SELECT COUNT(*) AS total_resenas FROM resenas;


-- ---------------------------------------------------------
-- TODO 6 (SOLUCIÓN): DROP TABLE resenas
-- ---------------------------------------------------------
DROP TABLE IF EXISTS resenas;


-- ---------------------------------------------------------
-- Verificación final
-- ---------------------------------------------------------
SHOW TABLES;

-- (Opcional) verificaciones
-- DESCRIBE autores;
-- SHOW CREATE TABLE catalogo_libros;

-- =========================================================
-- 02_create_relaciones_pk_fk.sql
-- ---------------------------------------------------------
-- Tema: PK y FK (integridad referencial)
-- Tablas: libros, prestamos
-- =========================================================

USE ddl_clase05;

-- Limpieza (orden importa: primero la hija, luego el padre)
DROP TABLE IF EXISTS prestamos;
DROP TABLE IF EXISTS libros;

-- ---------------------------------------------------------
-- TABLA: libros
-- ---------------------------------------------------------
CREATE TABLE libros (
  libro_id INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(120) NOT NULL,
  autor VARCHAR(120) NOT NULL,
  -- ISBN: identificador de libro (no siempre lo tendremos)
  isbn VARCHAR(20) NULL UNIQUE,
  -- anio_publicacion: año, lo guardamos como SMALLINT
  anio_publicacion SMALLINT NULL,
  -- genero: usamos ENUM por simplicidad didáctica
  genero ENUM('novela','cuento','poesia','ensayo','tecnico') NOT NULL DEFAULT 'novela',
  creado_en DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
) COMMENT='Catálogo de libros disponibles';

-- ---------------------------------------------------------
-- TABLA: prestamos
-- ---------------------------------------------------------
CREATE TABLE prestamos (
  prestamo_id INT AUTO_INCREMENT PRIMARY KEY,

  -- FK a socios
  socio_id INT NOT NULL,

  -- FK a libros
  libro_id INT NOT NULL,

  -- fecha_prestamo: obligatorio
  fecha_prestamo DATE NOT NULL,

  -- fecha_devolucion: puede ser NULL si aún no devuelve
  fecha_devolucion DATE NULL,

  -- Estado simple
  estado ENUM('prestado','devuelto','atrasado') NOT NULL DEFAULT 'prestado',

  -- Definimos las llaves foráneas al final del CREATE (estilo claro)
  CONSTRAINT fk_prestamo_socio
    FOREIGN KEY (socio_id) REFERENCES socios(socio_id),

  CONSTRAINT fk_prestamo_libro
    FOREIGN KEY (libro_id) REFERENCES libros(libro_id)
) COMMENT='Registro de préstamos de libros (relación entre socios y libros)';

-- --------------------------------------------
-- PROBAR: insertamos 2 libros
-- --------------------------------------------
INSERT INTO libros (titulo, autor, isbn, anio_publicacion, genero)
VALUES
('Cien años de soledad', 'Gabriel García Márquez', '978-0307474728', 1967, 'novela'),
('Clean Code', 'Robert C. Martin', '978-0132350884', 2008, 'tecnico');

-- PROBAR: préstamo válido (existe socio_id=1 y libro_id=1 si ejecutaste antes)
INSERT INTO prestamos (socio_id, libro_id, fecha_prestamo)
VALUES (1, 1, '2026-02-01');

-- PROBAR (guiado): préstamo inválido (socio_id no existe) → debería fallar por FK
-- Descomenta para ver el error:
-- INSERT INTO prestamos (socio_id, libro_id, fecha_prestamo)
-- VALUES (999, 1, '2026-02-01');

SELECT * FROM libros;
SELECT * FROM prestamos;

SHOW CREATE TABLE prestamos;

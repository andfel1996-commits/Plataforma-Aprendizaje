-- =========================================================
-- 02_normalizacion_factura.sql
-- Ejemplo de normalización (Factura -> Factura + DetalleFactura)
-- Compatible: MySQL / MariaDB
-- =========================================================

USE modelacion_demo;

-- Tabla Factura (cabecera)
DROP TABLE IF EXISTS detalle_factura;
DROP TABLE IF EXISTS factura;

CREATE TABLE factura (
  factura_id     INT AUTO_INCREMENT PRIMARY KEY,
  paciente_rut   VARCHAR(12) NOT NULL,
  paciente_nombre VARCHAR(120) NOT NULL,
  fecha          DATE NOT NULL
) ENGINE=InnoDB;

-- Tabla DetalleFactura (líneas / grupo repetitivo separado)
CREATE TABLE detalle_factura (
  detalle_id   INT AUTO_INCREMENT PRIMARY KEY,
  factura_id   INT NOT NULL,
  item_nombre  VARCHAR(120) NOT NULL,
  item_tipo    VARCHAR(40) NOT NULL,  -- ej: 'Medicamento' / 'Procedimiento'
  item_valor   DECIMAL(10,2) NOT NULL,
  CONSTRAINT fk_detalle_factura
    FOREIGN KEY (factura_id) REFERENCES factura(factura_id)
    ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB;

-- Datos demo (cabecera)
INSERT INTO factura (paciente_rut, paciente_nombre, fecha)
VALUES ('12.345.678-9', 'María Pérez', '2026-02-13');

-- Datos demo (detalle)
INSERT INTO detalle_factura (factura_id, item_nombre, item_tipo, item_valor)
VALUES
(1, 'Radiografía', 'Procedimiento', 25000.00),
(1, 'Paracetamol', 'Medicamento',  3500.00),
(1, 'Consulta',    'Procedimiento', 15000.00);

-- Consulta final
SELECT f.factura_id, f.paciente_nombre, f.fecha,
       d.item_nombre, d.item_tipo, d.item_valor
FROM factura f
JOIN detalle_factura d ON d.factura_id = f.factura_id
ORDER BY f.factura_id, d.detalle_id;

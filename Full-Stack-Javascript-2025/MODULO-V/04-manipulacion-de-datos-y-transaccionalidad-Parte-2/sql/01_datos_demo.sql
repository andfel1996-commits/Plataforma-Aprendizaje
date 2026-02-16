/*
  01_datos_demo.sql
  ---------------
  Inserta datos para practicar integridad referencial y transacciones.

  Reglas del ejercicio:
  - 3 usuarios iniciales
  - Algunas transacciones en cada tabla hija

  Consejito:
  - Después de ejecutar, haz SELECT para “ver” el estado.
*/

USE alke_wallet_ri;

-- Limpieza (por si ejecutas más de una vez en la misma sesión)
-- IMPORTANTE: borramos primero HIJAS y luego PADRE para no chocar con FKs.
DELETE FROM transacciones_restrict;
DELETE FROM transacciones_cascade;
DELETE FROM transacciones_setnull;
DELETE FROM usuarios;

-- 1) Insertar usuarios (PADRE)
INSERT INTO usuarios (nombre, correo, saldo) VALUES
('Ana',  'ana@demo.cl',  100000.00),
('Bruno','bruno@demo.cl', 50000.00),
('Carla','carla@demo.cl', 25000.00);

-- Verifica usuarios
SELECT * FROM usuarios;

-- 2) Insertar transacciones (HIJAS)
-- Caso RESTRICT
INSERT INTO transacciones_restrict (emisor_id, receptor_id, monto, comentario) VALUES
(1, 2, 10000.00, 'Ana paga a Bruno'),
(2, 3,  5000.00, 'Bruno paga a Carla');

-- Caso CASCADE
INSERT INTO transacciones_cascade (emisor_id, receptor_id, monto, comentario) VALUES
(1, 3, 2000.00, 'Ana paga a Carla (cascade)'),
(3, 2, 1500.00, 'Carla paga a Bruno (cascade)');

-- Caso SET NULL
INSERT INTO transacciones_setnull (emisor_id, receptor_id, monto, comentario) VALUES
(1, 2, 3000.00, 'Ana paga a Bruno (set null)'),
(2, 1,  700.00, 'Bruno paga a Ana (set null)');

-- Verifica transacciones
SELECT * FROM transacciones_restrict;
SELECT * FROM transacciones_cascade;
SELECT * FROM transacciones_setnull;

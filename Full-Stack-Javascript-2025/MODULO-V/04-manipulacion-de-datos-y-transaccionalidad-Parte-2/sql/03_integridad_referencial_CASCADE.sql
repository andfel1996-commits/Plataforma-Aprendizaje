/*
  03_integridad_referencial_CASCADE.sql
  -----------------------------------
  Objetivo: ver el comportamiento CASCADE.

  CASCADE significa:
  - Si borras el PADRE, MySQL borra automáticamente los HIJOS relacionados.

  OJO pedagógico:
  - Es poderoso, pero peligroso si no lo entiendes.
  - En sistemas reales, se usa cuando *de verdad* quieres que al borrar el padre
    se borre todo lo dependiente (por ejemplo: un carrito de compras temporal).
*/

USE alke_wallet_ri;

-- 1) Ver estado antes del DELETE
SELECT * FROM usuarios;
SELECT * FROM transacciones_cascade;

-- 2) ¿Qué filas hijas dependen del usuario 1?
SELECT * FROM transacciones_cascade
WHERE emisor_id = 1 OR receptor_id = 1;

-- 3) Borrar el usuario 1
-- ✅ En CASCADE, esto SI se permite.
DELETE FROM usuarios
WHERE user_id = 1;

-- 4) Verificar efecto
-- Observa:
-- - el usuario 1 ya no está
-- - las transacciones que lo referenciaban desaparecieron
SELECT * FROM usuarios;
SELECT * FROM transacciones_cascade;

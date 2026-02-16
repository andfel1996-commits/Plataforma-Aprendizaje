/*
  04_integridad_referencial_SET_NULL.sql
  ------------------------------------
  Objetivo: ver el comportamiento SET NULL.

  SET NULL significa:
  - Si borras el PADRE, la FK en la tabla HIJA se setea a NULL.

  ¿Cuándo sirve?
  - Cuando quieres “conservar el registro hija” como historial,
    pero “desvincularlo” del padre eliminado.

  REQ: la columna FK debe permitir NULL.
*/

USE alke_wallet_ri;

-- 1) Antes de borrar, mira las transacciones...
SELECT * FROM transacciones_setnull WHERE emisor_id = 1 OR receptor_id = 1;

-- 2) Borrar el usuario 1.
--    En SET NULL, NO debería borrar transacciones: solo deja NULL en la FK.
DELETE FROM usuarios WHERE user_id = 1;

-- 3) Verifica resultado:
--    Esperamos ver NULL en emisor_id o receptor_id en las filas que apuntaban a 1.
SELECT * FROM transacciones_setnull;

-- 4) Verifica usuarios (ya no está el user_id=1)
SELECT * FROM usuarios;

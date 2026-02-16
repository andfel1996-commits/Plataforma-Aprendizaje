/*
  02_integridad_referencial_RESTRICT.sql
  ------------------------------------
  Objetivo: ver el comportamiento RESTRICT.

  RESTRICT (o NO ACTION) significa:
  - "No puedes borrar el PADRE si todavía existen HIJOS que lo referencian".

  Esto evita registros huérfanos.
*/

USE alke_wallet_ri;

-- 1) Ver qué transacciones apuntan al usuario 1 (Ana)
SELECT *
FROM transacciones_restrict
WHERE emisor_id = 1 OR receptor_id = 1;

-- 2) Intentar borrar el usuario 1
--    Esperado: ERROR de FOREIGN KEY (MySQL te protege)
DELETE FROM usuarios
WHERE user_id = 1;

-- 3) Solución 1 (manual y controlada): borrar primero los HIJOS, luego el PADRE
--    Nota: esto es muy común cuando NO quieres CASCADE, y quieres controlar.

START TRANSACTION;

  -- 3.1) Verifica qué vas a borrar (patrón seguro)
  SELECT *
  FROM transacciones_restrict
  WHERE emisor_id = 1 OR receptor_id = 1;

  -- 3.2) Borra las transacciones hijas que dependen de ese usuario
  DELETE FROM transacciones_restrict
  WHERE emisor_id = 1 OR receptor_id = 1;

  -- 3.3) Ahora sí, borra el usuario padre
  DELETE FROM usuarios
  WHERE user_id = 1;

  -- 3.4) Verifica el estado antes de confirmar
  SELECT * FROM usuarios;
  SELECT * FROM transacciones_restrict;

COMMIT;

-- Resultado esperado:
-- - usuario 1 ya no existe
-- - transacciones_restrict relacionadas con el usuario 1 ya no existen

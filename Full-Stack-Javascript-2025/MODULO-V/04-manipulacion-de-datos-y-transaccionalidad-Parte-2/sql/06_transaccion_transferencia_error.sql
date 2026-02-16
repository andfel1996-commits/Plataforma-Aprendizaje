/*
  06_transaccion_transferencia_error.sql
  ------------------------------------
  Objetivo: provocar un error dentro de una transacción para entender ROLLBACK.

  Idea:
  - Intentamos transferir desde Bruno (user_id=2) hacia un receptor que NO existe (user_id=999).
  - El INSERT en la tabla hija falla por integridad referencial (FK).
  - Luego hacemos ROLLBACK para deshacer los UPDATE de saldos.

  IMPORTANTE (didáctico):
  - Si ejecutas esto como “script completo”, tu cliente puede detenerse justo en el error.
  - No pasa nada: el objetivo es ver el error y luego ejecutar ROLLBACK manual.
*/

USE alke_wallet_ri;

SET @emisor   = 2;        -- Bruno
SET @receptor = 999;      -- NO existe
SET @monto    = 1000.00;

-- 0) Ver saldo del emisor antes
SELECT user_id, nombre, saldo
FROM usuarios
WHERE user_id = @emisor;

START TRANSACTION;

-- 1) Descontar saldo del emisor (suponemos que tiene saldo)
UPDATE usuarios
SET saldo = saldo - @monto
WHERE user_id = @emisor;

-- 2) Intentar acreditar al receptor... (pero NO existe, este UPDATE afecta 0 filas)
UPDATE usuarios
SET saldo = saldo + @monto
WHERE user_id = @receptor;

-- 3) Este INSERT FALLA por FOREIGN KEY (receptor_id no existe en usuarios)
--    Espera un error similar a:
--    "Cannot add or update a child row: a foreign key constraint fails"
INSERT INTO transacciones_restrict (emisor_id, receptor_id, monto, comentario)
VALUES (@emisor, @receptor, @monto, 'Transferencia con receptor inexistente');

-- 4) Si por alguna razón tu cliente siguiera (raro), esto guardaría.
--    Pero como debe fallar, NO debería ejecutarse.
COMMIT;

-- 5) En cuanto veas el error, ejecuta:
--    ROLLBACK;

-- 6) Luego verifica que el saldo volvió al valor anterior:
--    SELECT user_id, nombre, saldo FROM usuarios WHERE user_id = 2;

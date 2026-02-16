/*
  05_transaccion_transferencia_ok.sql
  ---------------------------------
  Objetivo: simular una "transferencia" entre usuarios usando una transacción.

  ¿Qué queremos enseñar?
  - Una transferencia NO es 1 sola sentencia: son varias.
  - Si falla una parte, NO queremos quedar con datos “a medias”.
  - Por eso usamos: START TRANSACTION + COMMIT / ROLLBACK.

  Nota: en un curso inicial evitamos procedimientos/IF. Por eso usamos
  un patrón simple con ROW_COUNT() para verificar si el emisor tenía saldo.

  Probado en: MySQL 8+
*/


USE alke_wallet_ri;

-- Parámetros de la transferencia (puedes cambiarlos)
SET @emisor   = 1;        -- Ana
SET @receptor = 2;        -- Bruno
SET @monto    = 8000.00;  -- $ 8.000

-- 0) Ver saldos antes (para comparar)
SELECT user_id, nombre, saldo
FROM usuarios
WHERE user_id IN (@emisor, @receptor);

-- 1) Iniciar la transacción (lo que pase aquí, queda "pendiente" hasta COMMIT)
START TRANSACTION;

-- 2) Descontar saldo al emisor SOLO si tiene saldo suficiente
UPDATE usuarios
SET saldo = saldo - @monto
WHERE user_id = @emisor
  AND saldo >= @monto;

-- 3) Verificar si se actualizó 1 fila
--    Si devuelve 0, significa que NO tenía saldo suficiente.
SELECT ROW_COUNT() AS filas_actualizadas_emisor;

-- ⚠️ IMPORTANTE (para estudiantes):
-- - Si filas_actualizadas_emisor = 0 => ejecuta manualmente:
--     ROLLBACK;
--   y NO sigas con los pasos siguientes.

-- 4) Aumentar saldo del receptor (esto debería afectar 1 fila)
UPDATE usuarios
SET saldo = saldo + @monto
WHERE user_id = @receptor;

-- 5) Registrar la transferencia (tabla hija con RESTRICT)
INSERT INTO transacciones_restrict (emisor_id, receptor_id, monto, comentario)
VALUES (@emisor, @receptor, @monto, 'Transferencia OK (con transacción)');

-- 6) Confirmar cambios (hacerlos permanentes)
COMMIT;

-- 7) Ver saldos después
SELECT user_id, nombre, saldo
FROM usuarios
WHERE user_id IN (@emisor, @receptor);

-- 8) Ver la última transacción insertada
SELECT *
FROM transacciones_restrict
ORDER BY trx_id DESC
LIMIT 1;
-- 1) Iniciar la transacción (lo que pase aquí queda "pendiente" hasta COMMIT)
START TRANSACTION;

-- 2) Descontar saldo al emisor SOLO si tiene saldo suficiente
UPDATE usuarios
SET saldo = saldo - @monto
WHERE user_id = @emisor
  AND saldo >= @monto;

-- 3) Verificar si se actualizó 1 fila (si se actualizó 0, no tenía saldo)
SELECT ROW_COUNT() AS filas_actualizadas_emisor;

-- ⚠️ IMPORTANTE:
-- - Si filas_actualizadas_emisor = 0 => ejecuta: ROLLBACK; y NO sigas.
-- - Si filas_actualizadas_emisor = 1 => puedes continuar.

-- 4) Aumentar saldo del receptor
UPDATE usuarios
SET saldo = saldo + @monto
WHERE user_id = @receptor;

-- 5) Registrar la transferencia (tabla hija con RESTRICT)
INSERT INTO transacciones_restrict (emisor_id, receptor_id, monto, comentario)
VALUES (@emisor, @receptor, @monto, 'Transferencia OK (con transacción)');

-- 6) Confirmar cambios (hacerlos permanentes)
COMMIT;

-- 7) Ver saldos después
SELECT user_id, nombre, saldo
FROM usuarios
WHERE user_id IN (@emisor, @receptor);

-- 8) Ver la última transacción insertada
SELECT *
FROM transacciones_restrict
ORDER BY trx_id DESC
LIMIT 1;
-- IMPORTANTE (para estudiantes):
-- - Si filas_actualizadas_emisor = 0 => el emisor NO tenía saldo suficiente.
--   En ese caso: ejecuta manualmente ROLLBACK; y NO sigas.
-- - Si filas_actualizadas_emisor = 1 => puedes continuar.

-- 4) Aumentar saldo del receptor (esto debería afectar 1 fila)
UPDATE usuarios
SET saldo = saldo + @monto
WHERE user_id = @receptor;

-- 5) Registrar la transferencia (tabla hija con RESTRICT)
INSERT INTO transacciones_restrict (emisor_id, receptor_id, monto, comentario)
VALUES (@emisor, @receptor, @monto, 'Transferencia OK (con transacción)');

-- 6) Confirmar cambios (hacerlos permanentes)
COMMIT;

-- 7) Ver saldos después
SELECT user_id, nombre, saldo
FROM usuarios
WHERE user_id IN (@emisor, @receptor);

-- 8) Ver la última transacción insertada
SELECT *
FROM transacciones_restrict
ORDER BY trx_id DESC
LIMIT 1;
-- 5) Registrar la transferencia (tabla hija con RESTRICT)
INSERT INTO transacciones_restrict (emisor_id, receptor_id, monto, comentario)
VALUES (@emisor, @receptor, @monto, 'Transferencia OK (con transacción)');

-- 6) Confirmar cambios (hacerlos permanentes)
COMMIT;

-- 7) Ver saldos después
SELECT user_id, nombre, saldo
FROM usuarios
WHERE user_id IN (@emisor, @receptor);

-- 8) Ver la última transacción insertada
SELECT *
FROM transacciones_restrict
ORDER BY trx_id DESC
LIMIT 1;

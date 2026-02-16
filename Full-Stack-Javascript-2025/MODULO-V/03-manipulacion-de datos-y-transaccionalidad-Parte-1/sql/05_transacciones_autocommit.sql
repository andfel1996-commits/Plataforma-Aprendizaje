-- 05_transacciones_autocommit.sql
USE alke_wallet;

-- 1) Ver estado de autocommit
SELECT @@autocommit;

-- 2) Desactivar autocommit (los cambios quedan "pendientes")
SET autocommit = 0;

-- 3) Hacer cambios (demo)
INSERT INTO usuarios (nombre, correo, contrasena, saldo)
VALUES ('Usuario Transacción', 'tx@demo.com', '1234', 1000);

UPDATE usuarios
SET saldo = saldo + 9000
WHERE correo = 'tx@demo.com';

-- 4) Verificar antes de decidir
SELECT * FROM usuarios WHERE correo = 'tx@demo.com';

-- 5A) Si todo está bien: CONFIRMAR
-- COMMIT;

-- 5B) Si algo salió mal: DESHACER
ROLLBACK;

-- 6) Verificar que se deshizo
SELECT * FROM usuarios WHERE correo = 'tx@demo.com';

-- 7) Volver a autocommit (buena práctica para no olvidar)
SET autocommit = 1;
SELECT @@autocommit;

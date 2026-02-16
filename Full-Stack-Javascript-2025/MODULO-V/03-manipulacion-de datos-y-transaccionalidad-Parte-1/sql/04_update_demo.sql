-- 04_update_demo.sql
USE alke_wallet;

-- PATRÓN SEGURO: SELECT -> UPDATE

-- 1) Revisar usuarios con saldo bajo
SELECT user_id, nombre, saldo
FROM usuarios
WHERE saldo < 20000;

-- 2) Aumentar saldo a esos usuarios (ejemplo +5000)
UPDATE usuarios
SET saldo = saldo + 5000
WHERE saldo < 20000;

-- 3) Verificar
SELECT * FROM usuarios;

-- Actualizar un correo específico (ejemplo)
SELECT * FROM usuarios WHERE correo = 'juan@example.com';

UPDATE usuarios
SET nombre = 'Juan (Actualizado)'
WHERE correo = 'juan@example.com';

SELECT * FROM usuarios WHERE correo = 'juan@example.com';

-- 02_selects_y_where.sql
USE alke_wallet;

-- Ver usuarios
SELECT * FROM usuarios;

-- Ver monedas
SELECT * FROM monedas;

-- Ver transacciones
SELECT * FROM transacciones;

-- Ejemplos con WHERE (patrón: "primero reviso")
SELECT user_id, nombre, saldo
FROM usuarios
WHERE saldo < 20000;

SELECT transaction_id, sender_user_id, receiver_user_id, valor
FROM transacciones
WHERE valor >= 20000;

-- Un ejemplo de "búsqueda por correo"
SELECT *
FROM usuarios
WHERE correo = 'ana@example.com';

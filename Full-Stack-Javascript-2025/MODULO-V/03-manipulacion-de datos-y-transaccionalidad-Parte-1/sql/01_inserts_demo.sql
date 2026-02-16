-- 01_inserts_demo.sql
USE alke_wallet;

-- Insertar usuarios (AUTO_INCREMENT se encarga de user_id)
INSERT INTO usuarios (nombre, correo, contrasena, saldo, created_at)
VALUES
  ('Juan', 'juan@example.com', '1234', 50000, '2019-12-15'),
  ('Ana', 'ana@example.com', '1234', 120000, '2021-06-10'),
  ('Pedro', 'pedro@example.com', '1234', 8000, '2023-03-05');

-- Insertar monedas (múltiples filas)
INSERT INTO monedas (currency_name, currency_symbol)
VALUES
  ('Peso chileno', 'CLP'),
  ('Dólar', 'USD'),
  ('Euro', 'EUR');

-- Insertar transacciones (referenciando user_id existentes: 1, 2, 3)
INSERT INTO transacciones (sender_user_id, receiver_user_id, valor, transaction_date)
VALUES
  (1, 2, 15000, '2024-10-01 10:00:00'),
  (2, 1, 25000, '2024-10-02 12:30:00'),
  (3, 1, 4000,  '2024-10-03 09:15:00');

-- 00_setup_bd.sql
-- Base de datos y tablas para practicar DML y transacciones (AE3)

DROP DATABASE IF EXISTS alke_wallet;
CREATE DATABASE alke_wallet CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE alke_wallet;

-- Tabla Usuarios
CREATE TABLE usuarios (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(80) NOT NULL,
  correo VARCHAR(120) NOT NULL UNIQUE,
  contrasena VARCHAR(120) NOT NULL,
  saldo DECIMAL(12,2) NOT NULL DEFAULT 0,
  created_at DATE NOT NULL DEFAULT (CURRENT_DATE)
);

-- Tabla Monedas
CREATE TABLE monedas (
  currency_id INT AUTO_INCREMENT PRIMARY KEY,
  currency_name VARCHAR(60) NOT NULL,
  currency_symbol VARCHAR(10) NOT NULL
);

-- Tabla Transacciones
CREATE TABLE transacciones (
  transaction_id INT AUTO_INCREMENT PRIMARY KEY,
  sender_user_id INT NOT NULL,
  receiver_user_id INT NOT NULL,
  valor DECIMAL(12,2) NOT NULL,
  transaction_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT fk_sender FOREIGN KEY (sender_user_id) REFERENCES usuarios(user_id),
  CONSTRAINT fk_receiver FOREIGN KEY (receiver_user_id) REFERENCES usuarios(user_id)
);

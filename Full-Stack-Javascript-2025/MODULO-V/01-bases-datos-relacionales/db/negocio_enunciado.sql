-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 07-02-2026 a las 04:00:54
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET FOREIGN_KEY_CHECKS=0;
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `negocio_enunciado`
--
CREATE DATABASE IF NOT EXISTS `negocio_enunciado` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `negocio_enunciado`;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Clientes`
--

CREATE TABLE `Clientes` (
  `id_cliente` int(11) NOT NULL,
  `nombre` varchar(100) NOT NULL,
  `email` varchar(120) DEFAULT NULL,
  `pais` varchar(60) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `Clientes`
--

INSERT INTO `Clientes` (`id_cliente`, `nombre`, `email`, `pais`) VALUES
(1, 'Ana Pérez', 'ana.perez@mail.com', 'Chile'),
(2, 'Luis Soto', 'luis.soto@mail.com', 'Chile'),
(3, 'María López', 'maria.lopez@mail.com', 'Argentina'),
(4, 'John Smith', 'john.smith@mail.com', 'USA'),
(5, 'Camila Rojas', 'camila.rojas@mail.com', 'Chile'),
(6, 'Diego Fernández', 'diego.fernandez@mail.com', 'Uruguay'),
(7, 'Valentina Díaz', 'valentina.diaz@mail.com', 'Chile'),
(8, 'Pedro González', 'pedro.gonzalez@mail.com', 'Perú'),
(9, 'Sofía Herrera', 'sofia.herrera@mail.com', 'Chile'),
(10, 'Javiera Morales', 'javiera.morales@mail.com', 'Chile'),
(11, 'Carlos Ramírez', 'carlos.ramirez@mail.com', 'México'),
(12, 'Andrea Torres', 'andrea.torres@mail.com', 'Colombia');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `DetalleOrden`
--

CREATE TABLE `DetalleOrden` (
  `id_detalle` int(11) NOT NULL,
  `id_orden` int(11) NOT NULL,
  `id_producto` int(11) NOT NULL,
  `cantidad` int(11) NOT NULL,
  `precio_unitario` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `DetalleOrden`
--

INSERT INTO `DetalleOrden` (`id_detalle`, `id_orden`, `id_producto`, `cantidad`, `precio_unitario`) VALUES
(1, 1, 2, 1, 120.00),
(2, 1, 1, 2, 25.90),
(3, 1, 11, 1, 29.90),
(4, 2, 3, 1, 260.00),
(5, 2, 4, 1, 79.90),
(6, 3, 16, 5, 5.50),
(7, 3, 19, 1, 45.00),
(8, 3, 18, 1, 6.90),
(9, 4, 5, 1, 140.00),
(10, 4, 12, 1, 199.00),
(11, 5, 6, 1, 110.00),
(12, 5, 7, 1, 49.90),
(13, 5, 14, 1, 35.00),
(14, 6, 9, 1, 199.00),
(15, 6, 18, 2, 6.90),
(16, 7, 13, 1, 179.00),
(17, 7, 15, 2, 22.00),
(18, 8, 10, 1, 220.00),
(19, 8, 8, 1, 89.90),
(20, 8, 11, 2, 29.90),
(21, 9, 21, 1, 95.00),
(22, 9, 20, 2, 18.90),
(23, 10, 2, 1, 120.00),
(24, 10, 3, 2, 260.00),
(25, 11, 22, 1, 150.00),
(26, 11, 15, 1, 22.00),
(27, 12, 17, 3, 3.90),
(28, 12, 16, 2, 5.50),
(29, 12, 18, 2, 6.90),
(30, 13, 4, 2, 79.90),
(31, 13, 7, 1, 49.90),
(32, 14, 3, 1, 260.00),
(33, 14, 2, 1, 120.00),
(34, 14, 11, 1, 29.90),
(35, 15, 12, 1, 199.00),
(36, 15, 14, 1, 35.00),
(37, 16, 6, 1, 110.00),
(38, 16, 8, 1, 89.90),
(39, 17, 9, 1, 199.00),
(40, 17, 1, 1, 25.90),
(41, 18, 10, 1, 220.00),
(42, 18, 20, 1, 18.90),
(43, 19, 5, 1, 140.00),
(44, 19, 7, 1, 49.90),
(45, 19, 11, 1, 29.90),
(46, 20, 3, 1, 260.00),
(47, 20, 4, 1, 79.90),
(48, 21, 13, 1, 179.00),
(49, 21, 15, 1, 22.00),
(50, 21, 20, 2, 18.90),
(51, 22, 7, 1, 49.90),
(52, 22, 2, 1, 120.00),
(53, 22, 6, 1, 110.00),
(54, 23, 12, 1, 199.00),
(55, 23, 14, 1, 35.00),
(56, 23, 1, 2, 25.90),
(57, 24, 18, 5, 6.90),
(58, 24, 16, 2, 5.50),
(59, 24, 17, 2, 3.90),
(60, 25, 9, 1, 199.00),
(61, 25, 8, 1, 89.90),
(62, 26, 3, 2, 260.00),
(63, 26, 2, 1, 120.00),
(64, 27, 22, 1, 150.00),
(65, 27, 20, 1, 18.90),
(66, 28, 10, 1, 220.00),
(67, 28, 6, 1, 110.00),
(68, 28, 11, 2, 29.90),
(69, 29, 3, 1, 260.00),
(70, 29, 9, 1, 199.00),
(71, 30, 2, 1, 120.00),
(72, 30, 3, 2, 260.00),
(73, 30, 5, 1, 140.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Ordenes`
--

CREATE TABLE `Ordenes` (
  `id_orden` int(11) NOT NULL,
  `id_cliente` int(11) NOT NULL,
  `fecha` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `Ordenes`
--

INSERT INTO `Ordenes` (`id_orden`, `id_cliente`, `fecha`) VALUES
(1, 1, '2024-01-15'),
(2, 2, '2024-01-20'),
(3, 3, '2023-11-20'),
(4, 4, '2024-02-02'),
(5, 5, '2024-02-10'),
(6, 6, '2024-02-22'),
(7, 7, '2024-03-05'),
(8, 8, '2024-03-18'),
(9, 9, '2024-03-25'),
(10, 10, '2024-04-01'),
(11, 11, '2024-04-12'),
(12, 12, '2024-04-25'),
(13, 1, '2024-05-02'),
(14, 2, '2024-05-10'),
(15, 5, '2024-05-21'),
(16, 7, '2024-06-03'),
(17, 8, '2024-06-18'),
(18, 9, '2024-06-25'),
(19, 10, '2024-07-08'),
(20, 11, '2024-07-20'),
(21, 12, '2024-07-28'),
(22, 1, '2024-08-02'),
(23, 2, '2024-08-15'),
(24, 3, '2024-09-01'),
(25, 4, '2024-09-12'),
(26, 5, '2024-10-05'),
(27, 6, '2024-10-18'),
(28, 7, '2024-11-11'),
(29, 8, '2024-12-01'),
(30, 4, '2024-12-18');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `Productos`
--

CREATE TABLE `Productos` (
  `id_producto` int(11) NOT NULL,
  `nombre` varchar(120) NOT NULL,
  `categoria` varchar(60) NOT NULL,
  `precio` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `Productos`
--

INSERT INTO `Productos` (`id_producto`, `nombre`, `categoria`, `precio`) VALUES
(1, 'Mouse inalámbrico', 'Electrónica', 25.90),
(2, 'Teclado mecánico', 'Electrónica', 120.00),
(3, 'Monitor 27 pulgadas', 'Electrónica', 260.00),
(4, 'Audífonos Bluetooth', 'Electrónica', 79.90),
(5, 'Disco SSD 1TB', 'Electrónica', 140.00),
(6, 'Router WiFi 6', 'Electrónica', 110.00),
(7, 'Webcam HD', 'Electrónica', 49.90),
(8, 'Micrófono USB', 'Electrónica', 89.90),
(9, 'Impresora multifunción', 'Electrónica', 199.00),
(10, 'Tablet 10 pulgadas', 'Electrónica', 220.00),
(11, 'Cargador USB-C 65W', 'Electrónica', 29.90),
(12, 'Silla ergonómica', 'Oficina', 199.00),
(13, 'Escritorio 120cm', 'Oficina', 179.00),
(14, 'Soporte para notebook', 'Oficina', 35.00),
(15, 'Lámpara escritorio LED', 'Oficina', 22.00),
(16, 'Cuaderno universitario', 'Papelería', 5.50),
(17, 'Pack lápices (12)', 'Papelería', 3.90),
(18, 'Resma papel carta', 'Papelería', 6.90),
(19, 'Mochila', 'Accesorios', 45.00),
(20, 'Botella térmica', 'Accesorios', 18.90),
(21, 'Cafetera', 'Hogar', 95.00),
(22, 'Aspiradora', 'Hogar', 150.00);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `Clientes`
--
ALTER TABLE `Clientes`
  ADD PRIMARY KEY (`id_cliente`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indices de la tabla `DetalleOrden`
--
ALTER TABLE `DetalleOrden`
  ADD PRIMARY KEY (`id_detalle`),
  ADD KEY `idx_detalleorden_orden` (`id_orden`),
  ADD KEY `idx_detalleorden_producto` (`id_producto`);

--
-- Indices de la tabla `Ordenes`
--
ALTER TABLE `Ordenes`
  ADD PRIMARY KEY (`id_orden`),
  ADD KEY `fk_ordenes_cliente` (`id_cliente`);

--
-- Indices de la tabla `Productos`
--
ALTER TABLE `Productos`
  ADD PRIMARY KEY (`id_producto`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `DetalleOrden`
--
ALTER TABLE `DetalleOrden`
  MODIFY `id_detalle` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `DetalleOrden`
--
ALTER TABLE `DetalleOrden`
  ADD CONSTRAINT `fk_detalleorden_orden` FOREIGN KEY (`id_orden`) REFERENCES `Ordenes` (`id_orden`),
  ADD CONSTRAINT `fk_detalleorden_producto` FOREIGN KEY (`id_producto`) REFERENCES `Productos` (`id_producto`);

--
-- Filtros para la tabla `Ordenes`
--
ALTER TABLE `Ordenes`
  ADD CONSTRAINT `fk_ordenes_cliente` FOREIGN KEY (`id_cliente`) REFERENCES `Clientes` (`id_cliente`);
SET FOREIGN_KEY_CHECKS=1;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

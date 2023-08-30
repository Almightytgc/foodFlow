-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-08-2023 a las 04:38:04
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.0.28

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `foodflow`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id_producto` int(11) NOT NULL,
  `nombre` varchar(191) NOT NULL,
  `foto` varchar(191) NOT NULL,
  `precio` double NOT NULL,
  `categoria` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id_producto`, `nombre`, `foto`, `precio`, `categoria`) VALUES
(8, 'Té Helado', '/producto/1691702907782.jpg', 2.99, 'Bebidas'),
(9, 'Jugo de naranja', '/producto/1691703094661.jpg', 3.99, 'Bebidas'),
(10, 'Smoothie de sandía', '/producto/1691703267771.jpg', 2.5, 'Bebidas'),
(11, 'Café Helado', '/producto/1691703325562.jpg', 2.75, 'Bebidas'),
(12, 'chocolate caliente', '/producto/1691703440044.jpg', 2.6, 'Bebidas'),
(13, 'Pollo a la Parrilla con Verduras', '/producto/1691703525324.jpg', 6.99, 'Platillo Principal'),
(14, 'Salmón al Horno con Salsa de Eneldo', '/producto/1691703657025.jpg', 8.99, 'Platillo Principal'),
(15, 'Tacos de Pavo', '/producto/1691703758216.jpg', 5.99, 'Platillo Principal'),
(16, 'Pasta Primavera', '/producto/1691703821141.jpg', 5.99, 'Platillo Principal'),
(17, 'Bistec a la Parrilla con Puré de Papas', '/producto/1691703897230.jpg', 6.99, 'Platillo Principal'),
(19, 'Helado', '/producto/1691704712035.jpg', 1.99, 'Postre'),
(21, 'Tiramisú', '/producto/1691704852058.jpg', 3.66, 'Postre'),
(22, 'Cheesecake', '/producto/1691704988173.jpg', 3.66, 'Postre'),
(42, 'Chonguenga', '/producto/1691893885509.jpeg', 0.99, 'Entradas');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id_producto`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id_producto` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=47;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

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
(13, 'Pollo a la Parrilla con Verduras', '/producto/1691703525324.jpg', 6.99, 'Platillo Principal'),
(14, 'Salmón al Horno con Salsa de Eneldo', '/producto/1691703657025.jpg', 8.99, 'Platillo Principal'),
(16, 'Pasta Primavera', '/producto/1691703821141.jpg', 5.99, 'Platillo Principal'),
(19, 'Helado', '/producto/1691704712035.jpg', 1.99, 'Postre'),
(21, 'Tiramisú', '/producto/1691704852058.jpg', 3.66, 'Postre'),
(44, 'Papas fritas', '/producto/1694116094280.jpg', 2.49, 'Entradas'),
(45, 'Arrollados de primavera', '/producto/1694115322440.jpg', 2.99, 'Entradas'),
(48, 'Nachos con queso, chile y guacamale', '/producto/1694115702571.jpg', 2.5, 'Entradas'),
(49, 'Sopa de verduras', '/producto/1694115835593.jpg', 3.25, 'Entradas'),
(50, 'Canapés', '/producto/1694115898119.jpg', 1.99, 'Entradas'),
(51, 'Canelones con salchicha y queso', '/producto/1694116050114.jpg', 1.5, 'Entradas'),
(52, 'Hamburguesa americana', '/producto/1694116281036.jpg', 5.85, 'Platillo Principal'),
(53, 'Pizza', '/producto/1694116334661.jpg', 7.99, 'Platillo Principal'),
(54, 'Salmón a la plancha', '/producto/1694116414788.jpg', 6, 'Platillo Principal'),
(55, 'Pechugas de pollo a la parmesana', '/producto/1694116668460.jpg', 6.99, 'Platillo Principal'),
(57, 'Medallones de cerdo', '/producto/1694116784915.jpg', 7.49, 'Platillo Principal'),
(58, 'Sandwich de queso', '/producto/1694116877108.jpg', 2.99, 'Entradas'),
(59, 'Tarta de queso', '/producto/1694116960504.jpg', 2.5, 'Postre'),
(60, 'Arroz con leche', '/producto/1694116993708.jpg', 3, 'Postre'),
(61, 'Tarta de chocolate ', '/producto/1694117042915.jpg', 1.5, 'Postre'),
(62, 'Donas', '/producto/1694117074725.jpg', 1.99, 'Postre'),
(63, 'Galletas con chispas', '/producto/1694117241234.jpg', 1.99, 'Postre'),
(67, 'Té helado', '/producto/1694117691958.jpg', 2.49, 'Bebidas'),
(68, 'Jugo de naranja', '/producto/1694117754992.jpg', 1.75, 'Bebidas'),
(69, 'Smoothie', '/producto/1694117796209.webp', 2.5, 'Bebidas'),
(70, 'Chocolate caliente', '/producto/1694117909880.jpg', 2.5, 'Bebidas'),
(71, 'Café caliente', '/producto/1694117971728.jpg', 3.15, 'Bebidas'),
(72, 'Bebidas gaseosas', '/producto/1694118026591.jfif', 1.75, 'Bebidas'),
(73, 'Café helado', '/producto/1694118102129.jpg', 2.25, 'Bebidas');

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

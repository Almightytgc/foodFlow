-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-08-2023 a las 04:24:23
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
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `nombres` varchar(191) NOT NULL,
  `apellidos` varchar(191) NOT NULL,
  `telefono` varchar(191) NOT NULL,
  `correo` varchar(191) NOT NULL,
  `usuario` varchar(191) NOT NULL,
  `contrasenia` varchar(191) NOT NULL,
  `preguntaSeguridad` varchar(191) DEFAULT NULL,
  `respuestaSeguridad` varchar(191) DEFAULT NULL,
  `salario` double DEFAULT NULL,
  `fk_rol` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nombres`, `apellidos`, `telefono`, `correo`, `usuario`, `contrasenia`, `preguntaSeguridad`, `respuestaSeguridad`, `salario`, `fk_rol`) VALUES
(53, 'Juan Manuel', 'Flores Crisóstomo', '56321489', 'admin@cdb.edu.sv', 'almightytgc', '$2b$10$VfG30aIm1MffBUjBzo08Q.cJiUocrnFpXsW.229LcS7so6gVUwpK2', '¿En qué hospital naciste?', '$2b$10$uNbLEjiFU5Q9SdxYyF2Deex9Wl4BkHhl9gzYjmEXaikGjxKJapUqS', 1500, 4),
(83, 'cliente', 'cliente', '78964523', 'cliente@cliente', 'cliente', '$2b$10$3UrAMuqk5oY.L2YmdYFLrOJhecziPsTUalfnQF8bouhFUjrQAh7mm', '¿En qué hospital naciste?', '$2b$10$Cvdqcb7dFtsnklxfxiQ46OjRjwi.0I9B9UpMLT/.er6lYfVf4HXAy', NULL, 1),
(84, 'mesero', 'mesero', '45698712', 'mesero@mesero', 'mesero', '$2b$10$BYTkC/yvUIFRtbgnNfdDCOhXa5hXWW3fk8sXsFcTWeRpnAwL3xurO', '¿En qué hospital naciste?', '$2b$10$eJDV3PcHP5jSgongCJqBz.SHy7mMR.bph7WTKyGuI0nfDQF3LS2sS', 1500, 2),
(85, 'Amilcar', 'Guevara', '233123', 'amilcar@gmail.com', 'amilcar123', '$2b$10$N9sBCiSygqlFLzevCL4qdO8s8nMAwtYZPpE/jl0VHTz6HXafZQRsq', '¿Cuál es tu personaje histórico favorito?', '$2b$10$HuYHi28DqTqknKazSO8p5eb5WCMOyNm/4Y5LtmBDFYVgpHBCXYdo6', NULL, 1),
(86, 'chef', 'chef', '879654532', 'chef@chef', 'chef', '$2b$10$JhqOXHhZJqLkuy53YtyFOu3Sy7C1TKOQ2HqnOZRFCbwmU.iF7dmp2', NULL, NULL, 800, 3);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`),
  ADD KEY `usuarios_fk_rol_fkey` (`fk_rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=87;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_fk_rol_fkey` FOREIGN KEY (`fk_rol`) REFERENCES `rol` (`id_rol`) ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-10-2024 a las 05:10:30
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `gestor_project`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyectos`
--

CREATE TABLE `proyectos` (
  `id` int(11) NOT NULL,
  `nombre_proyecto` varchar(100) DEFAULT NULL,
  `fecha_inicio` date DEFAULT NULL,
  `fecha_fin_estimada` date DEFAULT NULL,
  `fecha_fin_real` date DEFAULT NULL,
  `descripcion` text DEFAULT NULL,
  `estado` varchar(50) DEFAULT 'Nuevo',
  `fecha_creacion` date DEFAULT NULL,
  `usuario_asignado` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `proyectos`
--

INSERT INTO `proyectos` (`id`, `nombre_proyecto`, `fecha_inicio`, `fecha_fin_estimada`, `fecha_fin_real`, `descripcion`, `estado`, `fecha_creacion`, `usuario_asignado`) VALUES
(1, 'PROYECTO PRUEBA 1', '0000-00-00', '0000-00-00', '0000-00-00', 'PROYECTO DE PRUEBA 1', 'Nuevo', '0000-00-00', NULL),
(3, 'Prueba 2', '2024-10-09', '2024-10-15', NULL, 'Prueba de proyecto 2', 'Nuevo', '2024-10-06', 'Decc'),
(4, 'Proyecto 2', '2024-10-07', '2024-10-09', '2024-10-09', 'PProyecto 2', 'En desarrollo', '2024-10-06', 'Deyna'),
(5, 'Proyecto 3', '2024-10-07', '2024-10-14', NULL, 'Proyecto 3', 'Nuevo', '2024-10-06', 'Deyna'),
(7, 'Prueba del Video', '2024-10-06', '2024-10-06', '2024-10-06', 'Este es un proyecto para prueba del video', 'Pruebas QA', '2024-10-07', 'Deyna');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tareas`
--

CREATE TABLE `tareas` (
  `id` int(11) NOT NULL,
  `nombre_tarea` varchar(255) NOT NULL,
  `nombre_proyecto` varchar(255) NOT NULL,
  `usuario_asignado` varchar(255) DEFAULT NULL,
  `fecha_inicio` date NOT NULL,
  `comentario` text DEFAULT NULL,
  `id_proyecto` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tareas`
--

INSERT INTO `tareas` (`id`, `nombre_tarea`, `nombre_proyecto`, `usuario_asignado`, `fecha_inicio`, `comentario`, `id_proyecto`) VALUES
(1, 'boton', 'Proyecto 2', 'Luna', '2024-10-06', 'Boton', 4),
(2, 'Agregar boton terminado', 'Proyecto 2', 'Luna', '2024-10-06', 'Agreaga el boton terminado', 4),
(3, 'Prueba', 'Prueba 2', 'Nico', '2024-10-06', 'Prueba', 3),
(4, 'Grabar el video', 'Prueba del Video', 'Luna', '2024-10-06', 'Se tiene que grabar el video presentación', 7);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(200) DEFAULT NULL,
  `user` varchar(200) DEFAULT NULL,
  `password` varchar(200) DEFAULT NULL,
  `email` varchar(200) DEFAULT NULL,
  `role` varchar(100) DEFAULT 'usuario',
  `estado` int(11) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `user`, `password`, `email`, `role`, `estado`) VALUES
(1, 'usuario', 'usuario', 'usuario12345', 'usuario@gmail.com', 'usuario', 1),
(2, 'admin', 'admin', 'admin123', 'admin@gmail.com', 'admin', 1),
(3, 'gerente', 'gerente', 'gerente123', 'gerente@gmail.com', 'gerente', 1),
(4, 'Decc', 'Decc', 'Decc123', 'decc@gmail.com', 'usuario', 1),
(5, 'Nico', 'nico', 'nico123', 'nico@gmail.com', 'usuario', 1),
(7, 'Luna', 'luna', 'luna123', 'luna@gmail.com', 'usuario', 1),
(8, 'Deyna', 'deyna', 'Deyna123', 'deyna@gmail.com', 'gerente', 1),
(9, 'Emmanuel', 'Emma', 'Emma123', 'Emmanuel@gmail.com', 'admin', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `proyectos`
--
ALTER TABLE `proyectos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tareas`
--
ALTER TABLE `tareas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_proyecto` (`id_proyecto`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `proyectos`
--
ALTER TABLE `proyectos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT de la tabla `tareas`
--
ALTER TABLE `tareas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `tareas`
--
ALTER TABLE `tareas`
  ADD CONSTRAINT `tareas_ibfk_1` FOREIGN KEY (`id_proyecto`) REFERENCES `proyectos` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

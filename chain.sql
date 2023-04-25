-- phpMyAdmin SQL Dump
-- version 5.3.0-dev+20230112.05c5217976
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Tempo de geração: 13-Jan-2023 às 13:52
-- Versão do servidor: 10.4.24-MariaDB
-- versão do PHP: 8.1.5

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Banco de dados: `chain`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `categoria`
--

CREATE TABLE `categoria` (
  `id` int(11) NOT NULL,
  `userName` varchar(255) DEFAULT NULL,
  `category` text DEFAULT NULL,
  `color` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `categoria`
--

INSERT INTO `categoria` (`id`, `userName`, `category`, `color`, `createdAt`, `updatedAt`) VALUES
(11, 'Teste', 'Categoria 2', '#ff7c75', '2022-11-24 21:57:58', '2022-11-24 21:57:58'),
(16, 'Kaue', 'Categoria', '#ff873d', '2022-11-24 22:25:51', '2022-11-24 22:25:51'),
(17, 'João', '7666', '#f04343', '2022-11-25 01:42:05', '2022-11-25 01:42:05'),
(18, 'João', '7666u3773', '#f04343', '2022-11-25 01:42:17', '2022-11-25 01:42:17'),
(19, 'João', '7666u3773uuu', '#f04343', '2022-11-25 01:42:20', '2022-11-25 01:42:20');

-- --------------------------------------------------------

--
-- Estrutura da tabela `links`
--

CREATE TABLE `links` (
  `id` int(11) NOT NULL,
  `userName` varchar(255) DEFAULT NULL,
  `title` text DEFAULT NULL,
  `link` text DEFAULT NULL,
  `categories` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `links`
--

INSERT INTO `links` (`id`, `userName`, `title`, `link`, `categories`, `createdAt`, `updatedAt`) VALUES
(16, 'Teste', 'The Chain - Fleetwood Mac', 'https://youtu.be/JDG2m5hN1vo', 'Categoria 1,Categoria 2', '2022-11-24 22:05:28', '2022-11-24 22:05:28'),
(17, 'Teste', 'Twitter', 'www.twitter.com', 'Categoria 2', '2022-11-24 22:06:32', '2022-11-24 22:18:27'),
(20, 'Kaue', 'Google', 'www.google.com', 'Categoria', '2022-11-24 22:30:04', '2022-11-24 22:30:04'),
(21, 'João', 'Jehe', 'Ue773', '7666', '2022-11-25 01:42:50', '2022-11-25 01:42:50');

-- --------------------------------------------------------

--
-- Estrutura da tabela `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Extraindo dados da tabela `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20221120191247-create-link.js'),
('20221120191322-create-categoria.js'),
('20221120191339-create-usuario.js');

-- --------------------------------------------------------

--
-- Estrutura da tabela `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Extraindo dados da tabela `usuarios`
--

INSERT INTO `usuarios` (`id`, `name`, `email`, `password`, `createdAt`, `updatedAt`) VALUES
(1, 'Gabriel', 'gabriel_deodato@hotmail.com', '21deodato@', '2022-11-23 22:30:52', '2022-11-23 22:30:52'),
(13, 'Teste', 'teste123@gmail.com', 'teste', '2022-11-24 21:55:48', '2022-11-24 21:55:48'),
(18, 'Hxhdheueu', 'uuuuhuuuuu', 'u7r7474', '2022-11-25 01:41:01', '2022-11-25 01:41:01'),
(19, 'João', 'joaopepeudro@gmail.com', '254960', '2022-11-25 01:41:22', '2022-11-25 01:41:22');

--
-- Índices para tabelas despejadas
--

--
-- Índices para tabela `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `links`
--
ALTER TABLE `links`
  ADD PRIMARY KEY (`id`);

--
-- Índices para tabela `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Índices para tabela `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`,`name`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT de tabelas despejadas
--

--
-- AUTO_INCREMENT de tabela `categoria`
--
ALTER TABLE `categoria`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de tabela `links`
--
ALTER TABLE `links`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT de tabela `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

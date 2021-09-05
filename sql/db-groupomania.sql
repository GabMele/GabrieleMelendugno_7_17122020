-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le : dim. 05 sep. 2021 à 04:42
-- Version du serveur : 10.4.20-MariaDB
-- Version de PHP : 8.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `db-groupomania`
--

-- --------------------------------------------------------

--
-- Structure de la table `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `comment` varchar(256) NOT NULL,
  `status` tinyint(1) DEFAULT NULL,
  `postId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `comments`
--

INSERT INTO `comments` (`id`, `comment`, `status`, `postId`, `userId`, `createdAt`, `updatedAt`) VALUES
(7, 'Salut, uid5 pid20 bis mon commentaire !', 0, 20, 5, '2021-08-29 14:42:42', '2021-08-30 14:42:42'),
(11, 'Salut, uid4 pid16 bis mon commentaire !', 0, 16, 4, '2021-08-29 14:46:36', '2021-08-29 14:46:36'),
(12, 'Salut, uuu uid4 pid16 bis mon commentaire !', 0, 16, 4, '2021-08-29 14:58:01', '2021-08-29 14:58:01'),
(13, 'Saluttttt mon commentaire !', 0, 16, 4, '2021-09-03 19:12:20', '2021-09-03 19:12:20'),
(15, 'Saluttttt mon commentaire !', 0, 27, 16, '2021-09-03 20:09:32', '2021-09-03 20:09:32'),
(16, 'eeee', 0, 27, 16, '2021-09-03 20:24:59', '2021-09-03 20:24:59'),
(17, 'aazzaa', 0, 27, 16, '2021-09-03 20:27:33', '2021-09-03 20:27:33'),
(19, 'nnn', 0, 27, 16, '2021-09-03 20:30:11', '2021-09-03 20:30:11'),
(20, 'yyuuyy', 0, 27, 16, '2021-09-03 20:40:59', '2021-09-03 20:40:59'),
(21, 'vaaall', 0, 25, 16, '2021-09-03 20:41:28', '2021-09-03 20:41:28'),
(22, 'tttyyyy', 0, 24, 16, '2021-09-03 20:41:43', '2021-09-03 20:41:43'),
(28, 'Saluttttt mon commentaire de postman !', 0, 27, 16, '2021-09-04 09:59:39', '2021-09-04 09:59:39'),
(29, 'fdsq', 0, 28, 17, '2021-09-04 10:26:03', '2021-09-04 10:26:03'),
(30, 'comment à post noad', 0, 28, 17, '2021-09-04 10:26:24', '2021-09-04 10:26:24'),
(31, 'ggg c', 1, 26, 16, '2021-09-04 10:26:44', '2021-09-04 10:26:44'),
(32, 'comm 1 test new post web', 1, 24, 16, '2021-09-04 10:27:11', '2021-09-04 10:27:11'),
(33, 'comment de noad', 0, 28, 17, '2021-09-04 10:31:50', '2021-09-04 10:31:50'),
(34, 'comm de nonadmin a pippi', 0, 24, 16, '2021-09-04 10:40:04', '2021-09-04 10:40:04'),
(35, 'comm de nonadmin a pippi', 0, 24, 16, '2021-09-04 10:40:26', '2021-09-04 10:40:26'),
(36, 'comment de uu 4 ad à nonadmin p29', 0, 29, 17, '2021-09-04 10:51:03', '2021-09-04 10:51:03'),
(37, 'comment Bis de uu 4 ad à nonadmin p29', 0, 29, 17, '2021-09-04 10:51:57', '2021-09-04 10:51:57'),
(42, 'comment de Uu 4 ad à uu 4 ad', 0, 30, 4, '2021-09-04 11:24:25', '2021-09-04 11:24:25'),
(47, 'Saluttttt mon commentaire de postman !', 0, 27, 16, '2021-09-04 11:30:00', '2021-09-04 11:30:00'),
(52, 'Comm postman a post19 u4!', 0, 19, 4, '2021-09-04 11:43:37', '2021-09-04 11:43:37'),
(53, 'Comm postman a post19 u4!', 0, 28, 17, '2021-09-04 11:44:01', '2021-09-04 11:44:01'),
(58, 'Comm postman a post19 u4!', 0, 30, 4, '2021-09-04 11:57:14', '2021-09-04 11:57:14'),
(59, 'Comm postman a post19 u4!', 0, 27, 16, '2021-09-04 11:57:41', '2021-09-04 11:57:41'),
(61, 'Comm postman a post19 u4!', 0, 26, 16, '2021-09-04 11:58:25', '2021-09-04 11:58:25'),
(62, 'Comm u4 p16', 0, 16, 4, '2021-09-04 11:59:29', '2021-09-04 11:59:29'),
(65, 'Comm u4 p16', 0, 29, 17, '2021-09-04 12:01:46', '2021-09-04 12:01:46'),
(66, 'Comm u4 p16', 0, 28, 17, '2021-09-04 12:03:06', '2021-09-04 12:03:06'),
(70, 'Comm u4 p16', 0, 29, 17, '2021-09-04 12:23:09', '2021-09-04 12:23:09'),
(72, 'Comm u16 p26', 0, 26, 16, '2021-09-04 12:24:54', '2021-09-04 12:24:54'),
(75, 'Comm u16 p26', 0, 26, 16, '2021-09-04 12:31:45', '2021-09-04 12:31:45'),
(85, 'Comm u u u16 p26', 0, 26, 16, '2021-09-04 13:33:19', '2021-09-04 13:33:19'),
(87, 'Comm u u u16 p26', 0, 26, 16, '2021-09-04 13:36:59', '2021-09-04 13:36:59'),
(91, 'ff', 0, 0, 0, '2021-09-04 13:43:25', '2021-09-04 13:43:25'),
(92, 'qqq', 0, 0, 0, '2021-09-04 13:43:36', '2021-09-04 13:43:36'),
(93, 'Comm u u u16 p26', 0, 0, 0, '2021-09-04 13:45:17', '2021-09-04 13:45:17'),
(94, 'Comm u u u16 p26', 1, 0, 0, '2021-09-04 13:45:24', '2021-09-04 13:45:24'),
(95, 'zzz', 1, 0, 0, '2021-09-04 13:45:37', '2021-09-04 13:45:37'),
(96, 'wqw', 0, 0, 0, '2021-09-04 13:46:23', '2021-09-04 13:46:23'),
(97, 'c u4 p4', 0, 31, 4, '2021-09-04 13:49:53', '2021-09-04 13:49:53'),
(98, 'c 4 p17', 0, 29, 4, '2021-09-04 13:50:19', '2021-09-04 13:50:19'),
(99, 'noad c17 su p16 di u4', 0, 16, 17, '2021-09-04 13:51:53', '2021-09-04 13:51:53'),
(100, 'c di u4 su p16 di u4', 0, 16, 4, '2021-09-04 13:53:33', '2021-09-04 13:53:33'),
(101, ' c di u4 su p17 di u17', 0, 29, 4, '2021-09-04 13:54:06', '2021-09-04 13:54:06'),
(102, 'c di U4 su P29 di u17', 0, 29, 4, '2021-09-04 13:55:40', '2021-09-04 13:55:40'),
(103, 'c di u17 su p29 di u17', 0, 29, 17, '2021-09-04 13:56:30', '2021-09-04 13:56:30'),
(104, 'c di u17 su p24 di u16', 1, 24, 17, '2021-09-04 13:57:36', '2021-09-04 13:57:36'),
(105, 'c di u4 su p31 di u4', 0, 31, 4, '2021-09-04 14:09:42', '2021-09-04 14:09:42'),
(107, 'Jolie ! Merci, ça va aider nous détendre et nous sentir mieux ! ', 1, 49, 4, '2021-09-04 17:26:25', '2021-09-05 02:21:18'),
(108, 'comm de u4', 0, 16, 4, '2021-09-05 02:13:51', '2021-09-05 02:13:51'),
(109, 'comm de u4', 1, 16, 4, '2021-09-05 02:14:07', '2021-09-05 02:14:07');

-- --------------------------------------------------------

--
-- Structure de la table `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `post` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `imageUrl` varchar(255) DEFAULT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `posts`
--

INSERT INTO `posts` (`id`, `post`, `status`, `imageUrl`, `userId`, `createdAt`, `updatedAt`) VALUES
(16, 'p16 de u4', 1, NULL, 4, '2021-08-29 14:06:59', '2021-08-29 14:06:59'),
(17, 'Salut, user5 post17', 0, NULL, 5, '2021-08-29 14:07:00', '2021-09-03 11:19:22'),
(19, 'Salut, user4 post19 !', 0, NULL, 4, '2021-08-29 14:15:10', '2021-09-03 10:50:06'),
(20, 'Salut, p20 u5', 1, NULL, 5, '2021-08-29 14:15:15', '2021-09-03 10:49:08'),
(21, 'Salut, user6 post21', 1, NULL, 6, '2021-08-29 14:15:26', '2021-08-29 14:15:26'),
(24, 'test de u16 p24 web', 1, NULL, 16, '2021-09-03 16:59:11', '2021-09-03 16:59:58'),
(25, 'u 16 p25 non valide', 0, NULL, 16, '2021-09-03 18:02:00', '2021-09-03 18:02:00'),
(26, 'autre de 16', 0, NULL, 16, '2021-09-03 19:33:54', '2021-09-03 19:33:54'),
(27, 'post de 16', 0, NULL, 16, '2021-09-03 19:35:22', '2021-09-03 19:35:22'),
(28, 'post de noad 17 non validé', 0, NULL, 17, '2021-09-04 09:51:24', '2021-09-04 09:51:24'),
(29, 'post de 17 validé', 1, NULL, 17, '2021-09-04 10:41:29', '2021-09-04 10:41:46'),
(30, 'post de Uu 4 ad', 0, NULL, 4, '2021-09-04 11:24:07', '2021-09-04 11:24:07'),
(31, 'post 2 de 4 ad', 0, NULL, 4, '2021-09-04 11:26:40', '2021-09-04 11:26:40'),
(42, 'test de u16 non ad', 0, NULL, 16, '2021-09-04 15:46:55', '2021-09-04 15:46:55'),
(43, 'test image de u16', 1, NULL, 16, '2021-09-04 15:49:36', '2021-09-04 15:49:36'),
(44, 'test imageurl u16', 0, NULL, 16, '2021-09-04 15:52:01', '2021-09-04 15:52:01'),
(46, 'postman user6 p', 0, NULL, 16, '2021-09-04 15:53:35', '2021-09-04 15:53:35'),
(47, 'postman user6 p', 1, 'https://images.freeimages.com/images/large-previews/1ad/tractor-2-1386664.jpg', 16, '2021-09-04 15:55:07', '2021-09-04 15:55:07'),
(48, 'postman user6 p', 0, 'https://images.freeimages.com/images/large-previews/7e6/mediterranean-food-1311330.jpg', 16, '2021-09-04 15:55:44', '2021-09-04 15:55:44'),
(49, 'test u16 imageurl', 1, 'https://cdn.pixabay.com/photo/2021/08/25/20/42/field-6574455_960_720.jpg', 16, '2021-09-04 15:56:13', '2021-09-04 17:24:49');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(40) DEFAULT NULL,
  `email` varchar(62) NOT NULL,
  `password` varchar(62) NOT NULL,
  `admin` tinyint(1) NOT NULL,
  `status` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `admin`, `status`, `createdAt`, `updatedAt`) VALUES
(4, 'user4 ad1 uu@uu.uu', 'uu@uu.uu', '$2b$10$YSM56AT7ECnc1UWMTS/XI.h34EMnAul7VahohE7BTz6BsG91PzvpS', 1, 1, '2021-08-25 20:47:37', '2021-08-25 20:47:37'),
(5, 'uu2 5 ad', '2uu@uu.uu', '$2b$10$4KEksv864W8bjsegP3Rf1es/9KiGqg7UhakQqi3Zj9NBWFu6T0Zqm', 1, 1, '2021-08-25 21:00:22', '2021-08-25 21:00:22'),
(6, 'uu3 6 ad', '3uu@uu.uu', '$2b$10$iQdJfJk3b.Sj/H0TnpuCnut6SHDmkAgl6d1CWW6qESN5ZGhWW9agK', 1, 0, '2021-08-25 21:20:24', '2021-08-25 21:20:24'),
(7, 'u7 ad1', '4uu@uu.uu', '$2b$10$cQAIW84sNtRolP1EoE2hV.Fhd6iVX5I2LYQh4uxMJycli2lb2Xu7y', 0, 1, '2021-08-28 12:05:01', '2021-09-05 02:08:01'),
(10, 'Pippo ad', 'oo@oo.oo', '$2b$10$O7JsHYhuTl2tVvHcSDJf8eOPO/BWJdFm2YDS5kQZmpCwym8o33SHC', 1, 1, '2021-08-31 12:56:59', '2021-08-31 12:56:59'),
(16, 'Gab NON ad', 'yy1@yy.yy', '$2b$10$xPy8tjNjfwFOgALBtm4kO.K10TR/s1ymvSkcJc8sFp8XOxdGtotXu', 0, 0, '2021-09-01 20:26:09', '2021-09-05 02:08:11'),
(17, 'Noad NON admin', 'noad@noad.noad', '$2b$10$mqzIZCONGyGl3JiB7sGHIepBFnBQMT6VpZBsp24xm9ZXbegPRyI8W', 0, 0, '2021-09-04 09:22:15', '2021-09-05 01:52:45');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`,`postId`) USING BTREE;

--
-- Index pour la table `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`,`userId`);

--
-- Index pour la table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `mail_UNIQUE` (`email`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=110;

--
-- AUTO_INCREMENT pour la table `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=50;

--
-- AUTO_INCREMENT pour la table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `fk_posts_users` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

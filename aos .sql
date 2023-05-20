-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : dim. 21 mai 2023 à 00:55
-- Version du serveur : 5.7.36
-- Version de PHP : 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `aos`
--

-- --------------------------------------------------------

--
-- Structure de la table `carts`
--

DROP TABLE IF EXISTS `carts`;
CREATE TABLE IF NOT EXISTS `carts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `price` float NOT NULL,
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `product_id` (`product_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `carts`
--

INSERT INTO `carts` (`id`, `user_id`, `product_id`, `price`) VALUES
(2, 11, 2, 22);

-- --------------------------------------------------------

--
-- Structure de la table `products`
--

DROP TABLE IF EXISTS `products`;
CREATE TABLE IF NOT EXISTS `products` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `description` varchar(255) NOT NULL,
  `price` float NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `products`
--

INSERT INTO `products` (`id`, `title`, `description`, `price`) VALUES
(2, 'Watch', 'watch rolex', 1000),
(3, 'Iphone', 'iphone 11 pro batter ystate 90%', 10.3),
(6, 'Monitor', 'reddragon screen', 22),
(11, 'Laptop ', 'laptop hp RTX 3050', 2000);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nom` varchar(255) NOT NULL,
  `prenom` varchar(255) NOT NULL,
  `email` varchar(255) DEFAULT NULL,
  `cin` int(11) NOT NULL,
  `password` varchar(255) NOT NULL,
  `genre` varchar(255) NOT NULL,
  `role` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `cin` (`cin`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `nom`, `prenom`, `email`, `cin`, `password`, `genre`, `role`) VALUES
(11, 'waliid', 'wg', 'wg@gmail.com', 14007649, '$2b$10$5DFc3MHaK2gIYQagMF8k2OTNN9YKpuZeXYGw6fklDzukIg8Yka89S', 'homme', 1),
(16, 'Welid', 'wg', 'walidgueddari1899@gmail.com', 11223344, '$2b$10$JMIDAP4yugjuPFc5fJpju.fC0PB8jFd9h1K6a9SunyKfnY36reQX2', 'male', 0),
(17, 'Welid', 'wg', 'wago@live.fr', 111111111, '$2b$10$OFLo.z0N1l9K1D.mzBD68.3oppDEifOkeE7vnVEt10EfEavP6BUHa', 'male', 1),
(18, 'asma', 'asma', 'welid.wg@outlook.com', 333333, '$2b$10$srfLgEfOVRDms6JCmDyL9eF6Wtd./koeqlA0o83LZ7MjtMOOTe20C', 'female', 1),
(19, 'sss', 'zzz', 'tes@gmail.com', 111111, '$2b$10$iQyzBcOSHg5QXJHbmk/UnO1EiV43KcK9BT86.sEr3iZAYONEBBlqy', 'male', 1),
(20, 'ahmed ', 'ben ali', 'walid.gueddari@polytechnicien.tn', 12123232, '$2b$10$FwgGihPzhGSqRhQYKlkTF.7f2/03Psr3GLFpxq.1cjoVGJObvSbEO', 'male', 1);

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `carts`
--
ALTER TABLE `carts`
  ADD CONSTRAINT `carts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `carts_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

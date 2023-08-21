-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Jul 07, 2023 at 07:27 AM
-- Server version: 8.0.31
-- PHP Version: 8.0.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fleet management system`
--

-- --------------------------------------------------------

--
-- Table structure for table `driver`
--

DROP TABLE IF EXISTS `driver`;
CREATE TABLE IF NOT EXISTS `driver` (
  `id` varchar(55) NOT NULL,
  `name` varchar(100) NOT NULL,
  `mobile` bigint NOT NULL,
  `license_no` varchar(55) NOT NULL,
  `license_exp` date NOT NULL,
  `joining_date` date NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `mobile` (`mobile`),
  UNIQUE KEY `license_no` (`license_no`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `driver`
--

INSERT INTO `driver` (`id`, `name`, `mobile`, `license_no`, `license_exp`, `joining_date`, `status`) VALUES
('a6d5166b86b328e4055e', 'amir khan', 1234567890, 'FAF798FSAF', '2023-07-10', '2023-07-04', 1),
('2a39936800b8132a85b1', 'khalil', 1234567899, 'FFA765HHAd', '2023-07-12', '2023-07-04', 0),
('f91b04b7ef369f8fb143', 'akil', 1234567897, 'BHJSO726', '2023-09-14', '2023-07-04', 1),
('94398a256d57d03551a0', 'talha', 9876543210, 'GUDVWR6', '2023-07-18', '2023-07-04', 0),
('43d1cd434d7a78652e74', 'afzal', 8160878643, 'HJDUS73h', '2023-12-15', '2023-07-05', 1),
('9d4051a10c3686edb833', 'afzal diwan', 8169878643, 'GDwgw', '2023-07-08', '2023-07-05', 1),
('cd7697b7a9c3f1de0961', 'khalil', 9999977665, 'asdjajd', '2023-07-27', '2023-07-05', 1),
('067ed453157b3d379998', 'talha', 1234567891, 'GUFVWR3', '2023-07-11', '2023-07-06', 1),
('16107c0fcffe758ed0b4', 'afzal diwan', 9924863558, 'IHDq8bda', '2023-07-23', '2023-07-07', 1);

-- --------------------------------------------------------

--
-- Table structure for table `fuel`
--

DROP TABLE IF EXISTS `fuel`;
CREATE TABLE IF NOT EXISTS `fuel` (
  `id` varchar(55) NOT NULL,
  `vehicle_name` varchar(100) NOT NULL,
  `vehicle_no` varchar(55) NOT NULL,
  `fuel_filled_by` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `license_no` varchar(55) NOT NULL,
  `fuel_fill_date` date NOT NULL,
  `quantity` int NOT NULL,
  `fuel_total_price` int NOT NULL,
  `odometer` int NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `fuel`
--

INSERT INTO `fuel` (`id`, `vehicle_name`, `vehicle_no`, `fuel_filled_by`, `license_no`, `fuel_fill_date`, `quantity`, `fuel_total_price`, `odometer`, `status`) VALUES
('91d31d9de7a186d419b4', 'ferari', '756494766', 'khalil', 'asdjajd', '2023-07-22', 12349789, 20003, 50000, 1),
('60cc58cf6e7035304dd4', 'ferari', '756494766', 'khalil', 'asdjajd', '2023-07-21', 12349789, 20003, 50000, 1);

-- --------------------------------------------------------

--
-- Table structure for table `income_expense`
--

DROP TABLE IF EXISTS `income_expense`;
CREATE TABLE IF NOT EXISTS `income_expense` (
  `sr` int NOT NULL AUTO_INCREMENT,
  `id` varchar(55) NOT NULL,
  `vehicle_name` varchar(55) NOT NULL,
  `vehicle_no` varchar(55) NOT NULL,
  `driver_name` varchar(55) NOT NULL,
  `license_no` varchar(55) NOT NULL,
  `add_date` date NOT NULL,
  `description` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `amount` int NOT NULL,
  `type` varchar(55) NOT NULL,
  PRIMARY KEY (`sr`)
) ENGINE=MyISAM AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `income_expense`
--

INSERT INTO `income_expense` (`sr`, `id`, `vehicle_name`, `vehicle_no`, `driver_name`, `license_no`, `add_date`, `description`, `amount`, `type`) VALUES
(41, '978ec2776941883ee709', 'ferari', '756494766', 'akil', 'BHJSO726', '2023-07-06', 'added fuel on tripp', 5000, 'expense');

-- --------------------------------------------------------

--
-- Table structure for table `product_delivery`
--

DROP TABLE IF EXISTS `product_delivery`;
CREATE TABLE IF NOT EXISTS `product_delivery` (
  `product_id` varchar(100) NOT NULL,
  `product_name` varchar(55) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `product_price` bigint NOT NULL,
  `vehicle_name` varchar(55) NOT NULL,
  `vehicle_no` int NOT NULL,
  `driver_name` varchar(55) NOT NULL,
  `license_no` varchar(55) NOT NULL,
  `dispatch_add` varchar(100) NOT NULL,
  `del_add` varchar(100) NOT NULL,
  `del_distance` varchar(55) NOT NULL,
  `status` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`product_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `product_delivery`
--

INSERT INTO `product_delivery` (`product_id`, `product_name`, `product_price`, `vehicle_name`, `vehicle_no`, `driver_name`, `license_no`, `dispatch_add`, `del_add`, `del_distance`, `status`) VALUES
('ef5a6370fb7eac58377c', 'iphone 17', 5673, 'hero honda', 538927, 'khalil', 'FFA765HHAd', ' bharuch 392001', 'dayadra', '18km', 0),
('1e4f8314326df6d6ff72', 'peanut butter', 32523, 'bajaj', 89238, 'afzal diwan', 'GDwgw', 'mumbai', 'dayadra', '600km', 0);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `sr` int NOT NULL AUTO_INCREMENT,
  `id` varchar(55) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(55) NOT NULL,
  `password` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`sr`),
  UNIQUE KEY `email` (`email`)
) ENGINE=MyISAM AUTO_INCREMENT=222 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`sr`, `id`, `username`, `email`, `password`) VALUES
(221, 'f0a4afba53a6da16d026', 'afzal diwan', 'afzal@gmail.com', '$2b$10$bVBS/D4tPWZ6kyFqrJBGOetcjlGfuidhVjSeb4u8wNjA2pwuQ932a');

-- --------------------------------------------------------

--
-- Table structure for table `vehicle`
--

DROP TABLE IF EXISTS `vehicle`;
CREATE TABLE IF NOT EXISTS `vehicle` (
  `vehicle_id` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `vehicle_name` varchar(100) NOT NULL,
  `vehicle_no` varchar(100) NOT NULL,
  `vehicle_type` varchar(100) NOT NULL,
  `vehicle_model` varchar(100) NOT NULL,
  `engine_no` varchar(100) NOT NULL,
  `chassis_no` varchar(100) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`vehicle_id`),
  UNIQUE KEY `vehicle_no` (`vehicle_no`),
  UNIQUE KEY `engine_no` (`engine_no`),
  UNIQUE KEY `chassis_no` (`chassis_no`)
) ENGINE=MyISAM AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `vehicle`
--

INSERT INTO `vehicle` (`vehicle_id`, `vehicle_name`, `vehicle_no`, `vehicle_type`, `vehicle_model`, `engine_no`, `chassis_no`, `status`) VALUES
('ec8f3b3875535db346e9', 'hero honda', '324141', 'motor cycle', 'AD12e1', '235235', '234235', 0),
('cec475e0fdd5f387a6b7', 'hero honda', '538927', 'truck', '234235', '1231245555555555', '346346', 1),
('5a56d263614458620044', 'hero ', '32425', 'motor cycle', '3466756', '1241245', '315235', 1),
('4bfb86fedbab60474856', 'maruti suzuki', '345463453', 'car', '45826358', '12414', '2535', 0),
('12c18e7579b87dfb0035', 'hero honda', '2525', 'truck', '14187247', '525235', '2636352', 1),
('a0d5934811413bac8b75', 'bajaj', '89238', 'car', '82359', '42353', '235235', 1),
('e2b205fab559f12d9204', 'ferari', '756494766', 'car', 'JGHG866JBHv', '28939651', '728974198', 1),
('ea61b5d2318afb9feb3e', 'bajaj', '212412', 'car', '3466756', '14224', '235', 0),
('3af1e0f5ba387dc6a93f', 'ferari', '239084891', 'car', 'HAfb392', '398293', '9482', 0);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

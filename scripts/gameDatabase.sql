DROP DATABASE IF EXISTS `juegodados`;
CREATE DATABASE `juegodados` CHARACTER SET utf8mb4;
USE `juegodados`;

CREATE TABLE `players` (
  `player_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `nickName` VARCHAR(45) NOT NULL,
  `registeredAt` Date NOT NULL
  );

  CREATE TABLE `games` (
  `gamesRecord_id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  `round` DATETIME,
  `result` INT NOT NULL,
  `won` INT NOT NULL,
  `player_id` INT NOT NULL,
  CONSTRAINT fk_players FOREIGN KEY (player_id)  
  REFERENCES players(player_id)  
 
);  

/* avoid error in inserting data in games */
SET GLOBAL FOREIGN_KEY_CHECKS=0;


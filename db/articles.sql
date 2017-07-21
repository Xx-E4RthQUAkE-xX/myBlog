DROP TABLE IF EXISTS `articles`;

CREATE TABLE `articles` (
  `id` INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
  `title` VARCHAR(255) NOT NULL,
  `body` TEXT,
  `user_id` INT NOT NULL,
  FOREIGN KEY (`user_id`) REFERENCES users (`id`) 
);
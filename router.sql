CREATE TABLE IF NOT EXISTS `routers` (
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  noeco varchar(255) NOT NULL,
  mac varchar(255) NOT NULL,
  email varchar(255) NOT NULL,
  edad varchar(255) NOT NULL,
  cp varchar(255) NOT NULL,
  genero varchar(255) NOT NULL,
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
DROP TABLE IF EXISTS `address`;
CREATE TABLE IF NOT EXISTS `address` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `seller` varchar(80),
  `address1` varchar(80),
  `address2` varchar(80),
  `zipcode` varchar(10),
  `city` varchar(80),
  `info_address` TEXT,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
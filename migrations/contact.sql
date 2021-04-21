DROP TABLE IF EXISTS `contact`;
CREATE TABLE IF NOT EXISTS `contact` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `civility` enum('1','2'),
  `firstname` varchar(60),
  `lastname` varchar(60),
  `email` varchar(120),
  `phone` varchar(120),
  `mobile` varchar(120),
  `info` TEXT,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
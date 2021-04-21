DROP TABLE IF EXISTS `realties`;
CREATE TABLE IF NOT EXISTS `realties` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `address_id` int(11) NOT NULL,
  `contact_id` int(11) NOT NULL,
  `type` enum('1','2','3','4','5','6'),
  `type_product` enum('1','2','3'),
  `price` float,
  `amount_commission` float,
  `percentage_commission` float,
  `area` int,
  `room` int,
  `info_realty` TEXT,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=1 DEFAULT CHARSET=latin1;
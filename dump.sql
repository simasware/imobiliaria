/*
SQLyog Community v13.1.2 (64 bit)
MySQL - 10.1.37-MariaDB : Database - desafio
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`desafio` /*!40100 DEFAULT CHARACTER SET latin1 */;

USE `desafio`;

/*Table structure for table `cliente` */

DROP TABLE IF EXISTS `cliente`;

CREATE TABLE `cliente` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(80) NOT NULL,
  `endereco` varchar(80) NOT NULL,
  `email` varchar(80) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;

/*Table structure for table `contrato` */

DROP TABLE IF EXISTS `contrato`;

CREATE TABLE `contrato` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `proprietario_id` int(11) NOT NULL,
  `cliente_id` int(11) DEFAULT NULL,
  `imovel_id` int(11) DEFAULT NULL,
  `data_inicio` timestamp NULL DEFAULT NULL,
  `data_final` timestamp NULL DEFAULT NULL,
  `taxa_administracao` double(14,2) DEFAULT NULL,
  `valor_aluguel` double(14,2) DEFAULT NULL,
  `valor_condominio` double(14,2) DEFAULT NULL,
  `valor_iptu` double(14,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=latin1;

/*Table structure for table `imovel` */

DROP TABLE IF EXISTS `imovel`;

CREATE TABLE `imovel` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `endereco` varchar(80) NOT NULL,
  `proprietario_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=latin1;

/*Table structure for table `mensalidade` */

DROP TABLE IF EXISTS `mensalidade`;

CREATE TABLE `mensalidade` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contrato_id` int(11) NOT NULL,
  `data_vencimento` timestamp NULL DEFAULT NULL,
  `valor` double(14,2) DEFAULT NULL,
  `recebido` smallint(1) DEFAULT '0',
  PRIMARY KEY (`id`,`contrato_id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=latin1;

/*Table structure for table `proprietario` */

DROP TABLE IF EXISTS `proprietario`;

CREATE TABLE `proprietario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(80) NOT NULL,
  `email` varchar(80) NOT NULL,
  `telefone` varchar(15) DEFAULT NULL,
  `dia_repasse` smallint(1) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=latin1;

/*Table structure for table `repasse` */

DROP TABLE IF EXISTS `repasse`;

CREATE TABLE `repasse` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `contrato_id` int(11) NOT NULL,
  `valor` double(14,2) DEFAULT NULL,
  `mes_referencia` varchar(10) DEFAULT NULL,
  `repassado` smallint(1) DEFAULT '0',
  PRIMARY KEY (`id`,`contrato_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=latin1;

/* Trigger structure for table `contrato` */

DELIMITER $$

/*!50003 DROP TRIGGER*//*!50032 IF EXISTS */ /*!50003 `tg_contrato_insert` */$$

/*!50003 CREATE */ /*!50017 DEFINER = 'root'@'localhost' */ /*!50003 TRIGGER `tg_contrato_insert` AFTER INSERT ON `contrato` FOR EACH ROW BEGIN
		call p_gera_mensalidade(NEW.data_inicio, new.taxa_administracao, new.id, new.valor_aluguel);
    END */$$


DELIMITER ;

/* Procedure structure for procedure `p_gera_mensalidade` */

/*!50003 DROP PROCEDURE IF EXISTS  `p_gera_mensalidade` */;

DELIMITER $$

/*!50003 CREATE DEFINER=`root`@`localhost` PROCEDURE `p_gera_mensalidade`(in p_data_inicial timestamp, in p_valor double(14,2), in p_id_contrato int(11), in p_valor_repasse double(14,2))
BEGIN
		DECLARE contador INT;
		declare vencimento timestamp;
		set contador = 1;
		
		loop_insert: LOOP
			IF contador > 12 THEN
				LEAVE loop_insert;
			END IF;
			set vencimento = date_add(p_data_inicial, interval contador month);
			
			INSERT INTO mensalidade (contrato_id, data_vencimento, valor) VALUES (p_id_contrato, vencimento, p_valor);
			insert into repasse (contrato_id, valor, mes_referencia) values (p_id_contrato, p_valor_repasse, date_format(vencimento, "%m/%Y"));
			SET contador = contador + 1;
		end loop;
	END */$$
DELIMITER ;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

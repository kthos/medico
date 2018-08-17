/*
Navicat MySQL Data Transfer

Source Server         : 192.168.21.21
Source Server Version : 50615
Source Host           : 192.168.21.21:3306
Source Database       : hos

Target Server Type    : MYSQL
Target Server Version : 50615
File Encoding         : 65001

Date: 2018-08-03 09:19:40
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `medico_scan_doc`
-- ----------------------------
DROP TABLE IF EXISTS `medico_scan_doc`;
CREATE TABLE `medico_scan_doc` (
  `hn` varchar(15) NOT NULL,
  `vn_an` varchar(15) NOT NULL,
  `doc_type` varchar(15) NOT NULL,
  `department` enum('opd','ipd') DEFAULT NULL,
  `visit_admit_date` date DEFAULT NULL,
  `file_name` varchar(255) DEFAULT NULL,
  `d_update` datetime DEFAULT NULL,
  `note1` varchar(255) DEFAULT NULL,
  `note2` varchar(255) DEFAULT NULL,
  `note3` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`hn`,`vn_an`,`doc_type`) USING BTREE,
  UNIQUE KEY `file_name` (`file_name`) USING BTREE
) ENGINE=MyISAM DEFAULT CHARSET=tis620;

-- ----------------------------
-- Records of medico_scan_doc
-- ----------------------------
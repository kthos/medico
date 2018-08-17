/*
Navicat MySQL Data Transfer

Source Server         : 192.168.21.21
Source Server Version : 50615
Source Host           : 192.168.21.21:3306
Source Database       : hos

Target Server Type    : MYSQL
Target Server Version : 50615
File Encoding         : 65001

Date: 2018-08-03 09:19:53
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `medico_scan_log`
-- ----------------------------
DROP TABLE IF EXISTS `medico_scan_log`;
CREATE TABLE `medico_scan_log` (
  `id` varchar(255) NOT NULL,
  `host` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `file_request` varchar(255) DEFAULT NULL,
  `date_request` datetime DEFAULT NULL,
  `note1` varchar(255) DEFAULT NULL,
  `note2` varchar(255) DEFAULT NULL,
  `note3` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=MyISAM DEFAULT CHARSET=tis620;

-- ----------------------------
-- Records of medico_scan_log
-- ----------------------------
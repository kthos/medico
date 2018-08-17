/*
Navicat MySQL Data Transfer

Source Server         : 192.168.21.21
Source Server Version : 50615
Source Host           : 192.168.21.21:3306
Source Database       : hos

Target Server Type    : MYSQL
Target Server Version : 50615
File Encoding         : 65001

Date: 2018-08-03 09:19:10
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `medico_scan_code`
-- ----------------------------
DROP TABLE IF EXISTS `medico_scan_code`;
CREATE TABLE `medico_scan_code` (
  `code` varchar(3) NOT NULL,
  `doc_name` varchar(100) DEFAULT NULL,
  `depart` varchar(100) DEFAULT NULL,
  `no` int(11) NOT NULL,
  `dep_hos` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`code`) USING BTREE
) ENGINE=MyISAM DEFAULT CHARSET=tis620;

-- ----------------------------
-- Records of medico_scan_code
-- ----------------------------
INSERT INTO `medico_scan_code` VALUES ('ial', 'IPD All', 'ipd', '17', null);
INSERT INTO `medico_scan_code` VALUES ('iar', 'Anesthetic Record', 'ipd', '16', null);
INSERT INTO `medico_scan_code` VALUES ('icr', 'Consultation Record', 'ipd', '15', null);
INSERT INTO `medico_scan_code` VALUES ('idn', 'Discharge Note', 'ipd', '14', null);
INSERT INTO `medico_scan_code` VALUES ('ids', 'Discharge Summary', 'ipd', '13', null);
INSERT INTO `medico_scan_code` VALUES ('ifc', 'Informed Consent & Referring Letter Sheet', 'ipd', '12', null);
INSERT INTO `medico_scan_code` VALUES ('iil', 'Investigation Lab Report', 'ipd', '11', null);
INSERT INTO `medico_scan_code` VALUES ('ilr', 'Labor Record', 'ipd', '10', null);
INSERT INTO `medico_scan_code` VALUES ('imh', 'Medical History', 'ipd', '9', null);
INSERT INTO `medico_scan_code` VALUES ('inn', 'Nurse Note Other Form', 'ipd', '8', null);
INSERT INTO `medico_scan_code` VALUES ('ior', 'Operation Report', 'ipd', '7', null);
INSERT INTO `medico_scan_code` VALUES ('iot', 'Other Form', 'ipd', '6', null);
INSERT INTO `medico_scan_code` VALUES ('ipe', 'Physician Examination', 'ipd', '5', null);
INSERT INTO `medico_scan_code` VALUES ('ipn', 'Progress Note', 'ipd', '4', null);
INSERT INTO `medico_scan_code` VALUES ('irf', 'Refer Form', 'ipd', '3', null);
INSERT INTO `medico_scan_code` VALUES ('irh', 'Rehabilitation Record', 'ipd', '2', null);
INSERT INTO `medico_scan_code` VALUES ('ivs', 'Vital Sign', 'ipd', '1', null);
INSERT INTO `medico_scan_code` VALUES ('oal', 'อื่นๆ', 'opd', '12', null);
INSERT INTO `medico_scan_code` VALUES ('oap', 'ใบนัดผู้ป่วย', 'opd', '6', null);
INSERT INTO `medico_scan_code` VALUES ('odg', 'ใบสั่งยา', 'opd', '20', null);
INSERT INTO `medico_scan_code` VALUES ('oek', 'EKG Form', 'opd', '5', null);
INSERT INTO `medico_scan_code` VALUES ('olb', 'Lab Form', 'opd', '21', '007');
INSERT INTO `medico_scan_code` VALUES ('oop', 'OPD Slip', 'opd', '98', null);
INSERT INTO `medico_scan_code` VALUES ('ora', 'Refer Form อื่นๆ', 'opd', '15', null);
INSERT INTO `medico_scan_code` VALUES ('ori', 'Refer Form รับไว้รักษา', 'opd', '16', null);
INSERT INTO `medico_scan_code` VALUES ('oro', 'Refer Form ส่งต่อรักษา', 'opd', '17', null);
INSERT INTO `medico_scan_code` VALUES ('osc', 'ใบคัดกรองสุขภาพ', 'opd', '18', null);
INSERT INTO `medico_scan_code` VALUES ('oxx', 'test OPD', 'opd', '19', null);
INSERT INTO `medico_scan_code` VALUES ('ips', 'Physiotherapy Sheet', 'ipd', '18', null);
INSERT INTO `medico_scan_code` VALUES ('oer', 'ห้องER', 'opd', '3', '011');
INSERT INTO `medico_scan_code` VALUES ('odt', 'DEATH', 'opd', '13', null);
INSERT INTO `medico_scan_code` VALUES ('orf', 'ใบ Refer', 'opd', '10', null);
INSERT INTO `medico_scan_code` VALUES ('odc', 'ใบรับรองแพทย์ ผู้ป่วยนอก', 'opd', '11', null);
INSERT INTO `medico_scan_code` VALUES ('ooo', 'เอกสารของรพ.อื่น', 'opd', '9', null);
INSERT INTO `medico_scan_code` VALUES ('oec', 'ใบ ECHO', 'opd', '8', null);
INSERT INTO `medico_scan_code` VALUES ('ons', 'ใบ NST', 'opd', '7', null);
INSERT INTO `medico_scan_code` VALUES ('ovn', 'OPDรายวัน', 'opd', '2', '010,013,016,019,020,021,025,030,018,028');
INSERT INTO `medico_scan_code` VALUES ('ode', 'ห้องทันตกรรม', 'opd', '4', '005');
INSERT INTO `medico_scan_code` VALUES ('ose', 'เอกสารลับ', 'opd', '14', null);
INSERT INTO `medico_scan_code` VALUES ('opd', 'opdรวม', 'opd', '1', null);
INSERT INTO `medico_scan_code` VALUES ('ich', 'เอกสารChart', 'ipd', '19', null);
INSERT INTO `medico_scan_code` VALUES ('ojw', 'คลินิกจิตเวช', 'opd', '1', '004');
INSERT INTO `medico_scan_code` VALUES ('oo3', 'ตึกผู้ป่วยใน', 'opd', '1', '009');
INSERT INTO `medico_scan_code` VALUES ('otb', 'คลินิกวัณโรค', 'opd', '1', '014');
INSERT INTO `medico_scan_code` VALUES ('opc', 'เวชปฏิบัติครอบครัวและชุมชน', 'opd', '1', '015');
INSERT INTO `medico_scan_code` VALUES ('olr', 'ห้องคลอด', 'opd', '1', '017');
INSERT INTO `medico_scan_code` VALUES ('ock', 'คลินิคCKD', 'opd', '1', '024');
INSERT INTO `medico_scan_code` VALUES ('odm', 'คลินิกเบาหวาน', 'opd', '1', '026');
INSERT INTO `medico_scan_code` VALUES ('oht', 'คลินิกความดัน', 'opd', '1', '027');
INSERT INTO `medico_scan_code` VALUES ('oco', 'คลินิกปอดอุดกั้นเรื้อรังและหอบหืด', 'opd', '1', '029');
INSERT INTO `medico_scan_code` VALUES ('opy', 'กายภาพ', 'opd', '1', '035,050,042');
INSERT INTO `medico_scan_code` VALUES ('oan', 'คลินิกฝากครรภ์', 'opd', '1', '036');
INSERT INTO `medico_scan_code` VALUES ('oph', 'เวชปฏิบัติ ฯ เยี่ยมบ้าน', 'opd', '1', '039');
INSERT INTO `medico_scan_code` VALUES ('odh', 'คลินิกเบาหวานและความดัน', 'opd', '1', '040');
INSERT INTO `medico_scan_code` VALUES ('omg', 'ห้องตรวจแพทย์แผนไทย', 'opd', '1', '041');
INSERT INTO `medico_scan_code` VALUES ('ocd', 'คลินิกโรคไตแบบบูรณาการ', 'opd', '1', '043');
INSERT INTO `medico_scan_code` VALUES ('ocn', 'ห้องตรวจแพทย์แผนจีน', 'opd', '1', '052');
INSERT INTO `medico_scan_code` VALUES ('cop', 'ปกOPD Card', 'opd', '99', null);

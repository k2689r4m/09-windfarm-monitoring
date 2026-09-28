/*
 Navicat Premium Data Transfer

 Source Server         : myserver
 Source Server Type    : MariaDB
 Source Server Version : 110402 (11.4.2-MariaDB)
 Source Host           : 127.0.0.1:3306
 Source Schema         : vgen

 Target Server Type    : MariaDB
 Target Server Version : 110402 (11.4.2-MariaDB)
 File Encoding         : 65001

 Date: 28/09/2026 19:36:47
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for admin_member
-- ----------------------------
DROP TABLE IF EXISTS `admin_member`;
CREATE TABLE `admin_member`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `mem_id` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT '',
  `mem_name` varchar(50) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT '',
  `password` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `grade` int(11) NOT NULL DEFAULT 1,
  `memo` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `mem_id`(`mem_id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 58 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for alarm_list
-- ----------------------------
DROP TABLE IF EXISTS `alarm_list`;
CREATE TABLE `alarm_list`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `aid` int(11) UNSIGNED NOT NULL,
  `uid` int(11) UNSIGNED NOT NULL,
  `created_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `faid`(`aid`) USING BTREE,
  INDEX `fuid`(`uid`) USING BTREE,
  CONSTRAINT `fuid` FOREIGN KEY (`uid`) REFERENCES `admin_member` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 3 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for alarm_log
-- ----------------------------
DROP TABLE IF EXISTS `alarm_log`;
CREATE TABLE `alarm_log`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `org_id` int(11) NOT NULL,
  `type_id` int(11) NOT NULL,
  `group` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `type` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `st` char(6) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `msg` varchar(100) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `created_at` datetime NOT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 58155 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for chart_list
-- ----------------------------
DROP TABLE IF EXISTS `chart_list`;
CREATE TABLE `chart_list`  (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT,
  `uid` int(11) UNSIGNED NOT NULL,
  `page` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `cid` int(11) NOT NULL COMMENT '여러 차트일경우',
  `group` varchar(20) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL,
  `idx` int(11) NOT NULL,
  `chartCk` char(1) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NOT NULL DEFAULT 'N',
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `c_uid`(`uid`) USING BTREE,
  CONSTRAINT `c_uid` FOREIGN KEY (`uid`) REFERENCES `admin_member` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 576 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for date_key
-- ----------------------------
DROP TABLE IF EXISTS `date_key`;
CREATE TABLE `date_key`  (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `event_timestamp` datetime NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Procedure structure for SP_MAIN_ALARM_ADD
-- ----------------------------
DROP PROCEDURE IF EXISTS `SP_MAIN_ALARM_ADD`;
delimiter ;;
CREATE PROCEDURE `SP_MAIN_ALARM_ADD`(IN `p_group` varchar(20),
	IN `p_type` varchar(20),
	IN `p_st` char(6),
	IN `p_msg` varchar(100),
	IN `p_created_at` datetime,
	IN `p_org_id` int(11),
	IN `p_type_id` int(11))
BEGIN	
	INSERT INTO alarm_log SET
		org_id = p_org_id,
		type_id = p_type_id,
		`group` = p_group,
		`type` = p_type,
		st = p_st,
		msg = p_msg,
		created_at = p_created_at;
		
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for SP_MAIN_ALARM_ALL
-- ----------------------------
DROP PROCEDURE IF EXISTS `SP_MAIN_ALARM_ALL`;
delimiter ;;
CREATE PROCEDURE `SP_MAIN_ALARM_ALL`(IN `p_group` varchar(20),
	IN `date_s` DATETIME,
	IN `date_e` DATETIME)
BEGIN		
	SELECT 
		id,
		`group` AS '설비',
		DATE_FORMAT(created_at, '%Y-%m-%d %H:%i:%s') AS `발생일시`,
		msg AS '알람내용'
	FROM alarm_log
	WHERE `group` = p_group AND st != 'NORMAL' AND CASE WHEN (date_s IS NOT NULL OR date_e IS NOT NULL) THEN (created_at BETWEEN  date_s AND date_e) ELSE TRUE END
	ORDER BY id DESC;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for SP_MAIN_ALARM_CK
-- ----------------------------
DROP PROCEDURE IF EXISTS `SP_MAIN_ALARM_CK`;
delimiter ;;
CREATE PROCEDURE `SP_MAIN_ALARM_CK`(IN `p_org_id` int(11),
	IN `p_type_id` int(11))
BEGIN	
	SELECT id
	FROM alarm_log
	WHERE org_id = p_org_id AND type_id = p_type_id
	LIMIT 1;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for SP_MAIN_ALARM_ITEM_GET
-- ----------------------------
DROP PROCEDURE IF EXISTS `SP_MAIN_ALARM_ITEM_GET`;
delimiter ;;
CREATE PROCEDURE `SP_MAIN_ALARM_ITEM_GET`(IN `p_uid` int(11))
BEGIN	
-- 	SELECT 
-- 		log.id AS log_id,
-- 		org_id,
-- 		type_id,
-- 		`group`,
-- 		`type`,
-- 		st,
-- 		msg,
-- 		list.id AS list_id,
-- 		list.uid
-- 	FROM alarm_log log
-- 	LEFT JOIN alarm_list list ON log.id = list.aid
-- 	WHERE (uid = 1 OR uid IS NULL) AND list.id IS NULL;

	SELECT *
	FROM alarm_log WHERE id IN (
		SELECT MAX(id) FROM alarm_log GROUP BY type_id
	)
	GROUP BY type_id;
	
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for SP_MAIN_ALARM_PAGE
-- ----------------------------
DROP PROCEDURE IF EXISTS `SP_MAIN_ALARM_PAGE`;
delimiter ;;
CREATE PROCEDURE `SP_MAIN_ALARM_PAGE`(IN `pg` INT,
	IN `block` INT,
	IN `p_group` varchar(20),
	IN `date_s` DATETIME,
	IN `date_e` DATETIME)
BEGIN		
	SELECT SQL_CALC_FOUND_ROWS *
	FROM alarm_log
	WHERE `group` = p_group AND st != 'NORMAL' AND CASE WHEN (date_s IS NOT NULL OR date_e IS NOT NULL) THEN (created_at BETWEEN  date_s AND date_e) ELSE TRUE END
	ORDER BY id DESC
	LIMIT pg, block;
	
	SELECT FOUND_ROWS() AS totalCount;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for SP_MAIN_CHART
-- ----------------------------
DROP PROCEDURE IF EXISTS `SP_MAIN_CHART`;
delimiter ;;
CREATE PROCEDURE `SP_MAIN_CHART`(IN `p_uid` int(11),
	IN `p_page` varchar(20),
	IN `p_cid` int(11))
BEGIN	
	SELECT *
	FROM chart_list
	WHERE uid = p_uid AND page = p_page AND cid = p_cid;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for SP_MAIN_CHART_ADD
-- ----------------------------
DROP PROCEDURE IF EXISTS `SP_MAIN_CHART_ADD`;
delimiter ;;
CREATE PROCEDURE `SP_MAIN_CHART_ADD`(IN `p_uid` int(11),
	IN `p_page` varchar(20),
	IN `p_cid` int(11),
	IN `p_group` varchar(20),
	IN `p_idx` int(11),
	IN `p_chartCk` char(1))
BEGIN	
	INSERT INTO chart_list SET
		uid = p_uid,
		page = p_page,
		cid = p_cid,
		`group` = p_group,
		idx = p_idx,
		chartCk = p_chartCk;
		
		
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for SP_MAIN_CHART_copy1
-- ----------------------------
DROP PROCEDURE IF EXISTS `SP_MAIN_CHART_copy1`;
delimiter ;;
CREATE PROCEDURE `SP_MAIN_CHART_copy1`(IN `p_uid` int(11),
	IN `p_page` varchar(20),
	IN `p_cid` int(11))
BEGIN	
	SELECT *
	FROM chart_list
	WHERE uid = p_uid AND page = p_page AND cid = p_cid;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for SP_MAIN_CHART_DEL
-- ----------------------------
DROP PROCEDURE IF EXISTS `SP_MAIN_CHART_DEL`;
delimiter ;;
CREATE PROCEDURE `SP_MAIN_CHART_DEL`(IN `p_uid` int(11),
	IN `p_page` varchar(20),
	IN `p_cid` int(11))
BEGIN	
	DELETE FROM chart_list 
	WHERE uid = p_uid AND page = p_page AND cid = p_cid;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for SP_MAIN_CHART_SELECT
-- ----------------------------
DROP PROCEDURE IF EXISTS `SP_MAIN_CHART_SELECT`;
delimiter ;;
CREATE PROCEDURE `SP_MAIN_CHART_SELECT`(IN `p_uid` int(11),
	IN `p_page` varchar(20),
	IN `p_cid` int(11),
	IN `p_idx` int(11),
	IN `p_chartCk` char(1))
BEGIN	
	UPDATE chart_list SET
		chartCk = p_chartCk
	WHERE uid = p_uid AND page = p_page AND cid = p_cid AND idx = p_idx;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for SP_MAIN_HISTORY_DATE
-- ----------------------------
DROP PROCEDURE IF EXISTS `SP_MAIN_HISTORY_DATE`;
delimiter ;;
CREATE PROCEDURE `SP_MAIN_HISTORY_DATE`(IN `date_s` DATETIME,
	IN `date_e` DATETIME)
BEGIN	

	WITH RECURSIVE x AS
	(
		SELECT date_s AS YMDHM
		UNION ALL
		SELECT DATE_ADD(x.YMDHM, INTERVAL 1 MINUTE) AS YMDHM FROM x
			WHERE x.YMDHM < date_e
	)
	SELECT DATE_FORMAT(YMDHM, '%Y-%m-%d %H:%i') AS REGIST_DT FROM x;

END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for SP_MAIN_LOGIN
-- ----------------------------
DROP PROCEDURE IF EXISTS `SP_MAIN_LOGIN`;
delimiter ;;
CREATE PROCEDURE `SP_MAIN_LOGIN`(IN `userId` VARCHAR(50),
	IN `userPW` VARCHAR(100))
BEGIN
	SELECT *
	FROM admin_member
	WHERE mem_id = userId AND password = PASSWORD(userPW)
	LIMIT 1;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for SP_MAIN_MEMBER
-- ----------------------------
DROP PROCEDURE IF EXISTS `SP_MAIN_MEMBER`;
delimiter ;;
CREATE PROCEDURE `SP_MAIN_MEMBER`()
BEGIN	
	SELECT *
	FROM admin_member;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for SP_MAIN_MEMBER_ADD
-- ----------------------------
DROP PROCEDURE IF EXISTS `SP_MAIN_MEMBER_ADD`;
delimiter ;;
CREATE PROCEDURE `SP_MAIN_MEMBER_ADD`(IN `p_mem_id` varchar(50),
	IN `p_mem_name` varchar(50),
	IN `p_password` varchar(100),
	IN `p_grade` int(11),
	IN `p_memo` text)
BEGIN	
	INSERT INTO admin_member SET
		mem_id = p_mem_id,
		mem_name = p_mem_name,
		password = PASSWORD(p_password),
		grade = p_grade,
		memo = p_memo;
	
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for SP_MAIN_MEMBER_CK
-- ----------------------------
DROP PROCEDURE IF EXISTS `SP_MAIN_MEMBER_CK`;
delimiter ;;
CREATE PROCEDURE `SP_MAIN_MEMBER_CK`(IN `p_mem_id` varchar(50))
BEGIN	
	SELECT id
	FROM admin_member
	WHERE mem_id = p_mem_id;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for SP_MAIN_MEMBER_DEL
-- ----------------------------
DROP PROCEDURE IF EXISTS `SP_MAIN_MEMBER_DEL`;
delimiter ;;
CREATE PROCEDURE `SP_MAIN_MEMBER_DEL`(IN `p_id` int(11))
BEGIN	
	DELETE FROM admin_member
	WHERE id = p_id;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for SP_MAIN_MEMBER_EDIT
-- ----------------------------
DROP PROCEDURE IF EXISTS `SP_MAIN_MEMBER_EDIT`;
delimiter ;;
CREATE PROCEDURE `SP_MAIN_MEMBER_EDIT`(IN `p_id` int(11),
	IN `p_mem_id` varchar(50),
	IN `p_mem_name` varchar(50),
	IN `p_password` varchar(100),
	IN `p_grade` int(11),
	IN `p_memo` text)
BEGIN	
	UPDATE admin_member SET
		mem_id = p_mem_id,
		mem_name = p_mem_name,
		password = PASSWORD(p_password),
		grade = p_grade,
		memo = p_memo
	WHERE id = p_id;
	
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for SP_MAIN_MEMBER_EDIT2
-- ----------------------------
DROP PROCEDURE IF EXISTS `SP_MAIN_MEMBER_EDIT2`;
delimiter ;;
CREATE PROCEDURE `SP_MAIN_MEMBER_EDIT2`(IN `p_id` int(11),
	IN `p_mem_id` varchar(50),
	IN `p_mem_name` varchar(50),
	IN `p_grade` int(11),
	IN `p_memo` text)
BEGIN	
	UPDATE admin_member SET
		mem_id = p_mem_id,
		mem_name = p_mem_name,
		grade = p_grade,
		memo = p_memo
	WHERE id = p_id;
	
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for SP_MAIN_MEMBER_ITEM
-- ----------------------------
DROP PROCEDURE IF EXISTS `SP_MAIN_MEMBER_ITEM`;
delimiter ;;
CREATE PROCEDURE `SP_MAIN_MEMBER_ITEM`(IN `p_id` int(11))
BEGIN	
	SELECT *
	FROM admin_member
	WHERE id = p_id;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for SP_MAIN_MY_INFO
-- ----------------------------
DROP PROCEDURE IF EXISTS `SP_MAIN_MY_INFO`;
delimiter ;;
CREATE PROCEDURE `SP_MAIN_MY_INFO`(IN `p_id` int(11))
BEGIN	
	SELECT
		mem_id,
		mem_name,
		grade 
	FROM admin_member
	WHERE id = p_id;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for SP_MAIN_PASS_CK
-- ----------------------------
DROP PROCEDURE IF EXISTS `SP_MAIN_PASS_CK`;
delimiter ;;
CREATE PROCEDURE `SP_MAIN_PASS_CK`(IN `p_id` int(11),
	IN `userPW` VARCHAR(100))
BEGIN
	SELECT id
	FROM admin_member
	WHERE id = p_id AND password = PASSWORD(userPW)
	LIMIT 1;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for SP_MAIN_PASS_EDIT
-- ----------------------------
DROP PROCEDURE IF EXISTS `SP_MAIN_PASS_EDIT`;
delimiter ;;
CREATE PROCEDURE `SP_MAIN_PASS_EDIT`(IN `p_id` int(11),
	IN `p_password` varchar(100))
BEGIN	
	UPDATE admin_member SET
		password = PASSWORD(p_password)
	WHERE id = p_id;
	
END
;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;

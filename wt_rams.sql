/*
 Navicat Premium Data Transfer

 Source Server         : myserver
 Source Server Type    : MariaDB
 Source Server Version : 110402 (11.4.2-MariaDB)
 Source Host           : 127.0.0.1:3306
 Source Schema         : wt_rams

 Target Server Type    : MariaDB
 Target Server Version : 110402 (11.4.2-MariaDB)
 File Encoding         : 65001

 Date: 28/09/2026 19:35:48
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for td_cmd_blade_1
-- ----------------------------
DROP TABLE IF EXISTS `td_cmd_blade_1`;
CREATE TABLE `td_cmd_blade_1`  (
  `TURBINE_ID` int(11) NULL DEFAULT NULL COMMENT '터빈 식별자',
  `REGIST_DT` timestamp NULL DEFAULT NULL COMMENT '데이터 측정 시간',
  `ID` int(11) NOT NULL COMMENT 'ID',
  `BM_FLAP` float NULL DEFAULT NULL COMMENT '플랩방향 굽힘 모멘트',
  `BM_EDGE` float NULL DEFAULT NULL COMMENT '엣지방향 굽힘 모멘트',
  `TOR` float NULL DEFAULT NULL COMMENT '비틀림 모멘트',
  `UNIX_TS_IN_SECS` bigint(20) NULL DEFAULT NULL,
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci COMMENT = 'CMD_DATASHEET(INPUT) - Blade 1' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for td_cmd_blade_2
-- ----------------------------
DROP TABLE IF EXISTS `td_cmd_blade_2`;
CREATE TABLE `td_cmd_blade_2`  (
  `TURBINE_ID` int(11) NULL DEFAULT NULL COMMENT '터빈 식별자',
  `REGIST_DT` timestamp NULL DEFAULT NULL COMMENT '데이터 측정 시간',
  `ID` int(11) NOT NULL COMMENT 'ID',
  `BM_FLAP` float NULL DEFAULT NULL COMMENT '플랩방향 굽힘 모멘트',
  `BM_EDGE` float NULL DEFAULT NULL COMMENT '엣지방향 굽힘 모멘트',
  `TOR` float NULL DEFAULT NULL COMMENT '비틀림 모멘트',
  `UNIX_TS_IN_SECS` bigint(20) NULL DEFAULT NULL,
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci COMMENT = 'CMD_DATASHEET(INPUT) - Blade 2 ' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for td_cmd_blade_3
-- ----------------------------
DROP TABLE IF EXISTS `td_cmd_blade_3`;
CREATE TABLE `td_cmd_blade_3`  (
  `TURBINE_ID` int(11) NULL DEFAULT NULL COMMENT '터빈 식별자',
  `REGIST_DT` timestamp NULL DEFAULT NULL COMMENT '데이터 측정 시간',
  `ID` int(11) NOT NULL COMMENT 'ID',
  `BM_FLAP` float NULL DEFAULT NULL COMMENT '플랩방향 굽힘 모멘트',
  `BM_EDGE` float NULL DEFAULT NULL COMMENT '엣지방향 굽힘 모멘트',
  `TOR` float NULL DEFAULT NULL COMMENT '비틀림 모멘트',
  `UNIX_TS_IN_SECS` bigint(20) NULL DEFAULT NULL,
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci COMMENT = 'CMD_DATASHEET(INPUT) - Blade 3 ' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for td_cmd_drive_train
-- ----------------------------
DROP TABLE IF EXISTS `td_cmd_drive_train`;
CREATE TABLE `td_cmd_drive_train`  (
  `TURBINE_ID` int(11) NULL DEFAULT NULL COMMENT '터빈 식별자',
  `REGIST_DT` timestamp NULL DEFAULT NULL COMMENT '데이터 측정 시간',
  `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `VIB_ACC_AX` float NULL DEFAULT NULL COMMENT 'Vibration Acceleration - Axial',
  `VIB_ACC_HORZ` float NULL DEFAULT NULL COMMENT 'Vibration Acceleration - Horizontal',
  `VIB_VEL_AX` float NULL DEFAULT NULL COMMENT 'Vibration Velocity - Axial',
  `VIB_VEL_HORZ` float NULL DEFAULT NULL COMMENT 'Vibration Velocity - Horizontal',
  `UNIX_TS_IN_SECS` bigint(20) NULL DEFAULT NULL,
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8336817 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci COMMENT = 'CMD_DATASHEET(INPUT) - DRIVE_TRAIN' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for td_cmd_gearbox
-- ----------------------------
DROP TABLE IF EXISTS `td_cmd_gearbox`;
CREATE TABLE `td_cmd_gearbox`  (
  `TURBINE_ID` int(11) NULL DEFAULT NULL COMMENT '터빈 식별자',
  `REGIST_DT` timestamp NULL DEFAULT NULL COMMENT '데이터 측정 시간',
  `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `VIB_ACC_1SPGB_HORZ` float NULL DEFAULT NULL COMMENT 'Vibration Acceleration - 1st Stage Planetary Gear Bearing (1st) - Horizontal',
  `VIB_ACC_2SPGB_HORZ` float NULL DEFAULT NULL COMMENT 'Vibration Acceleration - 2nd Stage Planetary Gear Bearing (2nd)- Horizontal',
  `VIB_ACC_LSA_VERT` float NULL DEFAULT NULL COMMENT 'Vibration Acceleration - Low Speed Axis (3rd) - Vertical',
  `VIB_ACC_HSA_HORZ` float NULL DEFAULT NULL COMMENT 'Vibration Acceleration - High Speed Axis (Out) - Horizontal',
  `VIB_VEL_1SPGB_HORZ` float NULL DEFAULT NULL COMMENT 'Vibration Velocity - 1st Stage Planetary Gear Bearing (1st) - Horizontal',
  `VIB_VEL_2SPGB_HORZ` float NULL DEFAULT NULL COMMENT 'Vibration Velocity - 2nd Stage Planetary Gear Bearing (2nd)- Horizontal',
  `VIB_VEL_LSA_VERT` float NULL DEFAULT NULL COMMENT 'Vibration Velocity - Low Speed Axis (3rd) - Vertical',
  `VIB_VEL_HSA_HORZ` float NULL DEFAULT NULL COMMENT 'Vibration Velocity - High Speed Axis (Out) - Horizontal',
  `UNIX_TS_IN_SECS` bigint(20) NULL DEFAULT NULL,
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8336817 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci COMMENT = 'CMD_DATASHEET(INPUT) - GEARBOX ' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for td_cmd_generator
-- ----------------------------
DROP TABLE IF EXISTS `td_cmd_generator`;
CREATE TABLE `td_cmd_generator`  (
  `TURBINE_ID` int(11) NULL DEFAULT NULL COMMENT '터빈 식별자',
  `REGIST_DT` timestamp NULL DEFAULT NULL COMMENT '데이터 측정 시간',
  `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `VIB_ACC_DE_HORZ` float NULL DEFAULT NULL COMMENT 'Vibration Acceleration - Drive End (DE) - Horizonal',
  `VIB_ACC_NDE_HORZ` float NULL DEFAULT NULL COMMENT 'Vibration Acceleration - Non Drive End (NDE) - Horizontal',
  `VIB_VEL_DE_HORZ` float NULL DEFAULT NULL COMMENT 'Vibration Velocity - Drive End (DE) - Horizonal',
  `VIB_VEL_NDE_HORZ` float NULL DEFAULT NULL COMMENT 'Vibration Velocity - Non Drive End (NDE) - Horizontal',
  `UNIX_TS_IN_SECS` bigint(20) NULL DEFAULT NULL,
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8336817 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci COMMENT = 'CMD_DATASHEET(INPUT) - GENERATOR ' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for td_cmd_tower
-- ----------------------------
DROP TABLE IF EXISTS `td_cmd_tower`;
CREATE TABLE `td_cmd_tower`  (
  `TURBINE_ID` int(11) NULL DEFAULT NULL COMMENT '터빈 식별자',
  `REGIST_DT` timestamp NULL DEFAULT NULL COMMENT '데이터 측정 시간',
  `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `TOP_BM_NS` float NULL DEFAULT NULL COMMENT '타워 상단 북-남 굽힘 모멘트',
  `TOP_BM_EW` float NULL DEFAULT NULL COMMENT '타워 상단 동-서 굽힘 모멘트',
  `TOP_TOR` float NULL DEFAULT NULL COMMENT '타워 상단 비틀림 모멘트',
  `VIB_NORM` float NULL DEFAULT NULL COMMENT '너클 타워 상단 진동 - 수직',
  `VIB_LAT` float NULL DEFAULT NULL COMMENT '너클 타워 상단 진동 - 측방',
  `BOTTOM_BM_NS` float NULL DEFAULT NULL COMMENT '타워 기저 북-남 굽힘 모멘트',
  `BOTTOM_BM_EW` float NULL DEFAULT NULL COMMENT '타워 기저 동-서 굽힘 모멘트',
  `UNIX_TS_IN_SECS` bigint(20) NULL DEFAULT NULL,
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 8336817 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci COMMENT = 'CMD_DATASHEET(INPUT) - TOWER' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for td_da_output
-- ----------------------------
DROP TABLE IF EXISTS `td_da_output`;
CREATE TABLE `td_da_output`  (
  `TURBINE_ID` int(11) NULL DEFAULT NULL COMMENT '터빈 식별자',
  `REGIST_DT` timestamp NULL DEFAULT NULL COMMENT '데이터 측정 시간',
  `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `MB_MEAS_TEMP` float NULL DEFAULT NULL COMMENT '측정된 주축 온도',
  `MB_PRED_TEMP` float NULL DEFAULT NULL COMMENT '예측된 주축 온도',
  `MB_TEMP_DEV` float NULL DEFAULT NULL COMMENT '주축 온도 편차',
  `MB_DIAG_ALRT_LVL` float NULL DEFAULT NULL COMMENT 'MainBearing Diagnosis Alert Level',
  `MB_DIAG_ALRM_LVL` float NULL DEFAULT NULL COMMENT 'MainBearing Diagnosis Alarm Level',
  `GB_MEAS_TEMP` float NULL DEFAULT NULL COMMENT '기어박스 온도 - 측정 값',
  `GB_PRED_TEMP` float NULL DEFAULT NULL COMMENT '기어박스 온도 - 예측 값',
  `GB_TEMP_DEV` float NULL DEFAULT NULL COMMENT '기어박스 온도 - 편차',
  `GB_DIAG_ALRT_LVL` float NULL DEFAULT NULL COMMENT 'Gearbox Diagnosis Alert Level',
  `GB_DIAG_ALRM_LVL` float NULL DEFAULT NULL COMMENT 'Gearbox Diagnosis Alarm Level',
  `GENA_MEAS_TEMP` float NULL DEFAULT NULL COMMENT '발전기 A 위딩 온도 - 측정 값',
  `GENA_PRED_TEMP` float NULL DEFAULT NULL COMMENT '발전기 A 위딩 온도 - 예측 값',
  `GENA_TEMP_DEV` float NULL DEFAULT NULL COMMENT '발전기 A 위딩 온도 - 편차',
  `GENB_MEAS_TEMP` float NULL DEFAULT NULL COMMENT '발전기 B 위딩 온도 - 측정 값',
  `GENB_PRED_TEMP` float NULL DEFAULT NULL COMMENT '발전기 B 위딩 온도 - 예측 값',
  `GENB_TEMP_DEV` float NULL DEFAULT NULL COMMENT '발전기 B 위딩 온도 - 편차',
  `GENC_MEAS_TEMP` float NULL DEFAULT NULL COMMENT '발전기 C 위딩 온도 - 측정 값',
  `GENC_PRED_TEMP` float NULL DEFAULT NULL COMMENT '발전기 C 위딩 온도 - 예측 값',
  `GENC_TEMP_DEV` float NULL DEFAULT NULL COMMENT '발전기 C 위딩 온도 - 편차',
  `GENA_DIAG_ALRT_LVL` float NULL DEFAULT NULL COMMENT 'Generator Winding A Diagnosis Alert Level',
  `GENA_DIAG_ALRM_LVL` float NULL DEFAULT NULL COMMENT 'Generator Winding A Diagnosis Alarm Level',
  `GENB_DIAG_ALRT_LVL` float NULL DEFAULT NULL COMMENT 'Generator Winding B Diagnosis Alert Level',
  `GENB_DIAG_ALRM_LVL` float NULL DEFAULT NULL COMMENT 'Generator Winding B Diagnosis Alarm Level',
  `GENC_DIAG_ALRT_LVL` float NULL DEFAULT NULL COMMENT 'Generator Winding C Diagnosis Alert Level',
  `GENC_DIAG_ALRM_LVL` float NULL DEFAULT NULL COMMENT 'Generator Winding C Diagnosis Alarm Level',
  `PITCH_ANGLE_MEAS` float NULL DEFAULT NULL COMMENT '피치 각도 - 측정 값',
  `PITCH_ANGLE_PRED` float NULL DEFAULT NULL COMMENT '피치 각도 - 예측 값',
  `PITCH_ANGLE_DEV` float NULL DEFAULT NULL COMMENT '피치 각도 - 편차',
  `PITCH_DIAG_ALRT_LVL` float NULL DEFAULT NULL COMMENT 'Pitch System Diagnosis Alert Level',
  `PITCH_DIAG_ALRM_LVL` float NULL DEFAULT NULL COMMENT 'Pitch System Diagnosis Alarm Level',
  `YAW_ANGLE_NACELLE` float NULL DEFAULT NULL COMMENT '요 각도 - 너클 위치',
  `YAW_ANGLE_WIND_DIR` float NULL DEFAULT NULL COMMENT '요 각도 - 풍향',
  `YAW_ANGLE_DEV` float NULL DEFAULT NULL COMMENT '요 각도 - 편차',
  `YAW_DIAG_ALRT_LVL` float NULL DEFAULT NULL COMMENT 'Yaw System Diagnosis Alert Level',
  `YAW_DIAG_ALRM_LVL` float NULL DEFAULT NULL COMMENT 'Yaw System Diagnosis Alarm Level',
  `POWER_MEAS` float NULL DEFAULT NULL COMMENT '출력 - 측정 값',
  `POWER_PRED` float NULL DEFAULT NULL COMMENT '출력 - 예측 값',
  `POWER_DEV` float NULL DEFAULT NULL COMMENT '출력 - 편차',
  `POWER_DIAG_ALRT_LVL` float NULL DEFAULT NULL COMMENT 'Turbine Power Production Diagnosis Alert Level',
  `POWER_DIAG_ALRM_LVL` float NULL DEFAULT NULL COMMENT 'Turbine Power Production Diagnosis Alarm Level',
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 2756 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci COMMENT = 'Diagnosis-AI(OUTPUT)' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for td_dm_blade_one
-- ----------------------------
DROP TABLE IF EXISTS `td_dm_blade_one`;
CREATE TABLE `td_dm_blade_one`  (
  `TURBINE_ID` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `REGIST_DT` timestamp NULL DEFAULT NULL,
  `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `BM_FLAP` float NULL DEFAULT NULL COMMENT 'Blade 1 Bending - Flapwise',
  `BM_EDGE` float NULL DEFAULT NULL COMMENT 'Blade 1 Bending - Edgewise',
  `TOR` float NULL DEFAULT NULL COMMENT 'Blade 1 Torsion',
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11079309 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for td_dm_blade_three
-- ----------------------------
DROP TABLE IF EXISTS `td_dm_blade_three`;
CREATE TABLE `td_dm_blade_three`  (
  `TURBINE_ID` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `REGIST_DT` timestamp NULL DEFAULT NULL,
  `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `BM_FLAP` float NULL DEFAULT NULL COMMENT 'Blade 3 Bending - Flapwise',
  `BM_EDGE` float NULL DEFAULT NULL COMMENT 'Blade 3 Bending - Edgewise',
  `TOR` float NULL DEFAULT NULL COMMENT 'Blade 3 Torsion',
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11079309 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for td_dm_blade_two
-- ----------------------------
DROP TABLE IF EXISTS `td_dm_blade_two`;
CREATE TABLE `td_dm_blade_two`  (
  `TURBINE_ID` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `REGIST_DT` timestamp NULL DEFAULT NULL,
  `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `BM_FLAP` float NULL DEFAULT NULL COMMENT 'Blade 2 Bending - Flapwise',
  `BM_EDGE` float NULL DEFAULT NULL COMMENT 'Blade 2 Bending - Edgewise',
  `TOR` float NULL DEFAULT NULL COMMENT 'Blade 2 Torsion',
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 11079309 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for td_dm_drive_train
-- ----------------------------
DROP TABLE IF EXISTS `td_dm_drive_train`;
CREATE TABLE `td_dm_drive_train`  (
  `TURBINE_ID` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `REGIST_DT` timestamp NULL DEFAULT NULL,
  `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `VIB_ACC_AX` float NULL DEFAULT NULL COMMENT 'Vibration Acceleration - Axial',
  `VIB_ACC_HORZ` float NULL DEFAULT NULL COMMENT 'Vibration Acceleration - Horizontal',
  `VIB_VEL_AX` float NULL DEFAULT NULL COMMENT 'Vibration Velocity - Axial',
  `VIB_VEL_HORZ` float NULL DEFAULT NULL COMMENT 'Vibration Velocity - Horizontal',
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14782 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for td_dm_gearbox
-- ----------------------------
DROP TABLE IF EXISTS `td_dm_gearbox`;
CREATE TABLE `td_dm_gearbox`  (
  `TURBINE_ID` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `REGIST_DT` timestamp NULL DEFAULT NULL,
  `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `VIB_ACC_1SPGB_HORZ` float NULL DEFAULT NULL COMMENT 'Vibration Acceleration - 1st Stage Planetary Gear Bearing (1st) - Horizontal',
  `VIB_ACC_2SPGB_HORZ` float NULL DEFAULT NULL COMMENT 'Vibration Acceleration - 2nd Stage Planetary Gear Bearing (2nd)- Horizontal',
  `VIB_ACC_LSA_VERT` float NULL DEFAULT NULL COMMENT 'Vibration Acceleration - Low Speed Axis (3rd) - Vertical',
  `VIB_ACC_HSA_HORZ` float NULL DEFAULT NULL COMMENT 'Vibration Acceleration - High Speed Axis (Out) - Horizontal',
  `VIB_VEL_1SPGB_HORZ` float NULL DEFAULT NULL COMMENT 'Vibration Velocity - 1st Stage Planetary Gear Bearing (1st) - Horizontal',
  `VIB_VEL_2SPGB_HORZ` float NULL DEFAULT NULL COMMENT 'Vibration Velocity - 2nd Stage Planetary Gear Bearing (2nd)- Horizontal',
  `VIB_VEL_LSA_VERT` float NULL DEFAULT NULL COMMENT 'Vibration Velocity - Low Speed Axis (3rd) - Vertical',
  `VIB_VEL_HSA_HORZ` float NULL DEFAULT NULL COMMENT 'Vibration Velocity - High Speed Axis (Out) - Horizontal',
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14782 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for td_dm_generator
-- ----------------------------
DROP TABLE IF EXISTS `td_dm_generator`;
CREATE TABLE `td_dm_generator`  (
  `TURBINE_ID` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `REGIST_DT` timestamp NULL DEFAULT NULL,
  `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `VIB_ACC_DE_HORZ` float NULL DEFAULT NULL COMMENT 'Vibration Acceleration - Drive End (DE) - Horizonal',
  `VIB_ACC_NDE_HORZ` float NULL DEFAULT NULL COMMENT 'Vibration Acceleration - Non Drive End (NDE) - Horizontal',
  `VIB_VEL_DE_HORZ` float NULL DEFAULT NULL COMMENT 'Vibration Velocity - Drive End (DE) - Horizonal',
  `VIB_VEL_NDE_HORZ` float NULL DEFAULT NULL COMMENT 'Vibration Velocity - Non Drive End (NDE) - Horizontal',
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14782 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for td_dm_tower
-- ----------------------------
DROP TABLE IF EXISTS `td_dm_tower`;
CREATE TABLE `td_dm_tower`  (
  `TURBINE_ID` varchar(32) CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL,
  `REGIST_DT` timestamp NULL DEFAULT NULL,
  `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `TOP_BM_NS` float NULL DEFAULT NULL COMMENT 'Tower Top Bending (N-S) ',
  `TOP_BM_EW` float NULL DEFAULT NULL COMMENT 'Tower Top Bending (E-W)',
  `TOP_TOR` float NULL DEFAULT NULL COMMENT 'Tower Top Torsional',
  `VIB_NORM` float NULL DEFAULT NULL COMMENT 'Nacelle (Tower Top) Vibrartion - Normal',
  `VIB_LAT` float NULL DEFAULT NULL COMMENT 'Nacelle (Tower Top) Vibrartion - Lateral',
  `BOTTOM_BM_NS` float NULL DEFAULT NULL COMMENT 'Tower Bottom Bending (N-S)',
  `BOTTOM_BM_EW` float NULL DEFAULT NULL COMMENT 'Tower Bottom Bending (E-W)',
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 10958073 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for td_ds_blade_1
-- ----------------------------
DROP TABLE IF EXISTS `td_ds_blade_1`;
CREATE TABLE `td_ds_blade_1`  (
  `TURBINE_ID` int(11) NULL DEFAULT NULL COMMENT '터빈 식별자',
  `REGIST_DT` timestamp NULL DEFAULT NULL COMMENT '데이터 측정 시간',
  `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `FLAP_DEL` float NULL DEFAULT NULL COMMENT 'Flapwise DEL DAMAGE EQUIVALENT LOAD',
  `EDGE_DEL` float NULL DEFAULT NULL COMMENT 'Edge DEL DAMAGE EQUIVALENT LOAD',
  `FLAP_ALRT_LVL` float NULL DEFAULT NULL COMMENT 'Flapwise Alert Level',
  `FLAP_ALRM_LVL` float NULL DEFAULT NULL COMMENT 'Flapwise Alarm Level',
  `EDGE_ALRT_LVL` float NULL DEFAULT NULL COMMENT 'Edge Alert Level',
  `EDGE_ALRM_LVL` float NULL DEFAULT NULL COMMENT 'Edge Alarm Level',
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14782 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci COMMENT = 'DIAGNOSIS-STATISTICAL(OUTPUT) - Blade 1' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for td_ds_blade_2
-- ----------------------------
DROP TABLE IF EXISTS `td_ds_blade_2`;
CREATE TABLE `td_ds_blade_2`  (
  `TURBINE_ID` int(11) NULL DEFAULT NULL COMMENT '터빈 식별자',
  `REGIST_DT` timestamp NULL DEFAULT NULL COMMENT '데이터 측정 시간',
  `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `FLAP_DEL` float NULL DEFAULT NULL COMMENT 'Flapwise DEL DAMAGE EQUIVALENT LOAD',
  `EDGE_DEL` float NULL DEFAULT NULL COMMENT 'Edge DEL DAMAGE EQUIVALENT LOAD',
  `FLAP_ALRT_LVL` float NULL DEFAULT NULL COMMENT 'Flapwise Alert Level',
  `FLAP_ALRM_LVL` float NULL DEFAULT NULL COMMENT 'Flapwise Alarm Level',
  `EDGE_ALRT_LVL` float NULL DEFAULT NULL COMMENT 'Edge Alert Level',
  `EDGE_ALRM_LVL` float NULL DEFAULT NULL COMMENT 'Edge Alarm Level',
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14782 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci COMMENT = 'DIAGNOSIS-STATISTICAL(OUTPUT) - Blade 2' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for td_ds_blade_3
-- ----------------------------
DROP TABLE IF EXISTS `td_ds_blade_3`;
CREATE TABLE `td_ds_blade_3`  (
  `TURBINE_ID` int(11) NULL DEFAULT NULL COMMENT '터빈 식별자',
  `REGIST_DT` timestamp NULL DEFAULT NULL COMMENT '데이터 측정 시간',
  `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `FLAP_DEL` float NULL DEFAULT NULL COMMENT 'Flapwise DEL DAMAGE EQUIVALENT LOAD',
  `EDGE_DEL` float NULL DEFAULT NULL COMMENT 'Edge DEL DAMAGE EQUIVALENT LOAD',
  `FLAP_ALRT_LVL` float NULL DEFAULT NULL COMMENT 'Flapwise Alert Level',
  `FLAP_ALRM_LVL` float NULL DEFAULT NULL COMMENT 'Flapwise Alarm Level',
  `EDGE_ALRT_LVL` float NULL DEFAULT NULL COMMENT 'Edge Alert Level',
  `EDGE_ALRM_LVL` float NULL DEFAULT NULL COMMENT 'Edge Alarm Level',
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14782 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci COMMENT = 'DIAGNOSIS-STATISTICAL(OUTPUT) - Blade 3' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for td_ds_drive_train
-- ----------------------------
DROP TABLE IF EXISTS `td_ds_drive_train`;
CREATE TABLE `td_ds_drive_train`  (
  `TURBINE_ID` int(11) NULL DEFAULT NULL COMMENT '터빈 식별자',
  `REGIST_DT` timestamp NULL DEFAULT NULL COMMENT '데이터 측정 시간',
  `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `ACC_RMS_AX` float NULL DEFAULT NULL COMMENT 'Acceleration RMS - Axial [m/s2]',
  `ACC_RMS_HORZ` float NULL DEFAULT NULL COMMENT 'Acceleration RMS - Horizontal [m/s2]',
  `ACC_ALRT_LVL_AX` float NULL DEFAULT NULL COMMENT 'Acceleration Alert Level - Axial',
  `ACC_ALRM_LVL_AX` float NULL DEFAULT NULL COMMENT 'Acceleration Alarm Level - Axial',
  `ACC_ALRT_LVL_HORZ` float NULL DEFAULT NULL COMMENT 'Acceleration Alert Level -  Horizontal',
  `ACC_ALRM_LVL_HORZ` float NULL DEFAULT NULL COMMENT 'Acceleration Alarm Level -  Horizontal',
  `VEL_RMS_AX` float NULL DEFAULT NULL COMMENT 'Velocity RMS - Axial [mm/s]',
  `VEL_RMS_HORZ` float NULL DEFAULT NULL COMMENT 'Velocity RMS - Horizontal [mm/s]',
  `VEL_ALRT_LVL_AX` float NULL DEFAULT NULL COMMENT 'Velocity Alert Level - Axial',
  `VEL_ALRM_LVL_AX` float NULL DEFAULT NULL COMMENT 'Velocity Alarm Level - Axial',
  `VEL_ALRT_LVL_HORZ` float NULL DEFAULT NULL COMMENT 'Velocity Alert Level - Horizontal',
  `VEL_ALRM_LVL_HORZ` float NULL DEFAULT NULL COMMENT 'Velocity Alarm Level - Horizontal',
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14782 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci COMMENT = 'DIAGNOSIS-STATISTICAL(OUTPUT) - Drive-Train(Main Bearing)' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for td_ds_gearbox
-- ----------------------------
DROP TABLE IF EXISTS `td_ds_gearbox`;
CREATE TABLE `td_ds_gearbox`  (
  `TURBINE_ID` int(11) NULL DEFAULT NULL COMMENT '터빈 식별자',
  `REGIST_DT` timestamp NULL DEFAULT NULL COMMENT '데이터 측정 시간',
  `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `ACC_RMS_1SPGB_HORZ` float NULL DEFAULT NULL COMMENT 'Acceleration RMS - 1st Stage Planetary Gear Bearing (1st) - Horizontal',
  `ACC_RMS_2SPGB_HORZ` float NULL DEFAULT NULL COMMENT 'Acceleration RMS -  2nd Stage Planetary Gear Bearing (2nd)- Horizontal',
  `ACC_RMS_LSA_VERT` float NULL DEFAULT NULL COMMENT 'Acceleration RMS -  Low Speed Axis (3rd) - Vertical',
  `ACC_RMS_HSA_HORZ` float NULL DEFAULT NULL COMMENT 'Acceleration RMS - High Speed Axis (Out) - Horizontal',
  `ACC_ALRT_LVL_1SPGB` float NULL DEFAULT NULL COMMENT '1st Stage Planetary Gear Bearing (1st) - Acceleration Alert Level',
  `ACC_ALRT_LVL_2SPGB` float NULL DEFAULT NULL COMMENT '2nd Stage Planetary Gear Bearing (2nd) - Acceleration Alert Level',
  `ACC_ALRT_LVL_LSA` float NULL DEFAULT NULL COMMENT 'Low Speed Axis (3rd) - Acceleration Alert Level',
  `ACC_ALRT_LVL_HSA` float NULL DEFAULT NULL COMMENT 'High Speed Axis (Out) - Acceleration Alert Level',
  `ACC_ALRM_LVL_1SPGB` float NULL DEFAULT NULL COMMENT '1st Stage Planetary Gear Bearing (1st) - Acceleration Alarm  Level',
  `ACC_ALRM_LVL_2SPGB` float NULL DEFAULT NULL COMMENT '2nd Stage Planetary Gear Bearing (2nd) - Acceleration Alarm  Level',
  `ACC_ALRM_LVL_LSA` float NULL DEFAULT NULL COMMENT 'Low Speed Axis (3rd) - Acceleration Alarm Level',
  `ACC_ALRM_LVL_HSA` float NULL DEFAULT NULL COMMENT 'High Speed Axis (Out) - Acceleration Alarm Level',
  `VEL_RMS_1SPGB_HORZ` float NULL DEFAULT NULL COMMENT 'Velocity RMS - 1st Stage Planetary Gear Bearing (1st) - Horizontal',
  `VEL_RMS_2SPGB_HORZ` float NULL DEFAULT NULL COMMENT 'Velocity RMS -  2nd Stage Planetary Gear Bearing (2nd)- Horizontal',
  `VEL_RMS_LSA_VERT` float NULL DEFAULT NULL COMMENT 'Velocity RMS -  Low Speed Axis (3rd) - Vertical',
  `VEL_RMS_HSA_HORZ` float NULL DEFAULT NULL COMMENT 'Velocity RMS - High Speed Axis (Out) - Horizontal',
  `VEL_ALRT_LVL_1SPGB` float NULL DEFAULT NULL COMMENT '1st Stage Planetary Gear Bearing (1st) - Velocity Alert Level',
  `VEL_ALRT_LVL_2SPGB` float NULL DEFAULT NULL COMMENT '2nd Stage Planetary Gear Bearing (2nd) - Velocity Alert Level',
  `VEL_ALRT_LVL_LSA` float NULL DEFAULT NULL COMMENT 'Low Speed Axis (3rd) - Velocity Alert Level',
  `VEL_ALRT_LVL_HSA` float NULL DEFAULT NULL COMMENT 'High Speed Axis (Out) - Velocity Alert Level',
  `VEL_ALRM_LVL_1SPGB` float NULL DEFAULT NULL COMMENT '1st Stage Planetary Gear Bearing (1st) - Velocity Alarm  Level',
  `VEL_ALRM_LVL_2SPGB` float NULL DEFAULT NULL COMMENT '2nd Stage Planetary Gear Bearing (2nd) - Velocity Alarm  Level',
  `VEL_ALRM_LVL_LSA` float NULL DEFAULT NULL COMMENT 'Low Speed Axis (3rd) - Velocity Alarm Level',
  `VEL_ALRM_LVL_HSA` float NULL DEFAULT NULL COMMENT 'High Speed Axis (Out) - Velocity Alarm Level',
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14782 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci COMMENT = 'DIAGNOSIS-STATISTICAL(OUTPUT) - GEARBOX' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for td_ds_generator
-- ----------------------------
DROP TABLE IF EXISTS `td_ds_generator`;
CREATE TABLE `td_ds_generator`  (
  `TURBINE_ID` int(11) NULL DEFAULT NULL COMMENT '터빈 식별자',
  `REGIST_DT` timestamp NULL DEFAULT NULL COMMENT '데이터 측정 시간',
  `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `ACC_RMS_HORZ_DE` float NULL DEFAULT NULL COMMENT 'Acceleration RMS - Horizonal (DE)',
  `ACC_RMS_HORZ_NDE` float NULL DEFAULT NULL COMMENT 'Acceleration RMS - Horizontal (NDE)',
  `ACC_ALRT_LVL_HORZ_DE` float NULL DEFAULT NULL COMMENT 'Acceleration Alert Level - Horizonal (DE)',
  `ACC_ALRM_LVL_HORZ_DE` float NULL DEFAULT NULL COMMENT 'Acceleration Alarm Level -Horizonal (DE)',
  `ACC_ALRT_LVL_HORZ_NDE` float NULL DEFAULT NULL COMMENT 'Acceleration Alert Level - Horizonal (NDE)',
  `ACC_ALRM_LVL_HORZ_NDE` float NULL DEFAULT NULL COMMENT 'Acceleration Alarm Level -Horizonal (NDE)',
  `VEL_RMS_HORZ_DE` float NULL DEFAULT NULL COMMENT 'Velocity RMS - Horizonal (DE)',
  `VEL_RMS_HORZ_NDE` float NULL DEFAULT NULL COMMENT 'Velocity RMS - Horizontal (NDE)',
  `VEL_ALRT_LVL_HORZ_DE` float NULL DEFAULT NULL COMMENT 'Velocity Alert Level - Horizonal (DE)',
  `VEL_ALRM_LVL_HORZ_DE` float NULL DEFAULT NULL COMMENT 'Velocity Alarm Level -Horizonal (DE)',
  `VEL_ALRT_LVL_HORZ_NDE` float NULL DEFAULT NULL COMMENT 'Velocity Alert Level - Horizonal (NDE)',
  `VEL_ALRM_LVL_HORZ_NDE` float NULL DEFAULT NULL COMMENT 'Velocity Alarm Level -Horizonal (NDE)',
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14782 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci COMMENT = 'DIAGNOSIS-STATISTICAL(OUTPUT) - GENERATOR ' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for td_ds_tower
-- ----------------------------
DROP TABLE IF EXISTS `td_ds_tower`;
CREATE TABLE `td_ds_tower`  (
  `TURBINE_ID` int(11) NULL DEFAULT NULL COMMENT '터빈 식별자',
  `REGIST_DT` timestamp NULL DEFAULT NULL COMMENT '데이터 측정 시간',
  `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `NAC_VEL_RMS_NORM` float NULL DEFAULT NULL COMMENT 'Nacelle (Tower Top) Vibrartion RMS - Normal',
  `NAC_VIB_RMS_LAT` float NULL DEFAULT NULL COMMENT 'Nacelle (Tower Top) Vibrartion RMS - Lateral',
  `NAC_VIB_ALRT_LVL_NORM` float NULL DEFAULT NULL COMMENT 'Nacelle Vibration Alert Level - Normal',
  `NAC_VIB_ALRM_LVL_NORM` float NULL DEFAULT NULL COMMENT 'Nacelle Vibration Alarm Level - Normal\n',
  `NAC_VIB_ALRT_LVL_LAT` float NULL DEFAULT NULL COMMENT 'Nacelle Vibration Alert Level - Lateral',
  `NAC_VIB_ALRM_LVL_LAT` float NULL DEFAULT NULL COMMENT 'Nacelle Vibration Alarm Level - Lateral',
  `TOP_DEL_EW` float NULL DEFAULT NULL COMMENT 'Tower Top DELL (E-W Direction)',
  `TOP_DEL_NS` float NULL DEFAULT NULL COMMENT 'Tower Top DELL (N-S Direction)',
  `BOTTOM_DEL_EW` float NULL DEFAULT NULL COMMENT 'Tower Bottom DEL (E-W Direction)',
  `BOTTOM_DEL_NS` float NULL DEFAULT NULL COMMENT 'Tower Bottom DEL (N-S Direction)',
  `TOP_DIAG_ALRT_LVL_EW` float NULL DEFAULT NULL COMMENT 'Tower Top Diagnosis - Alert Level (E-W Direction)',
  `TOP_DIAG_ALRT_LVL_NS` float NULL DEFAULT NULL COMMENT 'Tower Top Diagnosis - Alert Level (N-S Direction)',
  `TOP_DIAG_ALRM_LVL_EW` float NULL DEFAULT NULL COMMENT 'Tower Top Diagnosis - Alarm Level (E-W Direction)',
  `TOP_DIAG_ALRM_LVL_NS` float NULL DEFAULT NULL COMMENT 'Tower Top Diagnosis - Alarm Level (N-S Direction)',
  `BOTTOM_DIAG_ALRT_LVL_EW` float NULL DEFAULT NULL COMMENT 'Tower Bottom Diagnosis - Alert Level (E-W Direction)',
  `BOTTOM_DIAG_ALRT_LVL_NS` float NULL DEFAULT NULL COMMENT 'Tower Bottom Diagnosis - Alert Level (N-S Direction)',
  `BOTTOM_DIAG_ALRM_LVL_EW` float NULL DEFAULT NULL COMMENT 'Tower Bottom Diagnosis - Alarm Level (E-W Direction)',
  `BOTTOM_DIAG_ALRM_LVL_NS` float NULL DEFAULT NULL COMMENT 'Tower Bottom Diagnosis - Alarm Level (N-S Direction)',
  `TOP_DEL` float NULL DEFAULT NULL COMMENT 'Tower Top DELL',
  `BOTTOM_DEL` float NULL DEFAULT NULL COMMENT 'Tower Bottom DEL',
  `TOP_DIAG_ALRT_LVL` float NULL DEFAULT NULL COMMENT 'Tower Top Diagnosis - Alert Level',
  `TOP_DIAG_ALRM_LVL` float NULL DEFAULT NULL COMMENT 'Tower Top Diagnosis - Alarm Level',
  `BOTTOM_DIAG_ALRT_LVL` float NULL DEFAULT NULL COMMENT 'Tower Bottom Diagnosis - Alert Level',
  `BOTTOM_DIAG_ALRM_LVL` float NULL DEFAULT NULL COMMENT 'Tower Bottom Diagnosis - Alarm Level\n',
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14681 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci COMMENT = 'DIAGNOSIS-STATISTICAL(OUTPUT) - TOWER ' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for td_fp_rul
-- ----------------------------
DROP TABLE IF EXISTS `td_fp_rul`;
CREATE TABLE `td_fp_rul`  (
  `TURBINE_ID` int(11) NULL DEFAULT NULL COMMENT '터빈 식별자',
  `REGIST_DT` timestamp NULL DEFAULT NULL COMMENT '데이터 측정 시간',
  `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `BLADE_1_NOM_AGE` float NULL DEFAULT NULL COMMENT '1번 날개 - 정상 연수',
  `BLADE_1_EST_FAT_AGE` float NULL DEFAULT NULL COMMENT '1번 날개 - 예상 피로 연수',
  `BLADE_1_EST_FAT_MARGIN` float NULL DEFAULT NULL COMMENT '1번 날개 - 예상 피로 여유',
  `BLADE_2_NOM_AGE` float NULL DEFAULT NULL COMMENT '2번 날개 - 정상 연수',
  `BLADE_2_EST_FAT_AGE` float NULL DEFAULT NULL COMMENT '2번 날개 - 예상 피로 연수',
  `BLADE_2_EST_FAT_MARGIN` float NULL DEFAULT NULL COMMENT '2번 날개 - 예상 피로 여유',
  `BLADE_3_NOM_AGE` float NULL DEFAULT NULL COMMENT '3번 날개 - 정상 연수',
  `BLADE_3_EST_FAT_AGE` float NULL DEFAULT NULL COMMENT '3번 날개 - 예상 피로 연수',
  `BLADE_3_EST_FAT_MARGIN` float NULL DEFAULT NULL COMMENT '3번 날개 - 예상 피로 여유',
  `TOWER_NOM_AGE` float NULL DEFAULT NULL COMMENT '타워 - 정상 연수',
  `TOWER_EST_FAT_AGE` float NULL DEFAULT NULL COMMENT '타워 - 예상 피로 연수',
  `TOWER_EST_FAT_MARGIN` float NULL DEFAULT NULL COMMENT '타워 - 예상 피로 여유',
  `MB_DESIGN_LIFE` float NULL DEFAULT NULL COMMENT '메인 베어링 설계 수명',
  `MB_EST_LIFE` float NULL DEFAULT NULL COMMENT '메인 베어링 예상 수명',
  `MB_HEALTH_IDX` float NULL DEFAULT NULL COMMENT '메인 베어링 건강 지수',
  `GB_DESIGN_AGE` float NULL DEFAULT NULL COMMENT '기어박스 설계 연수',
  `GB_EST_AGE` float NULL DEFAULT NULL COMMENT '기어박스 예상 연수',
  `GB_HEALTH_IDX` float NULL DEFAULT NULL COMMENT '기어박스 건강 지수',
  `GEN_DESIGN_AGE` float NULL DEFAULT NULL COMMENT '발전기 설계 연수',
  `GEN_EST_AGE` float NULL DEFAULT NULL COMMENT '발전기 예상 연수',
  `GEN_HEALTH_IDX` float NULL DEFAULT NULL COMMENT '발전기 건강 지수',
  `PITCH_DESIGN_AGE` float NULL DEFAULT NULL COMMENT '피치 시스템 설계 연수',
  `PITCH_EST_AGE` float NULL DEFAULT NULL COMMENT '피치 시스템 예상 연수',
  `PITCH_HEALTH_IDX` float NULL DEFAULT NULL COMMENT '피치 시스템 건강 지수',
  `YAW_DESIGN_AGE` float NULL DEFAULT NULL COMMENT '요 시스템 설계 연수',
  `YAW_EST_AGE` float NULL DEFAULT NULL COMMENT '요 시스템 예상 연수',
  `YAW_HEALTH_IDX` float NULL DEFAULT NULL COMMENT '요 시스템 건강 지수',
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 1 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci COMMENT = 'Fault Prognosis-RUL(OUTPUT)' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for td_fp_rul_interm
-- ----------------------------
DROP TABLE IF EXISTS `td_fp_rul_interm`;
CREATE TABLE `td_fp_rul_interm`  (
  `TURBINE_ID` int(11) NULL DEFAULT NULL COMMENT '터빈 식별자',
  `REGIST_DT` timestamp NULL DEFAULT NULL COMMENT '데이터 측정 시간',
  `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `MB_EST_LIFE_CMS` float NULL DEFAULT NULL COMMENT '메인 베어링 예상 수명  중간 결과 (CMS 기반)',
  `MB_HEALTH_IDX_CMS` float NULL DEFAULT NULL COMMENT '메인 베어링 건강 지수 중간 결과  (CMS 기반',
  `MB_EST_LIFE_SCADA` float NULL DEFAULT NULL COMMENT '메인 베어링 예상 수명 중간 결과  (SCADA 기반)',
  `MB_ABN_OP_IDX_SCADA` float NULL DEFAULT NULL COMMENT '메인 베어링 비정상 작동 지수 중간 결과  (SCADA 기반)\\n(Main Bearing Abnormal Operation Index)',
  `GB_EST_AGE_CMS` float NULL DEFAULT NULL COMMENT '기어박스 예상 연수 중간 결과 (CMS 기반)',
  `GB_HEALTH_IDX_CMS` float NULL DEFAULT NULL COMMENT '기어박스 건강 지수 중간 결과 (CMS 기반)',
  `GB_EST_AGE_SCADA` float NULL DEFAULT NULL COMMENT '기어박스 예상 연수 중간 결과 (SCADA 기반)',
  `GB_ABN_OP_IDX_SCADA` float NULL DEFAULT NULL COMMENT '기어박스 비정상 작동 지수 중간 결과  (SCADA 기반) \\\\n(Main Bearing Abnormal Operation Index)',
  `GEN_EST_AGE_CMS` float NULL DEFAULT NULL COMMENT '제너레이터 예상 연수 중간 결과 (CMS 기반)\\n',
  `GEN_HEALTH_IDX_CMS` float NULL DEFAULT NULL COMMENT '제너레이터 건강 지수 중간 결과 (CMS 기반)',
  `GEN_EST_AGE_SCADA` float NULL DEFAULT NULL COMMENT '제너레이터 예상 연수 중간 결과 (SCADA 기반)',
  `GEN_ABN_OP_IDX_SCADA` float NULL DEFAULT NULL COMMENT '제너레이터 비정상 작동 지수 중간 결과 (SCADA 기반)\\\\n(Main Bearing Abnormal Operation Index)',
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 238 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci COMMENT = 'Fault Prognosis-RUL(Intermediate Result) (OUTPUT)' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for td_met
-- ----------------------------
DROP TABLE IF EXISTS `td_met`;
CREATE TABLE `td_met`  (
  `TURBINE_ID` int(11) NULL DEFAULT NULL COMMENT '터빈 식별자',
  `REGIST_DT` timestamp NULL DEFAULT NULL COMMENT '데이터 측정 시간',
  `ID` int(11) NOT NULL COMMENT 'ID',
  `WD_SPD` float NULL DEFAULT NULL COMMENT 'WD_SPD',
  `WD_DIR` float NULL DEFAULT NULL COMMENT 'WD_DIR',
  `AIR_TEMP` float NULL DEFAULT NULL COMMENT 'AIR_TEMP',
  `MET_TWR_NUM` float NULL DEFAULT NULL,
  `WD_SPD_80_1ST` float NULL DEFAULT NULL,
  `WD_SPD_80_2ND` float NULL DEFAULT NULL,
  `WD_SPD_37M` float NULL DEFAULT NULL,
  `WD_DIR_76M_1ST` float NULL DEFAULT NULL,
  `WD_DIR_76M_2ND` float NULL DEFAULT NULL,
  `HUM_75M` float NULL DEFAULT NULL,
  `TMP_75M` float NULL DEFAULT NULL,
  `AP_75M` float NULL DEFAULT NULL,
  `UNIX_TS_IN_SECS` bigint(20) NULL DEFAULT NULL,
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci COMMENT = 'INPUT_Met Mast(INPUT)' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for td_sc_msg_output
-- ----------------------------
DROP TABLE IF EXISTS `td_sc_msg_output`;
CREATE TABLE `td_sc_msg_output`  (
  `TURBINE_ID` int(11) NULL DEFAULT NULL COMMENT 'Turbine Identifier',
  `REGIST_DT` timestamp NULL DEFAULT NULL COMMENT '데이터 측정 시간',
  `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `BLADE_1` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT 'No. 1 Blade - Normal/Alert/Alarm Message',
  `BLADE_2` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT 'No. 2 Blade - Normal/Alert/Alarm Message',
  `BLADE_3` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT 'No. 3 Blade - Normal/Alert/Alarm Message',
  `TOWER_TOP` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT 'Tower Top - Normal/Alert/Alarm Message',
  `TOWER_BOTTOM` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT 'Tower Bottom - Normal/Alert/Alarm Message',
  `MAIN_BEARING` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT 'Drive-Train (Main Bearing) - Normal/Alert/Alarm Message',
  `GEARBOX` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT 'Gearbox - Normal/Alert/Alarm Message',
  `GENERATOR` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT 'Generator - Normal/Alert/Alarm Message',
  `PITCH_SYSTEM` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT 'Pitch System - Normal/Alert/Alarm Message',
  `YAW_SYSTEM` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT 'Yaw System - Normal/Alert/Alarm Message',
  `TUR_POW_PROD` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT 'Turbine Power Production - Normal/Alert/Alarm Message',
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14782 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci COMMENT = 'Alarm Message Table (About \"td_sc_output\" Table)' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for td_sc_msg_output_interm
-- ----------------------------
DROP TABLE IF EXISTS `td_sc_msg_output_interm`;
CREATE TABLE `td_sc_msg_output_interm`  (
  `TURBINE_ID` int(11) NULL DEFAULT NULL COMMENT 'Turbine Identifier',
  `REGIST_DT` timestamp NULL DEFAULT NULL COMMENT '데이터 측정 시간',
  `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `MAIN_BEARING_CMS` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT 'Main Bearing Intermidiate Result (based on CMS Data) - Normal/Alert/Alarm Message',
  `GEARBOX_CMS` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT 'Gearbox Intermidiate Result (based on CMS Data) - Normal/Alert/Alarm Message',
  `GENERATOR_CMS` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT 'Generator Intermidiate Result (based on CMS Data) - Normal/Alert/Alarm Message',
  `MAIN_BEARING_SCADA` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT 'Main Bearing Intermidiate Result (based on SCADA Data) - Normal/Alert/Alarm Message',
  `GEARBOX_SCADA` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT 'Gearbox Intermidiate Result (based on SCADA Data) - Normal/Alert/Alarm Message',
  `GENERATOR_SCADA` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT 'Generator Intermidiate Result (based on SCADA Data) - Normal/Alert/Alarm Message',
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14782 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci COMMENT = 'Alarm Message(Intermediate Result) Table (About \"td_sc_output\" Table)' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for td_sc_output
-- ----------------------------
DROP TABLE IF EXISTS `td_sc_output`;
CREATE TABLE `td_sc_output`  (
  `TURBINE_ID` int(11) NULL DEFAULT NULL COMMENT 'Turbine Identifier',
  `REGIST_DT` timestamp NULL DEFAULT NULL COMMENT '데이터 측정 시간',
  `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `TURBINE_HEALTH_INDEX` float NULL DEFAULT NULL COMMENT 'Entire Turbine Health Index (%)',
  `BLADE_1` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT 'No. 1 Blade - Normal/Alert/Alarm Status',
  `BLADE_2` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT 'No. 2 Blade - Normal/Alert/Alarm Status',
  `BLADE_3` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT 'No. 3 Blade - Normal/Alert/Alarm Status',
  `TOWER_TOP` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT 'Tower Top - Normal/Alert/Alarm Status',
  `TOWER_BOTTOM` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT 'Tower Bottom - Normal/Alert/Alarm Status',
  `MAIN_BEARING` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT 'Drive-Train (Main Bearing) - Normal/Alert/Alarm Status',
  `GEARBOX` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT 'Gearbox - Normal/Alert/Alarm Status',
  `GENERATOR` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT 'Generator - Normal/Alert/Alarm Status',
  `PITCH_SYSTEM` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT 'Pitch System - Normal/Alert/Alarm Status',
  `YAW_SYSTEM` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT 'Yaw System - Normal/Alert/Alarm Status',
  `TUR_POW_PROD` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT 'Turbine Power Production - Normal/Alert/Alarm Status',
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14782 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci COMMENT = 'Status of Components(OUTPUT)' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for td_sc_output_interm
-- ----------------------------
DROP TABLE IF EXISTS `td_sc_output_interm`;
CREATE TABLE `td_sc_output_interm`  (
  `TURBINE_ID` int(11) NULL DEFAULT NULL COMMENT 'Turbine Identifier',
  `REGIST_DT` timestamp NULL DEFAULT NULL COMMENT '데이터 측정 시간',
  `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `MAIN_BEARING_CMS` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT 'Main Bearing Intermidiate Result (based on CMS Data) - Normal/Alert/Alarm Status',
  `GEARBOX_CMS` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT 'Gearbox Intermidiate Result (based on CMS Data) - Normal/Alert/Alarm Status',
  `GENERATOR_CMS` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT 'Generator Intermidiate Result (based on CMS Data) - Normal/Alert/Alarm Status',
  `MAIN_BEARING_SCADA` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT 'Main Bearing Intermidiate Result (based on SCADA Data) - Normal/Alert/Alarm Status',
  `GEARBOX_SCADA` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT 'Gearbox Intermidiate Result (based on SCADA Data) - Normal/Alert/Alarm Status',
  `GENERATOR_SCADA` text CHARACTER SET utf8mb3 COLLATE utf8mb3_general_ci NULL DEFAULT NULL COMMENT 'Generator Intermidiate Result (based on SCADA Data) - Normal/Alert/Alarm Status',
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 14782 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci COMMENT = 'Status of Components(Intermediate Result) (OUTPUT)' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for td_scada
-- ----------------------------
DROP TABLE IF EXISTS `td_scada`;
CREATE TABLE `td_scada`  (
  `DATA_MESURE_TIME` timestamp NULL DEFAULT NULL COMMENT '데이터 측정 시간',
  `ACC_DRIVE_DIR` float NULL DEFAULT NULL COMMENT '가속도 - 구동 방향',
  `ACC_NON_DRIVE_DIR` float NULL DEFAULT NULL COMMENT '가속도 - 비구동 방향',
  `ACTIVE_POWER` float NULL DEFAULT NULL COMMENT '활성 전력',
  `BLADE_ANGLE` float NULL DEFAULT NULL COMMENT '날개 각도',
  `BLADE_1_ANGLE` float NULL DEFAULT NULL COMMENT '1번 날개 각도',
  `BLADE_2_ANGLE` float NULL DEFAULT NULL COMMENT '2번 날개 각도',
  `BLADE_3_ANGLE` float NULL DEFAULT NULL COMMENT '3번 날개 각도',
  `BEARING_TEMP_1` float NULL DEFAULT NULL COMMENT 'Measured temperature of shaft bearing 1',
  `BEARING_TEMP_2` float NULL DEFAULT NULL COMMENT 'Measured temperature of shaft bearing 2',
  `BLADE_1_CONV_INT_TEMP` float NULL DEFAULT NULL COMMENT '1번 날개 컨버터 내부 온도',
  `BLADE_1_TORQUE_RMS` float NULL DEFAULT NULL COMMENT '1번 날개 토크 RMS',
  `BLADE_2_CONV_INT_TEMP` float NULL DEFAULT NULL COMMENT '2번 날개 컨버터 내부 온도',
  `BLADE_2_TORQUE_RMS` float NULL DEFAULT NULL COMMENT '2번 날개 토크 RMS',
  `BLADE_3_CONV_INT_TEMP` float NULL DEFAULT NULL COMMENT '3번 날개 컨버터 내부 온도',
  `BLADE_3_TORQUE_RMS` float NULL DEFAULT NULL COMMENT '3번 날개 토크 RMS',
  `CURRENT_AVG` float NULL DEFAULT NULL COMMENT '평균 전류',
  `ENERGY_CONSUMPTION_10MIN` float NULL DEFAULT NULL COMMENT '10분간의 에너지 소비',
  `ENERGY_PRODUCTION` float NULL DEFAULT NULL COMMENT '에너지 생산량',
  `ENV_TEMP` float NULL DEFAULT NULL COMMENT '환경 온도',
  `GEARBOX_BEARING_TEMP` float NULL DEFAULT NULL COMMENT '기어박스 베어링 온도',
  `GEARBOX_OIL_TANK_TEMP` float NULL DEFAULT NULL COMMENT '기어박스 오일 탱크 온도',
  `GEN_BEARING_DRIVE_TEMP` float NULL DEFAULT NULL COMMENT '발전기 베어링 구동측 온도',
  `GEN_BEARING_NON_DRIVE_TEMP` float NULL DEFAULT NULL COMMENT '발전기 베어링 비구동측 온도',
  `GEN_WINDING_U_TEMP` float NULL DEFAULT NULL COMMENT '발전기 각 위딩 U 온도',
  `GEN_WINDING_V_TEMP` float NULL DEFAULT NULL COMMENT '발전기 각 위딩 V 온도',
  `GEN_WINDING_W_TEMP` float NULL DEFAULT NULL COMMENT '발전기 각 위딩 W 온도',
  `GEN_SPEED` float NULL DEFAULT NULL COMMENT '발전기 속도',
  `IGBT_TEMP_GSC` float NULL DEFAULT NULL COMMENT '컨버터 GSC측 IGBT 온도 (℃)',
  `IGBT_TEMP_LSC` float NULL DEFAULT NULL COMMENT '컨버터 LSC측 IGBT 온도 (℃)',
  `CNV_HEA_SIN_TMP` float NULL DEFAULT NULL COMMENT 'Power converter cooling plate temp.\\\\n(℃)',
  `MOTOR_TEMP_BLADE_1` float NULL DEFAULT NULL COMMENT '1번 날개 모터 온도',
  `MOTOR_TEMP_BLADE_2` float NULL DEFAULT NULL COMMENT '2번 날개 모터 온도',
  `MOTOR_TEMP_BLADE_3` float NULL DEFAULT NULL COMMENT '3번 날개 모터 온도',
  `NACELLE_INSIDE_TEMP` float NULL DEFAULT NULL COMMENT '나셀 내부 온도',
  `NACELLE_POS_DEVIATION` float NULL DEFAULT NULL COMMENT '나셀 위치 편차',
  `NACELLE_POSITION` float NULL DEFAULT NULL COMMENT '나셀 위치',
  `OIL_INLET_PRESSURE` float NULL DEFAULT NULL COMMENT '오일 유입 압력',
  `PITCH_MOTOR_TEMP` float NULL DEFAULT NULL COMMENT '피치 모터 온도',
  `REACTIVE_POWER` float NULL DEFAULT NULL COMMENT '리액티브 파워',
  `ROTOR_SPEED` float NULL DEFAULT NULL COMMENT '로터 속도',
  `WIND_DIRECTION` float NULL DEFAULT NULL COMMENT '바람 방향',
  `WIND_SPEED` float NULL DEFAULT NULL COMMENT '바람 속도',
  `WIND_SPEED_TRB` float NULL DEFAULT NULL COMMENT 'Wind speed turbulence',
  `YAW_CONVERTER_POWER` float NULL DEFAULT NULL COMMENT '편법 컨버터 파워',
  `YAW_CONVERTER_TEMP` float NULL DEFAULT NULL COMMENT '편법 컨버터 온도',
  `ID` int(11) NOT NULL COMMENT 'ID',
  `TURBINE_ID` int(11) NULL DEFAULT NULL COMMENT '터빈 식별자',
  `UNIX_TS_IN_SECS` bigint(20) NULL DEFAULT NULL,
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci COMMENT = 'SCADA_DATASHEET(INPUT)' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for td_scada_10m
-- ----------------------------
DROP TABLE IF EXISTS `td_scada_10m`;
CREATE TABLE `td_scada_10m`  (
  `DATA_MESURE_TIME` timestamp NULL DEFAULT NULL COMMENT '데이터 측정 시간',
  `ACC_DRIVE_DIR` float NULL DEFAULT NULL COMMENT '가속도 - 구동 방향',
  `ACC_NON_DRIVE_DIR` float NULL DEFAULT NULL COMMENT '가속도 - 비구동 방향',
  `ACTIVE_POWER` float NULL DEFAULT NULL COMMENT '활성 전력',
  `BLADE_ANGLE` float NULL DEFAULT NULL COMMENT '날개 각도',
  `BLADE_1_ANGLE` float NULL DEFAULT NULL COMMENT '1번 날개 각도',
  `BLADE_2_ANGLE` float NULL DEFAULT NULL COMMENT '2번 날개 각도',
  `BLADE_3_ANGLE` float NULL DEFAULT NULL COMMENT '3번 날개 각도',
  `BEARING_TEMP_1` float NULL DEFAULT NULL COMMENT 'Measured temperature of shaft bearing 1',
  `BEARING_TEMP_2` float NULL DEFAULT NULL COMMENT 'Measured temperature of shaft bearing 2',
  `BLADE_1_CONV_INT_TEMP` float NULL DEFAULT NULL COMMENT '1번 날개 컨버터 내부 온도',
  `BLADE_1_TORQUE_RMS` float NULL DEFAULT NULL COMMENT '1번 날개 토크 RMS',
  `BLADE_2_CONV_INT_TEMP` float NULL DEFAULT NULL COMMENT '2번 날개 컨버터 내부 온도',
  `BLADE_2_TORQUE_RMS` float NULL DEFAULT NULL COMMENT '2번 날개 토크 RMS',
  `BLADE_3_CONV_INT_TEMP` float NULL DEFAULT NULL COMMENT '3번 날개 컨버터 내부 온도',
  `BLADE_3_TORQUE_RMS` float NULL DEFAULT NULL COMMENT '3번 날개 토크 RMS',
  `CURRENT_AVG` float NULL DEFAULT NULL COMMENT '평균 전류',
  `ENERGY_CONSUMPTION_10MIN` float NULL DEFAULT NULL COMMENT '10분간의 에너지 소비',
  `ENERGY_PRODUCTION` float NULL DEFAULT NULL COMMENT '에너지 생산량',
  `ENV_TEMP` float NULL DEFAULT NULL COMMENT '환경 온도',
  `GEARBOX_BEARING_TEMP` float NULL DEFAULT NULL COMMENT '기어박스 베어링 온도',
  `GEARBOX_OIL_TANK_TEMP` float NULL DEFAULT NULL COMMENT '기어박스 오일 탱크 온도',
  `GEN_BEARING_DRIVE_TEMP` float NULL DEFAULT NULL COMMENT '발전기 베어링 구동측 온도',
  `GEN_BEARING_NON_DRIVE_TEMP` float NULL DEFAULT NULL COMMENT '발전기 베어링 비구동측 온도',
  `GEN_WINDING_U_TEMP` float NULL DEFAULT NULL COMMENT '발전기 각 위딩 U 온도',
  `GEN_WINDING_V_TEMP` float NULL DEFAULT NULL COMMENT '발전기 각 위딩 V 온도',
  `GEN_WINDING_W_TEMP` float NULL DEFAULT NULL COMMENT '발전기 각 위딩 W 온도',
  `GEN_SPEED` float NULL DEFAULT NULL COMMENT '발전기 속도',
  `IGBT_TEMP_GSC` float NULL DEFAULT NULL COMMENT '컨버터 GSC측 IGBT 온도 (℃)',
  `IGBT_TEMP_LSC` float NULL DEFAULT NULL COMMENT '컨버터 LSC측 IGBT 온도 (℃)',
  `CNV_HEA_SIN_TMP` float NULL DEFAULT NULL COMMENT 'Power converter cooling plate temp.\\\\\\\\n(℃)',
  `MOTOR_TEMP_BLADE_1` float NULL DEFAULT NULL COMMENT '1번 날개 모터 온도',
  `MOTOR_TEMP_BLADE_2` float NULL DEFAULT NULL COMMENT '2번 날개 모터 온도',
  `MOTOR_TEMP_BLADE_3` float NULL DEFAULT NULL COMMENT '3번 날개 모터 온도',
  `NACELLE_INSIDE_TEMP` float NULL DEFAULT NULL COMMENT '나셀 내부 온도',
  `NACELLE_POS_DEVIATION` float NULL DEFAULT NULL COMMENT '나셀 위치 편차',
  `NACELLE_POSITION` float NULL DEFAULT NULL COMMENT '나셀 위치',
  `OIL_INLET_PRESSURE` float NULL DEFAULT NULL COMMENT '오일 유입 압력',
  `PITCH_MOTOR_TEMP` float NULL DEFAULT NULL COMMENT '피치 모터 온도',
  `REACTIVE_POWER` float NULL DEFAULT NULL COMMENT '리액티브 파워',
  `ROTOR_SPEED` float NULL DEFAULT NULL COMMENT '로터 속도',
  `WIND_DIRECTION` float NULL DEFAULT NULL COMMENT '바람 방향',
  `WIND_SPEED` float NULL DEFAULT NULL COMMENT '바람 속도',
  `WIND_SPEED_TRB` float NULL DEFAULT NULL COMMENT 'Wind speed turbulence',
  `YAW_CONVERTER_POWER` float NULL DEFAULT NULL COMMENT '편법 컨버터 파워',
  `YAW_CONVERTER_TEMP` float NULL DEFAULT NULL COMMENT '편법 컨버터 온도',
  `ID` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID',
  `TURBINE_ID` int(11) NULL DEFAULT NULL COMMENT '터빈 식별자',
  PRIMARY KEY (`ID`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 9241 CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci COMMENT = 'SCADA 10-minute average data' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for td_scada_log
-- ----------------------------
DROP TABLE IF EXISTS `td_scada_log`;
CREATE TABLE `td_scada_log`  (
  `DATA_MESURE_TIME` timestamp NULL DEFAULT NULL,
  `TIME_HUB_ACTIVE` int(10) UNSIGNED NULL DEFAULT NULL,
  `TIME_YAW_LEFT_ACTIVE` int(10) UNSIGNED NULL DEFAULT NULL,
  `TIME_YAW_RIGHT_ACTIVE` int(10) UNSIGNED NULL DEFAULT NULL,
  UNIQUE INDEX `time_stamp_UNIQUE`(`DATA_MESURE_TIME`) USING BTREE
) ENGINE = InnoDB CHARACTER SET = utf8mb3 COLLATE = utf8mb3_general_ci COMMENT = 'Periodic log data table' ROW_FORMAT = Dynamic;

-- ----------------------------
-- Procedure structure for SP_MAIN_DA_OUTPUT
-- ----------------------------
DROP PROCEDURE IF EXISTS `SP_MAIN_DA_OUTPUT`;
delimiter ;;
CREATE PROCEDURE `SP_MAIN_DA_OUTPUT`()
BEGIN
	SELECT PITCH_ANGLE_MEAS
	FROM TD_DA_OUTPUT
	ORDER BY ID DESC
	LIMIT 1;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for SP_MAIN_MET
-- ----------------------------
DROP PROCEDURE IF EXISTS `SP_MAIN_MET`;
delimiter ;;
CREATE PROCEDURE `SP_MAIN_MET`()
BEGIN
	SELECT WD_DIR, WD_SPD, AIR_TEMP
	FROM td_met
	ORDER BY ID DESC
	LIMIT 1;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for SP_MAIN_SC_OUTPUT
-- ----------------------------
DROP PROCEDURE IF EXISTS `SP_MAIN_SC_OUTPUT`;
delimiter ;;
CREATE PROCEDURE `SP_MAIN_SC_OUTPUT`()
BEGIN
	SELECT TURBINE_HEALTH_INDEX
	FROM TD_SC_OUTPUT
	ORDER BY ID DESC
	LIMIT 1;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for SP_WT_ALARM
-- ----------------------------
DROP PROCEDURE IF EXISTS `SP_WT_ALARM`;
delimiter ;;
CREATE PROCEDURE `SP_WT_ALARM`()
BEGIN
	#0
	SELECT 
		ID,
		FLAP_ALRT_LVL,
		FLAP_DEL,
		FLAP_ALRM_LVL,
		EDGE_ALRT_LVL,
		EDGE_DEL,
		EDGE_ALRM_LVL,
		REGIST_DT
	FROM TD_DS_BLADE_1
	ORDER BY ID DESC
	LIMIT 1;

	#1
	SELECT 
		ID,
		FLAP_ALRT_LVL,
		FLAP_DEL,
		FLAP_ALRM_LVL,
		EDGE_ALRT_LVL,
		EDGE_DEL,
		EDGE_ALRM_LVL,
		REGIST_DT
	FROM TD_DS_BLADE_2
	ORDER BY ID DESC
	LIMIT 1;

	#2
	SELECT 
		ID,
		FLAP_ALRT_LVL,
		FLAP_DEL,
		FLAP_ALRM_LVL,
		EDGE_ALRT_LVL,
		EDGE_DEL,
		EDGE_ALRM_LVL,
		REGIST_DT
	FROM TD_DS_BLADE_3
	ORDER BY ID DESC
	LIMIT 1;

	#3
	SELECT 
		ID,
		TOP_DIAG_ALRT_LVL,
		TOP_DEL,
		TOP_DIAG_ALRM_LVL,
		NAC_VIB_ALRT_LVL_NORM,
		NAC_VEL_RMS_NORM,
		NAC_VIB_ALRM_LVL_NORM,
		NAC_VIB_ALRT_LVL_LAT,
		NAC_VIB_RMS_LAT,
		NAC_VIB_ALRM_LVL_LAT,
		BOTTOM_DIAG_ALRT_LVL,
		BOTTOM_DEL,
		BOTTOM_DIAG_ALRM_LVL,
		REGIST_DT
	FROM TD_DS_TOWER
	ORDER BY ID DESC
	LIMIT 1;

	#4
	SELECT 
		ID,
		VEL_ALRT_LVL_AX,
		VEL_RMS_AX,
		VEL_ALRM_LVL_AX,
		VEL_ALRT_LVL_HORZ,
		VEL_RMS_HORZ,
		VEL_ALRM_LVL_HORZ,
		ACC_ALRT_LVL_AX,
		ACC_RMS_AX,
		ACC_ALRM_LVL_AX,
		ACC_ALRT_LVL_HORZ,
		ACC_RMS_HORZ,
		ACC_ALRM_LVL_HORZ,
		REGIST_DT
	FROM TD_DS_DRIVE_TRAIN
	ORDER BY ID DESC
	LIMIT 1;

	#5
	SELECT 
		ID,
		MB_DIAG_ALRT_LVL,
		MB_TEMP_DEV,
		MB_DIAG_ALRM_LVL,
		
		GB_DIAG_ALRT_LVL,
		GB_TEMP_DEV,
		GB_DIAG_ALRM_LVL,
		
		GENA_DIAG_ALRT_LVL,
		GENA_TEMP_DEV,
		GENA_DIAG_ALRM_LVL,
		GENB_DIAG_ALRT_LVL,
		GENB_TEMP_DEV,
		GENB_DIAG_ALRM_LVL,
		GENC_DIAG_ALRT_LVL,
		GENC_TEMP_DEV,
		GENC_DIAG_ALRM_LVL,
		
		PITCH_DIAG_ALRT_LVL,
		PITCH_ANGLE_DEV,
		PITCH_DIAG_ALRM_LVL,
		YAW_DIAG_ALRT_LVL,
		YAW_ANGLE_DEV,
		YAW_DIAG_ALRM_LVL,
		POWER_DIAG_ALRT_LVL,
		POWER_DEV,
		POWER_DIAG_ALRM_LVL,

		REGIST_DT
	FROM TD_DA_OUTPUT
	ORDER BY ID DESC
	LIMIT 1;

	#6
	SELECT 
		ID,
		VEL_ALRT_LVL_1SPGB,
		VEL_RMS_1SPGB_HORZ,
		VEL_ALRM_LVL_1SPGB,
		VEL_ALRT_LVL_2SPGB,
		VEL_RMS_2SPGB_HORZ,
		VEL_ALRM_LVL_2SPGB,
		VEL_ALRT_LVL_LSA,
		VEL_RMS_LSA_VERT,
		VEL_ALRM_LVL_LSA,
		VEL_ALRT_LVL_HSA,
		VEL_RMS_HSA_HORZ,
		VEL_ALRM_LVL_HSA,
		ACC_ALRT_LVL_1SPGB,
		ACC_RMS_1SPGB_HORZ,
		ACC_ALRM_LVL_1SPGB,
		ACC_ALRT_LVL_2SPGB,
		ACC_RMS_2SPGB_HORZ,
		ACC_ALRM_LVL_2SPGB,
		ACC_ALRT_LVL_LSA,
		ACC_RMS_LSA_VERT,
		ACC_ALRM_LVL_LSA,
		ACC_ALRT_LVL_HSA,
		ACC_RMS_HSA_HORZ,
		ACC_ALRM_LVL_HSA,

		REGIST_DT
	FROM TD_DS_GEARBOX
	ORDER BY ID DESC
	LIMIT 1;

	#7
	SELECT 
		ID,
		VEL_ALRT_LVL_HORZ_DE,
		VEL_RMS_HORZ_DE,
		VEL_ALRM_LVL_HORZ_DE,
		VEL_ALRT_LVL_HORZ_NDE,
		VEL_RMS_HORZ_NDE,
		VEL_ALRM_LVL_HORZ_NDE,
		ACC_ALRT_LVL_HORZ_DE,
		ACC_RMS_HORZ_DE,
		ACC_ALRM_LVL_HORZ_DE,
		ACC_ALRT_LVL_HORZ_NDE,
		ACC_RMS_HORZ_NDE,
		ACC_ALRM_LVL_HORZ_NDE,

		REGIST_DT
	FROM TD_DS_GENERATOR
	ORDER BY ID DESC
	LIMIT 1;

END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for SP_WT_DIAG_BLADE
-- ----------------------------
DROP PROCEDURE IF EXISTS `SP_WT_DIAG_BLADE`;
delimiter ;;
CREATE PROCEDURE `SP_WT_DIAG_BLADE`()
BEGIN
	SELECT 	
		BM_FLAP,
		BM_EDGE,
		TOR
	FROM TD_DM_BLADE_ONE
	ORDER BY ID DESC
	LIMIT 1;

	SELECT 	
		BM_FLAP,
		BM_EDGE,
		TOR
	FROM TD_DM_BLADE_TWO
	ORDER BY ID DESC
	LIMIT 1;

	SELECT 	
		BM_FLAP,
		BM_EDGE,
		TOR
	FROM TD_DM_BLADE_THREE
	ORDER BY ID DESC
	LIMIT 1;



	SELECT 	
		FLAP_DEL,
		EDGE_DEL
	FROM TD_DS_BLADE_1
	ORDER BY ID DESC
	LIMIT 1;

	SELECT 	
		FLAP_DEL,
		EDGE_DEL
	FROM TD_DS_BLADE_2
	ORDER BY ID DESC
	LIMIT 1;

	SELECT 	
		FLAP_DEL,
		EDGE_DEL
	FROM TD_DS_BLADE_3
	ORDER BY ID DESC
	LIMIT 1;


	#6
	SELECT
		PITCH_DESIGN_AGE,
		PITCH_EST_AGE,
		PITCH_HEALTH_IDX,
		
		TOWER_NOM_AGE,
		TOWER_EST_FAT_AGE,
		TOWER_EST_FAT_MARGIN,

		BLADE_1_NOM_AGE,
		BLADE_1_EST_FAT_AGE,
		BLADE_1_EST_FAT_MARGIN,
		
		BLADE_2_NOM_AGE,
		BLADE_2_EST_FAT_AGE,
		BLADE_2_EST_FAT_MARGIN,
		
		BLADE_3_NOM_AGE,
		BLADE_3_EST_FAT_AGE,
		BLADE_3_EST_FAT_MARGIN
	FROM TD_FP_RUL
	ORDER BY ID DESC
	LIMIT 1;


	#7
	SELECT
		PITCH_ANGLE_MEAS,
		PITCH_ANGLE_PRED,
		PITCH_ANGLE_DEV
	FROM TD_DA_OUTPUT
	ORDER BY ID DESC
	LIMIT 1;

	#8
	SELECT
		TOP_BM_NS,
		TOP_BM_EW,
		TOP_TOR,
		BOTTOM_BM_NS,
		BOTTOM_BM_EW,
		VIB_NORM,
		VIB_LAT
	FROM TD_DM_TOWER
	ORDER BY ID DESC
	LIMIT 1;

	#9
	SELECT
		TOP_DEL,
		NAC_VEL_RMS_NORM,
		NAC_VIB_RMS_LAT
	FROM TD_DS_TOWER
	ORDER BY ID DESC
	LIMIT 1;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for SP_WT_DIAG_GEARBOX
-- ----------------------------
DROP PROCEDURE IF EXISTS `SP_WT_DIAG_GEARBOX`;
delimiter ;;
CREATE PROCEDURE `SP_WT_DIAG_GEARBOX`()
BEGIN
	#0
	SELECT 	
		VIB_ACC_1SPGB_HORZ,
		VIB_ACC_2SPGB_HORZ,
		VIB_ACC_LSA_VERT,
		VIB_ACC_HSA_HORZ,
		VIB_VEL_1SPGB_HORZ,
		VIB_VEL_2SPGB_HORZ,
		VIB_VEL_LSA_VERT,
		VIB_VEL_HSA_HORZ
	FROM TD_DM_GEARBOX
	ORDER BY ID DESC
	LIMIT 1;

	#1
	SELECT 	
		ACC_RMS_1SPGB_HORZ,
		ACC_RMS_2SPGB_HORZ,
		ACC_RMS_LSA_VERT,
		ACC_RMS_HSA_HORZ,
		VEL_RMS_1SPGB_HORZ,
		VEL_RMS_2SPGB_HORZ,
		VEL_RMS_LSA_VERT,
		VEL_RMS_HSA_HORZ
	FROM TD_DS_GEARBOX
	ORDER BY ID DESC
	LIMIT 1;

	#2
	SELECT 	
		MB_MEAS_TEMP,
		MB_PRED_TEMP,
		MB_TEMP_DEV,
		GB_MEAS_TEMP,
		GB_PRED_TEMP,
		GB_TEMP_DEV
	FROM TD_DA_OUTPUT
	ORDER BY ID DESC
	LIMIT 1;

	#3
	SELECT 	
		MB_DESIGN_LIFE,
		MB_EST_LIFE,
		MB_HEALTH_IDX,
		GB_DESIGN_AGE,
		GB_EST_AGE,
		GB_HEALTH_IDX
	FROM TD_FP_RUL
	ORDER BY ID DESC
	LIMIT 1;

	#4
	SELECT 	
		VIB_ACC_AX,
		VIB_ACC_HORZ,
		VIB_VEL_AX,
		VIB_VEL_HORZ
	FROM TD_DM_DRIVE_TRAIN
	ORDER BY ID DESC
	LIMIT 1;

	#5
	SELECT 	
		ACC_RMS_AX,
		ACC_RMS_HORZ,
		VEL_RMS_AX,
		VEL_RMS_HORZ
	FROM TD_DS_DRIVE_TRAIN
	ORDER BY ID DESC
	LIMIT 1;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for SP_WT_DIAG_GENERATOR
-- ----------------------------
DROP PROCEDURE IF EXISTS `SP_WT_DIAG_GENERATOR`;
delimiter ;;
CREATE PROCEDURE `SP_WT_DIAG_GENERATOR`()
BEGIN
	#0
	SELECT 	
		VIB_ACC_DE_HORZ,
		VIB_ACC_NDE_HORZ,
		VIB_VEL_DE_HORZ,
		VIB_VEL_NDE_HORZ
	FROM TD_DM_GENERATOR
	ORDER BY ID DESC
	LIMIT 1;

	#1
	SELECT 	
		ACC_RMS_HORZ_DE,
		ACC_RMS_HORZ_NDE,
		VEL_RMS_HORZ_DE,
		VEL_RMS_HORZ_NDE
	FROM TD_DS_GENERATOR
	ORDER BY ID DESC
	LIMIT 1;

	#2
	SELECT
		GENA_MEAS_TEMP,
		GENA_PRED_TEMP,
		GENA_TEMP_DEV,
		GENB_MEAS_TEMP,
		GENB_PRED_TEMP,
		GENB_TEMP_DEV,
		GENC_MEAS_TEMP,
		GENC_PRED_TEMP,
		GENC_TEMP_DEV
	FROM TD_DA_OUTPUT
	ORDER BY ID DESC
	LIMIT 1;

	#3
	SELECT 	
		GEN_DESIGN_AGE,
		GEN_EST_AGE,
		GEN_HEALTH_IDX
	FROM TD_FP_RUL
	ORDER BY ID DESC
	LIMIT 1;


END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for SP_WT_DIAG_YAW
-- ----------------------------
DROP PROCEDURE IF EXISTS `SP_WT_DIAG_YAW`;
delimiter ;;
CREATE PROCEDURE `SP_WT_DIAG_YAW`()
BEGIN
	#0
	SELECT 	
		YAW_ANGLE_NACELLE,
		YAW_ANGLE_WIND_DIR,
		YAW_ANGLE_DEV
	FROM TD_DA_OUTPUT
	ORDER BY ID DESC
	LIMIT 1;

	#1
	SELECT 	
		YAW_DESIGN_AGE,
		YAW_EST_AGE,
		YAW_HEALTH_IDX
	FROM TD_FP_RUL
	ORDER BY ID DESC
	LIMIT 1;

END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for SP_WT_MAIN
-- ----------------------------
DROP PROCEDURE IF EXISTS `SP_WT_MAIN`;
delimiter ;;
CREATE PROCEDURE `SP_WT_MAIN`()
BEGIN
	SELECT PITCH_ANGLE_MEAS
	FROM TD_DA_OUTPUT
	ORDER BY ID DESC
	LIMIT 1;
	
	SELECT WD_DIR, WD_SPD, AIR_TEMP
	FROM td_met
	ORDER BY ID DESC
	LIMIT 1;
	
	SELECT TURBINE_HEALTH_INDEX
	FROM TD_SC_OUTPUT
	ORDER BY ID DESC
	LIMIT 1;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for SP_WT_OVER_BLADE
-- ----------------------------
DROP PROCEDURE IF EXISTS `SP_WT_OVER_BLADE`;
delimiter ;;
CREATE PROCEDURE `SP_WT_OVER_BLADE`()
BEGIN
	SELECT 
		BM_FLAP,
		BM_EDGE,
		TOR
	FROM TD_DM_BLADE_ONE
	ORDER BY ID DESC
	LIMIT 1;

	SELECT 
		BM_FLAP,
		BM_EDGE,
		TOR
	FROM TD_DM_BLADE_TWO
	ORDER BY ID DESC
	LIMIT 1;

	SELECT 
		BM_FLAP,
		BM_EDGE,
		TOR
	FROM TD_DM_BLADE_THREE
	ORDER BY ID DESC
	LIMIT 1;
	
	SELECT 
		PITCH_ANGLE_MEAS
	FROM TD_DA_OUTPUT
	ORDER BY ID DESC
	LIMIT 1;

	SELECT 
		PITCH_DESIGN_AGE,
		PITCH_EST_AGE,
		PITCH_HEALTH_IDX
	FROM TD_FP_RUL
	ORDER BY ID DESC
	LIMIT 1;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for SP_WT_OVER_GEARBOX
-- ----------------------------
DROP PROCEDURE IF EXISTS `SP_WT_OVER_GEARBOX`;
delimiter ;;
CREATE PROCEDURE `SP_WT_OVER_GEARBOX`()
BEGIN
	SELECT 
		VIB_ACC_AX,
		VIB_ACC_HORZ,
		VIB_VEL_AX,
		VIB_VEL_HORZ
	FROM TD_DM_DRIVE_TRAIN
	ORDER BY ID DESC
	LIMIT 1;

	SELECT 
		VIB_ACC_1SPGB_HORZ,
		VIB_ACC_2SPGB_HORZ,
		VIB_ACC_LSA_VERT,
		VIB_ACC_HSA_HORZ,
		VIB_VEL_1SPGB_HORZ,
		VIB_VEL_2SPGB_HORZ,
		VIB_VEL_LSA_VERT,
		VIB_VEL_HSA_HORZ
	FROM TD_DM_GEARBOX
	ORDER BY ID DESC
	LIMIT 1;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for SP_WT_OVER_GENERATOR
-- ----------------------------
DROP PROCEDURE IF EXISTS `SP_WT_OVER_GENERATOR`;
delimiter ;;
CREATE PROCEDURE `SP_WT_OVER_GENERATOR`()
BEGIN
	SELECT 
		*
	FROM TD_DM_GENERATOR
	ORDER BY ID DESC
	LIMIT 1;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for SP_WT_OVER_NACELLE
-- ----------------------------
DROP PROCEDURE IF EXISTS `SP_WT_OVER_NACELLE`;
delimiter ;;
CREATE PROCEDURE `SP_WT_OVER_NACELLE`()
BEGIN
	SELECT 
		TOP_BM_NS,
		TOP_BM_EW,
		TOP_TOR,
		BOTTOM_BM_NS,
		BOTTOM_BM_EW,
		VIB_NORM,
		VIB_LAT
	FROM TD_DM_TOWER
	ORDER BY ID DESC
	LIMIT 1;
END
;;
delimiter ;

-- ----------------------------
-- Procedure structure for SP_WT_OVER_YAW
-- ----------------------------
DROP PROCEDURE IF EXISTS `SP_WT_OVER_YAW`;
delimiter ;;
CREATE PROCEDURE `SP_WT_OVER_YAW`()
BEGIN
	SELECT 
		*
	FROM TD_FP_RUL
	ORDER BY ID DESC
	LIMIT 1;
END
;;
delimiter ;

SET FOREIGN_KEY_CHECKS = 1;

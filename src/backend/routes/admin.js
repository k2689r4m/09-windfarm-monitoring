var express = require("express");
var router = express.Router();
const redisClient = require("../util/redis.util");
const crypto = require("crypto");
const { check, validationResult } = require("express-validator");
const axios = require("axios");
const seon = require("../seon");
const dayjs = require("dayjs");
const fs = require("fs");
const iconv = require("iconv-lite");
const { format } = require("path");


const isEmpty = function (value) {
  if (
    value == "" ||
    value == null ||
    value == undefined ||
    (value != null && typeof value == "object" && !Object.keys(value).length)
  ) {
    return null;
  } else {
    return value;
  }
};

const isEmpty2 = function (value) {
  if (
    value == "" ||
    value == null ||
    value == undefined ||
    (value != null && typeof value == "object" && !Object.keys(value).length)
  ) {
    return 0;
  } else {
    return value;
  }
};

const isEmpty3 = function (value) {
  if (
    value == "" ||
    value == null ||
    value == undefined ||
    (value != null && typeof value == "object" && !Object.keys(value).length)
  ) {
    return "";
  } else {
    return value;
  }
};

/* GET home page. */
router.get("/", async function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.post("/logout", async (req, res) => {
  const userId = req.decoded.userId;

  const n = await redisClient.v4.exists(userId);

  if (n) await redisClient.v4.del(userId);

  return res.status(200).json({
    status: 200,
  });
});



router.get('/main/info', async (req, res) =>{
  const wt = await seon.DBOriginCall('wt', `CALL SP_WT_MAIN()`);
  const ts = await seon.DBOriginCall('ts', `CALL SP_TS_MAIN()`);

  const resultObj = {
    WT_NAME: ts[0][0]?.WT_NAME ?? 0,
    WD_DIR: wt[1][0]?.WD_DIR ?? 0,
    WD_SPD: wt[1][0]?.WD_SPD ?? 0,
    AIR_TEMP: wt[1][0]?.AIR_TEMP ?? 0,
    WNAC_WD_DIR: ts[1][0]?.WNAC_WD_DIR ?? 0,
    WNAC_WD_SPD: ts[1][0]?.WNAC_WD_SPD ?? 0,
    WNAC_EX_TMP: ts[1][0]?.WNAC_EX_TMP ?? 0,
    ROT_SPD: { value: (ts[1][0]?.ROT_SPD).toFixed(3) ?? 0, min:0, max:30 },
    PITCH_ANGLE_MEAS: { value: (Number(wt[0][0]?.PITCH_ANGLE_MEAS)).toFixed(2) ?? 0, min:0, max:90 },
    WYAW_YAW_ANG: { value: (Number(ts[1][0]?.WYAW_YAW_ANG)).toFixed(2) ?? 0, min:0, max:360 },
    GI_PF: ts[1][0]?.GI_PF ?? 0,
    WCNV_HZ: ts[1][0]?.WCNV_HZ ?? 0,

    TURBINE_HEALTH_INDEX: { value: wt[2][0]?.TURBINE_HEALTH_INDEX ?? 0, rate: wt[2][0]?.TURBINE_HEALTH_INDEX ? wt[2][0].TURBINE_HEALTH_INDEX+(wt[2][0].TURBINE_HEALTH_INDEX*0.2) : 0},
    
    TOT_WH: { value: (Number(ts[1][0]?.TOT_WH/1000000)).toFixed(3) ?? 0, rate: ts[1][0]?.TOT_WH ? (ts[1][0].TOT_WH/3000000)*120 : 0},
    TOT_WH_1D: { value: (Number(ts[2][0]?.TOT_WH_1D)*0.001).toFixed(3) ?? 0, rate: ts[2][0]?.TOT_WH_1D ? (ts[2][0].TOT_WH_1D/3000000)*120 : 0},
    TOT_WH_1M: { value: (Number(ts[3][0]?.TOT_WH_1M)*0.001).toFixed(3) ?? 0, rate: ts[3][0]?.TOT_WH_1M ? (ts[3][0].TOT_WH_1M/3000000)*120 : 0},
  }

  // console.log(`TOT_WH: ${ts[1][0]?.TOT_WH}, TOT_WH_1D: ${ts[2][0]?.TOT_WH_1D}, TOT_WH_1M: ${ts[3][0]?.TOT_WH_1M}`);

  return res.send(resultObj);
});

router.get('/over/blade', async (req, res) =>{
  const wt = await seon.DBOriginCall('wt', `CALL SP_WT_OVER_BLADE()`);
  const ts = await seon.DBOriginCall('ts', `CALL SP_TS_OVER_BLADE()`);

  const blade1 = {
    PT_ANG_VAL_BL_1: { value: ts[0][0]?.PT_ANG_VAL_BL_1 ?? 0, min:0, max:90 },
    TQ_RMS_BL_1: { value: ts[0][0]?.TQ_RMS_BL_1 ?? 0, min:-60, max:60 },
    PT_CNV_DCL_VOL_BL_1: { value: ts[0][0]?.PT_CNV_DCL_VOL_BL_1 ?? 0, min:0, max:600 },
    PT_UPS_V_BL_1: { value: ts[0][0]?.PT_UPS_V_BL_1 ?? 0, min:400, max:420 },
    PT_MOT_TMP_BL_1: { value: ts[0][0]?.PT_MOT_TMP_BL_1 ?? 0, min:25, max:46 },
    PT_CABI_TMP_BL_1: { value: ts[0][0]?.PT_CABI_TMP_BL_1 ?? 0, min:0, max:70 },

    BM_FLAP: { value: wt[0][0]?.BM_FLAP ?? 0, min:-500000000, max:500000000 },
    BM_EDGE: { value: wt[0][0]?.BM_EDGE ?? 0, min:-500000000, max:500000000 },
    TOR: { value: wt[0][0]?.TOR ?? 0, min:-500000000, max:500000000 },

    BLD_1_ST: ts[0][0]?.BLD_1_ST ?? 0,
    BLD_1_BRK_ST: ts[0][0]?.BLD_1_BRK_ST ?? 0,
    BLD_1_UPS_ST: ts[0][0]?.BLD_1_UPS_ST ?? 0,
  }

  const blade2 = {
    PT_ANG_VAL_BL_2: { value: ts[0][0]?.PT_ANG_VAL_BL_2 ?? 0, min:0, max:90 },
    TQ_RMS_BL_2: { value: ts[0][0]?.TQ_RMS_BL_2 ?? 0, min:-60, max:60 },
    PT_CNV_DCL_VOL_BL_2: { value: ts[0][0]?.PT_CNV_DCL_VOL_BL_2 ?? 0, min:0, max:600 },
    PT_UPS_V_BL_2: { value: ts[0][0]?.PT_UPS_V_BL_2 ?? 0, min:400, max:420 },
    PT_MOT_TMP_BL_2: { value: ts[0][0]?.PT_MOT_TMP_BL_2 ?? 0, min:25, max:46 },
    PT_CABI_TMP_BL_2: { value: ts[0][0]?.PT_CABI_TMP_BL_2 ?? 0, min:0, max:70 },

    BM_FLAP: { value: wt[1][0]?.BM_FLAP ?? 0, min:-500000000, max:500000000 },
    BM_EDGE: { value: wt[1][0]?.BM_EDGE ?? 0, min:-500000000, max:500000000 },
    TOR: { value: wt[1][0]?.TOR ?? 0, min:-500000000, max:500000000 },
    BLD_2_ST: ts[0][0]?.BLD_2_ST ?? 0,
    BLD_2_BRK_ST: ts[0][0]?.BLD_2_BRK_ST ?? 0,
    BLD_2_UPS_ST: ts[0][0]?.BLD_2_UPS_ST ?? 0,
  }

  const blade3 = {
    PT_ANG_VAL_BL_3: { value: ts[0][0]?.PT_ANG_VAL_BL_3 ?? 0, min:0, max:90 },
    TQ_RMS_BL_3: { value: ts[0][0]?.TQ_RMS_BL_3 ?? 0, min:-60, max:60 },
    PT_CNV_DCL_VOL_BL_3: { value: ts[0][0]?.PT_CNV_DCL_VOL_BL_3 ?? 0, min:0, max:600 },
    PT_UPS_V_BL_3: { value: ts[0][0]?.PT_UPS_V_BL_3 ?? 0, min:400, max:420 },
    PT_MOT_TMP_BL_3: { value: ts[0][0]?.PT_MOT_TMP_BL_3 ?? 0, min:25, max:46 },
    PT_CABI_TMP_BL_3: { value: ts[0][0]?.PT_CABI_TMP_BL_3 ?? 0, min:0, max:70 },

    BM_FLAP: { value: wt[2][0]?.BM_FLAP ?? 0, min:-500000000, max:500000000 },
    BM_EDGE: { value: wt[2][0]?.BM_EDGE ?? 0, min:-500000000, max:500000000 },
    TOR: { value: wt[2][0]?.TOR ?? 0, min:-500000000, max:500000000 },
    BLD_3_ST: ts[0][0]?.BLD_3_ST ?? 0,
    BLD_3_BRK_ST: ts[0][0]?.BLD_3_BRK_ST ?? 0,
    BLD_3_UPS_ST: ts[0][0]?.BLD_3_UPS_ST ?? 0,
  }

  const pitch = {
    PITCH_ANGLE_MEAS: { value: wt[3][0]?.PITCH_ANGLE_MEAS ?? 0, min:0, max:90 },
    PITCH_DESIGN_AGE: { value: wt[4][0]?.PITCH_DESIGN_AGE ?? 0, min:0, max:240 },
    PITCH_EST_AGE: { value: wt[4][0]?.PITCH_EST_AGE ?? 0, min:0, max:240 },
    PITCH_HEALTH_IDX: { value: wt[4][0]?.PITCH_HEALTH_IDX ?? 0, min:0, max:100 },
  }

  const resultObj = {
    BLADE1: blade1,
    BLADE2: blade2,
    BLADE3: blade3,
    PITCH: pitch,
  }


  return res.send(resultObj);
});

router.get('/over/nacelle', async (req, res) =>{
  const wt = await seon.DBOriginCall('wt', `CALL SP_WT_OVER_NACELLE()`);
  const ts = await seon.DBOriginCall('ts', `CALL SP_TS_MAIN()`);

  const resultObj = {
    TOP_BM_NS: { value: wt[0][0]?.TOP_BM_NS ?? 0, min:-350000000, max:350000000 },
    TOP_BM_EW: { value: wt[0][0]?.TOP_BM_EW ?? 0, min:-350000000, max:350000000 },
    TOP_TOR: { value: wt[0][0]?.TOP_TOR ?? 0, min:-350000000, max:350000000 },
    BOTTOM_BM_NS: { value: wt[0][0]?.BOTTOM_BM_NS ?? 0, min:-350000000, max:350000000 },
    BOTTOM_BM_EW: { value: wt[0][0]?.BOTTOM_BM_EW ?? 0, min:-350000000, max:350000000 },
    VIB_NORM: { value: wt[0][0]?.VIB_NORM ?? 0, min:0, max:0.5 },
    VIB_LAT: { value: wt[0][0]?.VIB_LAT ?? 0, min:0, max:0.5 },

    WNAC_WD_SPD: ts[1][0]?.WNAC_WD_SPD ?? 0,
  }

  return res.send(resultObj);
});


router.get('/over/gearBox', async (req, res) =>{
  const wt = await seon.DBOriginCall('wt', `CALL SP_WT_OVER_GEARBOX()`);
  const ts = await seon.DBOriginCall('ts', `CALL SP_TS_OVER_GEARBOX()`);

  const resultObj = {
    // TM_TMP_SHF_BRG_MAX: ts[0][0]?.TM_TMP_SHF_BRG_MAX ?? 0,
    // VIB_ACC_1SPGB_HORZ: wt[1][0]?.VIB_ACC_1SPGB_HORZ ?? 0,
    // VIB_ACC_2SPGB_HORZ: wt[1][0]?.VIB_ACC_2SPGB_HORZ ?? 0,
    // VIB_ACC_LSA_VERT: wt[1][0]?.VIB_ACC_LSA_VERT ?? 0,
    // VIB_ACC_HSA_HORZ: wt[1][0]?.VIB_ACC_HSA_HORZ ?? 0,
    // VIB_VEL_1SPGB_HORZ: wt[1][0]?.VIB_VEL_1SPGB_HORZ ?? 0,
    // VIB_VEL_2SPGB_HORZ: wt[1][0]?.VIB_VEL_2SPGB_HORZ ?? 0,
    // VIB_VEL_LSA_VERT: wt[1][0]?.VIB_VEL_LSA_VERT ?? 0,
    // VIB_VEL_HSA_HORZ: wt[1][0]?.VIB_VEL_HSA_HORZ ?? 0,
    // ROT_SPD: ts[0][0]?.ROT_SPD ?? 0,
    // GBX_OIL_PRES: ts[0][0]?.GBX_OIL_PRES ?? 0,
    // GBX_OIL_IN_PRES: ts[0][0]?.GBX_OIL_IN_PRES ?? 0,
    // TM_TMP_GBX_OIL: ts[0][0]?.TM_TMP_GBX_OIL ?? 0,
    // GBX_OIL_TNK_TMP: ts[0][0]?.GBX_OIL_TNK_TMP ?? 0,
    // GBX_OIL_HT_TMP: ts[0][0]?.GBX_OIL_HT_TMP ?? 0,


    TM_TMP_SHF_BRG_MAX: { value: ts[0][0]?.TM_TMP_SHF_BRG_MAX ?? 0, min:0, max:70 },

    VIB_ACC_1SPGB_HORZ: { value: wt[1][0]?.VIB_ACC_1SPGB_HORZ ?? 0, min:0, max:0.5 },
    VIB_ACC_2SPGB_HORZ: { value: wt[1][0]?.VIB_ACC_2SPGB_HORZ ?? 0, min:0, max:12 },

    
    VIB_ACC_LSA_VERT: { value: wt[1][0]?.VIB_ACC_LSA_VERT ?? 0, min:0, max:12 },
    VIB_ACC_HSA_HORZ: { value: wt[1][0]?.VIB_ACC_HSA_HORZ ?? 0, min:0, max:12 },
    VIB_VEL_1SPGB_HORZ: { value: wt[1][0]?.VIB_VEL_1SPGB_HORZ ?? 0, min:0, max:5.6 },
    VIB_VEL_2SPGB_HORZ: { value: wt[1][0]?.VIB_VEL_2SPGB_HORZ ?? 0, min:0, max:5.6 },
    VIB_VEL_LSA_VERT: { value: wt[1][0]?.VIB_VEL_LSA_VERT ?? 0, min:0, max:5.6 },
    VIB_VEL_HSA_HORZ: { value: wt[1][0]?.VIB_VEL_HSA_HORZ ?? 0, min:0, max:5.6 },

    ROT_SPD: { value: ts[0][0]?.ROT_SPD ?? 0, min:0, max:30 },
    GBX_OIL_PRES: { value: ts[0][0]?.GBX_OIL_PRES ?? 0, min:0, max:1275 },      // bar -> Pa
    GBX_OIL_IN_PRES: { value: ts[0][0]?.GBX_OIL_IN_PRES ?? 0, min:0, max:1275 },   // bar -> Pa
    TM_TMP_GBX_OIL: { value: ts[0][0]?.TM_TMP_GBX_OIL ?? 0, min:0, max:70 },
    GBX_OIL_TNK_TMP: { value: ts[0][0]?.GBX_OIL_TNK_TMP ?? 0, min:0, max:70 },
    GBX_OIL_HT_TMP: { value: ts[0][0]?.GBX_OIL_HT_TMP ?? 0, min:0, max:70 },

    VIB_ACC_AX: { value: wt[0][0]?.VIB_ACC_AX ?? 0, min:0, max:0.5 },
    VIB_ACC_HORZ: { value: wt[0][0]?.VIB_ACC_HORZ ?? 0, min:0, max:0.5 },
    VIB_VEL_AX: { value: wt[0][0]?.VIB_VEL_AX ?? 0, min:0, max:3.2 }, //
    VIB_VEL_HORZ: { value: wt[0][0]?.VIB_VEL_HORZ ?? 0, min:0, max:3.2 }, //

    GBX_ST: ts[0][0]?.GBX_ST ?? 0,
    GBX_FAN_LO_SPD_ST: ts[0][0]?.GBX_FAN_LO_SPD_ST ?? 0,
    GBX_FAN_HI_SPD_ST: ts[0][0]?.GBX_FAN_HI_SPD_ST ?? 0,
    ROT_LOCK_SET_ST: ts[0][0]?.ROT_LOCK_SET_ST ?? 0,
    ROT_LOCK_FREE_ST: ts[0][0]?.ROT_LOCK_FREE_ST ?? 0,
    GBX_OIL_PMP_LO_SPD_ST: ts[0][0]?.GBX_OIL_PMP_LO_SPD_ST ?? 0,
    GBX_OIL_PMP_HI_SPD_ST: ts[0][0]?.GBX_OIL_PMP_HI_SPD_ST ?? 0,
    GBX_OIL_LEV_ST: ts[0][0]?.GBX_OIL_LEV_ST ?? 0,
  }
  
  return res.send(resultObj);
});

router.get('/over/generator', async (req, res) =>{
  const wt = await seon.DBOriginCall('wt', `CALL SP_WT_OVER_GENERATOR()`);
  const ts = await seon.DBOriginCall('ts', `CALL SP_TS_OVER_GENERATOR()`);

  const resultObj = {
    GN_TMP_IN_LET: { value: ts[0][0]?.GN_TMP_IN_LET ?? 0, min:0, max:70 },
    GN_BRG_NDET_TMP: { value: ts[0][0]?.GN_BRG_NDET_TMP ?? 0, min:25, max:85 },
    WGEN_SPD: { value: ts[0][0]?.WGEN_SPD ?? 0, min:-5, max:1400 },
    GN_SLI_TMP: { value: ts[0][0]?.GN_SLI_TMP ?? 0, min:0, max:70 },
    WGEN_W: { value: ts[0][0]?.WGEN_W ?? 0, min:0, max:23000 },
    GN_TMP_U: { value: ts[0][0]?.GN_TMP_U ?? 0, min:0, max:70 },
    GN_TMP_V: { value: ts[0][0]?.GN_TMP_V ?? 0, min:0, max:70 },
    GN_TMP_W: { value: ts[0][0]?.GN_TMP_W ?? 0, min:0, max:70 },
    GN_BRG_DET_TMP: { value: ts[0][0]?.GN_BRG_DET_TMP ?? 0, min:0, max:70 },
    GN_TMP_STA_MAX: { value: ts[0][0]?.GN_TMP_STA_MAX ?? 0, min:0, max:70 },
    GN_BRG_TMP_MAX: { value: ts[0][0]?.GN_BRG_TMP_MAX ?? 0, min:0, max:70 },
    
    VIB_ACC_DE_HORZ: { value: wt[0][0]?.VIB_ACC_DE_HORZ ?? 0, min:0, max:16 },
    VIB_ACC_NDE_HORZ: { value: wt[0][0]?.VIB_ACC_NDE_HORZ ?? 0, min:0, max:16 },
    VIB_VEL_DE_HORZ: { value: wt[0][0]?.VIB_VEL_DE_HORZ ?? 0, min:0, max:10 },
    VIB_VEL_NDE_HORZ: { value: wt[0][0]?.VIB_VEL_NDE_HORZ ?? 0, min:0, max:10 },

    GN_BRK_HY_PRES_ST: ts[0][0]?.GN_BRK_HY_PRES_ST ?? 0,
    GN_BRK_HY_PMP_ST: ts[0][0]?.GN_BRK_HY_PMP_ST ?? 0,
    GBX_HY_OIL_LEV_ST: ts[0][0]?.GBX_HY_OIL_LEV_ST ?? 0,
    GBX_HY_OIL_TMP_ST: ts[0][0]?.GBX_HY_OIL_TMP_ST ?? 0,
    BRK_OPEN_ST: ts[0][0]?.BRK_OPEN_ST ?? 0,
    BRK_PRES_ST: ts[0][0]?.BRK_PRES_ST ?? 0,
    GN_CL_PMP_ST: ts[0][0]?.GN_CL_PMP_ST ?? 0,
  }

  return res.send(resultObj);
});


router.get('/over/yaw', async (req, res) =>{
  const wt = await seon.DBOriginCall('wt', `CALL SP_WT_OVER_YAW()`);
  const ts = await seon.DBOriginCall('ts', `CALL SP_TS_OVER_YAW()`);

  const resultObj = {
    WYAW_YW_SPD: { value: ts[0][0]?.WYAW_YW_SPD ?? 0, min:-1500, max:1500 },
    WYAW_YW_TORQ: { value: ts[0][0]?.WYAW_YW_TORQ ?? 0, min:-100, max:100 },
    WYAW_YAW_ANG: { value: ts[0][0]?.WYAW_YAW_ANG ?? 0, min:0, max:360 },
    WYAW_YW_POS_ERR_DMD: { value: ts[0][0]?.WYAW_YW_POS_ERR_DMD ?? 0, min:0, max:360 },
    WYAW_YAW_ANG: { value: ts[0][0]?.WYAW_YAW_ANG ?? 0, min:0, max:360 },
    YAW_DESIGN_AGE: { value: wt[0][0]?.YAW_DESIGN_AGE ?? 0, min:0, max:240 },
    YAW_EST_AGE: { value: wt[0][0]?.YAW_EST_AGE ?? 0, min:0, max:240 },
    YAW_HEALTH_IDX: { value: wt[0][0]?.YAW_HEALTH_IDX ?? 0, min:0, max:100 },

    WYAW_POS_OK_ST: ts[0][0]?.WYAW_POS_OK_ST ?? 0,
    WYAW_SER_BOX_ST: ts[0][0]?.WYAW_SER_BOX_ST ?? 0,
    WYAW_POS_NOT_MOV_ST: ts[0][0]?.WYAW_POS_NOT_MOV_ST ?? 0,
    WYAW_POS_END_ST: ts[0][0]?.WYAW_POS_END_ST ?? 0,
    WYAW_MOT_BRK_ST: ts[0][0]?.WYAW_MOT_BRK_ST ?? 0,
    WYAW_YW_ST: ts[0][0]?.WYAW_YW_ST ?? 0,
    WYAW_POS_INI_ST: ts[0][0]?.WYAW_POS_INI_ST ?? 0,
    WYAW_CM_YW_AUT_ST: ts[0][0]?.WYAW_CM_YW_AUT_ST ?? 0,
    WYAW_ON_ST: ts[0][0]?.WYAW_ON_ST ?? 0,
  }

  return res.send(resultObj);
});


router.get('/diag/blade', async (req, res) =>{
  const wt = await seon.DBOriginCall('wt', `CALL SP_WT_DIAG_BLADE()`);

  const resultObj = {
    blade1: {
      BM_FLAP: { value: wt[0][0]?.BM_FLAP ?? 0, min:-500000000, max:500000000 },
      BM_EDGE: { value: wt[0][0]?.BM_EDGE ?? 0, min:-500000000, max:500000000 },
      TOR: { value: wt[0][0]?.TOR ?? 0, min:-500000000, max:500000000 },
      FLAP_DEL: { value: wt[3][0]?.FLAP_DEL ?? 0, min:0, max:100 },
      EDGE_DEL: { value: wt[3][0]?.EDGE_DEL ?? 0, min:0, max:100 },
      BLADE_NOM_AGE: { value: wt[6][0]?.BLADE_1_NOM_AGE ?? 0, min:0, max:240 },
      BLADE_EST_FAT_AGE: { value: wt[6][0]?.BLADE_1_EST_FAT_AGE ?? 0, min:0, max:240 },
      BLADE_EST_FAT_MARGIN: { value: wt[6][0]?.BLADE_1_EST_FAT_MARGIN ?? 0, min:0, max:240 },
    },

    blade2: {
      BM_FLAP: { value: wt[1][0]?.BM_FLAP ?? 0, min:-500000000, max:500000000 },
      BM_EDGE: { value: wt[1][0]?.BM_EDGE ?? 0, min:-500000000, max:500000000 },
      TOR: { value: wt[1][0]?.TOR ?? 0, min:-500000000, max:500000000 },
      FLAP_DEL: { value: wt[4][0]?.FLAP_DEL ?? 0, min:0, max:100 },
      EDGE_DEL: { value: wt[4][0]?.EDGE_DEL ?? 0, min:0, max:100 },
      BLADE_NOM_AGE: { value: wt[6][0]?.BLADE_2_NOM_AGE ?? 0, min:0, max:240 },
      BLADE_EST_FAT_AGE: { value: wt[6][0]?.BLADE_2_EST_FAT_AGE ?? 0, min:0, max:240 },
      BLADE_EST_FAT_MARGIN: { value: wt[6][0]?.BLADE_2_EST_FAT_MARGIN ?? 0, min:0, max:240 },
    },

    blade3: {
      BM_FLAP: { value: wt[2][0]?.BM_FLAP ?? 0, min:-500000000, max:500000000 },
      BM_EDGE: { value: wt[2][0]?.BM_EDGE ?? 0, min:-500000000, max:500000000 },
      TOR: { value: wt[2][0]?.TOR ?? 0, min:-500000000, max:500000000 },
      FLAP_DEL: { value: wt[5][0]?.FLAP_DEL ?? 0, min:0, max:100 },
      EDGE_DEL: { value: wt[5][0]?.EDGE_DEL ?? 0, min:0, max:100 },
      BLADE_NOM_AGE: { value: wt[6][0]?.BLADE_3_NOM_AGE ?? 0, min:0, max:240 },
      BLADE_EST_FAT_AGE: { value: wt[6][0]?.BLADE_3_EST_FAT_AGE ?? 0, min:0, max:240 },
      BLADE_EST_FAT_MARGIN: { value: wt[6][0]?.BLADE_3_EST_FAT_MARGIN ?? 0, min:0, max:240 },
    },

    PITCH_ANGLE_MEAS: { value: wt[7][0]?.PITCH_ANGLE_MEAS ?? 0, min:0, max:90 },
    PITCH_ANGLE_PRED: { value: wt[7][0]?.PITCH_ANGLE_PRED ?? 0, min:0, max:90 },
    PITCH_ANGLE_DEV: { value: wt[7][0]?.PITCH_ANGLE_DEV ?? 0, min:0, max:90 },

    PITCH_DESIGN_AGE: { value: wt[6][0]?.PITCH_DESIGN_AGE ?? 0, min:0, max:240 },
    PITCH_EST_AGE: { value: wt[6][0]?.PITCH_EST_AGE ?? 0, min:0, max:240 },
    PITCH_HEALTH_IDX: { value: wt[6][0]?.PITCH_HEALTH_IDX ?? 0, min:0, max:240 },

    TOP_BM_NS: { value: wt[8][0]?.TOP_BM_NS ?? 0, min:-350000000, max:350000000 },
    TOP_BM_EW: { value: wt[8][0]?.TOP_BM_EW ?? 0, min:-350000000, max:350000000 },
    TOP_TOR: { value: wt[8][0]?.TOP_TOR ?? 0, min:-350000000, max:350000000 },
    TOP_DEL: { value: wt[9][0]?.TOP_DEL ?? 0, min:0, max:100 },

    TOWER_NOM_AGE: { value: wt[6][0]?.TOWER_NOM_AGE ?? 0, min:0, max:240 },
    TOWER_EST_FAT_AGE: { value: wt[6][0]?.TOWER_EST_FAT_AGE ?? 0, min:0, max:240 },
    TOWER_EST_FAT_MARGIN: { value: wt[6][0]?.TOWER_EST_FAT_MARGIN ?? 0, min:0, max:240 },

    BOTTOM_BM_NS: { value: wt[8][0]?.BOTTOM_BM_NS ?? 0, min:-350000000, max:350000000 },
    BOTTOM_BM_EW: { value: wt[8][0]?.BOTTOM_BM_EW ?? 0, min:-350000000, max:350000000 },

    VIB_NORM: { value: wt[8][0]?.VIB_NORM ?? 0, min:0, max:0.5 },
    VIB_LAT: { value: wt[8][0]?.VIB_LAT ?? 0, min:0, max:0.5 },
    NAC_VEL_RMS_NORM: { value: wt[9][0]?.NAC_VEL_RMS_NORM ?? 0, min:0, max:0.5 },
    NAC_VIB_RMS_LAT: { value: wt[9][0]?.NAC_VIB_RMS_LAT ?? 0, min:0, max:0.5 },
  }

  return res.send(resultObj);
});


router.get('/diag/gearbox', async (req, res) =>{
  const wt = await seon.DBOriginCall('wt', `CALL SP_WT_DIAG_GEARBOX()`);

  const resultObj = {
    VIB_ACC_1SPGB_HORZ: { value: wt[0][0]?.VIB_ACC_1SPGB_HORZ ?? 0, min:0, max:0.5 },
    VIB_ACC_2SPGB_HORZ: { value: wt[0][0]?.VIB_ACC_2SPGB_HORZ ?? 0, min:0, max:12 },
    VIB_ACC_LSA_VERT: { value: wt[0][0]?.VIB_ACC_LSA_VERT ?? 0, min:0, max:12 },
    VIB_ACC_HSA_HORZ: { value: wt[0][0]?.VIB_ACC_HSA_HORZ ?? 0, min:0, max:12 },
    VIB_VEL_1SPGB_HORZ: { value: wt[0][0]?.VIB_VEL_1SPGB_HORZ ?? 0, min:0, max:5.6 },
    VIB_VEL_2SPGB_HORZ: { value: wt[0][0]?.VIB_VEL_2SPGB_HORZ ?? 0, min:0, max:5.6 },
    VIB_VEL_LSA_VERT: { value: wt[0][0]?.VIB_VEL_LSA_VERT ?? 0, min:0, max:5.6 },
    VIB_VEL_HSA_HORZ: { value: wt[0][0]?.VIB_VEL_HSA_HORZ ?? 0, min:0, max:5.6 },
    ACC_RMS_1SPGB_HORZ: { value: wt[1][0]?.ACC_RMS_1SPGB_HORZ ?? 0, min:0, max:0.5 },
    ACC_RMS_2SPGB_HORZ: { value: wt[1][0]?.ACC_RMS_2SPGB_HORZ ?? 0, min:0, max:12 },
    ACC_RMS_LSA_VERT: { value: wt[1][0]?.ACC_RMS_LSA_VERT ?? 0, min:0, max:12 },
    ACC_RMS_HSA_HORZ: { value: wt[1][0]?.ACC_RMS_HSA_HORZ ?? 0, min:0, max:12 },
    VEL_RMS_1SPGB_HORZ: { value: wt[1][0]?.VEL_RMS_1SPGB_HORZ ?? 0, min:0, max:5.6 },
    VEL_RMS_2SPGB_HORZ: { value: wt[1][0]?.VEL_RMS_2SPGB_HORZ ?? 0, min:0, max:5.6 },
    VEL_RMS_LSA_VERT: { value: wt[1][0]?.VEL_RMS_LSA_VERT ?? 0, min:0, max:5.6 },
    VEL_RMS_HSA_HORZ: { value: wt[1][0]?.VEL_RMS_HSA_HORZ ?? 0, min:0, max:5.6 },
    GB_MEAS_TEMP: { value: wt[2][0]?.GB_MEAS_TEMP ?? 0, min:0, max:70 },
    GB_PRED_TEMP: { value: wt[2][0]?.GB_PRED_TEMP ?? 0, min:0, max:70 },
    GB_TEMP_DEV: { value: wt[2][0]?.GB_TEMP_DEV ?? 0, min:0, max:70 },
    GB_DESIGN_AGE: { value: wt[3][0]?.GB_DESIGN_AGE ?? 0, min:0, max:240 },
    GB_EST_AGE: { value: wt[3][0]?.GB_EST_AGE ?? 0, min:0, max:240 },
    GB_HEALTH_IDX: { value: wt[3][0]?.GB_HEALTH_IDX ?? 0, min:0, max:100 },
    VIB_ACC_AX: { value: wt[4][0]?.VIB_ACC_AX ?? 0, min:0, max:0.5 },
    VIB_ACC_HORZ: { value: wt[4][0]?.VIB_ACC_HORZ ?? 0, min:0, max:0.5 },
    VIB_VEL_AX: { value: wt[4][0]?.VIB_VEL_AX ?? 0, min:0, max:3.2 }, //
    VIB_VEL_HORZ: { value: wt[4][0]?.VIB_VEL_HORZ ?? 0, min:0, max:3.2 }, //
    ACC_RMS_AX: { value: wt[5][0]?.ACC_RMS_AX ?? 0, min:0, max:0.5 },
    ACC_RMS_HORZ: { value: wt[5][0]?.ACC_RMS_HORZ ?? 0, min:0, max:0.5 },
    VEL_RMS_AX: { value: wt[5][0]?.VEL_RMS_AX ?? 0, min:0, max:3.2 },
    VEL_RMS_HORZ: { value: wt[5][0]?.VEL_RMS_HORZ ?? 0, min:0, max:3.2 },
    MB_MEAS_TEMP: { value: wt[2][0]?.MB_MEAS_TEMP ?? 0, min:0, max:70 },
    MB_PRED_TEMP: { value: wt[2][0]?.MB_PRED_TEMP ?? 0, min:0, max:70 },
    MB_TEMP_DEV: { value: wt[2][0]?.MB_TEMP_DEV ?? 0, min:0, max:70 },
    MB_DESIGN_LIFE: { value: wt[3][0]?.MB_DESIGN_LIFE ?? 0, min:0, max:240 },
    MB_EST_LIFE: { value: wt[3][0]?.MB_EST_LIFE ?? 0, min:0, max:240 },
    MB_HEALTH_IDX: { value: wt[3][0]?.MB_HEALTH_IDX ?? 0, min:0, max:100 },
  }

  return res.send(resultObj);
});


router.get('/diag/generator', async (req, res) =>{
  const wt = await seon.DBOriginCall('wt', `CALL SP_WT_DIAG_GENERATOR()`);

  const resultObj = {
    VIB_ACC_DE_HORZ: { value: wt[0][0]?.VIB_ACC_DE_HORZ ?? 0, min:0, max:12 },
    VIB_ACC_NDE_HORZ: { value: wt[0][0]?.VIB_ACC_NDE_HORZ ?? 0, min:0, max:12 },
    VIB_VEL_DE_HORZ: { value: wt[0][0]?.VIB_VEL_DE_HORZ ?? 0, min:0, max:12 },
    VIB_VEL_NDE_HORZ: { value: wt[0][0]?.VIB_VEL_NDE_HORZ ?? 0, min:0, max:12 },

    ACC_RMS_HORZ_DE: { value: wt[1][0]?.ACC_RMS_HORZ_DE ?? 0, min:0, max:12 },
    ACC_RMS_HORZ_NDE: { value: wt[1][0]?.ACC_RMS_HORZ_NDE ?? 0, min:0, max:12 },
    VEL_RMS_HORZ_DE: { value: wt[1][0]?.VEL_RMS_HORZ_DE ?? 0, min:0, max:12 },
    VEL_RMS_HORZ_NDE: { value: wt[1][0]?.VEL_RMS_HORZ_NDE ?? 0, min:0, max:12 },

    GENA_MEAS_TEMP: { value: wt[2][0]?.GENA_MEAS_TEMP ?? 0, min:0, max:12 },
    GENA_PRED_TEMP: { value: wt[2][0]?.GENA_PRED_TEMP ?? 0, min:0, max:12 },
    GENA_TEMP_DEV: { value: wt[2][0]?.GENA_TEMP_DEV ?? 0, min:0, max:12 },
    GENB_MEAS_TEMP: { value: wt[2][0]?.GENB_MEAS_TEMP ?? 0, min:0, max:12 },
    GENB_PRED_TEMP: { value: wt[2][0]?.GENB_PRED_TEMP ?? 0, min:0, max:12 },
    GENB_TEMP_DEV: { value: wt[2][0]?.GENB_TEMP_DEV ?? 0, min:0, max:12 },
    GENC_MEAS_TEMP: { value: wt[2][0]?.GENC_MEAS_TEMP ?? 0, min:0, max:12 },
    GENC_PRED_TEMP: { value: wt[2][0]?.GENC_PRED_TEMP ?? 0, min:0, max:12 },
    GENC_TEMP_DEV: { value: wt[2][0]?.GENC_TEMP_DEV ?? 0, min:0, max:12 },

    GEN_DESIGN_AGE: { value: wt[3][0]?.GEN_DESIGN_AGE ?? 0, min:0, max:12 },
    GEN_EST_AGE: { value: wt[3][0]?.GEN_EST_AGE ?? 0, min:0, max:12 },
    GEN_HEALTH_IDX: { value: wt[3][0]?.GEN_HEALTH_IDX ?? 0, min:0, max:12 },

  }

  return res.send(resultObj);
});



router.get('/diag/yaw', async (req, res) =>{
  const wt = await seon.DBOriginCall('wt', `CALL SP_WT_DIAG_YAW()`);

  const resultObj = {
    YAW_ANGLE_NACELLE: { value: wt[0][0]?.YAW_ANGLE_NACELLE ?? 0, min:0, max:360 },
    YAW_ANGLE_WIND_DIR: { value: wt[0][0]?.YAW_ANGLE_WIND_DIR ?? 0, min:0, max:360 },
    YAW_ANGLE_DEV: { value: wt[0][0]?.YAW_ANGLE_DEV ?? 0, min:0, max:360 },
    YAW_DESIGN_AGE: { value: wt[1][0]?.YAW_DESIGN_AGE ?? 0, min:0, max:240 },
    YAW_EST_AGE: { value: wt[1][0]?.YAW_EST_AGE ?? 0, min:0, max:240 },
    YAW_HEALTH_IDX: { value: wt[1][0]?.YAW_HEALTH_IDX ?? 0, min:0, max:100 },
  }

  return res.send(resultObj);
});


router.get('/alarm/log', async (req, res) =>{
  const reData = await seon.DBPageCall('main', `CALL SP_MAIN_ALARM_PAGE(?,?,?,?,?)`, [
    req.query.page,
    req.query.size,
    req.query.group,
    isEmpty(req.query.dateS),
    isEmpty(req.query.dateE),
  ]);

  return res.send(reData);
});

router.get('/alarm/log/all', async (req, res) =>{
  const reData = await seon.DBCall('main', `CALL SP_MAIN_ALARM_ALL(?,?,?)`, [
    req.query.group,
    isEmpty(req.query.dateS),
    isEmpty(req.query.dateE),
  ]);

  return res.send(reData);
});


router.get('/myinfo', async (req, res) =>{
  const userId = req.decoded.userId;
  const reData = await seon.DBOneCall('main', `CALL SP_MAIN_MY_INFO(?)`, [
    userId,
  ]);

  return res.send(reData);
});

router.get('/setting/member', async (req, res) =>{
  const reData = await seon.DBCall('main', `CALL SP_MAIN_MEMBER()`);

  return res.send(reData);
});

router.get('/setting/member/item', async (req, res) =>{
  const reData = await seon.DBOneCall('main', `CALL SP_MAIN_MEMBER_ITEM(?)`,[req.query.id]);

  return res.send(reData);
});

router.get('/setting/member/id', async (req, res) =>{
  
  const reData = await seon.DBOneCall('main', `CALL SP_MAIN_MEMBER_CK(?)`, [
    req.query.mem_id,
  ]);

  if(!reData){
    return res.send(true);
  }else{
    return res.send(false);
  }
});

router.post('/setting/member/user/add', async (req, res) =>{
  if(req.body.idCK){
    await seon.DBCall('main', `CALL SP_MAIN_MEMBER_ADD(?,?,?,?,?)`, [
      req.body.mem_id,
      req.body.mem_name,
      req.body.password1,
      req.body.grade,
      req.body.memo,
    ]);

    return res.send(true);
  }else{
    return res.send(false);
  }
});

router.post('/setting/member/user/edit', async (req, res) =>{
  if(req.body.password1){
    await seon.DBCall('main', `CALL SP_MAIN_MEMBER_EDIT(?,?,?,?,?,?)`, [
      req.body.id,
      req.body.mem_id,
      req.body.mem_name,
      req.body.password1,
      req.body.grade,
      req.body.memo,
    ]);
  }else{
    await seon.DBCall('main', `CALL SP_MAIN_MEMBER_EDIT2(?,?,?,?,?)`, [
      req.body.id,
      req.body.mem_id,
      req.body.mem_name,
      req.body.grade,
      req.body.memo,
    ]);
  }

  return res.send(true);
});

router.post('/setting/member/del', async (req, res) =>{
  if(req.body.id == 1){
    return res.status(400).json({
      status: 400,
      message: "Super Admin 계정은 삭제할 수 없습니다."
    });
  }
  
  await seon.DBCall('main', `CALL SP_MAIN_MEMBER_DEL(?)`, [
    req.body.id,
  ]);

  return res.send(true);
});

router.get('/setting/member/my', async (req, res) =>{
  const userId = req.decoded.userId;
  const reData = await seon.DBOneCall('main', `CALL SP_MAIN_MEMBER_ITEM(?)`,[userId]);

  return res.send(reData);
});

router.get('/setting/info/pass/ck', async (req, res) =>{
  const userId = req.decoded.userId;
  const reData = await seon.DBOneCall('main', `CALL SP_MAIN_PASS_CK(?,?)`,[
    userId,
    req.query.password
  ]);

  if(reData){
    return res.send(true);
  }else{
    return res.send(false);
  }
});

router.post('/setting/info/pass', async (req, res) =>{
  const userId = req.decoded.userId;
  await seon.DBCall('main', `CALL SP_MAIN_PASS_EDIT(?,?)`, [
    userId,
    req.body.password,
  ]);

  return res.send(true);
});

router.get('/alarm/item', async (req, res) =>{
  const userId = req.decoded.userId;
  const reData = await seon.DBCall('main', `CALL SP_MAIN_ALARM_ITEM_GET(?)`,[
    userId,
  ]);

  return res.send(reData);
});


router.get('/chart/item', async (req, res) =>{
  const userId = req.decoded.userId;

  const wt = await seon.DBOriginCall('wt', `CALL SP_WT_CHART()`);
  const ts = await seon.DBOriginCall('ts', `CALL SP_TS_CHART()`);
  const my = await seon.DBCall('main', `CALL SP_MAIN_CHART(?,?,?)`, [userId, req.query.page, req.query.cid]);


  const TB_SCADA_AD_1S = ts[0][0];

  const TD_DA_OUTPUT = wt[0][0];
  const TD_DM_BLADE_ONE = wt[1][0];
  const TD_DM_BLADE_TWO = wt[2][0];
  const TD_DM_BLADE_THREE = wt[3][0];
  const TD_DM_DRIVE_TRAIN = wt[4][0];
  const TD_DM_GEARBOX = wt[5][0];
  const TD_DM_GENERATOR = wt[6][0];
  const TD_DM_TOWER = wt[7][0];
  const TD_DS_BLADE_1 = wt[8][0];
  const TD_DS_BLADE_2 = wt[9][0];
  const TD_DS_BLADE_3 = wt[10][0];
  const TD_DS_DRIVE_TRAIN = wt[11][0];
  const TD_DS_GEARBOX = wt[12][0];
  const TD_DS_GENERATOR = wt[13][0];
  const TD_DS_TOWER = wt[14][0];
  const TD_FP_RUL = wt[15][0];
  const TD_MET = wt[16][0];
  const TD_SC_OUTPUT = wt[17][0];
  

  const reObj = {
    A:[ //%
      { idx: 1, id: 'yaw Health Index', values: TD_FP_RUL?.YAW_HEALTH_IDX ?? 0, format: '%', st: false, group: 'A' }, 
      { idx: 2, id: 'Pitch System Health Index', values: TD_FP_RUL?.PITCH_HEALTH_IDX ?? 0, format: '%', st: false, group: 'A' }, 
      { idx: 3, id: 'gear box Health Index', values: TD_FP_RUL?.GB_HEALTH_IDX ?? 0, format: '%', st: false, group: 'A' }, 
      { idx: 4, id: 'main bearing Health Index', values: TD_FP_RUL?.MB_HEALTH_IDX ?? 0, format: '%', st: false, group: 'A' }, 
      { idx: 5, id: 'generator Generator Health Index', values: TD_FP_RUL?.GEN_HEALTH_IDX ?? 0, format: '%', st: false, group: 'A' }, 
      { idx: 6, id: 'Pitch System Design Age', values: TD_FP_RUL?.PITCH_DESIGN_AGE ?? 0, format: '%', st: false, group: 'A' }, 
      { idx: 7, id: 'Pitch System Estimated Age', values: TD_FP_RUL?.PITCH_EST_AGE ?? 0, format: '%', st: false, group: 'A' }, 
      { idx: 8, id: 'yaw Design Age', values: TD_FP_RUL?.YAW_DESIGN_AGE ?? 0, format: '%', st: false, group: 'A' }, 
      { idx: 9, id: 'yaw Estimated Age', values: TD_FP_RUL?.YAW_EST_AGE ?? 0, format: '%', st: false, group: 'A' },
      { idx: 10, id: 'Entire Turbine Health Index', values: TD_SC_OUTPUT?.TURBINE_HEALTH_INDEX ?? 0, format: '%', st: false, group: 'A' },
    ],
    B:[ //℃
      { idx: 11, id: 'Gearbox Temperate - Measured Value', values: TD_DA_OUTPUT?.GB_MEAS_TEMP ?? 0, format: '℃', st: false, group: 'B' },
      { idx: 12, id: 'Gearbox Temperate - Predicted Value', values: TD_DA_OUTPUT?.GB_PRED_TEMP ?? 0, format: '℃', st: false, group: 'B' },
      { idx: 13, id: 'Gearbox Temperate - Deviation', values: TD_DA_OUTPUT?.GB_TEMP_DEV ?? 0, format: '℃', st: false, group: 'B' },
      { idx: 14, id: 'MainBearing Temperate - Measured Value', values: TD_DA_OUTPUT?.MB_MEAS_TEMP ?? 0, format: '℃', st: false, group: 'B' },
      { idx: 15, id: 'MainBearing Temperate - Predicted Value', values: TD_DA_OUTPUT?.MB_PRED_TEMP ?? 0, format: '℃', st: false, group: 'B' },
      { idx: 16, id: 'MainBearing Temperate - Deviation', values: TD_DA_OUTPUT?.MB_TEMP_DEV ?? 0, format: '℃', st: false, group: 'B' },
      { idx: 17, id: 'Generator Winding A Temperate - Measured Value', values: TD_DA_OUTPUT?.GENA_MEAS_TEMP ?? 0, format: '℃', st: false, group: 'B' },
      { idx: 18, id: 'Generator Winding A Temperate - Predicted Value', values: TD_DA_OUTPUT?.GENA_PRED_TEMP ?? 0, format: '℃', st: false, group: 'B' },
      { idx: 19, id: 'Generator Winding A Temperate - Deviation', values: TD_DA_OUTPUT?.GENA_TEMP_DEV ?? 0, format: '℃', st: false, group: 'B' },
      { idx: 20, id: 'Generator Winding B Temperate - Measured Value', values: TD_DA_OUTPUT?.GENB_MEAS_TEMP ?? 0, format: '℃', st: false, group: 'B' },
      { idx: 21, id: 'Generator Winding B Temperate - Predicted Value', values: TD_DA_OUTPUT?.GENB_PRED_TEMP ?? 0, format: '℃', st: false, group: 'B' },
      { idx: 22, id: 'Generator Winding B Temperate - Deviation', values: TD_DA_OUTPUT?.GENB_TEMP_DEV ?? 0, format: '℃', st: false, group: 'B' },
      { idx: 23, id: 'Generator Winding C Temperate - Measured Value', values: TD_DA_OUTPUT?.GENC_MEAS_TEMP ?? 0, format: '℃', st: false, group: 'B' },
      { idx: 24, id: 'Generator Winding C Temperate - Predicted Value', values: TD_DA_OUTPUT?.GENC_PRED_TEMP ?? 0, format: '℃', st: false, group: 'B' },
      { idx: 25, id: 'Generator Winding C Temperate - Deviation', values: TD_DA_OUTPUT?.GENC_TEMP_DEV ?? 0, format: '℃', st: false, group: 'B' },
      { idx: 26, id: 'MET - Temperature', values: TD_MET?.AIR_TEMP ?? 0, format: '℃', st: false, group: 'B' },
      { idx: 27, id: 'NAC - Temperature', values: TB_SCADA_AD_1S?.WNAC_EX_TMP ?? 0, format: '℃', st: false, group: 'B' },
      { idx: 28, id: 'Blade1 Motor temp', values: TB_SCADA_AD_1S?.PT_MOT_TMP_BL_1 ?? 0, format: '℃', st: false, group: 'B' },
      { idx: 29, id: 'Blade1 Cabinet temp', values: TB_SCADA_AD_1S?.PT_CABI_TMP_BL_1 ?? 0, format: '℃', st: false, group: 'B' },
      { idx: 30, id: 'Blade2 Motor temp', values: TB_SCADA_AD_1S?.PT_MOT_TMP_BL_2 ?? 0, format: '℃', st: false, group: 'B' },
      { idx: 31, id: 'Blade2 Cabinet temp', values: TB_SCADA_AD_1S?.PT_CABI_TMP_BL_2 ?? 0, format: '℃', st: false, group: 'B' },
      { idx: 32, id: 'Blade3 Motor temp', values: TB_SCADA_AD_1S?.PT_MOT_TMP_BL_3 ?? 0, format: '℃', st: false, group: 'B' },
      { idx: 33, id: 'Blade3 Cabinet temp', values: TB_SCADA_AD_1S?.PT_CABI_TMP_BL_3 ?? 0, format: '℃', st: false, group: 'B' },
      { idx: 34, id: 'main bearing max bearing temp', values: TB_SCADA_AD_1S?.TM_TMP_SHF_BRG_MAX ?? 0, format: '℃', st: false, group: 'B' },
      { idx: 35, id: 'oil inlet temp', values: TB_SCADA_AD_1S?.TM_TMP_GBX_OIL ?? 0, format: '℃', st: false, group: 'B' },
      { idx: 36, id: 'oil tank temp', values: TB_SCADA_AD_1S?.GBX_OIL_TNK_TMP ?? 0, format: '℃', st: false, group: 'B' },
      { idx: 37, id: 'oil heater temp', values: TB_SCADA_AD_1S?.GBX_OIL_HT_TMP ?? 0, format: '℃', st: false, group: 'B' },
      { idx: 38, id: 'Generator water inlet temp', values: TB_SCADA_AD_1S?.GN_TMP_IN_LET ?? 0, format: '℃', st: false, group: 'B' },
      { idx: 39, id: 'Generator bearing non drive temp', values: TB_SCADA_AD_1S?.GN_BRG_NDET_TMP ?? 0, format: '℃', st: false, group: 'B' },
      { idx: 40, id: 'Generator slipring space temp', values: TB_SCADA_AD_1S?.GN_SLI_TMP ?? 0, format: '℃', st: false, group: 'B' },
      { idx: 41, id: 'Generator winding [u] temp', values: TB_SCADA_AD_1S?.GN_TMP_U ?? 0, format: '℃', st: false, group: 'B' },
      { idx: 42, id: 'Generator winding [v] temp', values: TB_SCADA_AD_1S?.GN_TMP_V ?? 0, format: '℃', st: false, group: 'B' },
      { idx: 43, id: 'Generator winding [w] temp', values: TB_SCADA_AD_1S?.GN_TMP_W ?? 0, format: '℃', st: false, group: 'B' },
      { idx: 44, id: 'Generator bearing drive temp', values: TB_SCADA_AD_1S?.GN_BRG_DET_TMP ?? 0, format: '℃', st: false, group: 'B' },
      { idx: 45, id: 'Generator winding temp max', values: TB_SCADA_AD_1S?.GN_TMP_STA_MAX ?? 0, format: '℃', st: false, group: 'B' },
      { idx: 46, id: 'Generator bearing temp max', values: TB_SCADA_AD_1S?.GN_BRG_TMP_MAX ?? 0, format: '℃', st: false, group: 'B' },
    ],
    C:[ //Hz
      { idx: 47, id: 'Freq', values: TB_SCADA_AD_1S?.WCNV_HZ ?? 0, format: 'Hz', st: false, group: 'C' },
    ],
    D:[ //m/s
      { idx: 48, id: 'MET - Wind Speed', values: TD_MET?.WD_SPD ?? 0, format: 'm/s', st: false, group: 'D' },
      { idx: 49, id: 'NAC - Wind Speed', values: TB_SCADA_AD_1S?.WNAC_WD_SPD ?? 0, format: 'm/s', st: false, group: 'D' },
      { idx: 50, id: 'Rotor rotor speed', values: TB_SCADA_AD_1S?.ROT_SPD ?? 0, format: 'm/s', st: false, group: 'D' },
      { idx: 51, id: 'Generator generator speed', values: TB_SCADA_AD_1S?.WGEN_SPD ?? 0, format: 'm/s', st: false, group: 'D' },
      { idx: 52, id: 'motor calculated rotation', values: TB_SCADA_AD_1S?.WYAW_YW_SPD ?? 0, format: 'm/s', st: false, group: 'D' },
    ],
    E:[ //m/s2
      { idx: 53, id: 'Vibration Acceleration - Axial', values: TD_DM_DRIVE_TRAIN?.VIB_ACC_AX ?? 0, format: 'm/s²', st: false, group: 'E' },
      { idx: 54, id: 'Vibration Acceleration - Horizontal', values: TD_DM_DRIVE_TRAIN?.VIB_ACC_HORZ ?? 0, format: 'm/s²', st: false, group: 'E' },
      { idx: 55, id: 'Vibration Acceleration - Axial', values: TD_DM_DRIVE_TRAIN?.VIB_ACC_AX ?? 0, format: 'm/s²', st: false, group: 'E' },
      { idx: 56, id: 'Vibration Acceleration - Horizontal', values: TD_DM_DRIVE_TRAIN?.VIB_ACC_HORZ ?? 0, format: 'm/s²', st: false, group: 'E' },
      { idx: 57, id: 'Vibration Acceleration - 1st Stage Planetary Gear Bearing (1st) - Horizontal', values: TD_DM_GEARBOX?.VIB_ACC_1SPGB_HORZ ?? 0, format: 'm/s²', st: false, group: 'E' },
      { idx: 58, id: 'Vibration Acceleration - 2nd Stage Planetary Gear Bearing (2nd) - Horizontal', values: TD_DM_GEARBOX?.VIB_ACC_2SPGB_HORZ ?? 0, format: 'm/s²', st: false, group: 'E' },
      { idx: 59, id: 'Vibration Acceleration - Low Speed Axis (3rd) - Vertical', values: TD_DM_GEARBOX?.VIB_ACC_LSA_VERT ?? 0, format: 'm/s²', st: false, group: 'E' },
      { idx: 60, id: 'Vibration Acceleration - High Speed Axis (Out) - Horizontal', values: TD_DM_GEARBOX?.VIB_ACC_HSA_HORZ ?? 0, format: 'm/s²', st: false, group: 'E' },
      { idx: 61, id: 'Vibration Acceleration - Drive End (DE) - Horizonal', values: TD_DM_GENERATOR?.VIB_ACC_DE_HORZ ?? 0, format: 'm/s²', st: false, group: 'E' },
      { idx: 62, id: 'Vibration Acceleration - Non Drive End (NDE) - Horizontal', values: TD_DM_GENERATOR?.VIB_ACC_NDE_HORZ ?? 0, format: 'm/s²', st: false, group: 'E' },
      { idx: 63, id: 'Vibration (Normal)', values: TD_DM_TOWER?.VIB_NORM ?? 0, format: 'm/s²', st: false, group: 'E' },
      { idx: 64, id: 'Vibration (Lateral)', values: TD_DM_TOWER?.VIB_LAT ?? 0, format: 'm/s²', st: false, group: 'E' },
      { idx: 65, id: 'Acceleration RMS - Axial [m/s2]', values: TD_DS_DRIVE_TRAIN?.ACC_RMS_AX ?? 0, format: 'm/s²', st: false, group: 'E' },
      { idx: 66, id: 'Acceleration RMS - Horizontal [m/s2]', values: TD_DS_DRIVE_TRAIN?.ACC_RMS_HORZ ?? 0, format: 'm/s²', st: false, group: 'E' },
      { idx: 67, id: 'Acceleration RMS - 1st Stage Planetary Gear Bearing (1st) - Horizontal', values: TD_DS_GEARBOX?.ACC_RMS_1SPGB_HORZ ?? 0, format: 'm/s²', st: false, group: 'E' },
      { idx: 68, id: 'Acceleration RMS - 2nd Stage Planetary Gear Bearing (2nd) - Horizontal', values: TD_DS_GEARBOX?.ACC_RMS_2SPGB_HORZ ?? 0, format: 'm/s²', st: false, group: 'E' },
      { idx: 69, id: 'Acceleration RMS - Low Speed Axis (3rd) - Vertical', values: TD_DS_GEARBOX?.ACC_RMS_LSA_VERT ?? 0, format: 'm/s²', st: false, group: 'E' },
      { idx: 70, id: 'Acceleration RMS - High Speed Axis (Out) - Horizontal', values: TD_DS_GEARBOX?.ACC_RMS_HSA_HORZ ?? 0, format: 'm/s²', st: false, group: 'E' },
      { idx: 71, id: 'Acceleration RMS - Horizonal (DE)', values: TD_DS_GENERATOR?.ACC_RMS_HORZ_DE ?? 0, format: 'm/s²', st: false, group: 'E' },
      { idx: 72, id: 'Acceleration RMS - Horizontal (NDE)', values: TD_DS_GENERATOR?.ACC_RMS_HORZ_NDE ?? 0, format: 'm/s²', st: false, group: 'E' },
      { idx: 73, id: 'Vibration RMS (Normal)', values: TD_DS_TOWER?.NAC_VEL_RMS_NORM ?? 0, format: 'm/s²', st: false, group: 'E' },
      { idx: 74, id: 'Vibration RMS (Lateral)', values: TD_DS_TOWER?.NAC_VIB_RMS_LAT ?? 0, format: 'm/s²', st: false, group: 'E' },
    ],
    F:[ //mm/s
      { idx: 75, id: 'Vibration Velocity - Axial', values: TD_DM_DRIVE_TRAIN?.VIB_VEL_AX ?? 0, format: 'mm/s', st: false, group: 'F' },
      { idx: 76, id: 'Vibration Velocity - Horizontal', values: TD_DM_DRIVE_TRAIN?.VIB_VEL_HORZ ?? 0, format: 'mm/s', st: false, group: 'F' },
      { idx: 77, id: 'Vibration Velocity - Axial', values: TD_DM_DRIVE_TRAIN?.VIB_VEL_AX ?? 0, format: 'mm/s', st: false, group: 'F' },
      { idx: 78, id: 'Vibration Velocity - Horizontal', values: TD_DM_DRIVE_TRAIN?.VIB_VEL_HORZ ?? 0, format: 'mm/s', st: false, group: 'F' },
      { idx: 79, id: 'Vibration Velocity - 1st Stage Planetary Gear Bearing (1st) - Horizontal', values: TD_DM_GEARBOX?.VIB_VEL_1SPGB_HORZ ?? 0, format: 'mm/s', st: false, group: 'F' },
      { idx: 80, id: 'Vibration Velocity - 2nd Stage Planetary Gear Bearing (2nd)- Horizontal', values: TD_DM_GEARBOX?.VIB_VEL_2SPGB_HORZ ?? 0, format: 'mm/s', st: false, group: 'F' },
      { idx: 81, id: 'Vibration Velocity - Low Speed Axis (3rd) - Vertical', values: TD_DM_GEARBOX?.VIB_VEL_LSA_VERT ?? 0, format: 'mm/s', st: false, group: 'F' },
      { idx: 82, id: 'Vibration Velocity - High Speed Axis (Out) - Horizontal', values: TD_DM_GEARBOX?.VIB_VEL_HSA_HORZ ?? 0, format: 'mm/s', st: false, group: 'F' },
      { idx: 83, id: 'Vibration Velocity - Drive End (DE) - Horizonal', values: TD_DM_GENERATOR?.VIB_VEL_DE_HORZ ?? 0, format: 'mm/s', st: false, group: 'F' },
      { idx: 84, id: 'Vibration Velocity - Non Drive End (NDE) - Horizontal', values: TD_DM_GENERATOR?.VIB_VEL_NDE_HORZ ?? 0, format: 'mm/s', st: false, group: 'F' },
      { idx: 85, id: 'Velocity RMS - Axial [mm/s]', values: TD_DS_DRIVE_TRAIN?.VEL_RMS_AX ?? 0, format: 'mm/s', st: false, group: 'F' },
      { idx: 86, id: 'Velocity RMS - Horizontal [mm/s]', values: TD_DS_DRIVE_TRAIN?.VEL_RMS_HORZ ?? 0, format: 'mm/s', st: false, group: 'F' },
      { idx: 87, id: 'Velocity RMS - 1st Stage Planetary Gear Bearing (1st) - Horizontal', values: TD_DS_GEARBOX?.VEL_RMS_1SPGB_HORZ ?? 0, format: 'mm/s', st: false, group: 'F' },
      { idx: 88, id: 'Velocity RMS - 2nd Stage Planetary Gear Bearing (2nd)- Horizontal', values: TD_DS_GEARBOX?.VEL_RMS_2SPGB_HORZ ?? 0, format: 'mm/s', st: false, group: 'F' },
      { idx: 89, id: 'Velocity RMS - Low Speed Axis (3rd) - Vertical', values: TD_DS_GEARBOX?.VEL_RMS_LSA_VERT ?? 0, format: 'mm/s', st: false, group: 'F' },
      { idx: 90, id: 'Velocity RMS - High Speed Axis (Out) - Horizontal', values: TD_DS_GEARBOX?.VEL_RMS_HSA_HORZ ?? 0, format: 'mm/s', st: false, group: 'F' },
      { idx: 91, id: 'Velocity RMS - Horizonal (DE)', values: TD_DS_GENERATOR?.VEL_RMS_HORZ_DE ?? 0, format: 'mm/s', st: false, group: 'F' },
      { idx: 92, id: 'Velocity RMS - Horizontal (NDE)', values: TD_DS_GENERATOR?.VEL_RMS_HORZ_NDE ?? 0, format: 'mm/s', st: false, group: 'F' },
    ],
    G:[ //month
      { idx: 93, id: 'Blade1 Nominal Age', values: TD_FP_RUL?.BLADE_1_NOM_AGE ?? 0, format: 'month', st: false, group: 'G' }, 
      { idx: 94, id: 'Blade1 Estimated Fatigue Age', values: TD_FP_RUL?.BLADE_1_EST_FAT_AGE ?? 0, format: 'month', st: false, group: 'G' }, 
      { idx: 95, id: 'Blade1 Estimated Fatigue Margin', values: TD_FP_RUL?.BLADE_1_EST_FAT_MARGIN ?? 0, format: 'month', st: false, group: 'G' }, 
      { idx: 96, id: 'Blade2 Nominal Age', values: TD_FP_RUL?.BLADE_2_NOM_AGE ?? 0, format: 'month', st: false, group: 'G' }, 
      { idx: 97, id: 'Blade2 Estimated Fatigue Age', values: TD_FP_RUL?.BLADE_2_EST_FAT_AGE ?? 0, format: 'month', st: false, group: 'G' }, 
      { idx: 98, id: 'Blade2 Estimated Fatigue Margin', values: TD_FP_RUL?.BLADE_2_EST_FAT_MARGIN ?? 0, format: 'month', st: false, group: 'G' }, 
      { idx: 99, id: 'Blade3 Nominal Age', values: TD_FP_RUL?.BLADE_3_NOM_AGE ?? 0, format: 'month', st: false, group: 'G' }, 
      { idx: 101, id: 'Blade3 Estimated Fatigue Age', values: TD_FP_RUL?.BLADE_3_EST_FAT_AGE ?? 0, format: 'month', st: false, group: 'G' }, 
      { idx: 102, id: 'Blade3 Estimated Fatigue Margin', values: TD_FP_RUL?.BLADE_3_EST_FAT_MARGIN ?? 0, format: 'month', st: false, group: 'G' }, 
      { idx: 103, id: 'Pitch System Design Age', values: TD_FP_RUL?.PITCH_DESIGN_AGE ?? 0, format: 'month', st: false, group: 'G' }, 
      { idx: 104, id: 'Pitch System Estimated Age', values: TD_FP_RUL?.PITCH_EST_AGE ?? 0, format: 'month', st: false, group: 'G' }, 
      { idx: 105, id: 'Tower top Nominal Age', values: TD_FP_RUL?.TOWER_NOM_AGE ?? 0, format: 'month', st: false, group: 'G' }, 
      { idx: 106, id: 'Tower top Estimated Fatigue Age', values: TD_FP_RUL?.TOWER_EST_FAT_AGE ?? 0, format: 'month', st: false, group: 'G' }, 
      { idx: 107, id: 'Tower top Estimated Fatigue Margin', values: TD_FP_RUL?.TOWER_EST_FAT_MARGIN ?? 0, format: 'month', st: false, group: 'G' }, 
      { idx: 108, id: 'Tower Bottom Nominal Age', values: TD_FP_RUL?.TOWER_NOM_AGE ?? 0, format: 'month', st: false, group: 'G' }, 
      { idx: 109, id: 'Tower Bottom Estimated Fatigue Age', values: TD_FP_RUL?.TOWER_EST_FAT_AGE ?? 0, format: 'month', st: false, group: 'G' }, 
      { idx: 110, id: 'Tower Bottom Estimated Fatigue Margin', values: TD_FP_RUL?.TOWER_EST_FAT_MARGIN ?? 0, format: 'month', st: false, group: 'G' }, 
      { idx: 111, id: 'gear box Design Age', values: TD_FP_RUL?.GB_DESIGN_AGE ?? 0, format: 'month', st: false, group: 'G' }, 
      { idx: 112, id: 'gear box Estimated Age', values: TD_FP_RUL?.GB_EST_AGE ?? 0, format: 'month', st: false, group: 'G' }, 
      { idx: 113, id: 'main bearing Design Age', values: TD_FP_RUL?.MB_DESIGN_LIFE ?? 0, format: 'month', st: false, group: 'G' }, 
      { idx: 114, id: 'main bearing Estimated Age', values: TD_FP_RUL?.MB_EST_LIFE ?? 0, format: 'month', st: false, group: 'G' }, 
      { idx: 115, id: 'generator Generator Design Age', values: TD_FP_RUL?.GEN_DESIGN_AGE ?? 0, format: 'month', st: false, group: 'G' }, 
      { idx: 116, id: 'generator Generator Estimated Age', values: TD_FP_RUL?.GEN_EST_AGE ?? 0, format: 'month', st: false, group: 'G' }, 
    ],
    H:[ //Nm
      { idx: 117, id: 'Blade1 Torque', values: TB_SCADA_AD_1S?.TQ_RMS_BL_1 ?? 0, format: 'Nm', st: false, group: 'H' },
      { idx: 118, id: 'Blade2 Torque', values: TB_SCADA_AD_1S?.TQ_RMS_BL_2 ?? 0, format: 'Nm', st: false, group: 'H' },
      { idx: 119, id: 'Blade3 Torque', values: TB_SCADA_AD_1S?.TQ_RMS_BL_3 ?? 0, format: 'Nm', st: false, group: 'H' },
      { idx: 120, id: 'motor calculated torque', values: TB_SCADA_AD_1S?.WYAW_YW_TORQ ?? 0, format: 'Nm', st: false, group: 'H' },
    ],
    I:[ //º (deg)
      { idx: 121, id: 'Pitch Angle', values: TD_DA_OUTPUT?.PITCH_ANGLE_MEAS ?? 0, format: '°', st: false, group: 'I' },
      { idx: 122, id: 'Pitch Angle (Measured Value)', values: TD_DA_OUTPUT?.PITCH_ANGLE_MEAS ?? 0, format: '°', st: false, group: 'I' },
      { idx: 123, id: 'Pitch Angle (Prediction Value)', values: TD_DA_OUTPUT?.PITCH_ANGLE_PRED ?? 0, format: '°', st: false, group: 'I' },
      { idx: 124, id: 'Pitch Angle (Deviation)', values: TD_DA_OUTPUT?.PITCH_ANGLE_DEV ?? 0, format: '°', st: false, group: 'I' },
      { idx: 125, id: 'Yaw Angle - Nacelle Position', values: TD_DA_OUTPUT?.YAW_ANGLE_NACELLE ?? 0, format: '°', st: false, group: 'I' },
      { idx: 126, id: 'Yaw Angle - Wind Direction', values: TD_DA_OUTPUT?.YAW_ANGLE_WIND_DIR ?? 0, format: '°', st: false, group: 'I' },
      { idx: 127, id: 'Yaw Angle - Deviation', values: TD_DA_OUTPUT?.YAW_ANGLE_DEV ?? 0, format: '°', st: false, group: 'I' },
      { idx: 128, id: 'MET - Wind Direction', values: TD_MET?.WD_DIR ?? 0, format: '°', st: false, group: 'I' },
      { idx: 129, id: 'NAC - Wind Direction', values: TB_SCADA_AD_1S?.WNAC_WD_DIR ?? 0, format: '°', st: false, group: 'I' },
      { idx: 130, id: 'Yaw Angle', values: TB_SCADA_AD_1S?.WYAW_YAW_ANG ?? 0, format: '°', st: false, group: 'I' },
      { idx: 131, id: 'Blade1 position', values: TB_SCADA_AD_1S?.PT_ANG_VAL_BL_1 ?? 0, format: '°', st: false, group: 'I' },
      { idx: 132, id: 'Blade2 position', values: TB_SCADA_AD_1S?.PT_ANG_VAL_BL_2 ?? 0, format: '°', st: false, group: 'I' },
      { idx: 133, id: 'Blade3 position', values: TB_SCADA_AD_1S?.PT_ANG_VAL_BL_3 ?? 0, format: '°', st: false, group: 'I' },
      { idx: 134, id: 'yaw - deviation', values: TB_SCADA_AD_1S?.WYAW_YW_POS_ERR_DMD ?? 0, format: '°', st: false, group: 'I' },
    ],
    J:[ //Pa
      { idx: 135, id: 'Blade1 Bending (Flapwise)', values: TD_DM_BLADE_ONE?.BM_FLAP ?? 0, format: 'Pa', st: false, group: 'J' },
      { idx: 136, id: 'Blade1 Bending (Edgewise)', values: TD_DM_BLADE_ONE?.BM_EDGE ?? 0, format: 'Pa', st: false, group: 'J' },
      { idx: 137, id: 'Blade1 Torsion', values: TD_DM_BLADE_ONE?.TOR ?? 0, format: 'Pa', st: false, group: 'J' },
      { idx: 138, id: 'Blade2 Bending (Flapwise)', values: TD_DM_BLADE_TWO?.BM_FLAP ?? 0, format: 'Pa', st: false, group: 'J' },
      { idx: 139, id: 'Blade2 Bending (Edgewise)', values: TD_DM_BLADE_TWO?.BM_EDGE ?? 0, format: 'Pa', st: false, group: 'J' },
      { idx: 140, id: 'Blade2 Torsion', values: TD_DM_BLADE_TWO?.TOR ?? 0, format: 'Pa', st: false, group: 'J' },
      { idx: 141, id: 'Blade3 Bending (Flapwise)', values: TD_DM_BLADE_THREE?.BM_FLAP ?? 0, format: 'Pa', st: false, group: 'J' },
      { idx: 142, id: 'Blade3 Bending (Edgewise)', values: TD_DM_BLADE_THREE?.BM_EDGE ?? 0, format: 'Pa', st: false, group: 'J' },
      { idx: 143, id: 'Blade3 Torsion', values: TD_DM_BLADE_THREE?.TOR ?? 0, format: 'Pa', st: false, group: 'J' },
      { idx: 144, id: 'Bending (N-S)', values: TD_DM_TOWER?.TOP_BM_NS ?? 0, format: 'Pa', st: false, group: 'J' },
      { idx: 145, id: 'Bending (E-W)', values: TD_DM_TOWER?.TOP_BM_EW ?? 0, format: 'Pa', st: false, group: 'J' },
      { idx: 146, id: 'Torsional', values: TD_DM_TOWER?.TOP_TOR ?? 0, format: 'Pa', st: false, group: 'J' },
      { idx: 147, id: 'Blade1 DEL (Flapwise)', values: TD_DS_BLADE_1?.FLAP_DEL ?? 0, format: 'Pa', st: false, group: 'J' },
      { idx: 148, id: 'Blade1 DEL (Edge)', values: TD_DS_BLADE_1?.EDGE_DEL ?? 0, format: 'Pa', st: false, group: 'J' },
      { idx: 149, id: 'Blade2 DEL (Flapwise)', values: TD_DS_BLADE_2?.FLAP_DEL ?? 0, format: 'Pa', st: false, group: 'J' },
      { idx: 150, id: 'Blade2 DEL (Edge)', values: TD_DS_BLADE_2?.EDGE_DEL ?? 0, format: 'Pa', st: false, group: 'J' },
      { idx: 151, id: 'Blade3 DEL (Flapwise)', values: TD_DS_BLADE_3?.FLAP_DEL ?? 0, format: 'Pa', st: false, group: 'J' },
      { idx: 152, id: 'Blade3 DEL (Edge)', values: TD_DS_BLADE_3?.EDGE_DEL ?? 0, format: 'Pa', st: false, group: 'J' },
      { idx: 153, id: 'Tower top DEL', values: TD_DS_TOWER?.TOP_DEL ?? 0, format: 'Pa', st: false, group: 'J' },
      { idx: 154, id: 'Tower Bottom DEL', values: TD_DS_TOWER?.TOP_DEL ?? 0, format: 'Pa', st: false, group: 'J' },
      // { id: 'Bending (N-S)', values: TD_DM_TOWER?.BASE_BM_NS ?? 0 },
      // { id: 'Bending (E-W)', values: TD_DM_TOWER?.BASE_BM_EW ?? 0 },
    ],
    K:[ //V
      { idx: 155, id: 'oil pump pressure', values: TB_SCADA_AD_1S?.GBX_OIL_PRES ?? 0, format: 'V', st: false, group: 'K' },
      { idx: 156, id: 'oil pump oil inlet pressure', values: TB_SCADA_AD_1S?.GBX_OIL_IN_PRES ?? 0, format: 'V', st: false, group: 'K' },
      { idx: 157, id: 'Blade1 DC bus voltage', values: TB_SCADA_AD_1S?.PT_CNV_DCL_VOL_BL_1 ?? 0, format: 'V', st: false, group: 'K' },
      { idx: 158, id: 'Blade1 Battery Voltage', values: TB_SCADA_AD_1S?.PT_UPS_V_BL_1 ?? 0, format: 'V', st: false, group: 'K' },
      { idx: 159, id: 'Blade2 DC bus voltage', values: TB_SCADA_AD_1S?.PT_CNV_DCL_VOL_BL_2 ?? 0, format: 'V', st: false, group: 'K' },
      { idx: 160, id: 'Blade2 Battery Voltage', values: TB_SCADA_AD_1S?.PT_UPS_V_BL_2 ?? 0, format: 'V', st: false, group: 'K' },
      { idx: 161, id: 'Blade3 DC bus voltage', values: TB_SCADA_AD_1S?.PT_CNV_DCL_VOL_BL_3 ?? 0, format: 'V', st: false, group: 'K' },
      { idx: 162, id: 'Blade3 Battery Voltage', values: TB_SCADA_AD_1S?.PT_UPS_V_BL_3 ?? 0, format: 'V', st: false, group: 'K' },
    ],
    L:[ //Wh
      { idx: 163, id: 'Active Power', values: TB_SCADA_AD_1S?.TOT_WH ?? 0, format: 'Wh', st: false, group: 'L' },
      { idx: 164, id: 'Generator active power', values: TB_SCADA_AD_1S?.WGEN_W ?? 0, format: 'Wh', st: false, group: 'L' },
    ],
    M:[ //-      
      { idx: 165, id: 'Blade1 state', values: TB_SCADA_AD_1S?.BLD_1_ST ?? 0, format: 'Num', st: false, group: 'M' },
      { idx: 166, id: 'Blade1 Free wheel brake', values: TB_SCADA_AD_1S?.BLD_1_BRK_ST ?? 0, format: 'Num', st: false, group: 'M' },
      { idx: 167, id: 'Blade1 Battery State', values: TB_SCADA_AD_1S?.BLD_1_UPS_ST ?? 0, format: 'Num', st: false, group: 'M' },
      { idx: 168, id: 'Blade2 state', values: TB_SCADA_AD_1S?.BLD_2_ST ?? 0, format: 'Num', st: false, group: 'M' },
      { idx: 169, id: 'Blade2 Free wheel brake', values: TB_SCADA_AD_1S?.BLD_2_BRK_ST ?? 0, format: 'Num', st: false, group: 'M' },
      { idx: 170, id: 'Blade2 Battery State', values: TB_SCADA_AD_1S?.BLD_2_UPS_ST ?? 0, format: 'Num', st: false, group: 'M' },
      { idx: 171, id: 'Blade3 state', values: TB_SCADA_AD_1S?.BLD_3_ST ?? 0, format: 'Num', st: false, group: 'M' },
      { idx: 172, id: 'Blade3 Free wheel brake', values: TB_SCADA_AD_1S?.BLD_3_BRK_ST ?? 0, format: 'Num', st: false, group: 'M' },
      { idx: 173, id: 'Blade3 Battery State', values: TB_SCADA_AD_1S?.BLD_3_UPS_ST ?? 0, format: 'Num', st: false, group: 'M' },
      { idx: 174, id: 'Fan heating/cooling state', values: TB_SCADA_AD_1S?.GBX_ST ?? 0, format: 'Num', st: false, group: 'M' },
      { idx: 175, id: 'Fan low speed', values: TB_SCADA_AD_1S?.GBX_FAN_LO_SPD_ST ?? 0, format: 'Num', st: false, group: 'M' },
      { idx: 176, id: 'Fan high speed', values: TB_SCADA_AD_1S?.GBX_FAN_HI_SPD_ST ?? 0, format: 'Num', st: false, group: 'M' },
      { idx: 177, id: 'Rotor lock (set)', values: TB_SCADA_AD_1S?.ROT_LOCK_SET_ST ?? 0, format: 'Num', st: false, group: 'M' },
      { idx: 178, id: 'Rotor lock (free)', values: TB_SCADA_AD_1S?.ROT_LOCK_FREE_ST ?? 0, format: 'Num', st: false, group: 'M' },
      { idx: 179, id: 'oil pump low speed', values: TB_SCADA_AD_1S?.GBX_OIL_PMP_LO_SPD_ST ?? 0, format: 'Num', st: false, group: 'M' },
      { idx: 180, id: 'oil pump high speed', values: TB_SCADA_AD_1S?.GBX_OIL_PMP_HI_SPD_ST ?? 0, format: 'Num', st: false, group: 'M' },
      { idx: 181, id: 'oil pump oil level', values: TB_SCADA_AD_1S?.GBX_OIL_LEV_ST ?? 0, format: 'Num', st: false, group: 'M' },
      { idx: 182, id: 'Brake Hydraulic oil pump', values: TB_SCADA_AD_1S?.GN_BRK_HY_PRES_ST ?? 0, format: 'Num', st: false, group: 'M' },
      { idx: 183, id: 'Brake Hydraulic pressure', values: TB_SCADA_AD_1S?.GN_BRK_HY_PMP_ST ?? 0, format: 'Num', st: false, group: 'M' },
      { idx: 184, id: 'Brake Hydraulic oil level', values: TB_SCADA_AD_1S?.GBX_HY_OIL_LEV_ST ?? 0, format: 'Num', st: false, group: 'M' },
      { idx: 185, id: 'Brake Hydraulic oil temp', values: TB_SCADA_AD_1S?.GBX_HY_OIL_TMP_ST ?? 0, format: 'Num', st: false, group: 'M' },
      { idx: 186, id: 'Brake Breake open', values: TB_SCADA_AD_1S?.BRK_OPEN_ST ?? 0, format: 'Num', st: false, group: 'M' },
      { idx: 187, id: 'Brake Pressure', values: TB_SCADA_AD_1S?.BRK_PRES_ST ?? 0, format: 'Num', st: false, group: 'M' },
      { idx: 188, id: 'Generator cooling pump', values: TB_SCADA_AD_1S?.GN_CL_PMP_ST ?? 0, format: 'Num', st: false, group: 'M' },
      { idx: 189, id: 'Info position ready for prod.', values: TB_SCADA_AD_1S?.WYAW_POS_OK_ST ?? 0, format: 'Num', st: false, group: 'M' },
      { idx: 190, id: 'Info service box connect', values: TB_SCADA_AD_1S?.WYAW_SER_BOX_ST ?? 0, format: 'Num', st: false, group: 'M' },
      { idx: 191, id: 'Info allow to move', values: TB_SCADA_AD_1S?.WYAW_POS_NOT_MOV_ST ?? 0, format: 'Num', st: false, group: 'M' },
      { idx: 192, id: 'Info end position', values: TB_SCADA_AD_1S?.WYAW_POS_END_ST ?? 0, format: 'Num', st: false, group: 'M' },
      { idx: 193, id: 'brake released', values: TB_SCADA_AD_1S?.WYAW_MOT_BRK_ST ?? 0, format: 'Num', st: false, group: 'M' },
      { idx: 194, id: 'yaw state', values: TB_SCADA_AD_1S?.WYAW_YW_ST ?? 0, format: 'Num', st: false, group: 'M' },
      { idx: 195, id: 'yaw initialized', values: TB_SCADA_AD_1S?.WYAW_POS_INI_ST ?? 0, format: 'Num', st: false, group: 'M' },
      { idx: 196, id: 'yaw running', values: TB_SCADA_AD_1S?.WYAW_ON_ST ?? 0, format: 'Num', st: false, group: 'M' },
      // { id: 'Turbine Status', values: TB_SCADA_AD_1S?.WT_PLC_ST ?? 0 },
      // { id: 'yaw automatic mode', values: TB_SCADA_AD_1S?.WYAW_CM_YW_AUT_ST ?? 0 },
    ],
  }

  for(let i=0;i<my.length;i++){
    for(let x=0;x<reObj[my[i].group].length;x++){
      if(reObj[my[i].group][x].idx == my[i].idx){
        reObj[my[i].group][x].st = true;
        reObj[my[i].group][x].group = my[i].group;
        reObj[my[i].group][x].dbId = my[i].id;
        reObj[my[i].group][x].chartCk = my[i].chartCk;
      }
    }
  }

  return res.send(reObj);
});

router.get('/chart/item/history', async (req, res) =>{
  const userId = req.decoded.userId;

  const wt = await seon.DBOriginCall('wt', `CALL SP_WT_CHART()`);
  const ts = await seon.DBOriginCall('ts', `CALL SP_TS_CHART()`);
  const my = await seon.DBCall('main', `CALL SP_MAIN_CHART(?,?,?)`, [userId, req.query.page, req.query.cid]);


  const TB_SCADA_AD_1S = ts[0][0];

  const TD_DA_OUTPUT = wt[0][0];
  const TD_DM_BLADE_ONE = wt[1][0];
  const TD_DM_BLADE_TWO = wt[2][0];
  const TD_DM_BLADE_THREE = wt[3][0];
  const TD_DM_DRIVE_TRAIN = wt[4][0];
  const TD_DM_GEARBOX = wt[5][0];
  const TD_DM_GENERATOR = wt[6][0];
  const TD_DM_TOWER = wt[7][0];
  const TD_DS_BLADE_1 = wt[8][0];
  const TD_DS_BLADE_2 = wt[9][0];
  const TD_DS_BLADE_3 = wt[10][0];
  const TD_DS_DRIVE_TRAIN = wt[11][0];
  const TD_DS_GEARBOX = wt[12][0];
  const TD_DS_GENERATOR = wt[13][0];
  const TD_DS_TOWER = wt[14][0];
  const TD_FP_RUL = wt[15][0];
  const TD_MET = wt[16][0];
  const TD_SC_OUTPUT = wt[17][0];
  

  const reObj = {
    A:[ //%
      { idx: 1, id: 'yaw Health Index', values: TD_FP_RUL?.YAW_HEALTH_IDX ?? 0, format: '%', st: false, group: 'A' }, 
      { idx: 2, id: 'Pitch System Health Index', values: TD_FP_RUL?.PITCH_HEALTH_IDX ?? 0, format: '%', st: false, group: 'A' }, 
      { idx: 3, id: 'gear box Health Index', values: TD_FP_RUL?.GB_HEALTH_IDX ?? 0, format: '%', st: false, group: 'A' }, 
      { idx: 4, id: 'main bearing Health Index', values: TD_FP_RUL?.MB_HEALTH_IDX ?? 0, format: '%', st: false, group: 'A' }, 
      { idx: 5, id: 'generator Generator Health Index', values: TD_FP_RUL?.GEN_HEALTH_IDX ?? 0, format: '%', st: false, group: 'A' }, 
      { idx: 6, id: 'Pitch System Design Age', values: TD_FP_RUL?.PITCH_DESIGN_AGE ?? 0, format: '%', st: false, group: 'A' }, 
      { idx: 7, id: 'Pitch System Estimated Age', values: TD_FP_RUL?.PITCH_EST_AGE ?? 0, format: '%', st: false, group: 'A' }, 
      { idx: 8, id: 'yaw Design Age', values: TD_FP_RUL?.YAW_DESIGN_AGE ?? 0, format: '%', st: false, group: 'A' }, 
      { idx: 9, id: 'yaw Estimated Age', values: TD_FP_RUL?.YAW_EST_AGE ?? 0, format: '%', st: false, group: 'A' },
      { idx: 10, id: 'Entire Turbine Health Index', values: TD_SC_OUTPUT?.TURBINE_HEALTH_INDEX ?? 0, format: '%', st: false, group: 'A' },
    ],
    B:[ //℃
      { idx: 11, id: 'Gearbox Temperate - Measured Value', values: TD_DA_OUTPUT?.GB_MEAS_TEMP ?? 0, format: '℃', st: false, group: 'B' },
      { idx: 12, id: 'Gearbox Temperate - Predicted Value', values: TD_DA_OUTPUT?.GB_PRED_TEMP ?? 0, format: '℃', st: false, group: 'B' },
      { idx: 13, id: 'Gearbox Temperate - Deviation', values: TD_DA_OUTPUT?.GB_TEMP_DEV ?? 0, format: '℃', st: false, group: 'B' },
      { idx: 14, id: 'MainBearing Temperate - Measured Value', values: TD_DA_OUTPUT?.MB_MEAS_TEMP ?? 0, format: '℃', st: false, group: 'B' },
      { idx: 15, id: 'MainBearing Temperate - Predicted Value', values: TD_DA_OUTPUT?.MB_PRED_TEMP ?? 0, format: '℃', st: false, group: 'B' },
      { idx: 16, id: 'MainBearing Temperate - Deviation', values: TD_DA_OUTPUT?.MB_TEMP_DEV ?? 0, format: '℃', st: false, group: 'B' },
      { idx: 17, id: 'Generator Winding A Temperate - Measured Value', values: TD_DA_OUTPUT?.GENA_MEAS_TEMP ?? 0, format: '℃', st: false, group: 'B' },
      { idx: 18, id: 'Generator Winding A Temperate - Predicted Value', values: TD_DA_OUTPUT?.GENA_PRED_TEMP ?? 0, format: '℃', st: false, group: 'B' },
      { idx: 19, id: 'Generator Winding A Temperate - Deviation', values: TD_DA_OUTPUT?.GENA_TEMP_DEV ?? 0, format: '℃', st: false, group: 'B' },
      { idx: 20, id: 'Generator Winding B Temperate - Measured Value', values: TD_DA_OUTPUT?.GENB_MEAS_TEMP ?? 0, format: '℃', st: false, group: 'B' },
      { idx: 21, id: 'Generator Winding B Temperate - Predicted Value', values: TD_DA_OUTPUT?.GENB_PRED_TEMP ?? 0, format: '℃', st: false, group: 'B' },
      { idx: 22, id: 'Generator Winding B Temperate - Deviation', values: TD_DA_OUTPUT?.GENB_TEMP_DEV ?? 0, format: '℃', st: false, group: 'B' },
      { idx: 23, id: 'Generator Winding C Temperate - Measured Value', values: TD_DA_OUTPUT?.GENC_MEAS_TEMP ?? 0, format: '℃', st: false, group: 'B' },
      { idx: 24, id: 'Generator Winding C Temperate - Predicted Value', values: TD_DA_OUTPUT?.GENC_PRED_TEMP ?? 0, format: '℃', st: false, group: 'B' },
      { idx: 25, id: 'Generator Winding C Temperate - Deviation', values: TD_DA_OUTPUT?.GENC_TEMP_DEV ?? 0, format: '℃', st: false, group: 'B' },
      { idx: 26, id: 'MET - Temperature', values: TD_MET?.AIR_TEMP ?? 0, format: '℃', st: false, group: 'B' },
      { idx: 27, id: 'NAC - Temperature', values: TB_SCADA_AD_1S?.WNAC_EX_TMP ?? 0, format: '℃', st: false, group: 'B' },
      { idx: 28, id: 'Blade1 Motor temp', values: TB_SCADA_AD_1S?.PT_MOT_TMP_BL_1 ?? 0, format: '℃', st: false, group: 'B' },
      { idx: 29, id: 'Blade1 Cabinet temp', values: TB_SCADA_AD_1S?.PT_CABI_TMP_BL_1 ?? 0, format: '℃', st: false, group: 'B' },
      { idx: 30, id: 'Blade2 Motor temp', values: TB_SCADA_AD_1S?.PT_MOT_TMP_BL_2 ?? 0, format: '℃', st: false, group: 'B' },
      { idx: 31, id: 'Blade2 Cabinet temp', values: TB_SCADA_AD_1S?.PT_CABI_TMP_BL_2 ?? 0, format: '℃', st: false, group: 'B' },
      { idx: 32, id: 'Blade3 Motor temp', values: TB_SCADA_AD_1S?.PT_MOT_TMP_BL_3 ?? 0, format: '℃', st: false, group: 'B' },
      { idx: 33, id: 'Blade3 Cabinet temp', values: TB_SCADA_AD_1S?.PT_CABI_TMP_BL_3 ?? 0, format: '℃', st: false, group: 'B' },
      { idx: 34, id: 'main bearing max bearing temp', values: TB_SCADA_AD_1S?.TM_TMP_SHF_BRG_MAX ?? 0, format: '℃', st: false, group: 'B' },
      { idx: 35, id: 'oil inlet temp', values: TB_SCADA_AD_1S?.TM_TMP_GBX_OIL ?? 0, format: '℃', st: false, group: 'B' },
      { idx: 36, id: 'oil tank temp', values: TB_SCADA_AD_1S?.GBX_OIL_TNK_TMP ?? 0, format: '℃', st: false, group: 'B' },
      { idx: 37, id: 'oil heater temp', values: TB_SCADA_AD_1S?.GBX_OIL_HT_TMP ?? 0, format: '℃', st: false, group: 'B' },
      { idx: 38, id: 'Generator water inlet temp', values: TB_SCADA_AD_1S?.GN_TMP_IN_LET ?? 0, format: '℃', st: false, group: 'B' },
      { idx: 39, id: 'Generator bearing non drive temp', values: TB_SCADA_AD_1S?.GN_BRG_NDET_TMP ?? 0, format: '℃', st: false, group: 'B' },
      { idx: 40, id: 'Generator slipring space temp', values: TB_SCADA_AD_1S?.GN_SLI_TMP ?? 0, format: '℃', st: false, group: 'B' },
      { idx: 41, id: 'Generator winding [u] temp', values: TB_SCADA_AD_1S?.GN_TMP_U ?? 0, format: '℃', st: false, group: 'B' },
      { idx: 42, id: 'Generator winding [v] temp', values: TB_SCADA_AD_1S?.GN_TMP_V ?? 0, format: '℃', st: false, group: 'B' },
      { idx: 43, id: 'Generator winding [w] temp', values: TB_SCADA_AD_1S?.GN_TMP_W ?? 0, format: '℃', st: false, group: 'B' },
      { idx: 44, id: 'Generator bearing drive temp', values: TB_SCADA_AD_1S?.GN_BRG_DET_TMP ?? 0, format: '℃', st: false, group: 'B' },
      { idx: 45, id: 'Generator winding temp max', values: TB_SCADA_AD_1S?.GN_TMP_STA_MAX ?? 0, format: '℃', st: false, group: 'B' },
      { idx: 46, id: 'Generator bearing temp max', values: TB_SCADA_AD_1S?.GN_BRG_TMP_MAX ?? 0, format: '℃', st: false, group: 'B' },
    ],
    C:[ //Hz
      { idx: 47, id: 'Freq', values: TB_SCADA_AD_1S?.WCNV_HZ ?? 0, format: 'Hz', st: false, group: 'C' },
    ],
    D:[ //m/s
      { idx: 48, id: 'MET - Wind Speed', values: TD_MET?.WD_SPD ?? 0, format: 'm/s', st: false, group: 'D' },
      { idx: 49, id: 'NAC - Wind Speed', values: TB_SCADA_AD_1S?.WNAC_WD_SPD ?? 0, format: 'm/s', st: false, group: 'D' },
      { idx: 50, id: 'Rotor rotor speed', values: TB_SCADA_AD_1S?.ROT_SPD ?? 0, format: 'm/s', st: false, group: 'D' },
      { idx: 51, id: 'Generator generator speed', values: TB_SCADA_AD_1S?.WGEN_SPD ?? 0, format: 'm/s', st: false, group: 'D' },
      { idx: 52, id: 'motor calculated rotation', values: TB_SCADA_AD_1S?.WYAW_YW_SPD ?? 0, format: 'm/s', st: false, group: 'D' },
    ],
    E:[ //m/s2
      { idx: 53, id: 'Vibration Acceleration - Axial', values: TD_DM_DRIVE_TRAIN?.VIB_ACC_AX ?? 0, format: 'm/s²', st: false, group: 'E' },
      { idx: 54, id: 'Vibration Acceleration - Horizontal', values: TD_DM_DRIVE_TRAIN?.VIB_ACC_HORZ ?? 0, format: 'm/s²', st: false, group: 'E' },
      { idx: 55, id: 'Vibration Acceleration - Axial', values: TD_DM_DRIVE_TRAIN?.VIB_ACC_AX ?? 0, format: 'm/s²', st: false, group: 'E' },
      { idx: 56, id: 'Vibration Acceleration - Horizontal', values: TD_DM_DRIVE_TRAIN?.VIB_ACC_HORZ ?? 0, format: 'm/s²', st: false, group: 'E' },
      { idx: 57, id: 'Vibration Acceleration - 1st Stage Planetary Gear Bearing (1st) - Horizontal', values: TD_DM_GEARBOX?.VIB_ACC_1SPGB_HORZ ?? 0, format: 'm/s²', st: false, group: 'E' },
      { idx: 58, id: 'Vibration Acceleration - 2nd Stage Planetary Gear Bearing (2nd) - Horizontal', values: TD_DM_GEARBOX?.VIB_ACC_2SPGB_HORZ ?? 0, format: 'm/s²', st: false, group: 'E' },
      { idx: 59, id: 'Vibration Acceleration - Low Speed Axis (3rd) - Vertical', values: TD_DM_GEARBOX?.VIB_ACC_LSA_VERT ?? 0, format: 'm/s²', st: false, group: 'E' },
      { idx: 60, id: 'Vibration Acceleration - High Speed Axis (Out) - Horizontal', values: TD_DM_GEARBOX?.VIB_ACC_HSA_HORZ ?? 0, format: 'm/s²', st: false, group: 'E' },
      { idx: 61, id: 'Vibration Acceleration - Drive End (DE) - Horizonal', values: TD_DM_GENERATOR?.VIB_ACC_DE_HORZ ?? 0, format: 'm/s²', st: false, group: 'E' },
      { idx: 62, id: 'Vibration Acceleration - Non Drive End (NDE) - Horizontal', values: TD_DM_GENERATOR?.VIB_ACC_NDE_HORZ ?? 0, format: 'm/s²', st: false, group: 'E' },
      { idx: 63, id: 'Vibration (Normal)', values: TD_DM_TOWER?.VIB_NORM ?? 0, format: 'm/s²', st: false, group: 'E' },
      { idx: 64, id: 'Vibration (Lateral)', values: TD_DM_TOWER?.VIB_LAT ?? 0, format: 'm/s²', st: false, group: 'E' },
      { idx: 65, id: 'Acceleration RMS - Axial [m/s2]', values: TD_DS_DRIVE_TRAIN?.ACC_RMS_AX ?? 0, format: 'm/s²', st: false, group: 'E' },
      { idx: 66, id: 'Acceleration RMS - Horizontal [m/s2]', values: TD_DS_DRIVE_TRAIN?.ACC_RMS_HORZ ?? 0, format: 'm/s²', st: false, group: 'E' },
      { idx: 67, id: 'Acceleration RMS - 1st Stage Planetary Gear Bearing (1st) - Horizontal', values: TD_DS_GEARBOX?.ACC_RMS_1SPGB_HORZ ?? 0, format: 'm/s²', st: false, group: 'E' },
      { idx: 68, id: 'Acceleration RMS - 2nd Stage Planetary Gear Bearing (2nd) - Horizontal', values: TD_DS_GEARBOX?.ACC_RMS_2SPGB_HORZ ?? 0, format: 'm/s²', st: false, group: 'E' },
      { idx: 69, id: 'Acceleration RMS - Low Speed Axis (3rd) - Vertical', values: TD_DS_GEARBOX?.ACC_RMS_LSA_VERT ?? 0, format: 'm/s²', st: false, group: 'E' },
      { idx: 70, id: 'Acceleration RMS - High Speed Axis (Out) - Horizontal', values: TD_DS_GEARBOX?.ACC_RMS_HSA_HORZ ?? 0, format: 'm/s²', st: false, group: 'E' },
      { idx: 71, id: 'Acceleration RMS - Horizonal (DE)', values: TD_DS_GENERATOR?.ACC_RMS_HORZ_DE ?? 0, format: 'm/s²', st: false, group: 'E' },
      { idx: 72, id: 'Acceleration RMS - Horizontal (NDE)', values: TD_DS_GENERATOR?.ACC_RMS_HORZ_NDE ?? 0, format: 'm/s²', st: false, group: 'E' },
      { idx: 73, id: 'Vibration RMS (Normal)', values: TD_DS_TOWER?.NAC_VEL_RMS_NORM ?? 0, format: 'm/s²', st: false, group: 'E' },
      { idx: 74, id: 'Vibration RMS (Lateral)', values: TD_DS_TOWER?.NAC_VIB_RMS_LAT ?? 0, format: 'm/s²', st: false, group: 'E' },
    ],
    F:[ //mm/s
      { idx: 75, id: 'Vibration Velocity - Axial', values: TD_DM_DRIVE_TRAIN?.VIB_VEL_AX ?? 0, format: 'mm/s', st: false, group: 'F' },
      { idx: 76, id: 'Vibration Velocity - Horizontal', values: TD_DM_DRIVE_TRAIN?.VIB_VEL_HORZ ?? 0, format: 'mm/s', st: false, group: 'F' },
      { idx: 77, id: 'Vibration Velocity - Axial', values: TD_DM_DRIVE_TRAIN?.VIB_VEL_AX ?? 0, format: 'mm/s', st: false, group: 'F' },
      { idx: 78, id: 'Vibration Velocity - Horizontal', values: TD_DM_DRIVE_TRAIN?.VIB_VEL_HORZ ?? 0, format: 'mm/s', st: false, group: 'F' },
      { idx: 79, id: 'Vibration Velocity - 1st Stage Planetary Gear Bearing (1st) - Horizontal', values: TD_DM_GEARBOX?.VIB_VEL_1SPGB_HORZ ?? 0, format: 'mm/s', st: false, group: 'F' },
      { idx: 80, id: 'Vibration Velocity - 2nd Stage Planetary Gear Bearing (2nd)- Horizontal', values: TD_DM_GEARBOX?.VIB_VEL_2SPGB_HORZ ?? 0, format: 'mm/s', st: false, group: 'F' },
      { idx: 81, id: 'Vibration Velocity - Low Speed Axis (3rd) - Vertical', values: TD_DM_GEARBOX?.VIB_VEL_LSA_VERT ?? 0, format: 'mm/s', st: false, group: 'F' },
      { idx: 82, id: 'Vibration Velocity - High Speed Axis (Out) - Horizontal', values: TD_DM_GEARBOX?.VIB_VEL_HSA_HORZ ?? 0, format: 'mm/s', st: false, group: 'F' },
      { idx: 83, id: 'Vibration Velocity - Drive End (DE) - Horizonal', values: TD_DM_GENERATOR?.VIB_VEL_DE_HORZ ?? 0, format: 'mm/s', st: false, group: 'F' },
      { idx: 84, id: 'Vibration Velocity - Non Drive End (NDE) - Horizontal', values: TD_DM_GENERATOR?.VIB_VEL_NDE_HORZ ?? 0, format: 'mm/s', st: false, group: 'F' },
      { idx: 85, id: 'Velocity RMS - Axial [mm/s]', values: TD_DS_DRIVE_TRAIN?.VEL_RMS_AX ?? 0, format: 'mm/s', st: false, group: 'F' },
      { idx: 86, id: 'Velocity RMS - Horizontal [mm/s]', values: TD_DS_DRIVE_TRAIN?.VEL_RMS_HORZ ?? 0, format: 'mm/s', st: false, group: 'F' },
      { idx: 87, id: 'Velocity RMS - 1st Stage Planetary Gear Bearing (1st) - Horizontal', values: TD_DS_GEARBOX?.VEL_RMS_1SPGB_HORZ ?? 0, format: 'mm/s', st: false, group: 'F' },
      { idx: 88, id: 'Velocity RMS - 2nd Stage Planetary Gear Bearing (2nd)- Horizontal', values: TD_DS_GEARBOX?.VEL_RMS_2SPGB_HORZ ?? 0, format: 'mm/s', st: false, group: 'F' },
      { idx: 89, id: 'Velocity RMS - Low Speed Axis (3rd) - Vertical', values: TD_DS_GEARBOX?.VEL_RMS_LSA_VERT ?? 0, format: 'mm/s', st: false, group: 'F' },
      { idx: 90, id: 'Velocity RMS - High Speed Axis (Out) - Horizontal', values: TD_DS_GEARBOX?.VEL_RMS_HSA_HORZ ?? 0, format: 'mm/s', st: false, group: 'F' },
      { idx: 91, id: 'Velocity RMS - Horizonal (DE)', values: TD_DS_GENERATOR?.VEL_RMS_HORZ_DE ?? 0, format: 'mm/s', st: false, group: 'F' },
      { idx: 92, id: 'Velocity RMS - Horizontal (NDE)', values: TD_DS_GENERATOR?.VEL_RMS_HORZ_NDE ?? 0, format: 'mm/s', st: false, group: 'F' },
    ],
    G:[ //month
      { idx: 93, id: 'Blade1 Nominal Age', values: TD_FP_RUL?.BLADE_1_NOM_AGE ?? 0, format: 'month', st: false, group: 'G' }, 
      { idx: 94, id: 'Blade1 Estimated Fatigue Age', values: TD_FP_RUL?.BLADE_1_EST_FAT_AGE ?? 0, format: 'month', st: false, group: 'G' }, 
      { idx: 95, id: 'Blade1 Estimated Fatigue Margin', values: TD_FP_RUL?.BLADE_1_EST_FAT_MARGIN ?? 0, format: 'month', st: false, group: 'G' }, 
      { idx: 96, id: 'Blade2 Nominal Age', values: TD_FP_RUL?.BLADE_2_NOM_AGE ?? 0, format: 'month', st: false, group: 'G' }, 
      { idx: 97, id: 'Blade2 Estimated Fatigue Age', values: TD_FP_RUL?.BLADE_2_EST_FAT_AGE ?? 0, format: 'month', st: false, group: 'G' }, 
      { idx: 98, id: 'Blade2 Estimated Fatigue Margin', values: TD_FP_RUL?.BLADE_2_EST_FAT_MARGIN ?? 0, format: 'month', st: false, group: 'G' }, 
      { idx: 99, id: 'Blade3 Nominal Age', values: TD_FP_RUL?.BLADE_3_NOM_AGE ?? 0, format: 'month', st: false, group: 'G' }, 
      { idx: 101, id: 'Blade3 Estimated Fatigue Age', values: TD_FP_RUL?.BLADE_3_EST_FAT_AGE ?? 0, format: 'month', st: false, group: 'G' }, 
      { idx: 102, id: 'Blade3 Estimated Fatigue Margin', values: TD_FP_RUL?.BLADE_3_EST_FAT_MARGIN ?? 0, format: 'month', st: false, group: 'G' }, 
      { idx: 103, id: 'Pitch System Design Age', values: TD_FP_RUL?.PITCH_DESIGN_AGE ?? 0, format: 'month', st: false, group: 'G' }, 
      { idx: 104, id: 'Pitch System Estimated Age', values: TD_FP_RUL?.PITCH_EST_AGE ?? 0, format: 'month', st: false, group: 'G' }, 
      { idx: 105, id: 'Tower top Nominal Age', values: TD_FP_RUL?.TOWER_NOM_AGE ?? 0, format: 'month', st: false, group: 'G' }, 
      { idx: 106, id: 'Tower top Estimated Fatigue Age', values: TD_FP_RUL?.TOWER_EST_FAT_AGE ?? 0, format: 'month', st: false, group: 'G' }, 
      { idx: 107, id: 'Tower top Estimated Fatigue Margin', values: TD_FP_RUL?.TOWER_EST_FAT_MARGIN ?? 0, format: 'month', st: false, group: 'G' }, 
      { idx: 108, id: 'Tower Bottom Nominal Age', values: TD_FP_RUL?.TOWER_NOM_AGE ?? 0, format: 'month', st: false, group: 'G' }, 
      { idx: 109, id: 'Tower Bottom Estimated Fatigue Age', values: TD_FP_RUL?.TOWER_EST_FAT_AGE ?? 0, format: 'month', st: false, group: 'G' }, 
      { idx: 110, id: 'Tower Bottom Estimated Fatigue Margin', values: TD_FP_RUL?.TOWER_EST_FAT_MARGIN ?? 0, format: 'month', st: false, group: 'G' }, 
      { idx: 111, id: 'gear box Design Age', values: TD_FP_RUL?.GB_DESIGN_AGE ?? 0, format: 'month', st: false, group: 'G' }, 
      { idx: 112, id: 'gear box Estimated Age', values: TD_FP_RUL?.GB_EST_AGE ?? 0, format: 'month', st: false, group: 'G' }, 
      { idx: 113, id: 'main bearing Design Age', values: TD_FP_RUL?.MB_DESIGN_LIFE ?? 0, format: 'month', st: false, group: 'G' }, 
      { idx: 114, id: 'main bearing Estimated Age', values: TD_FP_RUL?.MB_EST_LIFE ?? 0, format: 'month', st: false, group: 'G' }, 
      { idx: 115, id: 'generator Generator Design Age', values: TD_FP_RUL?.GEN_DESIGN_AGE ?? 0, format: 'month', st: false, group: 'G' }, 
      { idx: 116, id: 'generator Generator Estimated Age', values: TD_FP_RUL?.GEN_EST_AGE ?? 0, format: 'month', st: false, group: 'G' }, 
    ],
    H:[ //Nm
      { idx: 117, id: 'Blade1 Torque', values: TB_SCADA_AD_1S?.TQ_RMS_BL_1 ?? 0, format: 'Nm', st: false, group: 'H' },
      { idx: 118, id: 'Blade2 Torque', values: TB_SCADA_AD_1S?.TQ_RMS_BL_2 ?? 0, format: 'Nm', st: false, group: 'H' },
      { idx: 119, id: 'Blade3 Torque', values: TB_SCADA_AD_1S?.TQ_RMS_BL_3 ?? 0, format: 'Nm', st: false, group: 'H' },
      { idx: 120, id: 'motor calculated torque', values: TB_SCADA_AD_1S?.WYAW_YW_TORQ ?? 0, format: 'Nm', st: false, group: 'H' },
    ],
    I:[ //º (deg)
      { idx: 121, id: 'Pitch Angle', values: TD_DA_OUTPUT?.PITCH_ANGLE_MEAS ?? 0, format: '°', st: false, group: 'I' },
      { idx: 122, id: 'Pitch Angle (Measured Value)', values: TD_DA_OUTPUT?.PITCH_ANGLE_MEAS ?? 0, format: '°', st: false, group: 'I' },
      { idx: 123, id: 'Pitch Angle (Prediction Value)', values: TD_DA_OUTPUT?.PITCH_ANGLE_PRED ?? 0, format: '°', st: false, group: 'I' },
      { idx: 124, id: 'Pitch Angle (Deviation)', values: TD_DA_OUTPUT?.PITCH_ANGLE_DEV ?? 0, format: '°', st: false, group: 'I' },
      { idx: 125, id: 'Yaw Angle - Nacelle Position', values: TD_DA_OUTPUT?.YAW_ANGLE_NACELLE ?? 0, format: '°', st: false, group: 'I' },
      { idx: 126, id: 'Yaw Angle - Wind Direction', values: TD_DA_OUTPUT?.YAW_ANGLE_WIND_DIR ?? 0, format: '°', st: false, group: 'I' },
      { idx: 127, id: 'Yaw Angle - Deviation', values: TD_DA_OUTPUT?.YAW_ANGLE_DEV ?? 0, format: '°', st: false, group: 'I' },
      { idx: 128, id: 'MET - Wind Direction', values: TD_MET?.WD_DIR ?? 0, format: '°', st: false, group: 'I' },
      { idx: 129, id: 'NAC - Wind Direction', values: TB_SCADA_AD_1S?.WNAC_WD_DIR ?? 0, format: '°', st: false, group: 'I' },
      { idx: 130, id: 'Yaw Angle', values: TB_SCADA_AD_1S?.WYAW_YAW_ANG ?? 0, format: '°', st: false, group: 'I' },
      { idx: 131, id: 'Blade1 position', values: TB_SCADA_AD_1S?.PT_ANG_VAL_BL_1 ?? 0, format: '°', st: false, group: 'I' },
      { idx: 132, id: 'Blade2 position', values: TB_SCADA_AD_1S?.PT_ANG_VAL_BL_2 ?? 0, format: '°', st: false, group: 'I' },
      { idx: 133, id: 'Blade3 position', values: TB_SCADA_AD_1S?.PT_ANG_VAL_BL_3 ?? 0, format: '°', st: false, group: 'I' },
      { idx: 134, id: 'yaw - deviation', values: TB_SCADA_AD_1S?.WYAW_YW_POS_ERR_DMD ?? 0, format: '°', st: false, group: 'I' },
    ],
    J:[ //Pa
      { idx: 135, id: 'Blade1 Bending (Flapwise)', values: TD_DM_BLADE_ONE?.BM_FLAP ?? 0, format: 'Pa', st: false, group: 'J' },
      { idx: 136, id: 'Blade1 Bending (Edgewise)', values: TD_DM_BLADE_ONE?.BM_EDGE ?? 0, format: 'Pa', st: false, group: 'J' },
      { idx: 137, id: 'Blade1 Torsion', values: TD_DM_BLADE_ONE?.TOR ?? 0, format: 'Pa', st: false, group: 'J' },
      { idx: 138, id: 'Blade2 Bending (Flapwise)', values: TD_DM_BLADE_TWO?.BM_FLAP ?? 0, format: 'Pa', st: false, group: 'J' },
      { idx: 139, id: 'Blade2 Bending (Edgewise)', values: TD_DM_BLADE_TWO?.BM_EDGE ?? 0, format: 'Pa', st: false, group: 'J' },
      { idx: 140, id: 'Blade2 Torsion', values: TD_DM_BLADE_TWO?.TOR ?? 0, format: 'Pa', st: false, group: 'J' },
      { idx: 141, id: 'Blade3 Bending (Flapwise)', values: TD_DM_BLADE_THREE?.BM_FLAP ?? 0, format: 'Pa', st: false, group: 'J' },
      { idx: 142, id: 'Blade3 Bending (Edgewise)', values: TD_DM_BLADE_THREE?.BM_EDGE ?? 0, format: 'Pa', st: false, group: 'J' },
      { idx: 143, id: 'Blade3 Torsion', values: TD_DM_BLADE_THREE?.TOR ?? 0, format: 'Pa', st: false, group: 'J' },
      { idx: 144, id: 'Bending (N-S)', values: TD_DM_TOWER?.TOP_BM_NS ?? 0, format: 'Pa', st: false, group: 'J' },
      { idx: 145, id: 'Bending (E-W)', values: TD_DM_TOWER?.TOP_BM_EW ?? 0, format: 'Pa', st: false, group: 'J' },
      { idx: 146, id: 'Torsional', values: TD_DM_TOWER?.TOP_TOR ?? 0, format: 'Pa', st: false, group: 'J' },
      { idx: 147, id: 'Blade1 DEL (Flapwise)', values: TD_DS_BLADE_1?.FLAP_DEL ?? 0, format: 'Pa', st: false, group: 'J' },
      { idx: 148, id: 'Blade1 DEL (Edge)', values: TD_DS_BLADE_1?.EDGE_DEL ?? 0, format: 'Pa', st: false, group: 'J' },
      { idx: 149, id: 'Blade2 DEL (Flapwise)', values: TD_DS_BLADE_2?.FLAP_DEL ?? 0, format: 'Pa', st: false, group: 'J' },
      { idx: 150, id: 'Blade2 DEL (Edge)', values: TD_DS_BLADE_2?.EDGE_DEL ?? 0, format: 'Pa', st: false, group: 'J' },
      { idx: 151, id: 'Blade3 DEL (Flapwise)', values: TD_DS_BLADE_3?.FLAP_DEL ?? 0, format: 'Pa', st: false, group: 'J' },
      { idx: 152, id: 'Blade3 DEL (Edge)', values: TD_DS_BLADE_3?.EDGE_DEL ?? 0, format: 'Pa', st: false, group: 'J' },
      { idx: 153, id: 'Tower top DEL', values: TD_DS_TOWER?.TOP_DEL ?? 0, format: 'Pa', st: false, group: 'J' },
      { idx: 154, id: 'Tower Bottom DEL', values: TD_DS_TOWER?.TOP_DEL ?? 0, format: 'Pa', st: false, group: 'J' },
      // { id: 'Bending (N-S)', values: TD_DM_TOWER?.BASE_BM_NS ?? 0 },
      // { id: 'Bending (E-W)', values: TD_DM_TOWER?.BASE_BM_EW ?? 0 },
    ],
    K:[ //V
      { idx: 155, id: 'oil pump pressure', values: TB_SCADA_AD_1S?.GBX_OIL_PRES ?? 0, format: 'V', st: false, group: 'K' },
      { idx: 156, id: 'oil pump oil inlet pressure', values: TB_SCADA_AD_1S?.GBX_OIL_IN_PRES ?? 0, format: 'V', st: false, group: 'K' },
      { idx: 157, id: 'Blade1 DC bus voltage', values: TB_SCADA_AD_1S?.PT_CNV_DCL_VOL_BL_1 ?? 0, format: 'V', st: false, group: 'K' },
      { idx: 158, id: 'Blade1 Battery Voltage', values: TB_SCADA_AD_1S?.PT_UPS_V_BL_1 ?? 0, format: 'V', st: false, group: 'K' },
      { idx: 159, id: 'Blade2 DC bus voltage', values: TB_SCADA_AD_1S?.PT_CNV_DCL_VOL_BL_2 ?? 0, format: 'V', st: false, group: 'K' },
      { idx: 160, id: 'Blade2 Battery Voltage', values: TB_SCADA_AD_1S?.PT_UPS_V_BL_2 ?? 0, format: 'V', st: false, group: 'K' },
      { idx: 161, id: 'Blade3 DC bus voltage', values: TB_SCADA_AD_1S?.PT_CNV_DCL_VOL_BL_3 ?? 0, format: 'V', st: false, group: 'K' },
      { idx: 162, id: 'Blade3 Battery Voltage', values: TB_SCADA_AD_1S?.PT_UPS_V_BL_3 ?? 0, format: 'V', st: false, group: 'K' },
    ],
    L:[ //Wh
      { idx: 163, id: 'Active Power', values: TB_SCADA_AD_1S?.TOT_WH ?? 0, format: 'Wh', st: false, group: 'L' },
      { idx: 164, id: 'Generator active power', values: TB_SCADA_AD_1S?.WGEN_W ?? 0, format: 'Wh', st: false, group: 'L' },
    ],
    M:[ //-      
      { idx: 165, id: 'Blade1 state', values: TB_SCADA_AD_1S?.BLD_1_ST ?? 0, format: 'Num', st: false, group: 'M' },
      { idx: 166, id: 'Blade1 Free wheel brake', values: TB_SCADA_AD_1S?.BLD_1_BRK_ST ?? 0, format: 'Num', st: false, group: 'M' },
      { idx: 167, id: 'Blade1 Battery State', values: TB_SCADA_AD_1S?.BLD_1_UPS_ST ?? 0, format: 'Num', st: false, group: 'M' },
      { idx: 168, id: 'Blade2 state', values: TB_SCADA_AD_1S?.BLD_2_ST ?? 0, format: 'Num', st: false, group: 'M' },
      { idx: 169, id: 'Blade2 Free wheel brake', values: TB_SCADA_AD_1S?.BLD_2_BRK_ST ?? 0, format: 'Num', st: false, group: 'M' },
      { idx: 170, id: 'Blade2 Battery State', values: TB_SCADA_AD_1S?.BLD_2_UPS_ST ?? 0, format: 'Num', st: false, group: 'M' },
      { idx: 171, id: 'Blade3 state', values: TB_SCADA_AD_1S?.BLD_3_ST ?? 0, format: 'Num', st: false, group: 'M' },
      { idx: 172, id: 'Blade3 Free wheel brake', values: TB_SCADA_AD_1S?.BLD_3_BRK_ST ?? 0, format: 'Num', st: false, group: 'M' },
      { idx: 173, id: 'Blade3 Battery State', values: TB_SCADA_AD_1S?.BLD_3_UPS_ST ?? 0, format: 'Num', st: false, group: 'M' },
      { idx: 174, id: 'Fan heating/cooling state', values: TB_SCADA_AD_1S?.GBX_ST ?? 0, format: 'Num', st: false, group: 'M' },
      { idx: 175, id: 'Fan low speed', values: TB_SCADA_AD_1S?.GBX_FAN_LO_SPD_ST ?? 0, format: 'Num', st: false, group: 'M' },
      { idx: 176, id: 'Fan high speed', values: TB_SCADA_AD_1S?.GBX_FAN_HI_SPD_ST ?? 0, format: 'Num', st: false, group: 'M' },
      { idx: 177, id: 'Rotor lock (set)', values: TB_SCADA_AD_1S?.ROT_LOCK_SET_ST ?? 0, format: 'Num', st: false, group: 'M' },
      { idx: 178, id: 'Rotor lock (free)', values: TB_SCADA_AD_1S?.ROT_LOCK_FREE_ST ?? 0, format: 'Num', st: false, group: 'M' },
      { idx: 179, id: 'oil pump low speed', values: TB_SCADA_AD_1S?.GBX_OIL_PMP_LO_SPD_ST ?? 0, format: 'Num', st: false, group: 'M' },
      { idx: 180, id: 'oil pump high speed', values: TB_SCADA_AD_1S?.GBX_OIL_PMP_HI_SPD_ST ?? 0, format: 'Num', st: false, group: 'M' },
      { idx: 181, id: 'oil pump oil level', values: TB_SCADA_AD_1S?.GBX_OIL_LEV_ST ?? 0, format: 'Num', st: false, group: 'M' },
      { idx: 182, id: 'Brake Hydraulic oil pump', values: TB_SCADA_AD_1S?.GN_BRK_HY_PRES_ST ?? 0, format: 'Num', st: false, group: 'M' },
      { idx: 183, id: 'Brake Hydraulic pressure', values: TB_SCADA_AD_1S?.GN_BRK_HY_PMP_ST ?? 0, format: 'Num', st: false, group: 'M' },
      { idx: 184, id: 'Brake Hydraulic oil level', values: TB_SCADA_AD_1S?.GBX_HY_OIL_LEV_ST ?? 0, format: 'Num', st: false, group: 'M' },
      { idx: 185, id: 'Brake Hydraulic oil temp', values: TB_SCADA_AD_1S?.GBX_HY_OIL_TMP_ST ?? 0, format: 'Num', st: false, group: 'M' },
      { idx: 186, id: 'Brake Breake open', values: TB_SCADA_AD_1S?.BRK_OPEN_ST ?? 0, format: 'Num', st: false, group: 'M' },
      { idx: 187, id: 'Brake Pressure', values: TB_SCADA_AD_1S?.BRK_PRES_ST ?? 0, format: 'Num', st: false, group: 'M' },
      { idx: 188, id: 'Generator cooling pump', values: TB_SCADA_AD_1S?.GN_CL_PMP_ST ?? 0, format: 'Num', st: false, group: 'M' },
      { idx: 189, id: 'Info position ready for prod.', values: TB_SCADA_AD_1S?.WYAW_POS_OK_ST ?? 0, format: 'Num', st: false, group: 'M' },
      { idx: 190, id: 'Info service box connect', values: TB_SCADA_AD_1S?.WYAW_SER_BOX_ST ?? 0, format: 'Num', st: false, group: 'M' },
      { idx: 191, id: 'Info allow to move', values: TB_SCADA_AD_1S?.WYAW_POS_NOT_MOV_ST ?? 0, format: 'Num', st: false, group: 'M' },
      { idx: 192, id: 'Info end position', values: TB_SCADA_AD_1S?.WYAW_POS_END_ST ?? 0, format: 'Num', st: false, group: 'M' },
      { idx: 193, id: 'brake released', values: TB_SCADA_AD_1S?.WYAW_MOT_BRK_ST ?? 0, format: 'Num', st: false, group: 'M' },
      { idx: 194, id: 'yaw state', values: TB_SCADA_AD_1S?.WYAW_YW_ST ?? 0, format: 'Num', st: false, group: 'M' },
      { idx: 195, id: 'yaw initialized', values: TB_SCADA_AD_1S?.WYAW_POS_INI_ST ?? 0, format: 'Num', st: false, group: 'M' },
      { idx: 196, id: 'yaw running', values: TB_SCADA_AD_1S?.WYAW_ON_ST ?? 0, format: 'Num', st: false, group: 'M' },
      // { id: 'Turbine Status', values: TB_SCADA_AD_1S?.WT_PLC_ST ?? 0 },
      // { id: 'yaw automatic mode', values: TB_SCADA_AD_1S?.WYAW_CM_YW_AUT_ST ?? 0 },
    ],
  }

  for(let i=0;i<my.length;i++){
    for(let x=0;x<reObj[my[i].group].length;x++){
      if(reObj[my[i].group][x].idx == my[i].idx){
        reObj[my[i].group][x].st = true;
        reObj[my[i].group][x].group = my[i].group;
        reObj[my[i].group][x].dbId = my[i].id;
        reObj[my[i].group][x].chartCk = my[i].chartCk;
      }
    }
  }

  return res.send(reObj);
});

router.post('/chart/save', async (req, res) =>{
  const userId = req.decoded.userId;

  const itemList = req.body.itemList;

  await seon.DBCall('main', `CALL SP_MAIN_CHART_DEL(?,?,?)`, [
    userId,
    req.body.page,
    req.body.cid,
  ]);

 

  for(let i=0;i<itemList.length;i++){
    await seon.DBCall('main', `CALL SP_MAIN_CHART_ADD(?,?,?,?,?,?)`, [
      userId,
      req.body.page,
      req.body.cid,
      itemList[i].group,
      itemList[i].idx,
      itemList[i].chartCk,
    ]);
  }

  return res.send(true);
});

router.post('/chart/select', async (req, res) =>{
  const userId = req.decoded.userId;

  const item = req.body.item;

  await seon.DBCall('main', `CALL SP_MAIN_CHART_SELECT(?,?,?,?,?)`, [
    userId,
    req.body.page,
    req.body.cid,
    item.idx,
    item.chartCk
  ]);

  return res.send(true);
});

function isDate(element, date)  {
  if(element.REGIST_DT === date)  {
    return true;
  }
}


router.get('/chart/item/history2', async (req, res) =>{
  const userId = req.decoded.userId;
  // { idx: 1, id: 'yaw Health Index', values: TD_FP_RUL?.YAW_HEALTH_IDX ?? 0, format: '%', st: false, group: 'A' }, 
  console.log(req.query);

  const group1 = req.query.group
  const group2 = req.query.group2

  const reObj = {
    A:[ //%
    ],
    B:[ //℃

    ],
    C:[ //Hz
    ],
    D:[ //m/s
    ],
    E:[ //m/s2
    ],
    F:[ //mm/s
    ],
    G:[ //month
    ],
    H:[ //Nm
    ],
    I:[ //º (deg)
    ],
    J:[ //Pa
    ],
    K:[ //V
    ],
    L:[ //Wh
    ],
    M:[ //-      
    ],
  }
  const main = await seon.DBCall('wt', `CALL SP_WT_HISTORY_DATE(?,?)`,[
    isEmpty(req.query.dateS),
    isEmpty(req.query.dateE),
  ]);

  const dateList = main.map((e)=>{return e.REGIST_DT})

  if(group1 == 'Blade_Pitch'){

    if(group2 == 'all' || group2 == 'Blade1' ){
      const wt = await seon.DBOriginCall('wt', `CALL SP_WT_CHART_HISTORY_BLADE1(?,?)`,[
        isEmpty(req.query.dateS),
        isEmpty(req.query.dateE),
      ]);
      const ts = await seon.DBOriginCall('ts', `CALL SP_TS_CHART_HISTORY_BLADE1(?,?)`,[
        isEmpty(req.query.dateS),
        isEmpty(req.query.dateE),
      ]);

      reObj['J'].push({ idx: 1, id: 'Blade1 Bending (Flapwise)', values: wt[0].map((e)=>{return {date:e['REGIST_DT'], value: e['Bending (Flapwise)']}}), format: 'Pa', st: false, group: 'J' })
      reObj['J'].push({ idx: 2, id: 'Blade1 Bending (Edgewise)', values: wt[0].map((e)=>{return {date:e['REGIST_DT'], value: e['Bending (Edgewise)']}}), format: 'Pa', st: false, group: 'J' })
      reObj['J'].push({ idx: 3, id: 'Blade1 Torsion', values: wt[0].map((e)=>{return {date:e['REGIST_DT'], value: e['Torsion']}}), format: 'Pa', st: false, group: 'J' })


      reObj['M'].push({ idx: 4, id: 'Blade1 state', values: ts[0].map((e)=>{return {date:e['REGIST_DT'], value: e['state']}}), format: '-', st: false, group: 'M' })
      reObj['M'].push({ idx: 5, id: 'Blade1 Free wheel brake', values: ts[0].map((e)=>{return {date:e['REGIST_DT'], value: e['Free wheel brake']}}), format: '-', st: false, group: 'M' })
      reObj['M'].push({ idx: 6, id: 'Blade1 Battery State', values: ts[0].map((e)=>{return {date:e['REGIST_DT'], value: e['Battery State']}}), format: '-', st: false, group: 'M' })
      reObj['B'].push({ idx: 7, id: 'Blade1 Motor temp', values: ts[0].map((e)=>{return {date:e['REGIST_DT'], value: e['Motor temp']}}), format: '℃', st: false, group: 'B' })
      reObj['B'].push({ idx: 8, id: 'Blade1 Cabinet temp', values: ts[0].map((e)=>{return {date:e['REGIST_DT'], value: e['Cabinet temp']}}), format: '℃', st: false, group: 'B' })
      reObj['H'].push({ idx: 9, id: 'Blade1 Torque', values: ts[0].map((e)=>{return {date:e['REGIST_DT'], value: e['Torque']}}), format: 'Nm', st: false, group: 'H' })
      reObj['I'].push({ idx: 10, id: 'Blade1 position', values: ts[0].map((e)=>{return {date:e['REGIST_DT'], value: e['position']}}), format: '°', st: false, group: 'I' })
      reObj['K'].push({ idx: 11, id: 'Blade1 DC bus voltage', values: ts[0].map((e)=>{return {date:e['REGIST_DT'], value: e['DC bus voltage']}}), format: 'V', st: false, group: 'K' })
      reObj['K'].push({ idx: 12, id: 'Blade1 Battery Voltage', values: ts[0].map((e)=>{return {date:e['REGIST_DT'], value: e['Battery Voltage']}}), format: 'V', st: false, group: 'K' })
    }

    if(group2 == 'all' || group2 == 'Blade2' ){
      const wt = await seon.DBOriginCall('wt', `CALL SP_WT_CHART_HISTORY_BLADE2(?,?)`,[
        isEmpty(req.query.dateS),
        isEmpty(req.query.dateE),
      ]);
      const ts = await seon.DBOriginCall('ts', `CALL SP_TS_CHART_HISTORY_BLADE2(?,?)`,[
        isEmpty(req.query.dateS),
        isEmpty(req.query.dateE),
      ]);
    
      reObj['J'].push({ idx: 13, id: 'Blade2 Bending (Flapwise)', values: wt[0].map((e)=>{return {date:e['REGIST_DT'], value: e['Bending (Flapwise)']}}), format: 'Pa', st: false, group: 'J' })
      reObj['J'].push({ idx: 14, id: 'Blade2 Bending (Edgewise)', values: wt[0].map((e)=>{return {date:e['REGIST_DT'], value: e['Bending (Edgewise)']}}), format: 'Pa', st: false, group: 'J' })
      reObj['J'].push({ idx: 15, id: 'Blade2 Torsion', values: wt[0].map((e)=>{return {date:e['REGIST_DT'], value: e['Torsion']}}), format: 'Pa', st: false, group: 'J' })

      reObj['M'].push({ idx: 16, id: 'Blade2 state', values: ts[0].map((e)=>{return {date:e['REGIST_DT'], value: e['state']}}), format: '-', st: false, group: 'M' })
      reObj['M'].push({ idx: 17, id: 'Blade2 Free wheel brake', values: ts[0].map((e)=>{return {date:e['REGIST_DT'], value: e['Free wheel brake']}}), format: '-', st: false, group: 'M' })
      reObj['M'].push({ idx: 18, id: 'Blade2 Battery State', values: ts[0].map((e)=>{return {date:e['REGIST_DT'], value: e['Battery State']}}), format: '-', st: false, group: 'M' })
      reObj['B'].push({ idx: 19, id: 'Blade2 Motor temp', values: ts[0].map((e)=>{return {date:e['REGIST_DT'], value: e['Motor temp']}}), format: '℃', st: false, group: 'B' })
      reObj['B'].push({ idx: 20, id: 'Blade2 Cabinet temp', values: ts[0].map((e)=>{return {date:e['REGIST_DT'], value: e['Cabinet temp']}}), format: '℃', st: false, group: 'B' })
      reObj['H'].push({ idx: 21, id: 'Blade2 Torque', values: ts[0].map((e)=>{return {date:e['REGIST_DT'], value: e['Torque']}}), format: 'Nm', st: false, group: 'H' })
      reObj['I'].push({ idx: 22, id: 'Blade2 position', values: ts[0].map((e)=>{return {date:e['REGIST_DT'], value: e['position']}}), format: '°', st: false, group: 'I' })
      reObj['K'].push({ idx: 23, id: 'Blade2 DC bus voltage', values: ts[0].map((e)=>{return {date:e['REGIST_DT'], value: e['DC bus voltage']}}), format: 'V', st: false, group: 'K' })
      reObj['K'].push({ idx: 24, id: 'Blade2 Battery Voltage', values: ts[0].map((e)=>{return {date:e['REGIST_DT'], value: e['Battery Voltage']}}), format: 'V', st: false, group: 'K' })
    }

    if(group2 == 'all' || group2 == 'Blade3' ){
      const wt = await seon.DBOriginCall('wt', `CALL SP_WT_CHART_HISTORY_BLADE3(?,?)`,[
        isEmpty(req.query.dateS),
        isEmpty(req.query.dateE),
      ]);

      const ts = await seon.DBOriginCall('ts', `CALL SP_TS_CHART_HISTORY_BLADE3(?,?)`,[
        isEmpty(req.query.dateS),
        isEmpty(req.query.dateE),
      ]);
    
      reObj['J'].push({ idx: 25, id: 'Blade3 Bending (Flapwise)', values: wt[0].map((e)=>{return {date:e['REGIST_DT'], value: e['Bending (Flapwise)']}}), format: 'Pa', st: false, group: 'J' })
      reObj['J'].push({ idx: 26, id: 'Blade3 Bending (Edgewise)', values: wt[0].map((e)=>{return {date:e['REGIST_DT'], value: e['Bending (Edgewise)']}}), format: 'Pa', st: false, group: 'J' })
      reObj['J'].push({ idx: 27, id: 'Blade3 Torsion', values: wt[0].map((e)=>{return {date:e['REGIST_DT'], value: e['Torsion']}}), format: 'Pa', st: false, group: 'J' })

      reObj['M'].push({ idx: 28, id: 'Blade3 state', values: ts[0].map((e)=>{return {date:e['REGIST_DT'], value: e['state']}}), format: '-', st: false, group: 'M' })
      reObj['M'].push({ idx: 29, id: 'Blade3 Free wheel brake', values: ts[0].map((e)=>{return {date:e['REGIST_DT'], value: e['Free wheel brake']}}), format: '-', st: false, group: 'M' })
      reObj['M'].push({ idx: 30, id: 'Blade3 Battery State', values: ts[0].map((e)=>{return {date:e['REGIST_DT'], value: e['Battery State']}}), format: '-', st: false, group: 'M' })
      reObj['B'].push({ idx: 31, id: 'Blade3 Motor temp', values: ts[0].map((e)=>{return {date:e['REGIST_DT'], value: e['Motor temp']}}), format: '℃', st: false, group: 'B' })
      reObj['B'].push({ idx: 32, id: 'Blade3 Cabinet temp', values: ts[0].map((e)=>{return {date:e['REGIST_DT'], value: e['Cabinet temp']}}), format: '℃', st: false, group: 'B' })
      reObj['H'].push({ idx: 33, id: 'Blade3 Torque', values: ts[0].map((e)=>{return {date:e['REGIST_DT'], value: e['Torque']}}), format: 'Nm', st: false, group: 'H' })
      reObj['I'].push({ idx: 34, id: 'Blade3 position', values: ts[0].map((e)=>{return {date:e['REGIST_DT'], value: e['position']}}), format: '°', st: false, group: 'I' })
      reObj['K'].push({ idx: 35, id: 'Blade3 DC bus voltage', values: ts[0].map((e)=>{return {date:e['REGIST_DT'], value: e['DC bus voltage']}}), format: 'V', st: false, group: 'K' })
      reObj['K'].push({ idx: 36, id: 'Blade3 Battery Voltage', values: ts[0].map((e)=>{return {date:e['REGIST_DT'], value: e['Battery Voltage']}}), format: 'V', st: false, group: 'K' })
    }

    if(group2 == 'all' || group2 == 'Pitch System' ){
      const wt = await seon.DBOriginCall('wt', `CALL SP_WT_CHART_HISTORY_PITCH(?,?)`,[
        isEmpty(req.query.dateS),
        isEmpty(req.query.dateE),
      ]);
    
      reObj['I'].push({ idx: 37, id: 'Pitch Angle', values: wt[0].map((e)=>{return {date:e['REGIST_DT'], value: e['Pitch Angle']}}), format: '°', st: false, group: 'I' })
      reObj['A'].push({ idx: 38, id: 'Health Index', values: wt[1].map((e)=>{return {date:e['REGIST_DT'], value: e['Health Index']}}), format: '%', st: false, group: 'A' })
      reObj['G'].push({ idx: 39, id: 'Design Age', values: wt[1].map((e)=>{return {date:e['REGIST_DT'], value: e['Design Age']}}), format: 'month', st: false, group: 'G' })
      reObj['G'].push({ idx: 40, id: 'Estimated Age', values: wt[1].map((e)=>{return {date:e['REGIST_DT'], value: e['Estimated Age']}}), format: 'month', st: false, group: 'G' })
    }
  }else if(group1 == 'Nacelle_Tower'){
    if(group2 == 'all' || group2 == 'Tower Top' ){
      const wt = await seon.DBOriginCall('wt', `CALL SP_WT_CHART_HISTORY_TOWER_TOP(?,?)`,[
        isEmpty(req.query.dateS),
        isEmpty(req.query.dateE),
      ]);

      reObj['J'].push({ idx: 41, id: 'Top Bending (N-S)', values: wt[0].map((e)=>{return {date:e['REGIST_DT'], value: e['Bending (N-S)']}}), format: 'Pa', st: false, group: 'J' })
      reObj['J'].push({ idx: 42, id: 'Top Bending (E-W)', values: wt[0].map((e)=>{return {date:e['REGIST_DT'], value: e['Bending (E-W)']}}), format: 'Pa', st: false, group: 'J' })
      reObj['J'].push({ idx: 43, id: 'Top Torsional', values: wt[0].map((e)=>{return {date:e['REGIST_DT'], value: e['Torsional']}}), format: 'Pa', st: false, group: 'J' })
    }

    if(group2 == 'all' || group2 == 'Tower Bottom' ){
      const wt = await seon.DBOriginCall('wt', `CALL SP_WT_CHART_HISTORY_TOWER_BOTTOM(?,?)`,[
        isEmpty(req.query.dateS),
        isEmpty(req.query.dateE),
      ]);

      reObj['J'].push({ idx: 44, id: 'Bottom Bending (N-S)', values: wt[0].map((e)=>{return {date:e['REGIST_DT'], value: e['Bending (N-S)']}}), format: 'Pa', st: false, group: 'J' })
      reObj['J'].push({ idx: 45, id: 'Bottom Bending (E-W)', values: wt[0].map((e)=>{return {date:e['REGIST_DT'], value: e['Bending (E-W)']}}), format: 'Pa', st: false, group: 'J' })
    }

    if(group2 == 'all' || group2 == 'Nacelle' ){
      const wt = await seon.DBOriginCall('wt', `CALL SP_WT_CHART_HISTORY_TOWER_NACELLE(?,?)`,[
        isEmpty(req.query.dateS),
        isEmpty(req.query.dateE),
      ]);

      reObj['E'].push({ idx: 46, id: 'Vibration (Normal)', values: wt[0].map((e)=>{return {date:e['REGIST_DT'], value: e['Vibration (Normal)']}}), format: 'm/s²', st: false, group: 'E' })
      reObj['E'].push({ idx: 47, id: 'Vibration (Lateral)', values: wt[0].map((e)=>{return {date:e['REGIST_DT'], value: e['Vibration (Lateral)']}}), format: 'm/s²', st: false, group: 'E' })
    }
  }else if(group1 == 'Gear_Box'){
    if(group2 == 'all' || group2 == 'Gear Box' ){
      const wt = await seon.DBOriginCall('wt', `CALL SP_WT_CHART_HISTORY_GEARBOX_GEARBOX(?,?)`,[
        isEmpty(req.query.dateS),
        isEmpty(req.query.dateE),
      ]);

      reObj['E'].push({ idx: 48, id: 'Vibration Acceleration - 1st Stage Planetary Gear Bearing (1st) - Horizontal', values: wt[0].map((e)=>{return {date:e['REGIST_DT'], value: e['Vibration Acceleration - 1st Stage Planetary Gear Bearing (1st) - Horizontal']}}), format: 'm/s²', st: false, group: 'E' })
      reObj['E'].push({ idx: 49, id: 'Vibration Acceleration - 2nd Stage Planetary Gear Bearing (2nd)- Horizontal', values: wt[0].map((e)=>{return {date:e['REGIST_DT'], value: e['Vibration Acceleration - 2nd Stage Planetary Gear Bearing (2nd)- Horizontal']}}), format: 'm/s²', st: false, group: 'E' })
      reObj['E'].push({ idx: 50, id: 'Vibration Acceleration - Low Speed Axis (3rd) - Vertical', values: wt[0].map((e)=>{return {date:e['REGIST_DT'], value: e['Vibration Acceleration - Low Speed Axis (3rd) - Vertical']}}), format: 'm/s²', st: false, group: 'E' })
      reObj['E'].push({ idx: 51, id: 'Vibration Acceleration - High Speed Axis (Out) - Horizontal', values: wt[0].map((e)=>{return {date:e['REGIST_DT'], value: e['Vibration Acceleration - High Speed Axis (Out) - Horizontal']}}), format: 'm/s²', st: false, group: 'E' })

      reObj['F'].push({ idx: 52, id: 'Vibration Velocity - 1st Stage Planetary Gear Bearing (1st) - Horizontal', values: wt[0].map((e)=>{return {date:e['REGIST_DT'], value: e['Vibration Velocity - 1st Stage Planetary Gear Bearing (1st) - Horizontal']}}), format: 'mm/s', st: false, group: 'F' })
      reObj['F'].push({ idx: 53, id: 'Vibration Velocity - 2nd Stage Planetary Gear Bearing (2nd)- Horizontal', values: wt[0].map((e)=>{return {date:e['REGIST_DT'], value: e['Vibration Velocity - 2nd Stage Planetary Gear Bearing (2nd)- Horizontal']}}), format: 'mm/s', st: false, group: 'F' })
      reObj['F'].push({ idx: 54, id: 'Vibration Velocity - Low Speed Axis (3rd) - Vertical', values: wt[0].map((e)=>{return {date:e['REGIST_DT'], value: e['Vibration Velocity - Low Speed Axis (3rd) - Vertical']}}), format: 'mm/s', st: false, group: 'F' })
      reObj['F'].push({ idx: 55, id: 'Vibration Velocity - High Speed Axis (Out) - Horizontal', values: wt[0].map((e)=>{return {date:e['REGIST_DT'], value: e['Vibration Velocity - High Speed Axis (Out) - Horizontal']}}), format: 'mm/s', st: false, group: 'F' })
    }

    if(group2 == 'all' || group2 == 'Main Bearing' ){
      const wt = await seon.DBOriginCall('wt', `CALL SP_WT_CHART_HISTORY_GEARBOX_MAIN(?,?)`,[
        isEmpty(req.query.dateS),
        isEmpty(req.query.dateE),
      ]);
      const ts = await seon.DBOriginCall('ts', `CALL SP_TS_CHART_HISTORY_GEARBOX_MAIN(?,?)`,[
        isEmpty(req.query.dateS),
        isEmpty(req.query.dateE),
      ]);

      reObj['B'].push({ idx: 56, id: 'max bearing temp', values: ts[0].map((e)=>{return {date:e['REGIST_DT'], value: e['max bearing temp']}}), format: '℃', st: false, group: 'B' })

      reObj['E'].push({ idx: 57, id: 'Vibration Acceleration - Axial', values: wt[0].map((e)=>{return {date:e['REGIST_DT'], value: e['Vibration Acceleration - Axial']}}), format: 'm/s²', st: false, group: 'E' })
      reObj['E'].push({ idx: 58, id: 'Vibration Acceleration - Horizontal', values: wt[0].map((e)=>{return {date:e['REGIST_DT'], value: e['Vibration Acceleration - Horizontal']}}), format: 'm/s²', st: false, group: 'E' })
      reObj['F'].push({ idx: 59, id: 'Vibration Velocity - Axial', values: wt[0].map((e)=>{return {date:e['REGIST_DT'], value: e['Vibration Velocity - Axial']}}), format: 'mm/s', st: false, group: 'F' })
      reObj['F'].push({ idx: 60, id: 'Vibration Velocity - Horizontal', values: wt[0].map((e)=>{return {date:e['REGIST_DT'], value: e['Vibration Velocity - Horizontal']}}), format: 'mm/s', st: false, group: 'F' })
    }

    if(group2 == 'all' || group2 == 'Oil Pump' ){
      const ts = await seon.DBOriginCall('ts', `CALL SP_TS_CHART_HISTORY_GEARBOX_OIL(?,?)`,[
        isEmpty(req.query.dateS),
        isEmpty(req.query.dateE),
      ]);

      reObj['B'].push({ idx: 61, id: 'oil inlet temp', values: ts[0].map((e)=>{return {date:e['REGIST_DT'], value: e['oil inlet temp']}}), format: '℃', st: false, group: 'B' })
      reObj['B'].push({ idx: 62, id: 'oil tank temp', values: ts[0].map((e)=>{return {date:e['REGIST_DT'], value: e['oil tank temp']}}), format: '℃', st: false, group: 'B' })
      reObj['B'].push({ idx: 63, id: 'oil heater temp', values: ts[0].map((e)=>{return {date:e['REGIST_DT'], value: e['oil heater temp']}}), format: '℃', st: false, group: 'B' })
      reObj['J'].push({ idx: 64, id: 'pressure', values: ts[0].map((e)=>{return {date:e['REGIST_DT'], value: e['pressure']}}), format: 'Pa', st: false, group: 'J' })
      reObj['J'].push({ idx: 65, id: 'oil inlet pressure', values: ts[0].map((e)=>{return {date:e['REGIST_DT'], value: e['oil inlet pressure']}}), format: 'Pa', st: false, group: 'J' })
    }


    if(group2 == 'all' || group2 == 'Rotor' ){
      const ts = await seon.DBOriginCall('ts', `CALL SP_TS_CHART_HISTORY_GEARBOX_ROTOR(?,?)`,[
        isEmpty(req.query.dateS),
        isEmpty(req.query.dateE),
      ]);

      reObj['D'].push({ idx: 66, id: 'rotor speed', values: ts[0].map((e)=>{return {date:e['REGIST_DT'], value: e['rotor speed']}}), format: 'm/s', st: false, group: 'D' })
    }

  }else if(group1 == 'Generator'){
    if(group2 == 'all' || group2 == 'Generator' ){
      const wt = await seon.DBOriginCall('wt', `CALL SP_WT_CHART_HISTORY_GENERATOR(?,?)`,[
        isEmpty(req.query.dateS),
        isEmpty(req.query.dateE),
      ]);
      const ts = await seon.DBOriginCall('ts', `CALL SP_TS_CHART_HISTORY_GENERATOR(?,?)`,[
        isEmpty(req.query.dateS),
        isEmpty(req.query.dateE),
      ]);

      reObj['B'].push({ idx: 67, id: 'water inlet temp', values: ts[0].map((e)=>{return {date:e['REGIST_DT'], value: e['water inlet temp']}}), format: '℃', st: false, group: 'B' })
      reObj['B'].push({ idx: 68, id: 'bearing non drive temp', values: ts[0].map((e)=>{return {date:e['REGIST_DT'], value: e['bearing non drive temp']}}), format: '℃', st: false, group: 'B' })
      reObj['B'].push({ idx: 69, id: 'slipring space temp', values: ts[0].map((e)=>{return {date:e['REGIST_DT'], value: e['slipring space temp']}}), format: '℃', st: false, group: 'B' })
      reObj['B'].push({ idx: 70, id: 'winding [u] temp', values: ts[0].map((e)=>{return {date:e['REGIST_DT'], value: e['winding [u] temp']}}), format: '℃', st: false, group: 'B' })
      reObj['B'].push({ idx: 71, id: 'winding [v] temp', values: ts[0].map((e)=>{return {date:e['REGIST_DT'], value: e['winding [v] temp']}}), format: '℃', st: false, group: 'B' })
      reObj['B'].push({ idx: 72, id: 'winding [w] temp', values: ts[0].map((e)=>{return {date:e['REGIST_DT'], value: e['winding [w] temp']}}), format: '℃', st: false, group: 'B' })
      reObj['B'].push({ idx: 73, id: 'bearing drive temp', values: ts[0].map((e)=>{return {date:e['REGIST_DT'], value: e['bearing drive temp']}}), format: '℃', st: false, group: 'B' })
      reObj['B'].push({ idx: 74, id: 'winding temp max', values: ts[0].map((e)=>{return {date:e['REGIST_DT'], value: e['winding temp max']}}), format: '℃', st: false, group: 'B' })
      reObj['B'].push({ idx: 75, id: 'bearing temp max', values: ts[0].map((e)=>{return {date:e['REGIST_DT'], value: e['bearing temp max']}}), format: '℃', st: false, group: 'B' })
      reObj['D'].push({ idx: 76, id: 'generator speed', values: ts[0].map((e)=>{return {date:e['REGIST_DT'], value: e['generator speed']}}), format: 'm/s', st: false, group: 'D' })
      reObj['L'].push({ idx: 77, id: 'active power', values: ts[0].map((e)=>{return {date:e['REGIST_DT'], value: e['active power']}}), format: 'Wh', st: false, group: 'L' })


      reObj['E'].push({ idx: 78, id: 'Vibration Acceleration - Drive End (DE) - Horizonal', values: wt[0].map((e)=>{return {date:e['REGIST_DT'], value: e['Vibration Acceleration - Drive End (DE) - Horizonal']}}), format: 'm/s²', st: false, group: 'E' })
      reObj['E'].push({ idx: 79, id: 'Vibration Acceleration - Non Drive End (NDE) - Horizontal', values: wt[0].map((e)=>{return {date:e['REGIST_DT'], value: e['Vibration Acceleration - Non Drive End (NDE) - Horizontal']}}), format: 'm/s²', st: false, group: 'E' })
      reObj['F'].push({ idx: 80, id: 'Vibration Velocity - Drive End (DE) - Horizonal', values: wt[0].map((e)=>{return {date:e['REGIST_DT'], value: e['Vibration Velocity - Drive End (DE) - Horizonal']}}), format: 'mm/s', st: false, group: 'F' })
      reObj['F'].push({ idx: 81, id: 'Vibration Velocity - Non Drive End (NDE) - Horizontal', values: wt[0].map((e)=>{return {date:e['REGIST_DT'], value: e['Vibration Velocity - Non Drive End (NDE) - Horizontal']}}), format: 'mm/s', st: false, group: 'F' })
    }

  }else if(group1 == 'Yaw'){
    if(group2 == 'all' || group2 == 'Yaw' ){
      const wt = await seon.DBOriginCall('wt', `CALL SP_WT_CHART_HISTORY_YAW(?,?)`,[
        isEmpty(req.query.dateS),
        isEmpty(req.query.dateE),
      ]);
      const ts = await seon.DBOriginCall('ts', `CALL SP_TS_CHART_HISTORY_YAW(?,?)`,[
        isEmpty(req.query.dateS),
        isEmpty(req.query.dateE),
      ]);

      reObj['I'].push({ idx: 82, id: 'deviation', values: ts[0].map((e)=>{return {date:e['REGIST_DT'], value: e['deviation']}}), format: '°', st: false, group: 'I' })
      reObj['I'].push({ idx: 83, id: 'north', values: ts[0].map((e)=>{return {date:e['REGIST_DT'], value: e['north']}}), format: '°', st: false, group: 'I' })

      reObj['A'].push({ idx: 84, id: 'Health Index', values: wt[0].map((e)=>{return {date:e['REGIST_DT'], value: e['Health Index']}}), format: '%', st: false, group: 'A' })
      reObj['G'].push({ idx: 85, id: 'Design Age', values: wt[0].map((e)=>{return {date:e['REGIST_DT'], value: e['Design Age']}}), format: 'month', st: false, group: 'G' })
      reObj['G'].push({ idx: 86, id: 'Estimated Age', values: wt[0].map((e)=>{return {date:e['REGIST_DT'], value: e['Estimated Age']}}), format: 'month', st: false, group: 'G' })
    }

  }



  return res.send({values: reObj, date:dateList});
});



module.exports = router;

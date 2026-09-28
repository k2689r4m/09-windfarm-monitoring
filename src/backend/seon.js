const axios = require('axios');
const schedule = require('node-schedule');
const convert = require('xml-js');
var exports = module.exports = {};
const requestIp = require('request-ip');
const dbObj = require('./database/connect/config');
const multer = require("multer");
const fs = require("fs");
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');
require('dayjs/locale/ko');
dayjs.locale('ko');
dayjs.extend(utc);
dayjs.extend(timezone);
// dayjs.tz.setDefault('Asia/Seoul');

const { Console } = require('console');
const { v4 } = require('uuid');
const xlsx = require('xlsx');
const turf = require("@turf/turf");
const iconv = require('iconv-lite');
const coolsms = require('coolsms-node-sdk').default;
const messageService = new coolsms(process.env.COOL_SMS_KEY, process.env.COOL_SMS_SECRET);

const { Builder, Browser, By, Key, until, WebDriver } = require("selenium-webdriver");
const chromeDriver = require("selenium-webdriver/chrome");
const chromeOptions = new chromeDriver.Options();
const proxy = require('selenium-webdriver/proxy');

let ST = false;
// let driver = null;
let serverInfo = null;

const TIME_ZONE = 9 * 60 * 60 * 1000;
const PY_M2_EX = 3.3058;
const M2_PY_EX = 0.3025;

const randomSleep = async (min=100, max=250) => { 
    const num = Math.floor(Math.random() * (max - min)) + min;
    await sleep(num);
}

const sleep = (ms) => {
    return new Promise(resolve=>{
        setTimeout(resolve,ms)
    })
}


exports.DBCall = async function(type, sp, params){
    const db = dbObj[type];

    const reData = await db.query(sp,params)
        .catch((err)=>{
            console.log(sp + " error : " +err)
            return false;
        });
    

    try{
        return reData[0][0];
    }catch(e){
        console.log("EEEEEE :::: " + e);
        return false;
    }
};

exports.DBOriginCall = async function(type, sp, params){
    const db = dbObj[type];

    const reData = await db.query(sp,params)
        .catch((err)=>{
            console.log(sp + " error : " +err)
            return false;
        });
    
    try{
        return reData[0];
    }catch(e){
        console.log("EEEEEE :::: " + e);
        return false;
    }
};

exports.DBOneCall = async function(type, sp, params){
    const db = dbObj[type];

    const reData = await db.query(sp,params)
        .catch((err)=>{
            console.log(sp + " error : " +err)
            return false;
        });

    try{
        return reData[0][0][0];
    }catch(e){
        console.log("EEEEEE :::: " + e);
        return false;
    }
};

exports.DBPageCall = async function(type, sp, params){
    const db = dbObj[type];
    
    const reData = await db.query(sp,params)
        .catch((err)=>{
            console.log(sp + " error : " +err)
            return false;
        });

    try{
        return {item: reData[0][0], pageInfo: reData[0][1][0]};
    }catch(e){
        console.log("EEEEEE :::: " + e);
        return false;
    }
};

// exports.dateFormat = (val, format) => {
//     return dayjs(val).format(format);
// };


const getAlaramST = (group, type, VAL, ALRT_LVL, ALRM_LVL, ALRT_MSG, ALRM_MSG, date, id, type_id) => {
    if(VAL < ALRT_LVL){
        exports.DBOneCall('main',`CALL SP_MAIN_ALARM_CK(?,?)`,[id, type_id]).then((re)=>{
            if(!re){
                exports.DBCall('main',`CALL SP_MAIN_ALARM_ADD(?,?,?,?,?,?,?)`,[group, type, 'NORMAL', '', date, id, type_id])
            }
        })
    }else if(ALRT_LVL <= VAL && VAL < ALRM_LVL){
        exports.DBOneCall('main',`CALL SP_MAIN_ALARM_CK(?,?)`,[id, type_id]).then((re)=>{
            if(!re){
                exports.DBCall('main',`CALL SP_MAIN_ALARM_ADD(?,?,?,?,?,?,?)`,[group, type, 'ALERT', ALRT_MSG, date, id, type_id])
            }
        })
    }else if(ALRM_LVL <= VAL){
        exports.DBOneCall('main',`CALL SP_MAIN_ALARM_CK(?,?)`,[id, type_id]).then((re)=>{
            if(!re){
                exports.DBCall('main',`CALL SP_MAIN_ALARM_ADD(?,?,?,?,?,?,?)`,[group, type, 'ALARM', ALRT_MSG, date, id, type_id])
            }
        })
    }

    

    return false;
}

exports.alarmUpdate = async function(){
    exports.DBOriginCall('wt',`CALL SP_WT_ALARM()`).then((wt)=>{
        if(wt.length != 9){
            return;
        }

        const TD_DS_BLADE_1 = wt[0][0]
        const TD_DS_BLADE_2 = wt[1][0]
        const TD_DS_BLADE_3 = wt[2][0]
        const TD_DS_TOWER = wt[3][0]
        const TD_DS_DRIVE_TRAIN = wt[4][0]
        const TD_DA_OUTPUT = wt[5][0]
        const TD_DS_GEARBOX = wt[6][0]
        const TD_DS_GENERATOR = wt[7][0]


        getAlaramST(
            'Blade_Pitch', 'Blade 1',
            TD_DS_BLADE_1.FLAP_DEL, TD_DS_BLADE_1.FLAP_ALRT_LVL, TD_DS_BLADE_1.FLAP_ALRM_LVL, 
            'Blade 1 Flapwise DEL High', 'Blade 1 Flapwise DEL High', TD_DS_BLADE_1.REGIST_DT, TD_DS_BLADE_1.ID, 1
        );
        getAlaramST(
            'Blade_Pitch', 'Blade 1',
            TD_DS_BLADE_1.EDGE_DEL, TD_DS_BLADE_1.EDGE_ALRT_LVL, TD_DS_BLADE_1.EDGE_ALRM_LVL, 
            'Blade 1 Edgewise DEL High', 'Blade 1 Edgewise DEL High', TD_DS_BLADE_1.REGIST_DT, TD_DS_BLADE_1.ID, 2
        );
        getAlaramST(
            'Blade_Pitch', 'Blade 2',
            TD_DS_BLADE_2.FLAP_DEL, TD_DS_BLADE_2.FLAP_ALRT_LVL, TD_DS_BLADE_2.FLAP_ALRM_LVL, 
            'Blade 2 Flapwise DEL High', 'Blade 2 Flapwise DEL High', TD_DS_BLADE_2.REGIST_DT, TD_DS_BLADE_2.ID, 3
        );
        getAlaramST(
            'Blade_Pitch', 'Blade 2',
            TD_DS_BLADE_2.EDGE_DEL, TD_DS_BLADE_2.EDGE_ALRT_LVL, TD_DS_BLADE_2.EDGE_ALRM_LVL, 
            'Blade 2 Edgewise DEL High', 'Blade 2 Edgewise DEL High', TD_DS_BLADE_2.REGIST_DT, TD_DS_BLADE_2.ID, 4
        );
        getAlaramST(
            'Blade_Pitch', 'Blade 3',
            TD_DS_BLADE_3.FLAP_DEL, TD_DS_BLADE_3.FLAP_ALRT_LVL, TD_DS_BLADE_3.FLAP_ALRM_LVL, 
            'Blade 3 Flapwise DEL High', 'Blade 3 Flapwise DEL High', TD_DS_BLADE_3.REGIST_DT, TD_DS_BLADE_3.ID, 5
        );
        getAlaramST(
            'Blade_Pitch', 'Blade 3',
            TD_DS_BLADE_3.EDGE_DEL, TD_DS_BLADE_3.EDGE_ALRT_LVL, TD_DS_BLADE_3.EDGE_ALRM_LVL, 
            'Blade 3 Edgewise DEL High', 'Blade 3 Edgewise DEL High', TD_DS_BLADE_3.REGIST_DT, TD_DS_BLADE_3.ID, 6
        );
        getAlaramST(
            'Blade_Pitch', 'Pitch System',
            TD_DA_OUTPUT.PITCH_ANGLE_DEV, TD_DA_OUTPUT.PITCH_DIAG_ALRT_LVL, TD_DA_OUTPUT.PITCH_DIAG_ALRM_LVL, 
            'Pitch System Mal-operation', 'Pitch System Mal-operation', TD_DA_OUTPUT.REGIST_DT, TD_DA_OUTPUT.ID, 32
        );




        getAlaramST(
            'Nacelle_Tower', 'Tower Top',
            TD_DS_TOWER.TOP_DEL, TD_DS_TOWER.TOP_DIAG_ALRT_LVL, TD_DS_TOWER.TOP_DIAG_ALRM_LVL, 
            'Tower Top DEL High', 'Tower Top DEL High', TD_DS_TOWER.REGIST_DT, TD_DS_TOWER.ID, 7
        );
        getAlaramST(
            'Nacelle_Tower', 'Tower Bottom',
            TD_DS_TOWER.BOTTOM_DEL, TD_DS_TOWER.BOTTOM_DIAG_ALRT_LVL, TD_DS_TOWER.BOTTOM_DIAG_ALRM_LVL, 
            'Tower Bottom DEL High', 'Tower Bottom DEL High', TD_DS_TOWER.REGIST_DT, TD_DS_TOWER.ID, 10
        );
        getAlaramST(
            'Nacelle_Tower', 'Nacelle',
            TD_DS_TOWER.NAC_VEL_RMS_NORM, TD_DS_TOWER.NAC_VIB_ALRT_LVL_NORM, TD_DS_TOWER.NAC_VIB_ALRM_LVL_NORM, 
            'Tower Top (Nacelle) Normal Vibration High', 'Tower Top (Nacelle) Normal Vibration High', TD_DS_TOWER.REGIST_DT, TD_DS_TOWER.ID, 8
        );
        getAlaramST(
            'Nacelle_Tower', 'Nacelle',
            TD_DS_TOWER.NAC_VIB_RMS_LAT, TD_DS_TOWER.NAC_VIB_ALRT_LVL_LAT, TD_DS_TOWER.NAC_VIB_ALRM_LVL_LAT, 
            'Tower Top (Nacelle) Lateral Vibration High', 'Tower Top (Nacelle) Lateral Vibration High', TD_DS_TOWER.REGIST_DT, TD_DS_TOWER.ID, 9
        );
        


        

        getAlaramST(
            'Gear_Box', 'Main Bearing',
            TD_DS_DRIVE_TRAIN.VEL_RMS_AX, TD_DS_DRIVE_TRAIN.VEL_ALRT_LVL_AX, TD_DS_DRIVE_TRAIN.VEL_ALRM_LVL_AX, 
            'Main Bearing- Axial Vibration Velocity High', 'Main Bearing- Axial Vibration Velocity High', TD_DS_DRIVE_TRAIN.REGIST_DT, TD_DS_DRIVE_TRAIN.ID, 11
        );
        getAlaramST(
            'Gear_Box', 'Main Bearing',
            TD_DS_DRIVE_TRAIN.VEL_RMS_HORZ, TD_DS_DRIVE_TRAIN.VEL_ALRT_LVL_HORZ, TD_DS_DRIVE_TRAIN.VEL_ALRM_LVL_HORZ, 
            'Main Bearing- Horizontal Vibration Velocity High', 'Main Bearing- Horizontal Vibration Velocity High', TD_DS_DRIVE_TRAIN.REGIST_DT, TD_DS_DRIVE_TRAIN.ID, 12
        );
        getAlaramST(
            'Gear_Box', 'Main Bearing',
            TD_DS_DRIVE_TRAIN.ACC_RMS_AX, TD_DS_DRIVE_TRAIN.ACC_ALRT_LVL_AX, TD_DS_DRIVE_TRAIN.ACC_ALRM_LVL_AX, 
            'Main Bearing- Axial Vibration Acceleration High', 'Main Bearing- Axial Vibration Acceleration High', TD_DS_DRIVE_TRAIN.REGIST_DT, TD_DS_DRIVE_TRAIN.ID, 13
        );
        getAlaramST(
            'Gear_Box', 'Main Bearing',
            TD_DS_DRIVE_TRAIN.ACC_RMS_HORZ, TD_DS_DRIVE_TRAIN.ACC_ALRT_LVL_HORZ, TD_DS_DRIVE_TRAIN.ACC_ALRM_LVL_HORZ, 
            'Main Bearing- Horizontal Vibration Acceleration High', 'Main Bearing- Horizontal Vibration Acceleration High', TD_DS_DRIVE_TRAIN.REGIST_DT, TD_DS_DRIVE_TRAIN.ID, 14
        );
        getAlaramST(
            'Gear_Box', 'Main Bearing',
            TD_DA_OUTPUT.MB_TEMP_DEV, TD_DA_OUTPUT.MB_DIAG_ALRT_LVL, TD_DA_OUTPUT.MB_DIAG_ALRM_LVL, 
            'Abnormal Related to Main Bearing Temperature', 'Abnormal Related to Main Bearing Temperature', TD_DA_OUTPUT.REGIST_DT, TD_DA_OUTPUT.ID, 15
        );
        getAlaramST(
            'Gear_Box', 'Gearbox',
            TD_DS_GEARBOX.VEL_RMS_1SPGB_HORZ, TD_DS_GEARBOX.VEL_ALRT_LVL_1SPGB, TD_DS_GEARBOX.VEL_ALRM_LVL_1SPGB, 
            'Gearbox - 1st Stage Planetary Gear Bearing (1st) Vibration Velocity High', 'Gearbox - 1st Stage Planetary Gear Bearing (1st) Vibration Velocity High', TD_DS_GEARBOX.REGIST_DT, TD_DS_GEARBOX.ID, 16
        );
        getAlaramST(
            'Gear_Box', 'Gearbox',
            TD_DS_GEARBOX.VEL_RMS_2SPGB_HORZ, TD_DS_GEARBOX.VEL_ALRT_LVL_2SPGB, TD_DS_GEARBOX.VEL_ALRM_LVL_2SPGB, 
            'Gearbox - 2nd Stage Planetary Gear Bearing (2nd) Vibration Velocity High', 'Gearbox - 2nd Stage Planetary Gear Bearing (2nd) Vibration Velocity High', TD_DS_GEARBOX.REGIST_DT, TD_DS_GEARBOX.ID, 17
        );
        getAlaramST(
            'Gear_Box', 'Gearbox',
            TD_DS_GEARBOX.VEL_RMS_LSA_VERT, TD_DS_GEARBOX.VEL_ALRT_LVL_LSA, TD_DS_GEARBOX.VEL_ALRM_LVL_LSA, 
            'Gearbox - Low Speed Axis (3rd) Vibration Velocity High', 'Gearbox - Low Speed Axis (3rd) Vibration Velocity High', TD_DS_GEARBOX.REGIST_DT, TD_DS_GEARBOX.ID, 18
        );
        getAlaramST(
            'Gear_Box', 'Gearbox',
            TD_DS_GEARBOX.VEL_RMS_HSA_HORZ, TD_DS_GEARBOX.VEL_ALRT_LVL_HSA, TD_DS_GEARBOX.VEL_ALRM_LVL_HSA, 
            'Gearbox - High Speed Axis (Out) Vibration Velocity High', 'Gearbox - High Speed Axis (Out) Vibration Velocity High', TD_DS_GEARBOX.REGIST_DT, TD_DS_GEARBOX.ID, 19
        );
        getAlaramST(
            'Gear_Box', 'Gearbox',
            TD_DS_GEARBOX.ACC_RMS_1SPGB_HORZ, TD_DS_GEARBOX.ACC_ALRT_LVL_1SPGB, TD_DS_GEARBOX.ACC_ALRM_LVL_1SPGB, 
            'Gearbox - 1st Stage Planetary Gear Bearing (1st) Vibration Acceleration High', 'Gearbox - 1st Stage Planetary Gear Bearing (1st) Vibration Acceleration High', TD_DS_GEARBOX.REGIST_DT, TD_DS_GEARBOX.ID, 20
        );
        getAlaramST(
            'Gear_Box', 'Gearbox',
            TD_DS_GEARBOX.ACC_RMS_2SPGB_HORZ, TD_DS_GEARBOX.ACC_ALRT_LVL_2SPGB, TD_DS_GEARBOX.ACC_ALRM_LVL_2SPGB, 
            'Gearbox - 2nd Stage Planetary Gear Bearing (2nd) Vibration Acceleration High', 'Gearbox - 2nd Stage Planetary Gear Bearing (2nd) Vibration Acceleration High', TD_DS_GEARBOX.REGIST_DT, TD_DS_GEARBOX.ID, 21
        );
        getAlaramST(
            'Gear_Box', 'Gearbox',
            TD_DS_GEARBOX.ACC_RMS_LSA_VERT, TD_DS_GEARBOX.ACC_ALRT_LVL_LSA, TD_DS_GEARBOX.ACC_ALRM_LVL_LSA, 
            'Gearbox - Low Speed Axis (3rd) Vibration Acceleration High', 'Gearbox - Low Speed Axis (3rd) Vibration Acceleration High', TD_DS_GEARBOX.REGIST_DT, TD_DS_GEARBOX.ID, 22
        );
        getAlaramST(
            'Gear_Box', 'Gearbox',
            TD_DS_GEARBOX.ACC_RMS_HSA_HORZ, TD_DS_GEARBOX.ACC_ALRT_LVL_HSA, TD_DS_GEARBOX.ACC_ALRM_LVL_HSA, 
            'Gearbox - High Speed Axis (Out) Vibration Acceleration High', 'Gearbox - High Speed Axis (Out) Vibration Acceleration High', TD_DS_GEARBOX.REGIST_DT, TD_DS_GEARBOX.ID, 23
        );
        getAlaramST(
            'Gear_Box', 'Gearbox',
            TD_DA_OUTPUT.GB_TEMP_DEV, TD_DA_OUTPUT.GB_DIAG_ALRT_LVL, TD_DA_OUTPUT.GB_DIAG_ALRM_LVL, 
            'Abnormal related to Gearbox Temperature', 'Abnormal related to Gearbox Temperature', TD_DA_OUTPUT.REGIST_DT, TD_DA_OUTPUT.ID, 24
        );
        


        
        getAlaramST(
            'Generator', 'Generator',
            TD_DS_GENERATOR.VEL_RMS_HORZ_DE, TD_DS_GENERATOR.VEL_ALRT_LVL_HORZ_DE, TD_DS_GENERATOR.VEL_ALRM_LVL_HORZ_DE, 
            'Generator – Drive End (DE) Vibration Velocity High', 'Generator – Drive End (DE) Vibration Velocity High', TD_DS_GENERATOR.REGIST_DT, TD_DS_GENERATOR.ID, 25
        );
        getAlaramST(
            'Generator', 'Generator',
            TD_DS_GENERATOR.VEL_RMS_HORZ_NDE, TD_DS_GENERATOR.VEL_ALRT_LVL_HORZ_NDE, TD_DS_GENERATOR.VEL_ALRM_LVL_HORZ_NDE, 
            'Generator – Non Drive End (NDE) Vibration Velocity High', 'Generator – Non Drive End (NDE) Vibration Velocity High', TD_DS_GENERATOR.REGIST_DT, TD_DS_GENERATOR.ID, 26
        );
        getAlaramST(
            'Generator', 'Generator',
            TD_DS_GENERATOR.ACC_RMS_HORZ_DE, TD_DS_GENERATOR.ACC_ALRT_LVL_HORZ_DE, TD_DS_GENERATOR.ACC_ALRM_LVL_HORZ_DE, 
            'Generator – Drive End (DE) Vibration Acceleration High', 'Generator – Drive End (DE) Vibration Acceleration High', TD_DS_GENERATOR.REGIST_DT, TD_DS_GENERATOR.ID, 27
        );
        getAlaramST(
            'Generator', 'Generator',
            TD_DS_GENERATOR.ACC_RMS_HORZ_NDE, TD_DS_GENERATOR.ACC_ALRT_LVL_HORZ_NDE, TD_DS_GENERATOR.ACC_ALRM_LVL_HORZ_NDE, 
            'Generator – Non Drive End (NDE) Vibration Acceleration High', 'Generator – Non Drive End (NDE) Vibration Acceleration High', TD_DS_GENERATOR.REGIST_DT, TD_DS_GENERATOR.ID, 28
        );
        getAlaramST(
            'Generator', 'Generator',
            TD_DA_OUTPUT.GENA_TEMP_DEV, TD_DA_OUTPUT.GENA_DIAG_ALRT_LVL, TD_DA_OUTPUT.GENA_DIAG_ALRM_LVL, 
            'Abnormal Related to Generator Winding A Temperature', 'Abnormal Related to Generator Winding A Temperature', TD_DA_OUTPUT.REGIST_DT, TD_DA_OUTPUT.ID, 29
        );
        getAlaramST(
            'Generator', 'Generator',
            TD_DA_OUTPUT.GENB_TEMP_DEV, TD_DA_OUTPUT.GENB_DIAG_ALRT_LVL, TD_DA_OUTPUT.GENB_DIAG_ALRM_LVL, 
            'Abnormal Related to Generator Winding B Temperature', 'Abnormal Related to Generator Winding B Temperature', TD_DA_OUTPUT.REGIST_DT, TD_DA_OUTPUT.ID, 30
        );
        getAlaramST(
            'Generator', 'Generator',
            TD_DA_OUTPUT.GENC_TEMP_DEV, TD_DA_OUTPUT.GENC_DIAG_ALRT_LVL, TD_DA_OUTPUT.GENC_DIAG_ALRM_LVL, 
            'Abnormal Related to Generator Winding C Temperature', 'Abnormal Related to Generator Winding C Temperature', TD_DA_OUTPUT.REGIST_DT, TD_DA_OUTPUT.ID, 31
        );
        


        getAlaramST(
            'Yaw', 'Yaw',
            TD_DA_OUTPUT.YAW_ANGLE_DEV, TD_DA_OUTPUT.YAW_DIAG_ALRT_LVL, TD_DA_OUTPUT.YAW_DIAG_ALRM_LVL, 
            'Yaw System Mal-operation', 'Yaw System Mal-operation', TD_DA_OUTPUT.REGIST_DT, TD_DA_OUTPUT.ID, 33
        );

        // 이건뭘까?
        getAlaramST(
            'Yaw', 'Turbine Power',
            TD_DA_OUTPUT.POWER_DEV, TD_DA_OUTPUT.POWER_DIAG_ALRT_LVL, TD_DA_OUTPUT.POWER_DIAG_ALRM_LVL, 
            'Abnormal Related to Turbine Power Production', 'Abnormal Related to Turbine Power Production', TD_DA_OUTPUT.REGIST_DT, TD_DA_OUTPUT.ID, 34
        );
        
        
        // console.log(TD_DS_BLADE_1);
    });
};

schedule.scheduleJob('*/1 * * * * *', function(){
    exports.alarmUpdate()
});


const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/files')
    },
    filename: (req, file, cb) => {
        cb(null, req.body.uid+'_'+file.originalname)
    },
});

let upload =  multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        const n_id = file.originalname.split('.')[0];

        exports.DBCall(`CALL SP_NAVER_FILE_GET(?,?)`,[
            req.body.uid,
            n_id,
        ]).then((re)=>{
            if(re.length){
                cb(null, false);
                return cb(new Error(n_id));
            }else{
                if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
                    cb(null, true);
                } else {
                    cb(null, false);
                    return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
                }
            }
            // console.log(re);
        }); 
        
    },
});

exports.fileUpload = upload.array('files');
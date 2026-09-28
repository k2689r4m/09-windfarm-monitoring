var express = require('express');
var router = express.Router();
const axios = require('axios');
const crypto = require('crypto');
const refresh = require("../middleware/refresh");
const redisClient = require('../util/redis.util');
const jwt = require('../util/jwt.util');
const requestIp = require('request-ip');
const seon = require('../seon');
const fs = require("fs");

const coolsms = require('coolsms-node-sdk').default;
const messageService = new coolsms(process.env.COOL_SMS_KEY, process.env.COOL_SMS_SECRET);

const isEmpty = function(value){
	if( value == "" || value == null || value == undefined || ( value != null && typeof value == "object" && !Object.keys(value).length ) ){
	  return null;
	}else{
	  return value;
	}
};

const isEmpty2 = function(value){
  if( value == "" || value == null || value == undefined || ( value != null && typeof value == "object" && !Object.keys(value).length ) ){
	return 0;
  }else{
	return value;
  }
};

router.post('/access', async (req, res) =>{
  const userIp = requestIp.getClientIp(req);

  await seon.DBCall(`CALL SP_U_ACCESS_LOG(?)`,[userIp]);
  
  return res.send(true);
});

/* GET users listing. */
router.get('/refresh', refresh, function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/admin/login', async (req, res) =>{
  let info = {type: false, message: ''};
  let {userId, password} = req.body

  if(!(userId && password)){
    return res.status(400).json({
      status: 400,
      message: "아이디 또는 비밀번호가 일치하지 않습니다."
    });
  }

  const reData = await seon.DBOneCall('main', `CALL SP_MAIN_LOGIN(?,?)`,[
    userId,
    password
  ]);

  if(reData && reData.id){
    const accessToken = jwt.sign(reData.id+'');
    const refreshToken = jwt.refresh();

    redisClient.set(reData.id+'', refreshToken);

    info.message = 'success';
    res.setHeader('Content-Type','application/json; charset=utf-8');
    res.setHeader('Authorization', 'Bearer ' + accessToken);
    res.setHeader('Refresh', 'Bearer ' + refreshToken);
    return res.status(200).json({
        status: 200,
        info: info,
        token: {
            accessToken: accessToken,
            refreshToken: refreshToken
        }
    });
  }
  else{
    return res.status(400).json({
      status: 400,
      message: "아이디 또는 비밀번호가 일치하지 않습니다."
    });
  }
  
});

router.get('/n/image', async function(req, res){
  try{
    const reData = await seon.DBOneCall(`CALL SP_NAVER_FILE_GET(?,?)`, [req.query.uid, req.query.n_id]);
    const reBuffer = fs.readFileSync(reData.path);

    res.writeHead(200, { "Context-Type": reData.type });
    res.write(reBuffer);  
    res.end();  
  }catch(e){
    console.log(e);
    return res.send('');
  }
});



module.exports = router;



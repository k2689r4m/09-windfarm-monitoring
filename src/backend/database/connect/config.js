const mysql = require('mysql2/promise');


const conn = {
    main: mysql.createPool({
        host: process.env.MYSQL_HOST,
        user: process.env.MYSQL_USER,
        password: process.env.MYSQL_PW,
        database: process.env.MYSQL_DB,
        connectTimeout: 5000,
        connectionLimit: 30 //default 10
    }),
    wt: mysql.createPool({
        port: process.env.MYSQL_PORT_WT,
        host: process.env.MYSQL_HOST_WT,
        user: process.env.MYSQL_USER_WT,
        password: process.env.MYSQL_PW_WT,
        database: process.env.MYSQL_DB_WT,
        connectTimeout: 5000,
        connectionLimit: 30 //default 10
    }),
    ts: mysql.createPool({
        port: process.env.MYSQL_PORT_TS,
        host: process.env.MYSQL_HOST_TS,
        user: process.env.MYSQL_USER_TS,
        password: process.env.MYSQL_PW_TS,
        database: process.env.MYSQL_DB_TS,
        connectTimeout: 5000,
        connectionLimit: 30 //default 10
    })
}


// const conn = mysql.createPool({
//     host: process.env.MYSQL_HOST,
//     user: process.env.MYSQL_USER,
//     password: process.env.MYSQL_PW,
//     database: process.env.MYSQL_DB,
//     connectTimeout: 5000,
//     connectionLimit: 30 //default 10
// })


module.exports = conn;
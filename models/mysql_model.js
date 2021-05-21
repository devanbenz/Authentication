const {
    MYSQL_HOST,
    MYSQL_USER,
    MYSQL_PW,
    MYSQL_DB
} = require('../config/env')
const mysql = require('mysql')


const conn = mysql.createConnection({
    host:     MYSQL_HOST,
    user:     MYSQL_USER,
    password: MYSQL_PW,
    database: MYSQL_DB,
    port:     3306
})

    
module.exports = conn





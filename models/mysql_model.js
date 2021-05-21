const {
    MYSQL_HOST,
    MYSQL_USER,
    MYSQL_PW,
    MYSQL_DB
} = require('../config/env')

async function connect(sql) {

    try {
        // MySQL database connection
        const conn = mysql.createConnection({
            host:     MYSQL_HOST,
            user:     MYSQL_USER,
            password: MYSQL_PW,
            database: MYSQL_DB,
            port:     3306
        })
        return conn
    }
    catch(e) {
        console.error(e)
    }
}    

const connection = connect()

connection.query()




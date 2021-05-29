const {
    MYSQL_HOST,
    MYSQL_USER,
    MYSQL_PW,
    MYSQL_DB
} = require('../config/env')
const db = require('mysql2/promise')
const bcrypt = require('bcrypt')

const dbpool = db.createPool({
    host: MYSQL_HOST,
    database: MYSQL_DB,
    user: MYSQL_USER,
    password: MYSQL_PW
})

exports.getUsers = async (req, res) => {
    try {
        const [rows] = await dbpool.execute('SELECT * FROM users')
        console.log(rows[0].username)
        return res.status(200).json({result:'success'})
    }
    catch(err){
        res.status(400).json({result:'Error'})
        console.error(err)
    }

}


exports.userLogin = async(req, res) => {
    const {username,password} = req.body
    const sqlQ = 'SELECT EXISTS(SELECT * FROM users WHERE username = ?)'
    const checkpw = 'SELECT * FROM users WHERE username = ? AND password = ?'
    try {
        const userInDb = await dbpool.execute(sqlQ, [username])
        const hashedPw = await bcrypt.hash(password, 10)

        // This is so ugly but mysql2 returns an object with the string as a key -_-
        // Checks if username doesn't exist
        if(userInDb[0]['EXISTS(SELECT * FROM users WHERE username = ?)'] == 0) {
            res.status(401).json({data: 'Username not found'})
            return
        }
        // Username exists! Time to check the password hash
        const result = await dbpool.execute(checkpw, [username,hashedPw])
        res.status(200).json({
            result: 'Success',
            a: username,
            b: hashedPw
        })
        console.log(result)
    }
    catch(err) {
        res.status(400).json({
            result: 'Error',
            msg: err
        })
    }
}

exports.addUser = async (req, res) => {
    try {
        const hashedpw = await bcrypt.hash(req.body.password, 10)
        await dbpool.execute('INSERT INTO users (username, password) VALUES (?,?)',[req.body.username, hashedpw])
        res.status(200).json({
            result: 'Success',
            msg: 'Stored to DB'
        }) 
    }
    catch(err){
        res.status(400).json({result:'Error', msg: err})
    }
}
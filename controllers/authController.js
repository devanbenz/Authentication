const db = require('../models/mysql_model')
const bcrypt = require('bcrypt')

db.connect()

exports.getUsers = (req, res) => {
    db.query(`SELECT * FROM users`, (err, result) => {
        res.status(200).json({
            status: 'Success',
            data: result
        })
    })
}

exports.userLogin = (req, res) => {
    const {username,password} = req.body
    db.query(`SELECT password FROM users WHERE username = "${username}"`, (err, result) => {
        bcrypt.compare(password, result[0].password, (err, same) => {
            res.status(200).json({
                result: 'Success',
                data: same
            })
        })
        // res.status(200).json({
        //     result: 'success',
        //     data: result[0].password
        // })
    })

}

exports.addUser = (req, res) => {
    bcrypt.hash(req.body.password, 10, (err, hashedpw) => {
        if (err) { 
            console.error(err) 
            return
        }
        db.query(`INSERT INTO users (username, password) VALUES ("${req.body.username}","${hashedpw}")`)
    })
    res.status(200).json({
        result: 'success',
        msg: 'User added to db'
    })
}
const db = require('../models/mysql_model')
const bcrypt = require('bcrypt')

db.connect()

exports.getUsers = (req, res) => {
    db.query(`SELECT * FROM users`, (err, result) => {
        console.log(result[0])
    })
    res.status(200).json({
        msg:'Users retrieved from DB'
    })
}

exports.addUser = (req, res) => {
    const pw = bcrypt.hash(req.body.password, 10, (err, hashedpw) => {
        db.query(`INSERT INTO users (username, password) VALUES ("${req.body.username}","${hashedpw}")`)
    })
    res.status(200).json({
        result: 'success',
        msg: 'User added to db'
    })
}
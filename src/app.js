// Environment configuration variables ----------------
const {
    EXPRESS_PORT,
    MYSQL_HOST,
    MYSQL_USER,
    MYSQL_PW,
    MYSQL_DB
} = require('../config/env')
// Package imports 
const express = require('express')
const mysql = require('mysql')
// Custom package imports 
const router = require('../routes/router')
const app = express()


app.use(express.json())
app.use('/', router)

app.listen(EXPRESS_PORT, () => console.log(`Listening on port ${EXPRESS_PORT}`))
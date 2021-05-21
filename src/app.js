// Environment configuration variables ----------------
const {
    EXPRESS_PORT,
} = require('../config/env')
// Package imports 
const express = require('express')
// Custom package imports 
const router = require('../routes/router')
const app = express() 


app.use(express.json())
app.use('/', router)

app.listen(EXPRESS_PORT, () => console.log(`Listening on port ${EXPRESS_PORT}`))
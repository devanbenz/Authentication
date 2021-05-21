const authController = require('../controllers/authController')
const express = require('express')

const router = express.Router()

router.route('/api/v1').get(authController.userAuth)

module.exports = router
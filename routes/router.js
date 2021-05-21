const authController = require('../controllers/authController')
const express = require('express')

const router = express.Router()

router.route('/api/v1').get(authController.getUsers)
router.route('/api/v1/adduser').post(authController.addUser)

module.exports = router
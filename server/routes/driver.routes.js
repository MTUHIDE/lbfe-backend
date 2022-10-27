const express = require('express')
const router = express.Router()
// const DriverController = require('../controllers/DriverController.js')

const baseUrl = 'drivers';

// Get elder by ID
router.get(`/${baseUrl}/:id`) //, AuthenticationMiddleware(), DriverController.getUserById)

module.exports = router
const express = require('express')
const router = express.Router()
const DriverController = require('../controllers/DriverController.js')

const baseUrl = 'drivers';

// Get Driver by ID
router.get(`/${baseUrl}/`, DriverController.getDriverById)

// Get All Driver
router.get(`/${baseUrl}/list/`, DriverController.getAllDrivers)

// Create Driver
router.post(`/${baseUrl}/create`, DriverController.createDriver)

// Edit Driver
router.post(`/${baseUrl}/edit`, DriverController.editDriver)

// Delete Driver
router.post(`/${baseUrl}/delete`, DriverController.deleteDriver)

module.exports = router
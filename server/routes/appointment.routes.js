const express = require('express')
const router = express.Router()
// const AppointmentController = require('../controllers/AppointmentController.js')

const baseUrl = 'appointment';

// Get appointment by ID
router.get(`/${baseUrl}/:id`) //, AuthenticationMiddleware(), ApppointmentController.getAppointmentById)

module.exports = router
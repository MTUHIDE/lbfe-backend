const express = require('express')
const router = express.Router()
const AppointmentController = require('../controllers/AppointmentController.js')

const baseUrl = 'appointment';


// Get Appointment by ID
router.get(`/${baseUrl}/`, AppointmentController.getAppointmentById)

// Get All Appointments
router.get(`/${baseUrl}/list/`, AppointmentController.getAllAppointments)

// Create/Update Appointment
// router.post(`/${baseUrl}/edit`, AppointmentController.createAppointment)

// // Delete Appointment
// router.delete(`/${baseUrl}/delete`, AppointmentController.deleteAppointment)

module.exports = router
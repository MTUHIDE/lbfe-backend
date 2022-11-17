const express = require('express')
const router = express.Router()
const AppointmentController = require('../controllers/AppointmentController.js')

const baseUrl = 'appointment';


// Get Appointment by ID
router.get(`/${baseUrl}/`, AppointmentController.getAppointmentById)

// Get All Appointments
router.get(`/${baseUrl}/list/`, AppointmentController.getAllAppointments)

// Create Appointment
router.post(`/${baseUrl}/create`, AppointmentController.createAppointment)

// Edit Appointment
router.post(`/${baseUrl}/edit`, AppointmentController.editAppointment)

// Delete Appointment
router.post(`/${baseUrl}/delete`, AppointmentController.deleteAppointment)

module.exports = router
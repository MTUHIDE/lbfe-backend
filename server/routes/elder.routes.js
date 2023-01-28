const express = require('express')
const router = express.Router()
const ElderController = require('../controllers/ElderController.js')

const baseUrl = 'elders';

// Get Elder by ID
router.get(`/${baseUrl}/`, ElderController.getElderById)

// Get All Elder
router.get(`/${baseUrl}/list/`, ElderController.getAllElders)

// Create Elder
router.post(`/${baseUrl}/create`, ElderController.createElder)

// Edit Elder
router.post(`/${baseUrl}/edit`, ElderController.editElder)

// Delete Elder
router.post(`/${baseUrl}/delete`, ElderController.deleteElder)

module.exports = router
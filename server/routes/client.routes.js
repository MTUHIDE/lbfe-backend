const express = require('express')
const router = express.Router()
const ClientController = require('../controllers/ClientController.js')

const baseUrl = 'clients';

// Get Client by ID
router.get(`/${baseUrl}/`, ClientController.getClientById)

// Get All Client
router.get(`/${baseUrl}/list/`, ClientController.getAllClients)

// Create Client
router.post(`/${baseUrl}/create`, ClientController.createClient)

// Edit Client
router.post(`/${baseUrl}/edit`, ClientController.editClient)

// Delete Client
router.post(`/${baseUrl}/delete`, ClientController.deleteClient)

module.exports = router
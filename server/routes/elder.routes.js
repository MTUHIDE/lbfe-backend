const express = require('express')
const router = express.Router()
// const ElderController = require('../controllers/UserController.js')

const baseUrl = 'elders';

// Get elder by ID
router.get(`/${baseUrl}/:id`) //, AuthenticationMiddleware(), ElderController.getUserById)

module.exports = router
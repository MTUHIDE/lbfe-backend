const express = require('express')
const router = express.Router()
// const UserController = require('../controllers/UserController.js')

const baseUrl = 'users';

// Get appointment by ID
router.get(`/${baseUrl}/`)

module.exports = router
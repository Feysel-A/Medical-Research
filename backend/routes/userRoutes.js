const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

// Route to register a user
router.post('/register', userController.registerUser);

// User login
router.post('/login', userController.loginUser);
module.exports = router;

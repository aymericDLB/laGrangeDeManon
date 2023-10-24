// loginRoutes.js

const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController');

// Créer un message
router.post('/api/login', loginController.login);


module.exports = router;

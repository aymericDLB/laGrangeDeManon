// userRoutes.js

const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Routes pour les opérations CRUD sur les utilisateurs

router.post('/users', userController.createUser);
router.get('/users', userController.getUsers);
router.get('/users/:id', userController.getUserById);
router.put('/users/:id', userController.updateUser);
router.delete('/users/:id', userController.deleteUser);

module.exports = router;

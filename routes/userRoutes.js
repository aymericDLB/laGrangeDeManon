// userRoutes.js

const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// Routes pour les opérations CRUD sur les utilisateurs

router.post('/api/users', userController.createUser);
router.get('/api/users', userController.getUsers);
router.get('/api/users/:id', userController.getUserById);
router.put('/api/users/:id', userController.updateUser);
router.delete('/api/users/:id', userController.deleteUser);

module.exports = router;

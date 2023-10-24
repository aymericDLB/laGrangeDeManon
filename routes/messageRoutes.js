// messageRoutes.js

const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// Créer un message
router.post('/api/message', messageController.createMessage);

// Obtenir tous les messages
router.get('/api/messages', messageController.getMessages);

// Obtenir un message par son ID
router.get('/api/message/:id', messageController.getMessageById);

// Mettre à jour un message
router.put('/api/message/:id', messageController.updateMessage);

// Supprimer un message
router.delete('/api/message/:id', messageController.deleteMessage);

module.exports = router;

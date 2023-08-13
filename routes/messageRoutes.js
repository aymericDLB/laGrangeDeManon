// messageRoutes.js

const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// Créer un message
router.post('/message', messageController.createMessage);

// Obtenir tous les messages
router.get('/messages', messageController.getMessages);

// Obtenir un message par son ID
router.get('/message/:id', messageController.getMessageById);

// Mettre à jour un message
router.put('/message/:id', messageController.updateMessage);

// Supprimer un message
router.delete('/message/:id', messageController.deleteMessage);

module.exports = router;

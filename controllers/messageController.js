// messageController.js

const Message = require('../models/message');
const MessageService = require('../services/messageService');

// Créer un message
async function createMessage(req, res) {
  try {
    const messageData = req.body;
    const message = await MessageService.createMessage(messageData);
    res.json(message);
  } catch (error) {
    console.error('Erreur lors de la création du message:', error);
    res.status(500).json({ error: 'Erreur lors de la création du message.' });
  }
}

// Obtenir toutes les messages
async function getMessages(req, res) {
  try {
    const messages = await MessageService.getMessages();
    res.json(messages);
  } catch (error) {
    console.error('Erreur lors de la récupération des messages:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des messages.' });
  }
}

// Obtenir un message par son ID
async function getMessageById(req, res) {
  try {
    const { id } = req.params;
    const message = await MessageService.getMessageById(id);
    if (message) {
      res.json(message);
    } else {
      res.status(404).json({ error: 'Message non trouvée.' });
    }
  } catch (error) {
    console.error('Erreur lors de la récupération du message:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération de message.' });
  }
}

// Mettre à jour une réservation
async function updateMessage(req, res) {
  try {
    const { id } = req.params;
    const messageData = req.body;
    const message = await MessageService.updateMessage(id, messageData);
    if (message) {
      res.json(message);
    } else {
      res.status(404).json({ error: 'Message non trouvée.' });
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour du message:', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour du message.' });
  }
}

// Supprimer une réservation
async function deleteMessage(req, res) {
  try {
    const { id } = req.params;
    const message = await MessageService.deleteMessage(id);
    if (message) {
      res.json({ message: 'Message supprimée avec succès.' });
    } else {
      res.status(404).json({ error: 'Message non trouvée.' });
    }
  } catch (error) {
    console.error('Erreur lors de la suppression du message:', error);
    res.status(500).json({ error: 'Erreur lors de la suppression du message.' });
  }
}

module.exports = {
  createMessage,
  getMessages,
  getMessageById,
  updateMessage,
  deleteMessage,
};

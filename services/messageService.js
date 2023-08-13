// messageService.js

const Message = require('../models/message');
const { Op } = require("sequelize");

// Créer une réservation
async function createMessage(messageData) {
  const message = await Message.create(messageData);
  return message;
}

// Obtenir toutes les réservations
async function getMessages() {
  const messages = await Message.findAll();
  return messages;
}

// Obtenir une réservation par son ID
async function getMessageById(id) {
  const message = await Message.findByPk(id);
  return message;
}

// Mettre à jour une réservation
async function updateMessage(id, messageData) {
  const message = await Message.findByPk(id);
  if (message) {
    await message.update(messageData);
    return message;
  }
  return null;
}

// Supprimer une réservation
async function deleteMessage(id) {
  const message = await Message.findByPk(id);
  if (message) {
    await message.destroy();
    return message;
  }
  return null;
}

module.exports = {
  createMessage,
  getMessages,
  getMessageById,
  updateMessage,
  deleteMessage,
};

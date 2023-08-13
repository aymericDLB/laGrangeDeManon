// messageService.js

const Client = require('../models/client');
const Reservation = require('../models/reservation');
const Message = require('../models/message');
const { Op } = require("sequelize");

// Obtenir toutes les réservations
async function accueilBack() {
  const clients = await Client.count();
  const reservationsAttente = await Reservation.count({
    where: { etat: "demande" },
  });
  const reservationsConfirme = await Reservation.count({
    where: { etat: "confirme" },
  });
  const messages = await Message.count();

  const result = {
    "nbClient" : clients,
    "nbResaAttente" : reservationsAttente,
    "nbResaConfirme" : reservationsConfirme,
    "nbMessage" : messages
  }
  return result;
}

async function nbResaClient(id) {
  const clientResa = await Reservation.count({
    where: { idClient: id },
  });

  const result = {
    "nbResaDuClient" : clientResa
  }
  return result;
}

module.exports = {
  accueilBack,
  nbResaClient
};

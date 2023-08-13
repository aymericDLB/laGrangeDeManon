const Client = require('../models/client');
const Reservation = require('../models/reservation');
const Planning = require('../models/planning');
const { Op } = require("sequelize");

// Créer un client
async function infoReservation(idReservation) {
    const reservation = await Reservation.findByPk(idReservation,{
        include: [{
          model: Client,
          required: true,
          attributes: ['nom', 'prenom', 'email']
         }],
        attributes: ['idReservation', 'acompte', 'prix', 'adulte', 'enfant', 'dateDebReservation', 'dateFinReservation']
    });
  return reservation;
}

module.exports = {
    infoReservation
  };
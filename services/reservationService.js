// reservationService.js

const Reservation = require('../models/reservation');
const Client = require('../models/client');
const Planning = require('../models/planning');
const { Op } = require("sequelize");

// Créer une réservation
async function createReservation(reservationData) {
  const reservation = await Reservation.create(reservationData);
  return reservation;
}

// Obtenir toutes les réservations
async function getReservations() {
  const reservations = await Reservation.findAll();
  return reservations;
}

// Obtenir toutes les réservations Confirmé
async function getReservationsConfirme() {
  const reservations = await Reservation.findAll({
    attributes: ['dateDebReservation', 'dateFinReservation'],
    where: {
      dateDebReservation: {
        [Op.gt]: new Date()
      },
      etat: "confirme"
    }
  })
  return reservations;
}

// Obtenir toutes les réservations Confirmé
async function getReservationsEnAttente() {
  const reservations = await Reservation.findAll({
    include: [{
      model: Client,
      required: true,
      attributes: ['nom', 'prenom', 'email']
     }],
    attributes: ['idReservation', 'idClient', 'dateDebReservation', 'dateFinReservation', 'dateInsertion'],
    where: {
      dateFinReservation: {
        [Op.gte]: new Date()
      },
      etat: "demande"
    },
    order: [
      ['dateInsertion', 'ASC']
    ],
  })
  return reservations;
}

// Obtenir toutes les réservations en Attente
async function getReservationsFutur() {
  const reservations = await Reservation.findAll({
    include: [{
      model: Client,
      required: true,
      attributes: ['email']
     }],
    attributes: ['idReservation', 'acompte', 'prix', 'etat', 'dateInsertion', 'adulte', 'enfant', 'dateDebReservation', 'dateFinReservation'],
    where: {
      dateFinReservation: {
        [Op.gte]: new Date()
      },
    },
    order: [
      ['dateInsertion', 'ASC']
    ],
  }); 
  return reservations;
}

// Obtenir toutes les réservations du passé
async function getReservationsPasse() {
  const reservations = await Reservation.findAll({
    include: [{
      model: Client,
      required: true,
      attributes: ['email']
     }],
    attributes: ['idReservation', 'acompte', 'prix', 'etat', 'dateInsertion', 'adulte', 'enfant', 'dateDebReservation', 'dateFinReservation'],
    where: {
      dateFinReservation: {
        [Op.lt]: new Date()
      },
    },
    order: [
      ['dateInsertion', 'ASC']
    ],
  }); 
  return reservations;
}

// Obtenir une réservation par son ID
async function getReservationById(id) {
  const reservation = await Reservation.findByPk(id,{
    include: [{
      model: Client,
      required: true,
      attributes: ['nom', 'prenom', 'email', 'telephone', 'adresse', 'ville', 'codePostale']
     }],
    attributes: ['idReservation', 'idClient', 'acompte', 'prix', 'etat', 'dateInsertion', 'adulte', 'enfant', 'dateDebReservation', 'dateFinReservation']
  });
  return reservation;
}

// Mettre à jour une réservation
async function updateReservation(id, reservationData) {
  const reservation = await Reservation.findByPk(id,{
    include: [{
      model: Client,
      required: true,
      attributes: ['nom', 'prenom', 'email', 'telephone', 'adresse', 'ville', 'codePostale']
     }],
    attributes: ['idReservation', 'idClient', 'acompte', 'prix', 'etat', 'dateInsertion', 'adulte', 'enfant', 'dateDebReservation', 'dateFinReservation']
  });
  if (reservation) {
    await reservation.update(reservationData);
    return reservation;
  }
  return null;
}

// Supprimer une réservation
async function deleteReservation(id) {
  const reservation = await Reservation.findByPk(id);
  if (reservation) {
    await reservation.destroy();
    return reservation;
  }
  return null;
}

// Supprimer une réservation passe
async function deleteReservationPasse(id) {

  await Planning.destroy({
    where: { idReservation: id } 
  });

  const reservation = await Reservation.findByPk(id);
  if (reservation) {
    await reservation.destroy();
    return reservation;
  }
  return null;
}

module.exports = {
  createReservation,
  getReservations,
  getReservationsConfirme,
  getReservationsEnAttente,
  getReservationsFutur,
  getReservationsPasse,
  getReservationById,
  updateReservation,
  deleteReservation,
  deleteReservationPasse,
};

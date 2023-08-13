// planningService.js

const Planning = require('../models/planning');
const Reservation = require('../models/reservation');
const Client = require('../models/client');
const { Op } = require("sequelize");

// Créer une planning
async function createPlanning(planningData) {
  const planning = await Planning.create(planningData);
  return planning;
}

// Obtenir toutes les plannings
async function getPlannings() {
  const plannings = await Planning.findAll({
    include: [{
      model: Reservation,
      required: true,
      attributes: ['idReservation', 'idClient', 'dateDebReservation', 'dateFinReservation', 'dateInsertion'],
      where: {
        dateFinReservation: {
          [Op.gte]: new Date()
        },
        etat: "confirme"
      },
      include : [{
        model: Client,
        required: true,
        attributes: ['nom', 'prenom', 'email']
      }]
    }],
    attributes: ['idPlanning', 'idReservation', 'notation']
  });
  return plannings;
}

// Obtenir une planning par son ID
async function getPlanningById(id) {
  const planning = await Planning.findByPk(id);
  return planning;
}

// Mettre à jour une planning
async function updatePlanning(id, planningData) {
  const planning = await Planning.findByPk(id);
  if (planning) {
    await planning.update(planningData);
    return planning;
  }
  return null;
}

// Supprimer une planning
async function deletePlanning(id) {
  const planning = await Planning.findByPk(id);
  if (planning) {
    await planning.destroy();
    return planning;
  }
  return null;
}

module.exports = {
  createPlanning,
  getPlannings,
  getPlanningById,
  updatePlanning,
  deletePlanning,
};

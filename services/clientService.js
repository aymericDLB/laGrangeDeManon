// clientService.js

const Client = require('../models/client');
const Reservation = require('../models/reservation');
const Planning = require('../models/planning');
const { Op } = require("sequelize");

// Créer un client
async function createClient(clientData) {

  // Vérification si l'adresse e-mail existe déjà
  const existingClient = await Client.findOne({
    attributes: ['idClient'],
    where: { 
      email: clientData.email,
      nom: clientData.nom
    } 
  });
  if (existingClient) {
    return existingClient;
  }
  const client = await Client.create(clientData);
  return client;
}

// Obtenir toutes les clients
async function getClients() {
  const clients = await Client.findAll();
  return clients;
}

// Obtenir une réservation par son ID
async function getClientById(id) {
  const client = await Client.findByPk(id);
  return client;
}

// Mettre à jour un client
async function updateClient(id, clientData) {
  const client = await Client.findByPk(id);
  if (client) {
    await client.update(clientData);
    return client;
  }
  return null;
}

// Supprimer un client
async function deleteClient(id) {
  const reservationsToDelete = await Reservation.findAll({
    attributes: ['idReservation'],
    where: { idClient: id } 
  });

  reservationsToDelete.forEach(async element => {
    const planning = await Planning.destroy({
        where: { idReservation: element.idReservation } 
      });
  });
  
  const reservations = await Reservation.destroy({
    where: { idClient: id } 
  });

  const client = await Client.findByPk(id);
  if (client) {
    await client.destroy();
    return client;
  }
  return null;
}

module.exports = {
  createClient,
  getClients,
  getClientById,
  updateClient,
  deleteClient,
};

// clientontroller.js

const Client = require('../models/client');
const ClientService = require('../services/clientService');

// Créer un client
async function createClient(req, res) {
  try {
    const clientData = req.body;
    const client = await ClientService.createClient(clientData);
    res.json(client.idClient);
    
  } catch (error) {
    console.error('Erreur lors de la création du client:', error);
    res.status(500).json({ error: 'Erreur lors de la création du client.' });
  }
}

// Obtenir toutes les clients
async function getClients(req, res) {
  try {
    const clients = await ClientService.getClients();
    res.json(clients);
  } catch (error) {
    console.error('Erreur lors de la récupération des clients:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des clients.' });
  }
}

// Obtenir un client par son ID
async function getClientById(req, res) {
  try {
    const { id } = req.params;
    const client = await ClientService.getClientById(id);
    if (client) {
      res.json(client);
    } else {
      res.status(404).json({ error: 'Client non trouvée.' });
    }
  } catch (error) {
    console.error('Erreur lors de la récupération du client:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération de client.' });
  }
}

// Mettre à jour une réservation
async function updateClient(req, res) {
  try {
    const { id } = req.params;
    const clientData = req.body;
    const client = await ClientService.updateClient(id, clientData);
    if (client) {
      res.json(client);
    } else {
      res.status(404).json({ error: 'Client non trouvée.' });
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour du client:', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour du client.' });
  }
}

// Supprimer une réservation
async function deleteClient(req, res) {
  try {
    const { id } = req.params;
    const client = await ClientService.deleteClient(id);
    if (client) {
      res.json({ client: 'Client supprimée avec succès.' });
    } else {
      res.status(404).json({ error: 'Client non trouvée.' });
    }
  } catch (error) {
    console.error('Erreur lors de la suppression du client:', error);
    res.status(500).json({ error: 'Erreur lors de la suppression du client.' });
  }
}

module.exports = {
  createClient,
  getClients,
  getClientById,
  updateClient,
  deleteClient,
};

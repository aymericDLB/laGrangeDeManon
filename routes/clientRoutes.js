// clientRoutes.js

const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

// Créer un client
router.post('/client', clientController.createClient);

// Obtenir tous les messages
router.get('/clients', clientController.getClients);

// Obtenir un message par son ID
router.get('/client/:id', clientController.getClientById);

// Mettre à jour un message
router.put('/client/:id', clientController.updateClient);

// Supprimer un message
router.delete('/client/:id', clientController.deleteClient);

module.exports = router;

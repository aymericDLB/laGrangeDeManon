// clientRoutes.js

const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');

// Créer un client
router.post('/api/client', clientController.createClient);

// Obtenir tous les messages
router.get('/api/clients', clientController.getClients);

// Obtenir un message par son ID
router.get('/api/client/:id', clientController.getClientById);

// Mettre à jour un message
router.put('/api/client/:id', clientController.updateClient);

// Supprimer un message
router.delete('/api/client/:id', clientController.deleteClient);

module.exports = router;

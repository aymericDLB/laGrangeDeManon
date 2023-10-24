const express = require('express');
const router = express.Router();
const planningController = require('../controllers/planningController');

// Créer un planning
router.post('/api/planning', planningController.createPlanning);

// Obtenir tous les plannings
router.get('/api/plannings', planningController.getPlannings);

// Obtenir un planning par son ID
router.get('/api/planning/:id', planningController.getPlanningById);

// Mettre à jour un planning
router.put('/api/planning/:id', planningController.updatePlanning);

// Supprimer un planning
router.delete('/api/planning/:id', planningController.deletePlanning);

// router.put('/planningNotation/:id', planningController.updatePlanningNotation);

module.exports = router;

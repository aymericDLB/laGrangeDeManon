const express = require('express');
const router = express.Router();
const planningController = require('../controllers/planningController');

// Créer un planning
router.post('/planning', planningController.createPlanning);

// Obtenir tous les plannings
router.get('/plannings', planningController.getPlannings);

// Obtenir un planning par son ID
router.get('/planning/:id', planningController.getPlanningById);

// Mettre à jour un planning
router.put('/planning/:id', planningController.updatePlanning);

// Supprimer un planning
router.delete('/planning/:id', planningController.deletePlanning);

// router.put('/planningNotation/:id', planningController.updatePlanningNotation);

module.exports = router;

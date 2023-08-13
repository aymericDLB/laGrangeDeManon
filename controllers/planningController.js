const Planning = require('../models/planning');
const PlanningService = require('../services/planningService');

// Créer un planning
async function createPlanning(req, res) {
  try {
    const planningData = req.body;
    const planning = await PlanningService.createPlanning(planningData);
    res.json(planning);
  } catch (error) {
    console.error('Erreur lors de la création du planning:', error);
    res.status(500).json({ error: 'Erreur lors de la création du planning.' });
  }
}

// Obtenir toutes les plannings
async function getPlannings(req, res) {
  try {
    const plannings = await PlanningService.getPlannings();
    res.json(plannings);
  } catch (error) {
    console.error('Erreur lors de la récupération des plannings:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des plannings.' });
  }
}

// Obtenir un planning par son ID
async function getPlanningById(req, res) {
  try {
    const { id } = req.params;
    const planning = await PlanningService.getPlanningById(id);
    if (planning) {
      res.json(planning);
    } else {
      res.status(404).json({ error: 'Planning non trouvée.' });
    }
  } catch (error) {
    console.error('Erreur lors de la récupération du planning:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération de planning.' });
  }
}

// Mettre à jour une réservation
async function updatePlanning(req, res) {
  try {
    const { id } = req.params;
    const planningData = req.body;
    const planning = await PlanningService.updatePlanning(id, planningData);
    if (planning) {
      res.json(planning);
    } else {
      res.status(404).json({ error: 'Planning non trouvée.' });
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour du planning:', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour du planning.' });
  }
}

// Supprimer une réservation
async function deletePlanning(req, res) {
  try {
    const { id } = req.params;
    const planning = await PlanningService.deletePlanning(id);
    if (planning) {
      res.json({ planning: 'Planning supprimée avec succès.' });
    } else {
      res.status(404).json({ error: 'Planning non trouvée.' });
    }
  } catch (error) {
    console.error('Erreur lors de la suppression du planning:', error);
    res.status(500).json({ error: 'Erreur lors de la suppression du planning.' });
  }
}

module.exports = {
  createPlanning,
  getPlannings,
  getPlanningById,
  updatePlanning,
  deletePlanning,
};

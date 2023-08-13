// reservationController.js

const Reservation = require('../models/reservation');
const ReservationService = require('../services/reservationService');

// Créer une réservation
async function createReservation(req, res) {
  try {
    const reservationData = req.body;
    const reservation = await ReservationService.createReservation(reservationData);
    res.json(reservation.idReservation);
  } catch (error) {
    console.error('Erreur lors de la création de la réservation:', error);
    res.status(500).json({ error: 'Erreur lors de la création de la réservation.' });
  }
}

// Obtenir toutes les réservations
async function getReservations(req, res) {
  try {
    const reservations = await ReservationService.getReservations();
    res.json(reservations);
  } catch (error) {
    console.error('Erreur lors de la récupération des réservations:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des réservations.' });
  }
}

// Obtenir toutes les réservations confirme
async function getReservationsConfirme(req, res) {
  try {
    const reservations = await ReservationService.getReservationsConfirme();
    res.json(reservations);
  } catch (error) {
    console.error('Erreur lors de la récupération des réservations:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des réservations.' });
  }
}

// Obtenir toutes les réservations confirme
async function getReservationsEnAttente(req, res) {
  try {
    const reservations = await ReservationService.getReservationsEnAttente();
    res.json(reservations);
  } catch (error) {
    console.error('Erreur lors de la récupération des réservations:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des réservations.' });
  }
}

// Obtenir toutes les réservations en attente
async function getReservationsFutur(req, res) {
  try {
    const reservations = await ReservationService.getReservationsFutur();
    res.json(reservations);
  } catch (error) {
    console.error('Erreur lors de la récupération des réservations en attente:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des réservations en attente.' });
  }
}

// Obtenir toutes les réservations passé
async function getReservationsPasse(req, res) {
  try {
    const reservations = await ReservationService.getReservationsPasse();
    res.json(reservations);
  } catch (error) {
    console.error('Erreur lors de la récupération des réservations passé:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des réservations passé.' });
  }
}

// Obtenir une réservation par son ID
async function getReservationById(req, res) {
  try {
    const { id } = req.params;
    const reservation = await ReservationService.getReservationById(id);
    if (reservation) {
      res.json(reservation);
    } else {
      res.status(404).json({ error: 'Réservation non trouvée.' });
    }
  } catch (error) {
    console.error('Erreur lors de la récupération de la réservation:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération de la réservation.' });
  }
}

// Mettre à jour une réservation
async function updateReservation(req, res) {
  try {
    const { id } = req.params;
    const reservationData = req.body;
    const reservation = await ReservationService.updateReservation(id, reservationData);
    if (reservation) {
      res.json(reservation);
    } else {
      res.status(404).json({ error: 'Réservation non trouvée.' });
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour de la réservation:', error);
    res.status(500).json({ error: 'Erreur lors de la mise à jour de la réservation.' });
  }
}

// Supprimer une réservation
async function deleteReservation(req, res) {
  try {
    const { id } = req.params;
    const reservation = await ReservationService.deleteReservation(id);
    if (reservation) {
      res.json({ message: 'Réservation supprimée avec succès.' });
    } else {
      res.status(404).json({ error: 'Réservation non trouvée.' });
    }
  } catch (error) {
    console.error('Erreur lors de la suppression de la réservation:', error);
    res.status(500).json({ error: 'Erreur lors de la suppression de la réservation.' });
  }
}

// Supprimer une réservation
async function deleteReservationPasse(req, res) {
  try {
    const { id } = req.params;
    const reservation = await ReservationService.deleteReservationPasse(id);
    if (reservation) {
      res.json({ message: 'Réservation supprimée avec succès.' });
    } else {
      res.status(404).json({ error: 'Réservation non trouvée.' });
    }
  } catch (error) {
    console.error('Erreur lors de la suppression de la réservation:', error);
    res.status(500).json({ error: 'Erreur lors de la suppression de la réservation.' });
  }
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

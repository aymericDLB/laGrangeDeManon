// reservationRoutes.js

const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

// Créer une réservation
router.post('/api/reservation', reservationController.createReservation);

// Obtenir toutes les réservations
router.get('/api/reservations', reservationController.getReservations);

// Obtenir une réservation par son ID
router.get('/api/reservation/:id', reservationController.getReservationById);

// Obtenir toutes les réservations confirme
router.get('/api/reservations/confirme', reservationController.getReservationsConfirme);

// Obtenir toutes les réservations en attente
router.get('/api/reservations/en-attente', reservationController.getReservationsEnAttente);

// Obtenir toutes les réservations futur
router.get('/api/reservations/futur', reservationController.getReservationsFutur);

// Obtenir toutes les réservations passé
router.get('/api/reservations/passe', reservationController.getReservationsPasse);

// Mettre à jour une réservation
router.put('/api/reservation/:id', reservationController.updateReservation);

// Supprimer une réservation
router.delete('/reservation/:id', reservationController.deleteReservation);

// Supprimer une réservation passe
router.delete('/reservation/passe/:id', reservationController.deleteReservationPasse);

module.exports = router;

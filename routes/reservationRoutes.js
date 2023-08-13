// reservationRoutes.js

const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

// Créer une réservation
router.post('/reservation', reservationController.createReservation);

// Obtenir toutes les réservations
router.get('/reservations', reservationController.getReservations);

// Obtenir une réservation par son ID
router.get('/reservation/:id', reservationController.getReservationById);

// Obtenir toutes les réservations confirme
router.get('/reservations/confirme', reservationController.getReservationsConfirme);

// Obtenir toutes les réservations en attente
router.get('/reservations/en-attente', reservationController.getReservationsEnAttente);

// Obtenir toutes les réservations futur
router.get('/reservations/futur', reservationController.getReservationsFutur);

// Obtenir toutes les réservations passé
router.get('/reservations/passe', reservationController.getReservationsPasse);

// Mettre à jour une réservation
router.put('/reservation/:id', reservationController.updateReservation);

// Supprimer une réservation
router.delete('/reservation/:id', reservationController.deleteReservation);

// Supprimer une réservation passe
router.delete('/reservation/passe/:id', reservationController.deleteReservationPasse);

module.exports = router;

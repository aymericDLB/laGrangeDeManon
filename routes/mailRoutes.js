const express = require('express');
const router = express.Router();
const mailController = require('../controllers/mailController');


router.post('/api/demandeReservationMail/:id', mailController.demandeReservationMail);

router.post('/api/demandeReservationValideMail/:id', mailController.demandeReservationValideMail);

router.post('/api/demandeReservationEnAttenteMail', mailController.demandeReservationEnAttenteMail);

router.post('/api/reservationTermine/:id', mailController.reservationTermine);

router.get('/api/recupererReservationNonNote', mailController.getListesReservationsNonNote);

module.exports = router;

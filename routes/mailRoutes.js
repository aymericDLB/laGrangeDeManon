const express = require('express');
const router = express.Router();
const mailController = require('../controllers/mailController');


router.post('/demandeReservationMail/:id', mailController.demandeReservationMail);

router.post('/demandeReservationValideMail/:id', mailController.demandeReservationValideMail);

router.post('/demandeReservationEnAttenteMail', mailController.demandeReservationEnAttenteMail);

router.post('/reservationTermine/:id', mailController.reservationTermine);

module.exports = router;

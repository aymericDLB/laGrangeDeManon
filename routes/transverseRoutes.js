// clientRoutes.js

const express = require('express');
const router = express.Router();
const transverseController = require('../controllers/transverseController');


router.get('/accueil-back', transverseController.accueilBack);

//Récupère le nombre de réservation d'un client
router.get('/reservations/client/:id', transverseController.nbResaClient);


module.exports = router;

const Client = require('../models/client');
const Reservation = require('../models/reservation');
const Planning = require('../models/planning');
const { Op, where } = require("sequelize");

async function infoReservation(idReservation) {
    const reservation = await Reservation.findByPk(idReservation,{
        include: [{
          model: Client,
          required: true,
          attributes: ['nom', 'prenom', 'email']
         }],
        attributes: ['idReservation', 'acompte', 'prix', 'adulte', 'enfant', 'dateDebReservation', 'dateFinReservation']
    });
  return reservation;
}

async function relancerClientAvisReservation() {
  const reservation = await Reservation.findAll({
      include: [{
        model: Planning,
        required: true,
        where: {
          notation: {
            [Op.eq]: 0,
          }
        }
       }
      ],
      attributes: ['idReservation'],
      where: {
        dateFinReservation: {
          [Op.lt]: new Date()
        }
      }
    });
return reservation;
}

module.exports = {
    infoReservation,
    relancerClientAvisReservation
  };
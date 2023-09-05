// reservation.js
require('dotenv').config();

const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');
const Client = require('./client');

const Reservation = sequelize.define('Reservation', {
  idReservation: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  idClient: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  dateDebReservation: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  dateFinReservation: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  adulte: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  enfant: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  etat: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prix: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  acompte: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  dateInsertion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'reservation',
  timestamps: false,
});

Client.hasMany(Reservation, {foreignKey: 'idClient'})
Reservation.belongsTo(Client, {foreignKey: 'idClient'})

module.exports = Reservation;

// planning.js

require('dotenv').config();

const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');
const Reservation = require('./reservation');


const Planning = sequelize.define('Planning', {
  idPlanning: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  idReservation: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  notation: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'planning',
  timestamps: false,
});


Reservation.hasMany(Planning, {foreignKey: 'idReservation'})
Planning.belongsTo(Reservation, {foreignKey: 'idReservation'})

module.exports = Planning;
// client.js
require('dotenv').config();

const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');

const Client = sequelize.define('Client', {
  idClient: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  nom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  prenom: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telephone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  adresse: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  ville: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  codePostale: {
    type: DataTypes.STRING,
    allowNull: true,
  },
}, {
  tableName: 'client',
  timestamps: false,
});

module.exports = Client;
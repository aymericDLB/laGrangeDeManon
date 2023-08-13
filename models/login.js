// login.js
require('dotenv').config();

const { DataTypes } = require('sequelize');
const sequelize = require('../utils/database');


const Login = sequelize.define('Login', {
  idUser: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  identifiant: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  motDePasse: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'user',
  timestamps: false,
});

module.exports = Login;
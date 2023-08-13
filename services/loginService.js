// loginService.js

const Login = require('../models/login');
const { Op } = require("sequelize");
const bcrypt = require("bcrypt")


// Obtenir une réservation par son ID
async function login(identifiant, motDePasse) {
  
  const login = await Login.findOne({
    where: {
      identifiant: {
        [Op.eq]: identifiant
      }
    }
  });

  if (login) {
    if (await bcrypt.compare(motDePasse, login.dataValues.motDePasse)) {
      console.log("---------> Password Successful")
      return login;
    } 
    else {
      console.log("---------> Password Incorrect")
     return null;
    }
  }
  
}

module.exports = {
  login
};

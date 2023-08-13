// userService.js

const User = require('../models/user');

// Exemple de service pour la gestion des opérations CRUD sur les utilisateurs

// Simuler une base de données en mémoire
const users = [];

// Créer un utilisateur
function createUser(userData) {
  const user = new User(userData.id, userData.name, userData.email);
  users.push(user);
  return user;
}

// Récupérer tous les utilisateurs
function getUsers() {
  return users;
}

// Récupérer un utilisateur par son ID
function getUserById(id) {
  return users.find(user => user.id === id);
}

// Mettre à jour un utilisateur
function updateUser(id, userData) {
  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex !== -1) {
    const updatedUser = new User(id, userData.name, userData.email);
    users[userIndex] = updatedUser;
    return updatedUser;
  }
  return null;
}

// Supprimer un utilisateur
function deleteUser(id) {
  const userIndex = users.findIndex(user => user.id === id);
  if (userIndex !== -1) {
    users.splice(userIndex, 1);
    return true;
  }
  return false;
}

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};

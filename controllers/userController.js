// userController.js

const userService = require('../services/userService');

// Exemple d'un contrôleur pour gérer les opérations CRUD sur les utilisateurs

// Créer un utilisateur
async function createUser(req, res) {
  try {
    const user = await userService.createUser(req.body);
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la création de l\'utilisateur.' });
  }
}

// Récupérer tous les utilisateurs
async function getUsers(req, res) {
  try {
    const users = await userService.getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs.' });
  }
}

// Récupérer un utilisateur par son ID
async function getUserById(req, res) {
  try {
    const user = await userService.getUserById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'Utilisateur non trouvé.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la récupération de l\'utilisateur.' });
  }
}

// Mettre à jour un utilisateur
async function updateUser(req, res) {
  try {
    const user = await userService.updateUser(req.params.id, req.body);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'Utilisateur non trouvé.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la mise à jour de l\'utilisateur.' });
  }
}

// Supprimer un utilisateur
async function deleteUser(req, res) {
  try {
    const result = await userService.deleteUser(req.params.id);
    if (result) {
      res.json({ message: 'Utilisateur supprimé avec succès.' });
    } else {
      res.status(404).json({ error: 'Utilisateur non trouvé.' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression de l\'utilisateur.' });
  }
}

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
};

// loginController.js


const LoginService = require('../services/loginService');


// Obtenir un message par son ID
async function login(req, res) {
  
  try {
    const login = await LoginService.login(req.body.identifiant, req.body.motDePasse);
    if (login) {
      res.status(200).json({ ok: 'Utilisateur trouvée.' });
    } else {
      res.status(404).json({ error: 'Utilisateur non trouvée.' });
    }
  } catch (error) {
    console.error('Erreur lors de la récupération des utilisateurs:', error);
    res.status(500).json({ error: 'Erreur lors de la récupération des utilisateurs.' });
  }
}


module.exports = {
  login
};

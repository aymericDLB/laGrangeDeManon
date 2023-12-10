const express = require('express');
const cors = require('cors');
const path = require('path')
const http = require('http');
const basicAuth = require('basic-auth');

// Définition des Routes
//const userRoutes = require('./routes/userRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const messageRoutes = require('./routes/messageRoutes');
const loginRoutes = require('./routes/loginRoutes');
const clientRoutes = require('./routes/clientRoutes');
const transverseRoutes = require('./routes/transverseRoutes');
const planningRoutes = require('./routes/planningRoutes');
const mailRoutes = require('./routes/mailRoutes');

const app = express();

const authenticate = (req, res, next) => {
  const user = basicAuth(req);

  // Vérifier si les informations d'identification sont présentes et correctes
  if ((!user || !checkCredentials(user.name, user.pass)) && req.url.includes("/api")) {
    res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
    return res.sendStatus(401);
  }

  // Informations d'identification valides, passez à la suite
  next();
};

// Fonction de vérification des informations d'identification
const checkCredentials = (username, password) => {
  // Remplacez cela par la logique réelle de vérification des identifiants
  return username === 'Lagrangedemanon' && password === '$2y$10$LL5m3nVMUSsPYwJvf4tm/Oktsxi377mslkTd/HymkY6WamK0xjI9y';
};

// Utilisez le middleware d'authentification basique
app.use(authenticate);

// Middleware pour le parsing du corps des requêtes en JSON
app.use(express.json());

// Utilisations des Routes
app.use(reservationRoutes);
app.use(messageRoutes);
app.use(loginRoutes);
app.use(clientRoutes);
app.use(transverseRoutes);
app.use(planningRoutes);
app.use(mailRoutes);

app.use(cors({origin: '*'}));

app.use(express.static(path.join(__dirname, '/dist')));

// Configurer la redirection vers index.html pour toutes les routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

module.exports = app;
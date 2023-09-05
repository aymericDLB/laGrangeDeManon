const express = require('express');
const cors = require('cors');
const path = require('path')
const http = require('http');


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

// Middleware pour le parsing du corps des requêtes en JSON
app.use(express.json());

// Utilisations des Routes
//app.use(userRoutes);
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
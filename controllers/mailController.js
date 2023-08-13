const nodemailer = require('nodemailer');
const fs = require('fs');
const handlebars = require('handlebars');

const MailService = require('../services/mailService');

async function demandeReservationMail(req, res) {
    try {
        const { id } = req.params;
        const reservation = await MailService.infoReservation(id);
        res.status(200).send({
            status: "200",
            message: 'Mail Sent!'
        });
        sendMail('demandeReservation', '⛰️ La Grange de Manon - Pré-Réservation Acceptée ⛰️', reservation);
      } catch (error) {
        console.error('Erreur lors de la récupération de la réservation:', error);
        res.status(500).json({ error: 'Erreur lors de la récupération de la réservation.' });
    }   
}

async function demandeReservationValideMail(req, res) {
    try {
        const { id } = req.params;
        const reservation = await MailService.infoReservation(id);
        res.status(200).send({
            status: "200",
            message: 'Mail Sent!'
        });
        sendMail('demandeReservationValide', '⛰️ La Grange de Manon - Réservation Validée ⛰️', reservation);
      } catch (error) {
        console.error('Erreur lors de la récupération de la réservation:', error);
        res.status(500).json({ error: 'Erreur lors de la récupération de la réservation.' });
    }   
}

async function demandeReservationEnAttenteMail(req, res) {
    res.status(200).send({
        status: "200",
        message: 'Mail Sent!'
    })
    sendMail('demandeReservationEnAttenteMail', '⛰️ La grange de Manon - Réservation en attente ⛰️');
}

async function reservationTermine(req, res) {
    try {
        const { id } = req.params;
        const reservation = await MailService.infoReservation(id);
        res.status(200).send({
            status: "200",
            message: 'Mail Sent!'
        });
        sendMail('reservationTermine', '⛰️ La Grange de Manon - Votre avis nous intéresse ⛰️', reservation);
      } catch (error) {
        console.error('Erreur lors de la récupération de la réservation:', error);
        res.status(500).json({ error: 'Erreur lors de la récupération de la réservation.' });
    }
}


function sendMail(cheminTemplate, objetDuMail, dataReservation) {
    dataReservation = dataReservation || 0;
    var data;

    if (dataReservation != 0) {
        //Formatage de la date de début de réservation au bon format FR
        var dateDebTmp = new Date(dataReservation.dateDebReservation);
        dateDebTmp = dateDebTmp.toDateString();
        var jourDebText = getDateDuJourEnTexteFr(dateDebTmp.split(' ')[0]);
        var moisDebText = getDateDuMoisEnTexteFr(dateDebTmp.split(' ')[1]); 
        dateDebTmp = jourDebText+' '+dateDebTmp.split(' ')[2]+' '+moisDebText+' '+dateDebTmp.split(' ')[3];

        //Formatage de la date de fin de réservation au bon format FR
        var dateFinTmp = new Date(dataReservation.dateFinReservation);
        dateFinTmp = dateFinTmp.toDateString();
        var jourFinText = getDateDuJourEnTexteFr(dateFinTmp.split(' ')[0]);
        var moisFinText = getDateDuMoisEnTexteFr(dateFinTmp.split(' ')[1]); 
        dateFinTmp = jourFinText+' '+dateFinTmp.split(' ')[2]+' '+moisFinText+' '+dateFinTmp.split(' ')[3];

        data = {
            nom: dataReservation.Client.nom,
            prenom: dataReservation.Client.prenom,
            email: dataReservation.Client.email,
            idReservation: dataReservation.idReservation,
            acompte: dataReservation.acompte,
            prix: dataReservation.prix,
            adulte: dataReservation.adulte,
            enfant: dataReservation.enfant,
            dateDebReservation: dateDebTmp,
            dateFinReservation: dateFinTmp,
        };
    }

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'metns.974@gmail.com',
        pass: 'hhsmkrpewtfflomd'
      }
    });

    fs.readFile('./assets/templates/views/'+cheminTemplate+'.handlebars', 'utf8', (err, templateData) => {
        if (err) {
          console.log('Erreur lors de la lecture du modèle:', err);
          return;
        }
      
        // Compiler le modèle Handlebars
        const template = handlebars.compile(templateData);
      
        // Générer le contenu HTML à partir des données
        const emailContent = template(data);
        //dataReservation.Client.email
        const mailOptions = {
          from: 'metns.974@gmail.com',
          to: 'aymeric.delabarre@gmail.com',
          subject: objetDuMail,
          html: emailContent,
          attachments: [
            { filename: 'Contrat_La_Grange_De_Manon.docx', path: './assets/piecesJointes/Contrat_La_Grange_De_Manon.docx'},
            { filename: 'Contrat_La_Grange_De_Manon.pdf', path: './assets/piecesJointes/Contrat_La_Grange_De_Manon.pdf'}
          ]
        };
      
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log('Erreur lors de l\'envoi de l\'e-mail:', error);
          } else {
            console.log('E-mail envoyé avec succès:', info.response);
          }
        });
    });
};

function getDateDuJourEnTexteFr(jourEnAnglais){
    switch (jourEnAnglais) {
        case 'Sun':
            jourEnAnglais = "Dimanche"
        break;
        case 'Mon':
            jourEnAnglais = "Lundi"
        break;
        case 'Tue':
            jourEnAnglais = "Mardi"
        break;
        case 'Wed':
            jourEnAnglais = "Mercredi"
        break;
        case 'Thu':
            jourEnAnglais = "Jeudi"
        break;
        case 'Fri':
            jourEnAnglais = "Vendredi"
        break;
        case 'Sat':
            jourEnAnglais = "Samedi"
        break;
    
        default: jourEnAnglais = " "
            break;
    }
    return jourEnAnglais;
};



function getDateDuMoisEnTexteFr(params) {
    switch (params) {
        case 'Oct':
            params = 'Octobre'
        break;
        case 'Nov':
            params = 'Novembre'
        break;
        case 'Dec':
            params = 'Décembre'
        break;
        case 'Jan':
            params = 'Janvier'
        break;
        case 'Feb':
            params = 'Février'
        break;
        case 'Mar':
            params = 'Mars'
        break;
        case 'Apr':
            params = 'Avril'
        break;
        case 'May':
            params = 'Mai'
        break;
        case 'Jun':
            params = 'Juin'
        break;
        case 'Jul':
            params = 'Juillet'
        break;
        case 'Aug':
            params = 'Août'
        break;
        case 'Sep':
            params = 'Septembre'
        break;
    
        default:
            params = ' '
            break;
    }
    return params;
};

module.exports = {
    demandeReservationMail,
    demandeReservationValideMail,
    demandeReservationEnAttenteMail,
    reservationTermine
};
  
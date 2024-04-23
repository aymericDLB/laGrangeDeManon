const nodemailer = require('nodemailer');
const fs = require('fs');
const handlebars = require('handlebars');

const MailService = require('../services/mailService');
const PlanningService = require('../services/planningService');

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

async function demandeMessageEnAttenteMail(req, res) {
    res.status(200).send({
        status: "200",
        message: 'Mail Sent!'
    })
    sendMail('demandeMessageEnAttenteMail', '⛰️ La grange de Manon - Message en attente ⛰️');
}

async function envoieMailNotation(req, res) {
    try {
        const { id } = req.params;
        const reservation = await MailService.infoReservation(id);

        sendMail('reservationTermine', '⛰️ La Grange de Manon - Votre avis nous intéresse ⛰️', reservation);
        await PlanningService.updatePlanningNotation(id);
        res.status(200).send({
            status: "200",
            message: 'Mail Sent!'
        });
        
      } catch (error) {
        console.error('Erreur lors de envoieMailNotation:', error);
      }
}

function sendMail(cheminTemplate, objetDuMail, dataReservation) {
    dataReservation = dataReservation || 0;
    var data;
    var emailDestinataire = "lagrangedemanon@gmail.com";

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

        emailDestinataire = data.email;
    }

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'lagrangedemanon@gmail.com',
        pass: 'yfwqhdtzwffvonnl'
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

        const mailOptions = {
          from: 'lagrangedemanon@gmail.com',
          to: emailDestinataire,
          subject: objetDuMail,
          html: emailContent
        };
      
        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log('Erreur lors de l\'envoi de l\'e-mail:', error);
          } else {
            console.log('E-mail envoyé avec succès:');
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
    demandeMessageEnAttenteMail,
    envoieMailNotation
};
  
const TransverseService = require('../services/transverseService');

async function accueilBack(req, res) {
  
  try {
    const result = await TransverseService.accueilBack();
    res.json(result);
  } catch (error) {
    console.error('Erreur Backend:', error);
    res.status(500).json({ error: 'Erreur Backend.' });
  }
}

async function nbResaClient(req, res) {
  try {
    const { id } = req.params;
    const result = await TransverseService.nbResaClient(id);
    res.json(result);
  } catch (error) {
    console.error('Erreur Backend:', error);
    res.status(500).json({ error: 'Erreur Backend.' });
  }
}


module.exports = {
    accueilBack,
    nbResaClient
};

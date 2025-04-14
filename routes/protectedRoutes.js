const express = require('express');
const router = express.Router();


router.get('/dashboard', (req, res) => {
  res.send('Bienvenue sur le tableau de bord sécurisé !');
});

module.exports = router;

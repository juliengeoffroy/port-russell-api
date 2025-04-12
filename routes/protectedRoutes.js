const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');

router.get('/dashboard', verifyToken, (req, res) => {
  res.send('Bienvenue sur le tableau de bord sécurisé !');
});

module.exports = router;

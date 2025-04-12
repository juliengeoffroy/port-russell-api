const express = require('express');
const router = express.Router();
const catwayController = require('../controllers/catwayController');

// Routes REST
router.get('/', catwayController.getAllCatways);
router.get('/:id', catwayController.getCatwayById);
router.post('/', catwayController.createCatway);
router.put('/:id', catwayController.updateCatway);
router.patch('/:id', catwayController.patchCatway);
router.delete('/:id', catwayController.deleteCatway);

module.exports = router;

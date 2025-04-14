const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
// ✅ UNE SEULE FOIS

// Routes protégées
router.get('/',  userController.getAllUsers);
router.patch('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);
router.get('/:id', userController.getUserById);

module.exports = router;

const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');


// GET /reservations (liste complète, optionnelle)
router.get('/', reservationController.getAllReservations);

// GET /catways/:id/reservations
router.get('/catways/:id/reservations', reservationController.getReservationsByCatway);

// GET /catways/:id/reservations/:idReservation
router.get('/catways/:id/reservations/:idReservation' ,reservationController.getReservationById);

// POST /catways/:id/reservations
router.post('/catways/:id/reservations' ,reservationController.createReservation);

// DELETE /catways/:id/reservations/:idReservation
router.delete('/catways/:id/reservations/:idReservation', reservationController.deleteReservation);

router.get('/reservations', reservationController.getAllReservations);

router.patch('/catways/:id/reservations/:idReservation', reservationController.updateReservation);

module.exports = router;

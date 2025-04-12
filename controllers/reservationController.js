const Reservation = require('../models/Reservation');

// Lister toutes les réservations (GET /reservations)
exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Récupérer les réservations d’un catway (GET /catways/:id/reservations)
exports.getReservationsByCatway = async (req, res) => {
  try {
    const reservations = await Reservation.find({ catwayNumber: req.params.id });
    res.json(reservations);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Récupérer une réservation spécifique (GET /catways/:id/reservations/:idReservation)
exports.getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.idReservation);
    if (!reservation) return res.status(404).json({ error: 'Réservation introuvable' });
    res.json(reservation);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// Créer une réservation (POST /catways/:id/reservations)
exports.createReservation = async (req, res) => {
  const { clientName, boatName, checkIn, checkOut } = req.body;
  try {
    const reservation = new Reservation({
      catwayNumber: req.params.id,
      clientName,
      boatName,
      checkIn,
      checkOut
    });
    await reservation.save();
    res.status(201).json(reservation);
  } catch (error) {
    res.status(400).json({ error: 'Erreur lors de la création de la réservation' });
  }
};

// Supprimer une réservation (DELETE /catways/:id/reservations/:idReservation)
exports.deleteReservation = async (req, res) => {
  try {
    await Reservation.findByIdAndDelete(req.params.idReservation);
    res.json({ message: 'Réservation supprimée' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression' });
  }
};

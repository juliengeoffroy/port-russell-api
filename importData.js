const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Catway = require('./models/Catway');
const Reservation = require('./models/Reservation'); // ✅ ajouter le modèle

dotenv.config(); // charge le .env

const catways = [
  { catwayNumber: 201, type: 'long', catwayState: 'disponible' },
  { catwayNumber: 202, type: 'short', catwayState: 'occupé' },
  { catwayNumber: 203, type: 'long', catwayState: 'réparation' },
  { catwayNumber: 204, type: 'short', catwayState: 'disponible' }
];

const reservations = [
  {
    catwayNumber: 201,
    clientName: 'Jean Marin',
    boatName: 'Le Dauphin',
    checkIn: new Date('2025-05-01'),
    checkOut: new Date('2025-05-03')
  },
  {
    catwayNumber: 202,
    clientName: 'Claire Voile',
    boatName: 'La Mouette',
    checkIn: new Date('2025-05-10'),
    checkOut: new Date('2025-05-12')
  }
];

async function importData() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connexion MongoDB réussie.");

    // Supprimer les anciennes données
    await Catway.deleteMany();
    await Reservation.deleteMany();

    // Insérer les nouvelles données
    await Catway.insertMany(catways);
    console.log("✅ Catways importés avec succès !");

    await Reservation.insertMany(reservations);
    console.log("✅ Réservations importées avec succès !");

    process.exit();
  } catch (error) {
    console.error("❌ Erreur lors de l'import :", error);
    process.exit(1);
  }
}

importData();

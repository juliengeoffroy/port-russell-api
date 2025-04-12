const mongoose = require('mongoose');
const fs = require('fs');
require('dotenv').config();

const Catway = require('./models/Catway');
const Reservation = require('./models/Reservation');

// Connexion MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connecté à MongoDB"))
  .catch(err => console.error("❌ Erreur de connexion :", err));

// Lire les fichiers JSON
const catways = JSON.parse(fs.readFileSync('./data/catways.json'));
const reservations = JSON.parse(fs.readFileSync('./data/reservations.json'));

// Importer les données
async function importData() {
  try {
    await Catway.insertMany(catways);
    await Reservation.insertMany(reservations);
    console.log("✅ Données importées avec succès !");
    process.exit();
  } catch (err) {
    console.error("❌ Erreur d'import :", err);
    process.exit(1);
  }
}

importData();

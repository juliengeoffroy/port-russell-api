const Catway = require('../models/Catway');

// GET /catways : liste tous les catways
exports.getAllCatways = async (req, res) => {
  try {
    const catways = await Catway.find();
    res.json(catways);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// GET /catways/:id : récupérer un catway par ID
exports.getCatwayById = async (req, res) => {
  try {
    const catway = await Catway.findById(req.params.id);
    if (!catway) return res.status(404).json({ error: 'Catway introuvable' });
    res.json(catway);
  } catch (error) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// POST /catways : créer un catway
exports.createCatway = async (req, res) => {
  const { catwayNumber, type, catwayState } = req.body;
  try {
    const newCatway = new Catway({ catwayNumber, type, catwayState });
    await newCatway.save();
    res.status(201).json(newCatway);
  } catch (error) {
    res.status(400).json({ error: 'Erreur lors de la création du catway' });
  }
};

// PUT /catways/:id : remplacer un catway entier
exports.updateCatway = async (req, res) => {
  try {
    const updatedCatway = await Catway.findByIdAndUpdate(req.params.id, req.body, { new: true, overwrite: true });
    res.json(updatedCatway);
  } catch (error) {
    res.status(400).json({ error: 'Erreur lors de la mise à jour' });
  }
};

// PATCH /catways/:id : modifier partiellement (état par exemple)
exports.patchCatway = async (req, res) => {
  try {
    const updated = await Catway.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
    res.json(updated);
  } catch (error) {
    res.status(400).json({ error: 'Erreur lors du patch' });
  }
};

// DELETE /catways/:id : supprimer un catway
exports.deleteCatway = async (req, res) => {
  try {
    await Catway.findByIdAndDelete(req.params.id);
    res.json({ message: 'Catway supprimé' });
  } catch (error) {
    res.status(500).json({ error: 'Erreur lors de la suppression' });
  }
};

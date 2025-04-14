const User = require('../models/User');

// 🔹 Obtenir tous les utilisateurs
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur' });
  }
};

// 🔹 Modifier un utilisateur
exports.updateUser = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(
    req.params.id, req.body, { new: true });
    res.json({ message: 'Utilisateur mis à jour', updatedUser });
  } catch (err) {
    res.status(400).json({ error: 'Erreur lors de la mise à jour' });
  }
};

// 🔹 Supprimer un utilisateur
exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'Utilisateur supprimé' });
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la suppression' });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "Utilisateur introuvable" });
    res.json(user); // ✅ Vérifie ici qu'il renvoie bien { name, email, phone }
  } catch (error) {
    res.status(500).json({ message: "Erreur serveur" });
  }
};

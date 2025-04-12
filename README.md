# Port de Plaisance de Russell - API REST

## ⛵️ Objectif
Cette application permet à la capitainerie du port de Russell de gérer les catways (appontements) et les réservations associées via une API REST privée avec interface de gestion.

## 📊 Stack technique
- Backend : Node.js, Express.js
- Base de données : MongoDB Atlas
- Authentification : JWT (JSON Web Token)
- Frontend : HTML/CSS (pages statiques dans `public/`)
- Tests : Jest + Supertest
- Déploiement : Render.com

---

## 📂 Structure du projet
```
port-russell-api/
├── controllers/           # Logique métier
├── data/                  # Données JSON à importer (catways, reservations)
├── middleware/            # Auth middleware
├── models/                # Modèles Mongoose
├── public/                # HTML + CSS (interface web)
├── routes/                # Routes REST
├── tests/                 # Tests unitaires
├── app.js                 # Configuration Express
├── server.js              # Lancement du serveur
├── .env.example           # Exemple de configuration
├── package.json
└── README.md
```

---

## ⚙️ Installation locale
1. Cloner le projet :
```bash
git clone https://github.com/TON-UTILISATEUR/port-russell-api.git
cd port-russell-api
```
2. Installer les dépendances :
```bash
npm install
```
3. Créer un fichier `.env` à partir de `.env.example` :
```env
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/port-russell
JWT_SECRET=tonSecretUltraSecret
```
4. Lancer le serveur :
```bash
npm run dev
```

---

## ✉️ Routes principales

### Authentification
- `POST /api/auth/register` → Inscription
- `POST /api/auth/login` → Connexion

### Catways
- `GET /api/catways`
- `GET /api/catways/:id`
- `POST /api/catways`
- `PATCH /api/catways/:id`
- `DELETE /api/catways/:id`

### Réservations
- `GET /api/reservations`
- `GET /api/catways/:id/reservations/:idReservation`
- `POST /api/catways/:id/reservations`
- `DELETE /api/catways/:id/reservations/:idReservation`

---

## 📝 Pages disponibles
- `/` → Page d'accueil avec présentation + lien connexion et documentation
- `/dashboard` → Espace utilisateur (nécessite connexion)
- `/documentation` → Documentation interactive de l'API + lien PDF
- `/catways`, `/reservations` → Visualisation directe des données

---

## 🔧 Tests
Lancer tous les tests unitaires :
```bash
npm test
```

---

## 🚀 Déploiement
- Lien GitHub : [https://github.com/juliengeoffroy/port-russell-api.git](https://github.com/juliengeoffroy/port-russell-api.git)
- Lien Render (API et interface) : []()

---

## 📄 Documentation PDF
La documentation de l'API est disponible :
- Sur `/documentation`
- En téléchargement direct : `/documentation.pdf`

---

## 📅 Données de départ
Importer les données avec :
```bash
mongoimport --jsonArray --db port-russell --collection catways --file data/catways.json
mongoimport --jsonArray --db port-russell --collection reservations --file data/reservations.json
```

---

## 🙌 Auteur
Projet réalisé dans le cadre de la formation de développeur web.
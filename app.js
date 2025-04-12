const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// 👉 Les routes en premier
const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

const catwayRoutes = require('./routes/catwayRoutes');
app.use('/api/catways', catwayRoutes);

const reservationRoutes = require('./routes/reservationRoutes');
app.use('/api', reservationRoutes);

const protectedRoutes = require('./routes/protectedRoutes');
app.use('/api', protectedRoutes);


app.get('/documentation', (req, res) => {
  res.sendFile(__dirname + '/public/documentation.html');
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/public/login.html');
});

app.get('/dashboard', (req, res) => {
  res.sendFile(__dirname + '/public/dashboard.html');
});

// 👉 Page d'accueil en dernier
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

module.exports = app;


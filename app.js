const express = require('express');
const cors = require('cors');
const app = express();
const path = require('path');



// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const catwayRoutes = require('./routes/catwayRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const protectedRoutes = require('./routes/protectedRoutes');

app.use('/api/users', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/catways', catwayRoutes);
app.use('/api', reservationRoutes);
app.use('/api', protectedRoutes);

// Pages HTML
app.get('/documentation', (req, res) => {
  res.sendFile(__dirname + '/public/documentation.html');
});

app.get('/login', (req, res) => {
  res.sendFile(__dirname + '/public/login.html');
});

app.get('/dashboard', (req, res) => {
  res.sendFile(__dirname + '/public/dashboard.html');
});

// Page d'accueil
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

module.exports = app;
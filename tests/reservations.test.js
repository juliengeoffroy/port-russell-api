const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const Catway = require('../models/Catway');
const Reservation = require('../models/Reservation');

let catwayId;
let reservationId;
let catwayNumber = 200;

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/port-russell-test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });

  // Créer un catway pour les tests de réservation
  const catway = await Catway.create({
    catwayNumber: catwayNumber,
    type: 'long',
    catwayState: 'libre'
  });

  catwayId = catway._id;
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase(); // Nettoyer la BDD test
  await mongoose.connection.close();
});

describe('Réservations API', () => {
  it('doit créer une réservation pour un catway', async () => {
    const res = await request(app)
      .post(`/api/catways/${catwayNumber}/reservations`)
      .send({
        clientName: 'Capitaine Haddock',
        boatName: 'Le Karaboudjan',
        checkIn: '2025-04-15',
        checkOut: '2025-04-18'
      });

    expect(res.statusCode).toBe(201);
    expect(res.body.clientName).toBe('Capitaine Haddock');
    reservationId = res.body._id;
  });

  it('doit retourner la liste de toutes les réservations', async () => {
    const res = await request(app).get('/api/reservations');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('doit retourner les réservations d’un catway', async () => {
    const res = await request(app).get(`/api/catways/${catwayNumber}/reservations`);
    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it('doit retourner une réservation spécifique', async () => {
    const res = await request(app).get(`/api/catways/${catwayNumber}/reservations/${reservationId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body._id).toBe(reservationId);
  });

  it('doit supprimer une réservation', async () => {
    const res = await request(app).delete(`/api/catways/${catwayNumber}/reservations/${reservationId}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('Réservation supprimée');
  });
});

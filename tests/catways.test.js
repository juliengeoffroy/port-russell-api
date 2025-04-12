const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

// Connexion à la base avant les tests
beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/port-russell-test', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
});

// Déconnexion après les tests
afterAll(async () => {
  await mongoose.connection.close();
});

describe('Catways API', () => {
  it('doit retourner une liste de catways', async () => {
    const res = await request(app).get('/api/catways');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it('doit créer un catway', async () => {
    const newCatway = {
      catwayNumber: 101,
      type: 'long',
      catwayState: 'bon état'
    };

    const res = await request(app).post('/api/catways').send(newCatway);
    expect(res.statusCode).toBe(201);
    expect(res.body.catwayNumber).toBe(101);
  });
});

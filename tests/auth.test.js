require('dotenv').config(); // 👈 Charge les variables .env dans ce fichier

const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const User = require('../models/User');

beforeAll(async () => {
  await mongoose.connect('mongodb://localhost:27017/port-russell-test');
  await User.deleteMany(); // nettoie la collection
});

afterAll(async () => {
  await mongoose.connection.db.dropDatabase();
  await mongoose.connection.close();
});

describe('Authentification API', () => {
  const testUser = {
    name: 'Test User',
    email: 'testuser@example.com',
    password: 'test123'
  };

  it('doit enregistrer un nouvel utilisateur', async () => {
    const res = await request(app)
      .post('/api/auth/register')
      .send(testUser);

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('Utilisateur créé avec succès');
  });

  it('doit connecter un utilisateur existant', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({
        email: testUser.email,
        password: testUser.password
      });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('token');
  });
});

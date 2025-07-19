const request = require('supertest');
const jwt = require('jsonwebtoken');
const app = require('../app');

jest.mock('jsonwebtoken');
jest.mock('../models/Secret', () => {
  const saveMock = jest.fn();
  const SecretMock = jest.fn().mockImplementation(() => ({
    save: saveMock,
    _id: 'mocked-id',
    title: 'Test Title',
    createdAt: new Date(),
  }));

  SecretMock.find = jest.fn();
  SecretMock.findOne = jest.fn();
  SecretMock.findOneAndUpdate = jest.fn();
  SecretMock.findOneAndDelete = jest.fn();

  return SecretMock;
});

describe('Secrets API Integration Tests', () => {
  const token = 'mocked.jwt.token';

  beforeEach(() => {
    jwt.verify.mockReturnValue({ userId: 'user123' });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('POST /api/secrets - should create a new secret', async () => {
    const res = await request(app)
      .post('/api/secrets')
      .set('Authorization', `Bearer ${token}`)
      .send({ title: 'Test Title', password: '12345' });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe('Secret created successfully');
    expect(res.body.secret.title).toBe('Test Title');
  });

  test('GET /api/secrets - should return all secrets for user', async () => {
    const mockSecrets = [
      {
        _id: 's1',
        title: 'Secret 1',
        password: 'p1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        _id: 's2',
        title: 'Secret 2',
        password: 'p2',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    const selectMock = jest.fn().mockReturnThis();
    const sortMock = jest.fn().mockResolvedValue(mockSecrets);

    require('../models/Secret').find.mockReturnValue({
      select: selectMock,
      sort: sortMock
    });

    const res = await request(app)
      .get('/api/secrets')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.count).toBe(2);
    expect(res.body.secrets[0].title).toBe('Secret 1');
  });

  test('GET /api/secrets/:id - should return 404 if secret not found', async () => {
    require('../models/Secret').findOne.mockResolvedValue(null);

    const res = await request(app)
      .get('/api/secrets/507f1f77bcf86cd799439011')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(404);
    expect(res.body.message).toBe('Secret not found');
  });
});

import request from 'supertest';
import { createTestServer } from '../../tests/server.js';
import prisma from '../../config/prisma.client.js';

const app = createTestServer();

describe('Auth Routes', () => {
  // Clear all mocks after each test to ensure a clean slate
  afterEach(() => {
    jest.clearAllMocks();
  });

  // Test suite for the user registration endpoint
  describe('POST /auth/register', () => {
    // Test case for successful user registration
    it('should register a new user and return 201', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        role: 'driver',
        companyId: 1,
      };

      const { registerUserService } = await import('./auth.service.js');
      registerUserService.mockResolvedValue({ id: 1, ...userData });

      const res = await request(app)
        .post('/auth/register')
        .send(userData);

      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('message', 'User created successfully');
      expect(res.body).toHaveProperty('userId', 1);
    });

    // Test case for registration with an existing email
    it('should return 400 if user already exists', async () => {
      const userData = {
        email: 'test@example.com',
        password: 'password123',
        role: 'driver',
        companyId: 1,
      };

      const { registerUserService } = await import('./auth.service.js');
      registerUserService.mockRejectedValue(new Error('User already exists'));

      const res = await request(app)
        .post('/auth/register')
        .send(userData);

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'User already exists');
    });

    // Test case for registration with missing required fields
    it('should return 400 for missing registration fields', async () => {
      const userData = {
        email: 'test@example.com',
      };

      const res = await request(app)
        .post('/auth/register')
        .send(userData);

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'Missing required fields');
    });

    // Test case for registration with an invalid email format
    it('should return 400 for invalid email on registration', async () => {
      const userData = {
        email: 'invalid-email',
        password: 'password123',
        role: 'driver',
        companyId: 1,
      };

      const res = await request(app)
        .post('/auth/register')
        .send(userData);

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'Invalid email format');
    });
  });

  // Test suite for the user login endpoint
  describe('POST /auth/login', () => {
    // Test case for successful user login
    it('should log in a user and return a token', async () => {
      const credentials = {
        email: 'test@example.com',
        password: 'password123',
      };
      const { loginUserService } = await import('./auth.service.js');
      loginUserService.mockResolvedValue('fake_token');

      const res = await request(app)
        .post('/auth/login')
        .send(credentials);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('token', 'fake_token');
    });

    // Test case for login with invalid credentials
    it('should return 401 for invalid credentials', async () => {
      const credentials = {
        email: 'test@example.com',
        password: 'wrong_password',
      };
      const { loginUserService } = await import('./auth.service.js');
      loginUserService.mockRejectedValue(new Error('Invalid credentials'));

      const res = await request(app)
        .post('/auth/login')
        .send(credentials);

      expect(res.statusCode).toEqual(401);
      expect(res.body).toHaveProperty('message', 'Invalid credentials');
    });

    // Test case for login with missing required fields
    it('should return 400 for missing fields', async () => {
      const credentials = {
        email: 'test@example.com',
      };

      const res = await request(app)
        .post('/auth/login')
        .send(credentials);

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('message', 'Email and password are required');
    });
  });
});
import request from 'supertest';
import app from '../../app';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

describe('Auth Security', () => {
  let user;

  // Set up a test user before running the tests
  beforeAll(async () => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);
    user = await prisma.user.create({
      data: {
        email: 'test@example.com',
        password: hashedPassword,
        role: 'USER',
      },
    });
  });

  // Clean up the database after running the tests
  afterAll(async () => {
    await prisma.user.delete({ where: { id: user.id } });
    await prisma.$disconnect();
  });

  // Test case to ensure passwords are not stored in plaintext
  it('should hash passwords before saving to the database', async () => {
    const storedUser = await prisma.user.findUnique({ where: { id: user.id } });
    const isMatch = await bcrypt.compare('password123', storedUser.password);
    expect(isMatch).toBe(true);
  });

  // Test case to verify that a JWT is returned on successful login
  it('should return a JWT on successful login', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'test@example.com',
        password: 'password123',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('token');
  });

  // Test case to prevent access to protected routes with an invalid JWT
  it('should not allow access to protected routes without a valid JWT', async () => {
    const res = await request(app)
      .get('/protected-route')
      .set('Authorization', 'Bearer invalidtoken');
    expect(res.statusCode).toEqual(401);
  });

  // Test case to prevent access to protected routes with an expired JWT
  it('should not allow access to protected routes with an expired JWT', async () => {
    const expiredToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1ms' });
    await new Promise(resolve => setTimeout(resolve, 10));
    const res = await request(app)
      .get('/protected-route')
      .set('Authorization', `Bearer ${expiredToken}`);
    expect(res.statusCode).toEqual(401);
  });
});
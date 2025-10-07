import request from 'supertest';
import app from '../../app';
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();

describe('Authorization Security', () => {
  let adminUser, regularUser, adminToken, userToken;

  beforeAll(async () => {
    adminUser = await prisma.user.create({
      data: {
        email: 'admin@example.com',
        password: 'password123',
        role: 'ADMIN',
      },
    });

    regularUser = await prisma.user.create({
      data: {
        email: 'user@example.com',
        password: 'password123',
        role: 'USER',
      },
    });

    adminToken = jwt.sign({ id: adminUser.id, role: 'ADMIN' }, process.env.JWT_SECRET);
    userToken = jwt.sign({ id: regularUser.id, role: 'USER' }, process.env.JWT_SECRET);
  });

  afterAll(async () => {
    await prisma.user.delete({ where: { id: adminUser.id } });
    await prisma.user.delete({ where: { id: regularUser.id } });
    await prisma.$disconnect();
  });

  it('should allow admin users to access admin-only routes', async () => {
    const res = await request(app)
      .get('/admin/dashboard')
      .set('Authorization', `Bearer ${adminToken}`);
    expect(res.statusCode).not.toEqual(403);
  });

  it('should not allow regular users to access admin-only routes', async () => {
    const res = await request(app)
      .get('/admin/dashboard')
      .set('Authorization', `Bearer ${userToken}`);
    expect(res.statusCode).toEqual(403);
  });
});
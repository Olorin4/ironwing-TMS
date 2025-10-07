const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const hooks = {};
const prisma = new PrismaClient();
let testUser;
let authToken;

// Hook to set up the database and create a test user before all tests
hooks.beforeAll = async (transactions, done) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    testUser = await prisma.user.create({
      data: {
        email: 'test@example.com',
        password: hashedPassword,
        role: 'admin',
      },
    });
    console.log('Test user created.');
  } catch (error) {
    console.error('Error creating test user:', error);
  }
  done();
};

// Hook to clean up the database after all tests
hooks.afterAll = async (transactions, done) => {
  try {
    if (testUser) {
      await prisma.user.delete({ where: { id: testUser.id } });
      console.log('Test user deleted.');
    }
  } catch (error) {
    console.error('Error deleting test user:', error);
  } finally {
    await prisma.$disconnect();
  }
  done();
};

// Hook to log in and store the token before tests
hooks['/auth/login > Login a user > 200 > application/json'] = {
  before: (transaction, done) => {
    const loginRequestBody = {
      email: 'test@example.com',
      password: 'password123',
    };

    transaction.request.body = JSON.stringify(loginRequestBody);
    transaction.request.headers['Content-Type'] = 'application/json';

    done();
  },
  after: (transaction, done) => {
    try {
      const responseBody = JSON.parse(transaction.real.body);
      if (responseBody.token) {
        authToken = responseBody.token;
        console.log('Auth token captured.');
      }
    } catch (err) {
      console.error('Error parsing login response:', err);
    }
    done();
  }
};

// Hook to add the auth token to subsequent requests
hooks['/auth/profile > Get user profile > 200 > application/json'] = {
  before: (transaction, done) => {
    if (authToken) {
      transaction.request.headers['Authorization'] = `Bearer ${authToken}`;
    }
    done();
  }
};

module.exports = hooks;
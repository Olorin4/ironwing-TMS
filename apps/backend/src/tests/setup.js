import { jest } from '@jest/globals';
import { mockDeep } from 'jest-mock-extended';

const mockPrisma = mockDeep();
mockPrisma.signUpForm = {
  create: jest.fn(),
};

jest.mock('../config/prisma.client.js', () => ({
  __esModule: true,
  default: mockPrisma,
  prisma: mockPrisma,
}));

jest.mock('../services/email.service.js', () => ({
  __esModule: true,
  emailClient: jest.fn(),
  emailAdmin: jest.fn(),
}));

jest.mock('../features/auth/auth.service.js', () => ({
  __esModule: true,
  registerUserService: jest.fn(),
  validateLoginService: jest.fn(),
}));
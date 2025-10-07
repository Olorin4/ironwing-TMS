import request from 'supertest';
import { jest } from '@jest/globals';

// Mock the service before importing the app that uses it
jest.unstable_mockModule('../src/features/forms/forms.service.js', () => ({
  submitSignUpForm: jest.fn(),
  submitContactForm: jest.fn(),
  fetchAllSignUpForms: jest.fn(),
  fetchAllContactForms: jest.fn(),
}));

const { default: app } = await import('../src/app.js');
const { submitSignUpForm } = await import('../src/features/forms/forms.service.js');

describe('Forms Security', () => {
  beforeEach(() => {
    // Reset mocks before each test
    submitSignUpForm.mockClear();
  });

  it('should not allow a POST request with a malicious script', async () => {
    submitSignUpForm.mockResolvedValue({ id: 1 });
    const res = await request(app)
      .post('/api/forms/sign-up-forms')
      .send({
        name: 'Test Form',
        formData: '<script>alert("xss")</script>',
      });
    expect(res.statusCode).toEqual(400);
  });

  it('should not allow a POST request with a SQL injection attempt', async () => {
    submitSignUpForm.mockResolvedValue({ id: 1 });
    const res = await request(app)
      .post('/api/forms/sign-up-forms')
      .send({
        name: 'Test Form',
        formData: "' OR 1=1 --",
      });
    expect(res.statusCode).toEqual(400);
  });

  it('should have CSRF protection', async () => {
    submitSignUpForm.mockResolvedValue({ id: 1 });
    const res = await request(app)
      .post('/api/forms/sign-up-forms')
      .send({
        name: 'Test Form',
        formData: 'Some data',
      });
    expect(res.headers['x-csrf-token']).toBeDefined();
  });

  it('should limit repeated requests to the same endpoint', async () => {
    submitSignUpForm.mockResolvedValue({ id: 1 });
    const agent = request.agent(app);
    for (let i = 0; i < 100; i++) {
      await agent.post('/api/forms/sign-up-forms').send({ name: 'Test Form', formData: 'Some data' });
    }
    const res = await agent.post('/api/forms/sign-up-forms').send({ name: 'Test Form', formData: 'Some data' });
    expect(res.statusCode).toEqual(429);
  });
});
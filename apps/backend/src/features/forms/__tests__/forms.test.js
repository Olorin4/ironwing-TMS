import request from 'supertest';
import { createTestServer } from '../../../tests/server.js';
import { submitSignUpForm } from '../forms.service.js';

jest.mock('../forms.service.js');

const app = createTestServer();

describe('Forms Routes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('POST /sign-up-forms', () => {
    it('should submit the form and return 200', async () => {
      const formData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        phone: '1234567890',
        fleetSize: '1-10',
        trailerType: 'Dry Van',
        plan: 'Standard',
      };

      submitSignUpForm.mockResolvedValue({ id: 1 });

      const res = await request(app)
        .post('/sign-up-forms')
        .send(formData);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('message', 'Form submitted successfully!');
      expect(res.body).toHaveProperty('id', 1);
    });

    it('should return 400 if required fields are missing', async () => {
      const formData = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
      };

      submitSignUpForm.mockRejectedValue(new Error('All fields are required.'));

      const res = await request(app)
        .post('/sign-up-forms')
        .send(formData);

      expect(res.statusCode).toEqual(500);
      expect(res.body).toHaveProperty('error', 'All fields are required.');
    });
  });

  it('should return 400 for invalid email format', async () => {
    const formData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe',
      phone: '1234567890',
      fleetSize: '1-10',
      trailerType: 'Dry Van',
      plan: 'Standard',
    };

    submitSignUpForm.mockRejectedValue(new Error('Invalid email format.'));

    const res = await request(app)
      .post('/sign-up-forms')
      .send(formData);

    expect(res.statusCode).toEqual(500);
    expect(res.body).toHaveProperty('error', 'Invalid email format.');
  });

  it('should return 500 for database errors', async () => {
    const formData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '1234567890',
      fleetSize: '1-10',
      trailerType: 'Dry Van',
      plan: 'Standard',
    };

    submitSignUpForm.mockRejectedValue(new Error('Database error'));

    const res = await request(app)
      .post('/sign-up-forms')
      .send(formData);

    expect(res.statusCode).toEqual(500);
    expect(res.body).toHaveProperty('error', 'Database error');
  });

  it('should return 400 for invalid phone number', async () => {
    const formData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '123',
      fleetSize: '1-10',
      trailerType: 'Dry Van',
      plan: 'Standard',
    };

    submitSignUpForm.mockRejectedValue(new Error('Invalid phone number format.'));

    const res = await request(app)
      .post('/sign-up-forms')
      .send(formData);

    expect(res.statusCode).toEqual(500);
    expect(res.body).toHaveProperty('error', 'Invalid phone number format.');
  });

  it('should return 400 for unsupported trailer type', async () => {
    const formData = {
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '1234567890',
      fleetSize: '1-10',
      trailerType: 'Unsupported',
      plan: 'Standard',
    };

    submitSignUpForm.mockRejectedValue(new Error('Unsupported trailer type.'));

    const res = await request(app)
      .post('/sign-up-forms')
      .send(formData);

    expect(res.statusCode).toEqual(500);
    expect(res.body).toHaveProperty('error', 'Unsupported trailer type.');
  });
});
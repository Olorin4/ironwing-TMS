import request from 'supertest';
import app from '../../app';

describe('Forms Security', () => {
  it('should not allow a POST request with a malicious script', async () => {
    const res = await request(app)
      .post('/forms')
      .send({
        name: 'Test Form',
        formData: '<script>alert("xss")</script>',
      });
    expect(res.statusCode).toEqual(400);
  });

  it('should not allow a POST request with a SQL injection attempt', async () => {
    const res = await request(app)
      .post('/forms')
      .send({
        name: 'Test Form',
        formData: "' OR 1=1 --",
      });
    expect(res.statusCode).toEqual(400);
  });

  it('should have CSRF protection', async () => {
    const res = await request(app)
      .post('/forms')
      .send({
        name: 'Test Form',
        formData: 'Some data',
      });
    expect(res.headers['x-csrf-token']).toBeDefined();
  });

  it('should limit repeated requests to the same endpoint', async () => {
    const agent = request.agent(app);
    for (let i = 0; i < 10; i++) {
      await agent.post('/forms').send({ name: 'Test Form', formData: 'Some data' });
    }
    const res = await agent.post('/forms').send({ name: 'Test Form', formData: 'Some data' });
    expect(res.statusCode).toEqual(429);
  });
});
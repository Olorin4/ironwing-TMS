import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 20 },
    { duration: '1m', target: 20 },
    { duration: '10s', target: 0 },
  ],
};

const BASE_URL = 'http://localhost:3000/api';

export default function () {
  const signUpPayload = JSON.stringify({
    firstName: 'Test',
    lastName: 'User',
    email: `user-${__VU}@example.com`,
    phone: '1234567890',
    fleetSize: '1-5',
    trailerType: 'Dry Van',
    plan: 'Standard',
  });

  const signUpParams = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const signUpRes = http.post(`${BASE_URL}/forms/sign-up-forms`, signUpPayload, signUpParams);
  check(signUpRes, { 'sign-up status was 201': (r) => r.status === 201 });

  sleep(1);

  const contactPayload = JSON.stringify({
    email: `user-${__VU}@example.com`,
    phone: '1234567890',
    message: 'This is a test message.',
  });

  const contactParams = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const contactRes = http.post(`${BASE_URL}/forms/contact-forms`, contactPayload, contactParams);
  check(contactRes, { 'contact status was 201': (r) => r.status === 201 });
}
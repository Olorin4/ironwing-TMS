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
  const registerPayload = JSON.stringify({
    email: `user-${__VU}@example.com`,
    password: 'password123',
    firstName: 'Test',
    lastName: 'User',
  });

  const registerParams = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const registerRes = http.post(`${BASE_URL}/auth/register`, registerPayload, registerParams);
  check(registerRes, { 'register status was 201': (r) => r.status === 201 });

  sleep(1);

  const loginPayload = JSON.stringify({
    email: `user-${__VU}@example.com`,
    password: 'password123',
  });

  const loginParams = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const loginRes = http.post(`${BASE_URL}/auth/login`, loginPayload, loginParams);
  check(loginRes, { 'login status was 200': (r) => r.status === 200 });
}
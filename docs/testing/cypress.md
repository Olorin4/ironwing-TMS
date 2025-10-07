# Cypress E2E Testing Guide

## 1. Overview

Cypress is used for End-to-End (E2E) testing to ensure the application works as expected from a user's perspective.

## 2. Setup

Cypress is already configured in the root `cypress.config.js` file.

## 3. Writing Tests

- Create test files inside the `src` folder of the app you are testing (e.g., `apps/desktop/src`).
- Co-locate your tests with your features (e.g., `apps/desktop/src/features/auth/auth.cy.jsx`).
- Use the `.cy.{js,jsx,ts,tsx}` extension for test files.
- Follow best practices for writing Cypress tests, such as using `data-cy` attributes for selecting elements.

## 4. Running Tests

To open the Cypress Test Runner for interactive testing, use the following command:

```bash
npm run test:e2e
```

This command is configured to run in interactive mode (`cypress open`). For headless execution in a CI/CD environment, you would use `cypress run`.
# Cypress E2E Testing Guide

## 1. Overview

Cypress is used for End-to-End (E2E) testing to ensure the application works as expected from a user's perspective.

## 2. Setup

Cypress is already configured in the root `cypress.config.js` file.

## 3. Writing Tests

- Create test files in the `cypress/e2e` directory.
- Use the `.cy.js` extension for test files.
- Follow best practices for writing Cypress tests, such as using `data-cy` attributes for selecting elements.

## 4. Running Tests

### Headless Mode

To run Cypress tests in headless mode, use the following command:

```bash
npm run cypress:run
```

### Interactive Mode

To open the Cypress Test Runner for interactive testing, use:

```bash
npm run cypress:open
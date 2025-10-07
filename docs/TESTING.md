# Ironwing TMS Testing Strategy

## 1. Overview

This document outlines the testing strategy for the Ironwing TMS project, ensuring software quality, reliability, and maintainability. Our goal is to establish a comprehensive testing culture where developers take ownership of quality at every stage of the development lifecycle.

## 2. Testing Pyramid

We follow the testing pyramid model to ensure a balanced and effective testing portfolio. The pyramid is divided into three layers:

- **Unit Tests (70%):** Form the foundation of our testing strategy, ensuring individual components and functions work correctly.
- **Integration Tests (20%):** Verify that different modules and services work together as expected.
- **End-to-End (E2E) Tests (10%):** Validate the complete application workflow from the user's perspective.

## 3. Testing Tools and Frameworks

- **Unit Testing:** [Jest](https://jestjs.io/)
- **Integration Testing:** [Jest](https://jestjs.io/), [Supertest](https://github.com/visionmedia/supertest)
- **E2E Testing:** [Cypress](https://www.cypress.io/)
- **Performance Testing:** [k6](https://k6.io/) (to be added after MVP is finished)
- **Security Testing:** [Snyk](https://snyk.io/), [auditjs](https://github.com/OSSIndex/auditjs) + ESLint security rules

## 4. Test Organization

Tests are co-located with the source code in `__tests__` directories. For example, the `Button` component in `packages/ui-components/src/` has its tests in `packages/ui-components/src/__tests__/`. E2E tests are located in the `cypress` directory.

## 5. Running Tests

### Unit and Integration Tests

Run unit and integration tests using the following command:

```bash
npm test
```

### E2E Tests

To run E2E tests, use the following command:

```bash
npm run cy:run
```

### API Contract Tests

To run the API contract tests, use the following command:

```bash
npm run test:contract
```

### Security Tests

To run the security tests, use the following command:

```bash
npm run test:security
```

## 6. CI/CD Integration

All tests are automatically executed in our CI/CD pipeline on every push to the repository. A build will not be deployed unless all tests pass.

## 7. Code Coverage

We aim for a minimum of 80% code coverage for all new code. Pull requests that do not meet this requirement will not be merged.

## 8. Best Practices

- Write clear and concise tests.
- Test one thing at a time.
- Use descriptive test names.
- Mock dependencies to isolate tests.
- Follow the AAA (Arrange, Act, Assert) pattern.
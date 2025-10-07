# CI/CD Testing Workflows

## 1. Overview

Our CI/CD pipeline automates the testing process to ensure that all code is validated before being deployed. We have three main workflows for testing: the main CI/CD pipeline, performance testing, and security testing.

## 2. Main CI/CD Pipeline

The main CI/CD pipeline is defined in the `.github/workflows/ci-cd-pipeline.yml` file. It is triggered on every push to the `master` branch and performs the following steps:

- **Build:** The application is built and dependencies are installed.
- **Test:** Unit and integration tests for the backend are run.
- **Deploy:** If the tests pass, the application is deployed.

## 3. Performance Testing

The performance testing workflow is defined in the `.github/workflows/performance-testing.yml` file. It is triggered on every push and pull request to the `master` and `develop` branches. This workflow runs our k6 performance tests to ensure that the application can handle the expected load.

## 4. Security Testing

The security testing workflow is defined in the `.github/workflows/security-testing.yml` file. It is triggered on every push and pull request to the `master` branch. This workflow runs our Snyk and auditjs security scans to identify and report any vulnerabilities.
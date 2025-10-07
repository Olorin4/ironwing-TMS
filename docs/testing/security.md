# Security Testing with Snyk and auditjs

## 1. Overview

We use Snyk and auditjs to continuously monitor our application for security vulnerabilities. These tools help us identify and fix security issues in our dependencies and code.

## 2. Snyk

Snyk is integrated into our CI/CD pipeline and runs automatically on every build. It scans our dependencies for known vulnerabilities and provides recommendations for remediation.

To run a manual Snyk scan, use the following command:

```bash
npx snyk test
```

## 3. auditjs

auditjs is used for auditing our frontend dependencies for known security vulnerabilities. To run an audit, use the following command:

```bash
npm audit
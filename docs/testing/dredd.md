# Dredd API Contract Testing Guide

## 1. Overview

Dredd is a command-line tool for validating an API description against its backend implementation. We use Dredd to ensure our API implementation matches the `openapi.yaml` specification.

## 2. Setup

Dredd is configured in the `dredd.yml` file in the `apps/backend` directory. The configuration specifies the API description file, the server URL, and any necessary hooks.

## 3. Writing Hooks

Dredd hooks are used to set up and tear down test fixtures, such as creating a user before a test and deleting it afterward. Hooks are written in JavaScript and are located in the `dredd-hooks.js` file.

## 4. Running Tests

To run Dredd tests, navigate to the `apps/backend` directory and use the following command:

```bash
npm run test:contract
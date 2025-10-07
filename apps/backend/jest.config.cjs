const sharedConfig = require('../../jest.config.cjs');

module.exports = {
  ...sharedConfig,
  rootDir: '.',
  testEnvironment: 'node',
  setupFilesAfterEnv: ['<rootDir>/src/tests/setup.js'],
};
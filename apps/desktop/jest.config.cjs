const sharedConfig = require('../../jest.config.cjs');

module.exports = {
  ...sharedConfig,
  rootDir: '.',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
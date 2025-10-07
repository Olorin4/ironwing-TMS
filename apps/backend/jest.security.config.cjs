module.exports = {
  testEnvironment: 'node',
  testMatch: ['**/*.security.test.js'],
  setupFilesAfterEnv: ['./security/jest.setup.js'],
  reporters: [
    'default',
    [
      'jest-html-reporters',
      {
        publicPath: './html-report',
        filename: 'security-report.html',
        expand: true,
      },
    ],
  ],
};
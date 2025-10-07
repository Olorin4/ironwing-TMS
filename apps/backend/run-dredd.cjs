const Dredd = require('dredd');
const path = require('path');
const hooks = require('./dredd-hooks.cjs');

const dreddConfig = {
  // The URL of your API backend
  endpoint: 'http://localhost:3000',

  // The path to your API description document
  apiDescriptions: [path.join(__dirname, 'openapi.yaml')],

  // Language for hooks
  language: 'nodejs',

  // Path to hooks files
  hookfiles: [path.join(__dirname, 'dredd-hooks.cjs')],

  // Set to true to fail tests when API description is invalid
  checkApiDescription: true,

  // Set a custom header for all requests
  header: ['X-Client-Type: dredd'],

  // The command to start your API backend server
  server: 'npm run dev',

  // Pass the hooks object directly
  hooks: hooks
};

const dredd = new Dredd(dreddConfig);

dredd.run((err, stats) => {
  if (err) {
    console.error('Dredd run failed:', err);
    process.exit(1);
  }

  if (stats.failures > 0 || stats.errors > 0) {
    console.error('Dredd tests failed.');
    process.exit(1);
  } else {
    console.log('Dredd tests passed.');
    process.exit(0);
  }
});
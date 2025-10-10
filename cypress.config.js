import { defineConfig } from "cypress";

export default defineConfig({
    e2e: {
        setupNodeEvents() {
            // implement node event listeners here
        },
        specPattern: "apps/**/src/**/*.cy.{js,jsx,ts,tsx}",
        supportFile: "cypress/support/e2e.js",
        fixturesFolder: "cypress/fixtures",
        screenshotsFolder: "cypress/screenshots",
        videosFolder: "cypress/videos",
    },
});

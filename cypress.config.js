import { defineConfig } from "cypress";
import { exec } from "child_process";

export default defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here
        },
        baseUrl: "http://localhost:5173",
        specPattern: [
            "apps/**/src/**/*.cy.{js,jsx,ts,tsx}",
            "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
        ],
        supportFile: "cypress/support/e2e.js",
        fixturesFolder: "cypress/fixtures",
        screenshotsFolder: "cypress/screenshots",
        videosFolder: "cypress/videos",
    },
});

export default {
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.(js|jsx)$": "babel-jest",
    },
    setupFilesAfterEnv: ["<rootDir>/src/__tests__/setup.js"],
    testMatch: ["**/?(*.)+(spec|test).js?(x)"],
};

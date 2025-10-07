export default {
    testEnvironment: "node",
    transform: {
        "^.+\\.js$": "babel-jest",
    },
    setupFilesAfterEnv: ["<rootDir>/src/__tests__/setup.js"],
    testMatch: ["**/?(*.)+(spec|test).js?(x)"],
};

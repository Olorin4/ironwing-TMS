export default {
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.(js|jsx)$": "babel-jest",
    },
    moduleNameMapper: {
        "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    },
    setupFilesAfterEnv: ["<rootDir>/src/__tests__/setup.js"],
    testMatch: ["**/?(*.)+(spec|test).js?(x)"],
};

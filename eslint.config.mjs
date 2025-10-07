import globals from "globals";
import pluginJs from "@eslint/js";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";
import security from "eslint-plugin-security";
import tsParser from "@typescript-eslint/parser";
import reactPlugin from "eslint-plugin-react";
import cypressPlugin from "eslint-plugin-cypress";

export default [
    {
        // Global language options
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                ...globals.node, // Node.js globals for backend
            },
        },
    },
    // Standard recommended configs
    pluginJs.configs.recommended,
    eslintPluginPrettier,
    security.configs.recommended,
    {
        rules: {
            // General ESLint rules
            "no-unused-vars": "warn",
            "no-undef": "error",
            "arrow-body-style": ["error", "as-needed"],
        },
    },
    // Backend-specific configuration (Root directory files)
    {
        files: ["apps/*/src/**/*.js", "packages/**/*.js"],
        languageOptions: {
            globals: globals.node,
        },
        rules: {
            "no-console": "off", // Allow console logs in backend
            "global-require": "error", // Enforce `require` at top level
        },
    },
    // Jest test files configuration
    {
        files: ["**/*.test.js", "**/*.test.jsx", "**/__tests__/**/*.js"],
        languageOptions: {
            globals: {
                ...globals.jest,
            },
        },
    },
    // Cypress test files configuration
    {
        files: ["**/*.cy.js", "**/*.cy.jsx"],
        ...cypressPlugin.configs.recommended,
    },
    // TypeScript files configuration
    {
        files: ["**/*.ts", "**/*.tsx"],
        languageOptions: {
            parser: tsParser,
        },
    },
    // React/JSX files configuration
    {
        files: ["**/*.js", "**/*.jsx"],
        plugins: {
            react: reactPlugin,
        },
        languageOptions: {
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
            globals: {
                ...globals.browser,
            },
        },
        rules: {
            ...reactPlugin.configs.recommended.rules,
            "react/react-in-jsx-scope": "off", // Not needed with modern React
        },
        settings: {
            react: {
                version: "detect",
            },
        },
    },
];

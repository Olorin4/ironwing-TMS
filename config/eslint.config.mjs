import globals from "globals";
import pluginJs from "@eslint/js";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";

export default [
    {
        // Global language options
        languageOptions: {
            globals: {
                ...globals.node, // Node.js globals for backend
            },
        },
    },
    // Standard recommended configs
    pluginJs.configs.recommended,
    eslintPluginPrettier,
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
];

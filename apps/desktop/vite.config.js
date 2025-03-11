/* Vite configuration file for the desktop app. */

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
    plugins: [react()],
    server: {
        port: 5173, // Ensure this port is the same as in Electron
        strictPort: true,
    },
    build: {
        outDir: "dist",
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
    },
});

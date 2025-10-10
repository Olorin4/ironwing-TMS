/* Main entry point for Electron app. 
Loads the Vite development server in dev mode and the production build in 
production mode. */

import { app, BrowserWindow } from "electron";
import path from "path";

let mainWindow;

app.whenReady().then(() => {
    mainWindow = new BrowserWindow({
        width: 1280,
        height: 800,
        webPreferences: {
            nodeIntegration: false, // Improve security
            contextIsolation: true,
        },
    });

    if (process.env.NODE_ENV === "development") {
        mainWindow.loadURL("http://localhost:5173"); // Load Vite dev server
    } else {
        mainWindow.loadFile(path.join(__dirname, "../dist/index.html")); // Load production build
    }
});

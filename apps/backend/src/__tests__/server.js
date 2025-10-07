import express from "express";
import authRoutes from "../features/auth/auth.routes.js";
import formsRoutes from "../features/forms/forms.routes.js";

import bodyParser from "body-parser";

export function createTestServer() {
    const app = express();
    app.use(bodyParser.json());
    app.use(express.json());
    app.use("/auth", authRoutes);
    app.use("/", formsRoutes);
    return app;
}

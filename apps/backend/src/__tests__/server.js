import express from "express";
import dotenv from "dotenv-flow";
import cookieParser from "cookie-parser";
import passport from "../config/passport.js";
import apiRouter from "../routes.js";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import { defineAbilities } from "../features/auth/auth.middleware.js";

dotenv.config({ silent: true });

export function createTestServer() {
    const app = express();
    // --- Security Middleware ---
    app.use(helmet());
    app.set("trust proxy", 1);
    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100,
        standardHeaders: true,
        legacyHeaders: false,
    });
    app.use(limiter);
    // --- Core Middleware ---
    app.use(express.json());
    app.use(cookieParser());
    app.use(passport.initialize());
    app.use(defineAbilities);
    // Register API Routes
    app.use("/api", apiRouter);
    // Fallback Route for Not Found
    app.use((req, res) => res.status(404).json({ error: "Not Found" }));
    // Error Handling Middleware
    app.use((err, req, res, next) => {
        console.error(err.stack);
        res.status(500).json({ error: "Internal Server Error" });
    });
    return app;
}

// src/app.js

import express from "express";
import dotenv from "dotenv-flow";
import cookieParser from "cookie-parser";
import session from "express-session";
import passport from "./config/passport.js";
import apiRouter from "./routes.js";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import csurf from "csurf";
import { body, validationResult } from "express-validator";
import { defineAbilities } from "./features/auth/auth.middleware.js";

console.log("Database URL:", process.env.DB_URL);
const app = express();
const PORT = process.env.PORT || 3000;

// --- Security Middleware ---
app.use(helmet()); // Set various security HTTP headers
app.set("trust proxy", 1); // Trust the first proxy

// Rate limiting to prevent brute-force attacks
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 10, // Limit each IP to 10 requests per windowMs
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});
app.use(limiter);


// --- Core Middleware ---
app.use(express.json());
app.use(cookieParser()); // Parse cookies from incoming requests
app.use(passport.initialize()); // Initialize Passport globally
app.use(defineAbilities); // Attach user abilities to each request

// Session Middleware
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: true,
		cookie: { secure: process.env.NODE_ENV === "production" },
	})
);

app.get("/", (req, res) => res.send("Iron Wing API is working!"));

// Register API Routes
app.use("/api", apiRouter);

// CSRF Protection
const csrfProtection = csurf({ cookie: true });
app.use(csrfProtection);

app.use((req, res, next) => {
	res.cookie("XSRF-TOKEN", req.csrfToken());
	next();
});

// Fallback Route for Not Found
app.use((req, res) => res.status(404).json({ error: "Not Found" }));
// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error" });
});

// Start Server
if (process.env.NODE_ENV !== "test") {
	app.listen(PORT, "0.0.0.0", () =>
		console.log(`Iron Wing Server running at http://0.0.0.0:${PORT}`)
	);
}

export default app;

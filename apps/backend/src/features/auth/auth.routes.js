import express from "express";
import passport from "../../config/passport.js";
import {
    registerUser,
    login,
    logout,
    getProfile,
} from "./auth.controller.js";

const authRouter = express.Router();

// Unified Authentication Routes
authRouter.post("/register", registerUser);
authRouter.post("/login", login);

// A unified logout for the desktop client to clear the cookie.
// Mobile clients will handle logout by deleting the token from secure storage.
authRouter.post("/logout", logout);

// A single protected route for both clients
authRouter.get(
    "/profile",
    passport.authenticate("jwt", { session: false }),
    getProfile
);

export default authRouter;

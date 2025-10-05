//authController.js

import jwt from "jsonwebtoken";
import { privateKey } from "../../config/generateKeys.js";
import { registerUserService, validateLoginService } from "../../services/authService.js";

export async function registerUser(req, res) {
    try {
        const { email, password, role, companyId } = req.body;
        const newUser = await registerUserService({ email, password, role, companyId });
        res.status(201).json({
            message: "User created successfully",
            userId: newUser.id,
        });
    } catch (error) {
        console.error("Register Error:", error.message);
        if (error.message === "User already exists") {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({ error: "Error creating user" });
    }
}

// Login for mobile users
export async function loginJWT(req, res) {
    try {
        const { email, password } = req.body;
        const user = await validateLoginService({ email, password });

        const token = jwt.sign({ id: user.id, email: user.email }, privateKey, {
            algorithm: "RS256",
            expiresIn: "14d",
        });

        res.status(200).json({ token });
    } catch (error) {
        console.error("JWT Login Error:", error.message);
        res.status(400).json({ message: error.message });
    }
}

// Session-based Login for desktop users
export async function loginSession(req, res) {
    console.log("Session Login Attempt:", req.body.email);
    if (!req.user) {
        console.error("Session Login Failed: No user found");
        return res.status(401).json({ message: "Invalid credentials" });
    }

    console.log("Session Login Success:", req.user);
    res.json({ user: req.user });
}

export async function logoutSession(req, res, next) {
    if (!req.isAuthenticated()) {
        return res
            .status(401)
            .json({ message: "Unauthorized - Not logged in" });
    }
    req.logout((err) => {
        if (err) return res.status(500).json({ error: "Logout failed" });
        req.session.destroy((err) => {
            if (err)
                return res
                    .status(500)
                    .json({ error: "Failed to destroy session" });
            res.json({ message: "Logged out successfully" });
        });
    });
}

export async function getProfile(req, res) {
    if (!req.user)
        return res.status(401).json({ message: "Unauthorized: No user found" });

    console.log("Authenticated user:", req.user);
    res.json({ user: req.user });
}

export function isAdmin(req, res, next) {}

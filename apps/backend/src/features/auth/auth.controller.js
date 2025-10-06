import jwt from "jsonwebtoken";
import { privateKey } from "../../config/keys.generator.js";
import { registerUserService, validateLoginService } from "./auth.service.js";

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

// Unified login for both desktop and mobile clients
export async function login(req, res) {
    try {
        const { email, password } = req.body;
        const user = await validateLoginService({ email, password });

        const token = jwt.sign({ id: user.id, email: user.email }, privateKey, {
            algorithm: "RS256",
            expiresIn: "14d",
        });

        // For the Electron desktop app, set the token in a secure, HttpOnly cookie.
        // For the mobile app, it will be sent in the response body.
        const clientType = req.get("X-Client-Type");
        if (clientType === "desktop") {
            res.cookie("jwt", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: "strict",
                maxAge: 1000 * 60 * 60 * 24 * 14, // 14 days
            });
            res.status(200).json({ user });
        } else {
            res.status(200).json({ token, user });
        }
    } catch (error) {
        console.error("Login Error:", error.message);
        res.status(400).json({ message: error.message });
    }
}

// For the desktop client, logout by clearing the HttpOnly cookie.
// Mobile clients handle logout by deleting the token from their secure storage.
export async function logout(req, res) {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json({ message: "Logged out successfully" });
}

export async function getProfile(req, res) {
    if (!req.user)
        return res.status(401).json({ message: "Unauthorized: No user found" });

    console.log("Authenticated user:", req.user);
    res.json({ user: req.user });
}

export function isAdmin(req, res, next) {}

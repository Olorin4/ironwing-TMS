// src/middleware/auth.middleware.js

export function checkAuthenticated(req, res, next) {
    if (!req.isAuthenticated()) {
        return res.status(401).json({ message: "Unauthorized: Please log in" });
    }
    next();
}
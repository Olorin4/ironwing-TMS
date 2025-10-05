import { defineAbilitiesFor } from "./auth.abilities.js";

// Middleware to attach user's abilities to the request object
export function defineAbilities(req, res, next) {
	req.ability = defineAbilitiesFor(req.user);
	next();
}
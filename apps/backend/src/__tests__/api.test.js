import request from "supertest";
import app from "../app.js"; // Import the configured Express app

describe("API Endpoints", () => {
	// Test for the root endpoint
	describe("GET /", () => {
		it("should return a 200 OK status and a welcome message", async () => {
			const response = await request(app).get("/");
			expect(response.statusCode).toBe(200);
			expect(response.text).toBe("Iron Wing API is working!");
		});
	});

	// Test for a non-existent route to check 404 handling
	describe("GET /non-existent-route", () => {
		it("should return a 404 Not Found status", async () => {
			const response = await request(app).get("/non-existent-route");
			expect(response.statusCode).toBe(404);
			expect(response.body).toEqual({ error: "Not Found" });
		});
	});
});
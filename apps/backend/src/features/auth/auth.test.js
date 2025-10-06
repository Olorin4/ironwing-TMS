import request from "supertest";
import app from "../../app.js";
import { prisma } from "../../config/prisma.client.js";

describe("Auth API Endpoints", () => {
	// Clean up the database after each test
	afterEach(async () => {
		await prisma.user.deleteMany();
	});

	// Clean up the database connection pool
	afterAll(async () => {
		await prisma.$disconnect();
	});

	describe("POST /api/auth/register", () => {
		it("should register a new user successfully", async () => {
			const res = await request(app).post("/api/auth/register").send({
				email: "test@example.com",
				password: "password123",
				role: "DISPATCHER",
			});
			expect(res.statusCode).toEqual(201);
			expect(res.body).toHaveProperty("message", "User created successfully");
		});

		it("should return a 400 error if the user already exists", async () => {
			// First, create the user
			await request(app).post("/api/auth/register").send({
				email: "test@example.com",
				password: "password123",
				role: "DISPATCHER",
			});

			// Then, try to create the same user again
			const res = await request(app).post("/api/auth/register").send({
				email: "test@example.com",
				password: "password123",
				role: "DISPATCHER",
			});
			expect(res.statusCode).toEqual(400);
			expect(res.body).toHaveProperty("message", "User already exists");
		});
	});

	describe("POST /api/auth/login", () => {
		beforeEach(async () => {
			// Create a user to log in with
			await request(app).post("/api/auth/register").send({
				email: "login@example.com",
				password: "password123",
				role: "DISPATCHER",
			});
		});

		describe("Mobile Client", () => {
			it("should return a JWT token in the body", async () => {
				const res = await request(app).post("/api/auth/login").send({
					email: "login@example.com",
					password: "password123",
				});
				expect(res.statusCode).toEqual(200);
				expect(res.body).toHaveProperty("token");
				expect(res.headers["set-cookie"]).toBeUndefined();
			});
		});

		describe("Desktop Client", () => {
			it("should return a JWT in an HttpOnly cookie", async () => {
				const res = await request(app)
					.post("/api/auth/login")
					.set("X-Client-Type", "desktop")
					.send({
						email: "login@example.com",
						password: "password123",
					});
				expect(res.statusCode).toEqual(200);
				expect(res.body).not.toHaveProperty("token");
				expect(res.headers["set-cookie"]).toBeDefined();
				expect(res.headers["set-cookie"]).toContain("jwt=");
				expect(res.headers["set-cookie"]).toContain("HttpOnly");
			});
		});

		it("should return a 400 error for invalid credentials", async () => {
			const res = await request(app).post("/api/auth/login").send({
				email: "login@example.com",
				password: "wrongpassword",
			});
			expect(res.statusCode).toEqual(400);
			expect(res.body).toHaveProperty("message", "Invalid credentials");
		});
	});
});
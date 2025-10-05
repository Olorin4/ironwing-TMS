import request from "supertest";
import app from "../../app.js";
import { prisma } from "../../config/prisma.client.js";
import * as emailService from "../../services/email.service.js";

// Mock the email service
jest.mock("../../services/email.service.js");

describe("Forms API Endpoints", () => {
	beforeEach(() => {
		// Reset mocks before each test
		jest.clearAllMocks();
	});

	describe("POST /api/forms/sign-up-forms", () => {
		it("should submit the form successfully and send emails", async () => {
			// Mock the prisma create function to avoid writing to the DB for this test
			prisma.signUpForm.create = jest.fn().mockResolvedValue({ id: "test-id" });

			const formData = {
				firstName: "John",
				lastName: "Doe",
				email: "john.doe@example.com",
				phone: "1234567890",
				fleetSize: "5-10",
				trailerType: "Dry Van",
				plan: "Standard",
			};

			const response = await request(app)
				.post("/api/forms/sign-up-forms")
				.send(formData);

			expect(response.statusCode).toBe(200);
			expect(response.body).toEqual({
				message: "Form submitted successfully!",
				id: "test-id",
			});

			// Verify that prisma was called correctly
			expect(prisma.signUpForm.create).toHaveBeenCalledWith({
				data: {
					first_name: "John",
					last_name: "Doe",
					email: "john.doe@example.com",
					phone: "1234567890",
					fleet_size: "5-10",
					trailer_type: "Dry Van",
					plan: "Standard",
					status: "pending",
				},
			});

			// Verify that the email functions were called
			expect(emailService.emailClient).toHaveBeenCalledTimes(1);
			expect(emailService.emailAdmin).toHaveBeenCalledTimes(1);
		});

		it("should return a 400 error if required fields are missing", async () => {
			const formData = {
				firstName: "John",
				lastName: "Doe",
				// Missing email and other fields
			};

			const response = await request(app)
				.post("/api/forms/sign-up-forms")
				.send(formData);

			expect(response.statusCode).toBe(400);
			expect(response.body).toEqual({ error: "All fields are required." });

			// Ensure no emails were sent on failure
			expect(emailService.emailClient).not.toHaveBeenCalled();
			expect(emailService.emailAdmin).not.toHaveBeenCalled();
		});
	});
});
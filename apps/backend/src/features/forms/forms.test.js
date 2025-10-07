import request from "supertest";
import { createTestServer } from "../../__tests__/server.js";
import prisma from "../../config/prisma.client.js";
import { emailClient, emailAdmin } from "../../services/email.service.js";

const app = createTestServer();

describe("Forms Routes", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("POST /sign-up-forms", () => {
        it("should submit the form and return 200", async () => {
            const formData = {
                firstName: "John",
                lastName: "Doe",
                email: "john.doe@example.com",
                phone: "1234567890",
                fleetSize: "1-10",
                trailerType: "Dry Van",
                plan: "Standard",
            };

            prisma.signUpForm.create.mockResolvedValue({ id: 1, ...formData });

            const res = await request(app)
                .post("/sign-up-forms")
                .send(formData);

            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty(
                "message",
                "Form submitted successfully!"
            );
            expect(res.body).toHaveProperty("id", 1);
            expect(emailClient).toHaveBeenCalled();
            expect(emailAdmin).toHaveBeenCalled();
        });

        it("should return 400 if required fields are missing", async () => {
            const formData = {
                firstName: "John",
                lastName: "Doe",
                email: "john.doe@example.com",
            };

            const res = await request(app)
                .post("/sign-up-forms")
                .send(formData);

            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty(
                "error",
                "All fields are required."
            );
        });
    });
});

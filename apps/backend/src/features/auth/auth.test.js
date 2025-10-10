import request from "supertest";
import { createTestServer } from "../../__tests__/server.js";
import { registerUserService } from "./auth.service.js";

jest.mock("./auth.service.js");

const app = createTestServer();

describe("Auth Routes", () => {
    afterEach(() => {
        jest.clearAllMocks();
    });
    describe("POST /auth/register", () => {
        it("should register a new user and return 201", async () => {
            const userData = {
                email: "test@example.com",
                password: "password123",
                role: "driver",
                companyId: 1,
            };

            registerUserService.mockResolvedValue({ id: 1, ...userData });
            const res = await request(app)
                .post("/api/auth/register")
                .send(userData);
            expect(res.statusCode).toEqual(201);
            expect(res.body).toHaveProperty(
                "message",
                "User created successfully"
            );
            expect(res.body).toHaveProperty("userId", 1);
        });

        it("should return 400 if user already exists", async () => {
            const userData = {
                email: "test@example.com",
                password: "password123",
                role: "driver",
                companyId: 1,
            };

            registerUserService.mockRejectedValue(
                new Error("User already exists")
            );
            const res = await request(app)
                .post("/api/auth/register")
                .send(userData);
            expect(res.statusCode).toEqual(400);
            expect(res.body).toHaveProperty("message", "User already exists");
        });
    });
});

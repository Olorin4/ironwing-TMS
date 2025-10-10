import request from "supertest";
import { createTestServer } from "../../../__tests__/server.js";
import jwt from "jsonwebtoken";
import { privateKey } from "../../../config/keys.generator.js";
import { prisma } from "../../../config/prisma.client.js";

const app = createTestServer();

describe("/api/auth/profile route", () => {
    const testUser = {
        id: 9999,
        email: "test@example.com",
        password: "$2a$10$testhash",
        role: "ADMIN",
    };
    beforeAll(async () => {
        // Mock the prisma client to return the test user
        prisma.user.findUnique.mockResolvedValue(testUser);
    });

    it("should return 401 if no token is provided", async () => {
        const res = await request(app).get("/api/auth/profile");
        expect(res.statusCode).toBe(401);
    });

    it("should return user profile if valid JWT is provided", async () => {
        const token = jwt.sign(
            { id: testUser.id, email: testUser.email },
            privateKey,
            { algorithm: "RS256", expiresIn: "1h" }
        );
        const res = await request(app)
            .get("/api/auth/profile")
            .set("Authorization", `Bearer ${token}`);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("user");
        expect(res.body.user).toMatchObject({
            id: testUser.id,
            email: testUser.email,
            role: testUser.role,
        });
    });
});

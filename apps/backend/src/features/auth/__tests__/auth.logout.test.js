
import request from "supertest";
import { createTestServer } from "../../../__tests__/server.js";

describe("POST /api/auth/logout", () => {
    const app = createTestServer();

    it("should clear the jwt cookie and return 200", async () => {
        const res = await request(app).post("/api/auth/logout").set("Cookie", ["jwt=some-token"]);
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("message", "Logged out successfully");
        // Check that the cookie is cleared
        expect(res.headers["set-cookie"]).toBeDefined();
        expect(res.headers["set-cookie"][0]).toMatch(/jwt=;/);
    });
});

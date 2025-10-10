import { defineAbilities } from "../auth.middleware.js";

describe("defineAbilities middleware", () => {
    it("should attach ability to req based on user", () => {
        const req = { user: { role: "ADMIN" } };
        const res = {};
        const next = jest.fn();
        defineAbilities(req, res, next);
        expect(req.ability).toBeDefined();
        expect(req.ability.can("manage", "all")).toBe(true);
        expect(next).toHaveBeenCalled();
    });

    it("should attach guest ability if no user", () => {
        const req = {};
        const res = {};
        const next = jest.fn();
        defineAbilities(req, res, next);
        expect(req.ability).toBeDefined();
        expect(req.ability.can("read", "all")).toBe(true);
        expect(next).toHaveBeenCalled();
    });
});

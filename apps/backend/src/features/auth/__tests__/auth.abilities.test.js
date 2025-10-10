import { defineAbilitiesFor } from "../auth.abilities.js";
import { subject } from "@casl/ability";

describe("defineAbilitiesFor", () => {
    it("should allow guests to read all", () => {
        const ability = defineAbilitiesFor(null);
        expect(ability.can("read", "all")).toBe(true);
        expect(ability.can("manage", "all")).toBe(false);
    });

    it("should allow ADMIN to manage all", () => {
        const ability = defineAbilitiesFor({ role: "ADMIN" });
        expect(ability.can("manage", "all")).toBe(true);
    });

    it("should allow DISPATCHER to manage jobs and drivers", () => {
        const ability = defineAbilitiesFor({ role: "DISPATCHER" });
        expect(ability.can("manage", "Job")).toBe(true);
        expect(ability.can("manage", "Driver")).toBe(true);
        expect(ability.can("read", "User")).toBe(true);
        expect(ability.can("manage", "all")).toBe(false);
    });

    it("should allow DRIVER to read and update only their own jobs", () => {
        const ability = defineAbilitiesFor({ role: "DRIVER", id: 42 });
        const ownJob = subject("Job", { assignedDriverId: 42 });
        const otherJob = subject("Job", { assignedDriverId: 99 });
        expect(ability.can("read", ownJob)).toBe(true);
        expect(ability.can("update", ownJob)).toBe(true);
        expect(ability.can("read", otherJob)).toBe(false);
        expect(ability.can("update", otherJob)).toBe(false);
    });

    it("should default to read all for unknown roles", () => {
        const ability = defineAbilitiesFor({ role: "UNKNOWN" });
        expect(ability.can("read", "all")).toBe(true);
        expect(ability.can("manage", "all")).toBe(false);
    });
});

import { defineAbilitiesFor } from "./abilities.js";

describe("Authorization Abilities", () => {
	describe("Guest User (not logged in)", () => {
		it("should be able to read all", () => {
			const ability = defineAbilitiesFor(null);
			expect(ability.can("read", "all")).toBe(true);
			expect(ability.can("manage", "all")).toBe(false);
		});
	});

	describe("Admin User", () => {
		it("should be able to manage all", () => {
			const adminUser = { id: 1, role: "ADMIN" };
			const ability = defineAbilitiesFor(adminUser);
			expect(ability.can("manage", "all")).toBe(true);
			expect(ability.can("delete", "User")).toBe(true);
		});
	});

	describe("Dispatcher User", () => {
		it("should be able to manage Jobs and Drivers", () => {
			const dispatcherUser = { id: 2, role: "DISPATCHER" };
			const ability = defineAbilitiesFor(dispatcherUser);
			expect(ability.can("manage", "Job")).toBe(true);
			expect(ability.can("manage", "Driver")).toBe(true);
			expect(ability.can("read", "User")).toBe(true);
		});

		it("should NOT be able to manage other resources", () => {
			const dispatcherUser = { id: 2, role: "DISPATCHER" };
			const ability = defineAbilitiesFor(dispatcherUser);
			expect(ability.can("delete", "User")).toBe(false);
			expect(ability.can("manage", "Billing")).toBe(false);
		});
	});

	describe("Driver User", () => {
		it("should be able to read and update their own jobs", () => {
			const driverUser = { id: 3, role: "DRIVER" };
			const ability = defineAbilitiesFor(driverUser);
			const ownJob = { assignedDriverId: 3 };
			const otherJob = { assignedDriverId: 99 };

			expect(ability.can("read", "Job", ownJob)).toBe(true);
			expect(ability.can("update", "Job", ownJob)).toBe(true);
		});

		it("should NOT be able to interact with other drivers' jobs", () => {
			const driverUser = { id: 3, role: "DRIVER" };
			const ability = defineAbilitiesFor(driverUser);
			const otherJob = { assignedDriverId: 99 };

			expect(ability.can("read", "Job", otherJob)).toBe(false);
			expect(ability.can("update", "Job", otherJob)).toBe(false);
			expect(ability.can("delete", "Job", otherJob)).toBe(false);
		});
	});
});
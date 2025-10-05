import { AbilityBuilder, Ability } from "@casl/ability";

// Defines how to build abilities for a given user
export function defineAbilitiesFor(user) {
	const { can, cannot, build } = new AbilityBuilder(Ability);

	if (!user) {
		// Abilities for a guest user (not logged in)
		can("read", "all"); // Example: guests can read public content
		return build();
	}

	// Define abilities based on user role
	switch (user.role) {
		case "ADMIN":
			// Admin can do anything
			can("manage", "all");
			break;
		case "DISPATCHER":
			// Dispatchers can manage jobs and drivers
			can("manage", "Job");
			can("manage", "Driver");
			can("read", "User");
			break;
		case "DRIVER":
			// Drivers can only read and update their own assigned jobs
			can("read", "Job", { assignedDriverId: user.id });
			can("update", "Job", { assignedDriverId: user.id });
			break;
		default:
			// Default abilities for a standard logged-in user
			can("read", "all");
			break;
	}

	return build();
}
describe("Authentication", () => {
    beforeEach(() => {
        cy.visit("http://localhost:5173"); // Assuming the desktop app runs on this port
        cy.contains("h1", "Login").should("be.visible");
    });

    it("should allow a user to log in and out", () => {
        cy.log("Starting login test");
        cy.intercept("POST", "http://localhost:3000/api/auth/login", {
      statusCode: 200,
      body: {
        user: {
          id: 1,
          email: "testuser@example.com",
        },
      },
    }).as("loginRequest");

        // Find and type in the username and password fields
        cy.get('input[name="email"]').type("testuser@example.com");
        cy.get('input[name="password"]').type("password");

        // Click the login button
        cy.get('[data-cy="login-button"]').click();

        cy.wait("@loginRequest");

        cy.wait(1000); // Wait for the UI to update

        // Assert that the user is logged in
        // This could be checking for a welcome message, a change in the URL, or the presence of a logout button.
        cy.get('[data-cy="welcome-message"]').should(
      "contain",
      "Welcome, testuser@example.com"
    );

        // Click the logout button
        cy.get("button#logout").click();

        // Assert that the user is logged out
        // This could be checking for the login form to be visible again.
        cy.get('input[name="email"]').should("be.visible");
    });
});
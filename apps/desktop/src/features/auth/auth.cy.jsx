describe("Desktop App", () => {
    it("should have a heading", () => {
        cy.visit("http://localhost:5173"); // Assuming the dev server runs on this port
        cy.contains("h1", "Desktop App").should("be.visible");
    });
});

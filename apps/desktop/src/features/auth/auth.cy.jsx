describe('Authentication', () => {
  it('should log in a user and redirect to the dashboard', () => {
    cy.visit('/');
    cy.get('input[name="email"]').type('test@example.com');
    cy.get('input[name="password"]').type('password123');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
  });
});
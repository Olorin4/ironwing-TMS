describe('Form Submission', () => {
  it('should fill out and submit a form', () => {
    cy.visit('/forms/new');
    cy.get('input[name="firstName"]').type('John');
    cy.get('input[name="lastName"]').type('Doe');
    cy.get('textarea[name="message"]').type('This is a test message.');
    cy.get('button[type="submit"]').click();
    cy.contains('Form submitted successfully!').should('be.visible');
  });
});
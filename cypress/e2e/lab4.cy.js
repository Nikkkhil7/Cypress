describe('The Internet Login Form Tests', () => {
  const url = 'https://the-internet.herokuapp.com/login';

  beforeEach(() => {
    // Stub out Optimizely analytics calls to avoid noise/delays
    cy.intercept('GET', 'https://298279967.log.optimizely.com/event*', {
      statusCode: 200,
      body: {}
    }).as('optimizelyEvent');
  });

  it('should test login form behavior with invalid and valid credentials', () => {
    // Step 1: Visit the login page
    cy.visit(url);

    // Step 2: Verify form elements exist and are visible
    cy.get('#username').should('exist').and('be.visible');
    cy.get('#password').should('exist').and('be.visible');
    cy.get('[type="submit"]').should('exist').and('be.visible');

    // Step 3: Perform invalid login
    cy.get('#username').type('invalidUser');
    cy.get('#password').type('invalidPass!');
    cy.get('[type="submit"]').click();

    // Step 4: Check for error message
    cy.get('#flash').should('exist').and('be.visible')
      .and('include.text', 'Your username is invalid!');

    // Step 5: Perform valid login
    cy.get('#username').clear().type('tomsmith');
    cy.get('#password').clear().type('SuperSecretPassword!');
    cy.get('[type="submit"]').click();

    // Step 6: Check for success message
    cy.get('#flash').should('exist').and('be.visible')
      .and('include.text', 'You logged into a secure area!');
  });
});

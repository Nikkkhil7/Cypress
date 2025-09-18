describe('OrangeHRM Screenshot Examples', () => {
  it('demonstrates screenshot capabilities', () => {
   
    cy.visit('/web/index.php/auth/login');
    cy.wait(4000)
    cy.screenshot('login-page');
   
    cy.get('.orangehrm-login-branding').screenshot('login-logo');
   
    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.wait(4000)
    cy.screenshot('login-form-filled');
   
    cy.get('button[type="submit"]').click();
   
    cy.url().should('include', '/dashboard');
    cy.wait(4000)
    cy.screenshot('dashboard-page');
  });
});
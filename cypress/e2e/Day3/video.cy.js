describe('OrangeHRM Video Examples', () => {
    it('completes a full user journey', () => {
       
        cy.visit('/web/index.php/auth/login');
       
        cy.get('input[name="username"]').type('Admin');
        cy.get('input[name="password"]').type('admin123');
        cy.get('button[type="submit"]').click();
       
        cy.url().should('include', '/dashboard');
       
        cy.get('.oxd-sidepanel').contains('Admin').click();
        cy.url().should('include', '/admin/viewSystemUsers');
       
        cy.get('.oxd-sidepanel').contains('PIM').click();
        cy.url().should('include', '/pim/viewEmployeeList');
    });
});
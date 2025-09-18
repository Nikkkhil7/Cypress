describe('Wikipedia Navigation & Viewport Test', () => {
  it('should navigate history and test mobile across origins', () => {
    // Step 1: Visit the main Wikipedia page
    cy.visit('https://www.wikipedia.org/');
    cy.log('Visited Wikipedia homepage');

    // Step 2: Click the English language link (on www.wikipedia.org)
    cy.get('#js-link-box-en').click();
    cy.log('Clicked English language link');

    // Step 3-7: Now on en.wikipedia.org – wrap in cy.origin
    cy.origin('https://en.wikipedia.org', () => {
      // Step 3: Ensure on Main Page
      cy.url().should('include', 'Main_Page');
      cy.log('Confirmed on English Wikipedia main page');

      // ✅ Step 4: Click the first valid article link inside #mp-tfa
      cy.get('#mp-tfa a[href^="/wiki/"]:not([href^="/wiki/File:"])').first().click();
      cy.log('Clicked valid Featured Article link');

      // Step 5: Go back
      cy.go('back');
      cy.url().should('include', 'Main_Page');
      cy.log('Went back to Main Page');

      // Step 6: Set viewport to iPhone X
      cy.viewport('iphone-x');
      cy.log('Set viewport to iPhone X');

      // Step 7: Go forward
      cy.go('forward');
      cy.url().should('include', '/wiki/');
      cy.log('Went forward to Featured Article');

      // Step 8: Verify #firstHeading is visible
      cy.get('#firstHeading', { timeout: 10000 })
        .should('exist')
        .should('be.visible');
      cy.log('Verified heading is visible');
    });
  });
});




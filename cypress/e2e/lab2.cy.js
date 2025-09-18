describe('Quote Scraper Reload Test', () => {
  it('should verify title before and after reload', () => {
    // Step 1: Visit the website
    cy.visit('https://quotes.toscrape.com/');
    cy.log('Visited Quote Scraper homepage');

    // Step 2: Verify the title
    cy.title().should('eq', 'Quotes to Scrape');
    cy.log('Verified page title before reload');

    // Step 3: Reload the page
    cy.reload();
    cy.log('Page reloaded');

    // Step 4: Verify the title again after reload
    cy.title().should('eq', 'Quotes to Scrape');
    cy.log('Verified page title after reload is same');
  });
});

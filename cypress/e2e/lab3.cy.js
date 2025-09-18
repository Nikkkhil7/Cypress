
// Ignore known GitHub analytics error to prevent test failure
Cypress.on('uncaught:exception', (err) => {
  if (err.message.includes('AnalyticsClient octolytics-url meta tag not found')) {
    return false;
  }
  // Let other errors fail the test
});

describe('GitHub Search Flow with Robust Input Typing', () => {
  it('searches for "cypress", opens a repo, then navigates back and forward', () => {
    cy.viewport(1440, 900);
    cy.visit('https://github.com/');
    cy.log('Visited GitHub');

    // Click search icon to reveal search input
    cy.get('button[aria-label="Search or jump to…"]', { timeout: 15000 })
      .should('be.visible')
      .click();
    cy.log('Clicked search icon');

    cy.wait(1000); // wait for search input to appear

    // Find all visible inputs and try typing into each until success
    cy.get('input', { timeout: 10000 })
      .filter(':visible')
      .then($inputs => {
        if ($inputs.length === 0) {
          throw new Error('No visible input elements found after clicking search icon');
        }

        let typed = false;

        cy.wrap($inputs).each($input => {
          if (!typed) {
            cy.wrap($input)
              .clear({ force: true })
              .type('cypress{enter}', { force: true })
              .then(
                () => {
                  typed = true;
                  cy.log(`Typed into input with attributes: type="${$input.attr('type')}", name="${$input.attr('name')}", class="${$input.attr('class')}"`);
                },
                (err) => {
                  cy.log(`Could not type into input: type="${$input.attr('type')}", name="${$input.attr('name')}"`);
                }
              );
          }
        });

        cy.then(() => {
          if (!typed) {
            throw new Error('Could not type into any visible input after clicking search icon');
          }
        });
      });

    // Wait for search results page URL to confirm search loaded
    cy.url({ timeout: 15000 }).should('include', 'search?q=cypress');
    cy.log('Search results page loaded');

    cy.wait(2000); // wait for results to render

    // Find first repository link by href pattern and click it
    cy.get('a', { timeout: 15000 })
      .filter(':visible')
      .then($links => {
        const repoLinks = $links.filter((i, el) => {
          const href = el.getAttribute('href');
          if (!href) return false;
          // Rough heuristic: links like "/owner/repo" but exclude issues/pulls
          return /^\/[^/]+\/[^/]+/.test(href) && !href.includes('/issues') && !href.includes('/pull');
        });

        if (repoLinks.length === 0) {
          throw new Error('No repository links found in search results');
        }

        cy.wrap(repoLinks[0]).click({ force: true });
        cy.log(`Clicked first repository link: ${repoLinks[0].getAttribute('href')}`);
      });

    // Verify repository page loaded by checking repo title and description visibility
    cy.get('strong.mr-2.flex-self-stretch a[data-pjax="#repo-content-pjax-container"]', { timeout: 15000 })
      .should('be.visible');
    cy.log('Repository title visible');

    // New selector for repository description (more stable)
    cy.get('p.f4.my-3, span.f4.my-3, div.BorderGrid-cell p.f4.my-3', { timeout: 15000 })
      .should('be.visible');
    cy.log('Repository description visible');

    // Navigate back to search results page
    cy.go('back');
    cy.log('Navigated back to search results');

    cy.url().should('include', 'search?q=cypress');
    cy.wait(2000);
    cy.get('a', { timeout: 15000 })
      .filter(':visible')
      .should('have.length.greaterThan', 5);
    cy.log('Multiple repository links visible on search results page');

    // Navigate forward to repository page again
    cy.go('forward');
    cy.log('Navigated forward to repository page');

    // Confirm repository description visible after forward navigation
    cy.get('p.f4.my-3, span.f4.my-3, div.BorderGrid-cell p.f4.my-3', { timeout: 15000 })
      .should('be.visible');
    cy.log('Repository description visible after forward navigation');
  });
});

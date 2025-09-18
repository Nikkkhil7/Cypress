// saucedemo.cy.js
// Full Cypress Fundamentals Demo using https://www.saucedemo.com/
 
describe('SauceDemo Cypress Fundamentals', () => {
  // -----------------------------
  // Test Hooks
  // -----------------------------
  before(() => {
    cy.log('>> Runs ONCE before all tests');
  });
 
  after(() => {
    cy.log('>> Runs ONCE after all tests');
  });
 
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/');
    cy.log('>> Runs before EACH test');
  });
 
  afterEach(() => {
    cy.log('>> Runs after EACH test');
  });
 
  // ============================================================
  // 1. Core Cypress commands (cy.*), Navigation and control
  // ============================================================
  it('should demonstrate navigation commands', () => {
    cy.visit('https://www.saucedemo.com/');
    cy.title().should('eq', 'Swag Labs');
    cy.url().should('include', 'saucedemo.com');
 
    cy.reload();
    cy.viewport(1280, 720);
 
    cy.get('#user-name').type('standard_user');
    cy.get('#password').type('secret_sauce');
    cy.get('#login-button').click();
 
    cy.url().should('include', '/inventory.html');
    cy.go('back');
    cy.url().should('include', 'saucedemo.com');
    cy.go('forward');
    cy.url().should('include', '/inventory.html');
  });
 
  // ============================================================
  // 2. Querying and finding elements
  // ============================================================
  it('should query elements correctly', () => {
    cy.get('#user-name').should('exist');
    cy.contains('Login').should('be.visible');
    cy.get('form').find('input').should('have.length.at.least', 2);
    cy.get('input').first().should('have.attr', 'id', 'user-name');
    cy.get('input').last().should('have.attr', 'id', 'login-button');
  });
 
  // ============================================================
  // 3. User actions
  // ============================================================
  it('should perform actions on login form', () => {
    cy.get('#user-name').clear().type('standard_user');
    cy.get('#password').clear().type('secret_sauce');
    cy.get('#login-button').click();
    cy.url().should('include', '/inventory.html');
 
    cy.get('.btn_inventory').first().click();
    cy.get('.shopping_cart_badge').should('have.text', '1');
 
    // select from dropdown (sort products)
    cy.get('select.product_sort_container').select('az');
    cy.get('select.product_sort_container').should('have.value', 'az');
 
    // trigger an event (mouseover on product image)
    cy.get('.inventory_item_img img').first().trigger('mouseover');
    });
 
  // ============================================================
  // 4. Assertions
  // ============================================================
  describe('Assertions Demo', () => {
    beforeEach(() => {
      cy.get('#user-name').type('standard_user');
      cy.get('#password').type('secret_sauce');
      cy.get('#login-button').click();
    });
 
    it('Asserting Existence and Visibility', () => {
      cy.get('.inventory_list').should('exist').and('be.visible');
    });
 
    it('Asserting Text Content', () => {
      cy.get('.title').should('have.text', 'Products');
      cy.get('.title').should('include.text', 'Products');
    });
 
    it('Asserting equality/contain/include/match', () => {
      cy.get('.title').invoke('text').should('equal', 'Products');
      cy.get('.title').invoke('text').should('contain', 'Prod');
      cy.get('.title').invoke('text').should('match', /^Pro/);
    });
 
    it('Asserting Attribute Values', () => {
      cy.get('.inventory_item_img img').first()
        .should('have.attr', 'src')
        .and('include', '.jpg');
    });
 
    it('Asserting CSS Classes', () => {
      cy.get('.btn_inventory').first().should('have.class', 'btn');
    });
 
    // Runs only on login page
    it('Asserting Input Values', () => {
      cy.visit('https://www.saucedemo.com/');
      cy.get('#user-name').clear().type('locked_out_user');
      cy.get('#user-name').should('have.value', 'locked_out_user');
    });
 
    it('Asserting Length', () => {
      cy.get('.inventory_item').should('have.length.greaterThan', 3);
    });
 
    // ✅ Fixed: wait for visible + flexible href
    it('Chaining multiple assertions', () => {
  // Cart icon should exist and be visible
  cy.get('.shopping_cart_link', { timeout: 10000 })
    .should('exist')
    .and('be.visible');
 
  // Click it and assert navigation to the cart page
  cy.get('.shopping_cart_link').click();
 
  cy.url().should('include', '/cart');
});
 
    it('Asserting against a function', () => {
      cy.get('.inventory_item').should(($list) => {
        expect($list.length).to.be.greaterThan(5);
        expect($list.first()).to.contain('Sauce Labs');
      });
    });
 
    it('Asserting on URL', () => {
      cy.url().should('include', '/inventory.html');
    });
 
    it('Asserting on Window properties', () => {
      cy.window().should('have.property', 'localStorage');
    });
  });
 
  // ============================================================
  // 5. Network requests and data
  // ============================================================
  it('should demonstrate cy.request()', () => {
    cy.request('https://www.saucedemo.com/').its('status').should('eq', 200);
  });
 
  // Stubbing with inline data (not real API)
  it('should stub network with cy.intercept()', () => {
    cy.intercept('GET', '**/inventory.html', { body: '<html><body><h1>Fake Inventory</h1></body></html>' }).as('mockInventory');
    cy.visit('https://www.saucedemo.com/inventory.html');
    cy.wait('@mockInventory');
  });
 
  // ============================================================
  // 6. Command chaining and control flow
  // ============================================================
  it('should alias and reuse elements', () => {
    cy.get('#user-name').as('usernameField');
    cy.get('@usernameField').type('standard_user');
  });
 
  it('should scope commands with within()', () => {
    cy.get('form').within(() => {
      cy.get('input[type="text"]').type('standard_user');
      cy.get('input[type="password"]').type('secret_sauce');
    });
  });
 
  // ============================================================
 // 7 & 8. Implicit vs Explicit Waits
// ============================================================
 
// Implicit wait example
it('Implicit wait example', () => {
  cy.get('#user-name').type('standard_user');
  cy.get('#password').type('secret_sauce');
  cy.get('#login-button').click();
  cy.get('.inventory_list').should('be.visible');  // implicit retry
});
 
// Explicit wait - bad practice (fixed time)
it('Explicit wait with fixed time (bad practice)', () => {
  cy.visit('https://www.saucedemo.com/');
  cy.wait(3000); // hardcoded, flaky
  cy.get('#user-name').should('be.visible');
});
 
// Explicit wait on element (good practice)
it('Explicit wait example', () => {
  cy.get('#user-name').type('standard_user');
  cy.get('#password').type('secret_sauce');
  cy.get('#login-button').click();
  cy.get('.inventory_list', { timeout: 10000 }).should('be.visible');
});
});
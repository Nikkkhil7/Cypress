describe('SauceDemo Cypress Syntax Demo', () => {

  // HOOKS
  before(() => {
    cy.log('Runs once before all tests')
  })

  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/')
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
  })

  afterEach(() => {
    cy.log('Runs after each test')
  })

  after(() => {
    cy.log('Runs once after all tests')
  })

  // NAVIGATION & CONTROL
  it('should navigate and control browser', () => {
    cy.reload()
    cy.go('back')
    cy.go('forward')
    cy.viewport(800, 600)
  })

  // QUERYING ELEMENTS
  it('should find elements using different queries', () => {
    cy.get('.inventory_item').first().should('be.visible')
    cy.get('.inventory_item').last().should('be.visible')
    cy.contains('Sauce Labs Backpack').should('exist')
    cy.get('.inventory_list').find('.inventory_item').should('have.length', 6)
  })

  // USER ACTIONS
  it('should perform user actions', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
    cy.get('.shopping_cart_badge').should('have.text', '2')
  })

  // ASSERTIONS
  it('should check assertions', () => {
    // Existence & visibility
    cy.get('.title').should('exist').and('be.visible')

    // Text content
    cy.get('.title').should('have.text', 'Products')

    // Attributes
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').should('have.attr', 'data-test', 'add-to-cart-sauce-labs-backpack')

    // CSS class
    cy.get('.inventory_item_name').first().should('have.class', 'inventory_item_name')

    // URL
    cy.url().should('include', '/inventory.html')

    // Window property
    cy.window().should('have.property', 'localStorage')
  })

  // NETWORK REQUESTS
  it('should wait for a network request', () => {
    cy.intercept('POST', '**/cart/**').as('addToCart')
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.wait('@addToCart').its('response.statusCode').should('eq', 200)
  })

  // COMMAND CHAINING
  it('should use chaining and aliases', () => {
    cy.get('.inventory_item').as('products')
    cy.get('@products').should('have.length', 6)

    cy.get('@products').first().within(() => {
      cy.get('button').click()
    })

    cy.get('.shopping_cart_badge').should('have.text', '1')

    cy.get('@products').then((items) => {
      expect(items.length).to.equal(6)
    })
  })

  // WAITS
  it('implicit wait example', () => {
    cy.get('.inventory_item').should('have.length', 6) // retries automatically
  })

  it('explicit wait example', () => {
    cy.get('.inventory_item', { timeout: 10000 }).should('be.visible')
  })

  it('network wait example', () => {
    cy.intercept('POST', '**/cart/**').as('addItem')
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
    cy.wait('@addItem').its('response.statusCode').should('eq', 200)
  })

  // ONLY / SKIP
  it.only('this test will run only', () => {
    cy.get('.inventory_item').should('have.length', 6)
  })

  it.skip('this test will be skipped', () => {
    cy.get('.inventory_item').should('not.exist')
  })
})

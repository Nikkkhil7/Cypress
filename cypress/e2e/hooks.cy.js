describe('SauceDemo Hooks Example', () => {
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

  it('loads inventory page', () => {
    cy.url().should('include', 'inventory')
    cy.get('.title').should('have.text', 'Products')
  })

  it('adds a product to cart', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click()
    cy.get('.shopping_cart_badge').should('have.text', '1')
  })
})

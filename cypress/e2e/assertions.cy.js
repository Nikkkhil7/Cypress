describe('SauceDemo Assertions', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/')
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
  })

  it('checks page title and URL', () => {
    cy.url().should('include', 'inventory')
    cy.get('.title').should('have.text', 'Products')
  })

  it('checks product list is visible', () => {
    cy.get('.inventory_list').should('be.visible')
    cy.get('.inventory_item').should('have.length.greaterThan', 0)
  })

  it('checks cart badge after adding product', () => {
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
    cy.get('.shopping_cart_badge').should('have.text', '1')
  })
})

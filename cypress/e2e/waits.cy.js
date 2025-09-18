describe('SauceDemo Waits Demo', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com/')
    cy.get('[data-test="username"]').type('standard_user')
    cy.get('[data-test="password"]').type('secret_sauce')
    cy.get('[data-test="login-button"]').click()
  })

  it('implicit wait example', () => {
    // Cypress retries automatically
    cy.get('.inventory_item').should('have.length', 6)
  })

  it('explicit wait with timeout', () => {
    cy.get('.inventory_item', { timeout: 10000 })
      .should('be.visible')
  })

});
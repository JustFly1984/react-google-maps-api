context('RGMAPI', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080')
  })
  it('type into text', () => {
    // https://on.cypress.io/type
    cy.get('#test-input')
      .type('fake@email.com').should('have.value', 'fake@email.com')
  })
})
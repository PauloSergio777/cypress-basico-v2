Cypress.Commands.add('fillMandatoryFieldsAndSubmit', function(){
  cy.get('#firstName').type('Paulo')
  cy.get('#lastName').type('Sergio')
  cy.get('#email').type('paulo@teste.com')
  cy.get('#open-text-area').type('Teste')
  cy.get('.button[type="submit"]').click()
  })
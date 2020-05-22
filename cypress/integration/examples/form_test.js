describe('user-boarding', () => {
    it('can navigate to the site', () => {
        cy.visit('http://localhost:3000/')
    })

    it('can navigate to order', () => {
        cy.get('.order')
        .click()
      })

    it('can submit', () => {

        cy.get('input[name="name"]')
        .type('Shantel')
        .should('have.value', 'Shantel')
        
        cy.get('textarea[name="instructions"]')
        .type('not-today@gmail.com')
        .should('have.value', 'not-today@gmail.com')

        cy.get('input[name="pepperoni"]')
        .check()
        .should('have.checked')

        cy.get('input[name="sausage"]')
        .check()
        .should('have.checked')

        cy.get('input[name="ham"]')
        .check()
        .should('have.checked')

        cy.get('input[name="peppers"]')
        .check()
        .should('have.checked')

        cy.get('input[name="mushrooms"]')
        .check()
        .should('have.checked')

        cy.get('button')
        .click()
    })

    it('can navigate to home', () => {
        cy.get('.home')
        .click()
      })

    it('has validation error if username < 0 characters', () => {
        cy.get('input')
        .should((data) => {
            expect(data).to.have.length    
          })
      })
})
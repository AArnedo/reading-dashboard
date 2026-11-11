describe('Register', () =>{
    it('muestra el formulario de register', () => {
        cy.visit('/register')
        cy.contains('Creá tu cuenta').should('be.visible')
        cy.get('[data-cy=register-name-input]').should('be.visible')
        cy.get('[data-cy=register-email-input]').should('be.visible')
        cy.get('[data-cy=register-password-input]').should('be.visible')
    })
})
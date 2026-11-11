describe('Login', () =>{
    beforeEach(() =>{
        cy.visit('/login')
    })

    it('muestra el formulario de login', () => {
        cy.contains('Iniciar sesión').should('be.visible')
        cy.get('[data-cy=login-email-input]').should('be.visible')
        cy.get('[data-cy=login-password-input]').should('be.visible')
    });

    it('permitir escribir en los campos', () => {
        cy.get('[data-cy=login-email-input]')
        .type('test@ejemplo.com')
        .should('have.value', 'test@ejemplo.com')

        cy.get('[data-cy=login-password-input]')
        .type('123456')
        .should('have.value', '123456')
    });

    it('muestra un error con credenciales invalidas', () => {
        cy.get('[data-cy=login-email-input]').type('noexiste@ejemplo.com')
        cy.get('[data-cy=login-password-input]').type('incorrectPassword')
        cy.get('[data-cy=login-button-submit]').click()

        cy.get('[data-cy=login-error-message]')
        .should('be.visible')
        .and('contain', 'El email o la contraseña fue incorrecta')

        cy.url().should('include', '/login')
    });

    it('navega a register desde Link', () => {
        cy.get('[data-cy=login-link-register]').click()
        cy.url().should('include', '/register')
    });


})
const { expect } = require('@playwright/test');

class RegisterPage {
    constructor(page) {
        this.page = page;
        this.nameInput = 'input[data-qa="signup-name"]';
        this.emailInput = 'input[data-qa="signup-email"]';
        this.signupButton = 'button[data-qa="signup-button"]';
        this.errorMessage = '.login-form p'; // Mensagem de e-mail existente
        this.successMessage = 'h2.title b'; // Mensagem "ACCOUNT CREATED!"
    }

    async preencherRegistroInicial(nome, email) {
        await this.page.fill(this.nameInput, nome);
        await this.page.fill(this.emailInput, email);
        await this.page.click(this.signupButton);
    }

    async validarMensagemErro(texto) {
        await expect(this.page.getByText(texto)).toBeVisible();
    }
}
module.exports = { RegisterPage };
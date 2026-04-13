const { expect } = require('@playwright/test');

class LoginPage {
    constructor(page) {
        this.page = page;
        this.emailInput = 'input[data-qa="login-email"]';
        this.passwordInput = 'input[data-qa="login-password"]';
        this.loginButton = 'button[data-qa="login-button"]';
        this.logoutButton = 'a[href="/logout"]';
        this.errorMessage = '.login-form p';
    }

    async login(email, senha) {
        await this.page.fill(this.emailInput, email);
        await this.page.fill(this.passwordInput, senha);
        await this.page.click(this.loginButton);
    }

    async loginSucess() {
        await expect(this.page.getByText('Logged in as')).toBeVisible();
    }

    async messageError(texto) {
        await expect(this.page.getByText(texto)).toBeVisible();
    }
}
module.exports = { LoginPage };
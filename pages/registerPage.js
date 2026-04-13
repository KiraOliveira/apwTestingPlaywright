const { expect } = require('@playwright/test');

class RegisterPage {
    constructor(page) {
        this.page = page;
        this.nameInput = 'input[data-qa="signup-name"]';
        this.emailInput = 'input[data-qa="signup-email"]';
        this.signupButton = 'button[data-qa="signup-button"]';
       // this.errorMessage = '.login-form p'; // Exibe mensagem de e-mail existente
       // this.successMessage = 'h2.title b'; // Exibe mensagem "ACCOUNT CREATED!"
    }

    async newRegister(nome, email) {
        await this.page.fill(this.nameInput, nome);
        await this.page.fill(this.emailInput, email);
        await this.page.click(this.signupButton);
    }

    async registrationComplete () {
        await this.page.fill('input[data-qa="password"]', '123459');
        await this.page.selectOption('select[data-qa="days"]', '1');
        await this.page.selectOption('select[data-qa="months"]', '1');
        await this.page.selectOption('select[data-qa="years"]', '2000');
        await this.page.check('input#newsletter');
        await this.page.check('input#optin');
        await this.page.fill('input[data-qa="first_name"]', 'QA');
        await this.page.fill('input[data-qa="last_name"]', 'Tester');
        await this.page.fill('input[data-qa="company"]', 'Test Company');
        await this.page.fill('input[data-qa="address"]', '123 Test St');
        await this.page.fill('input[data-qa="address2"]', 'Suite 100');
        await this.page.selectOption('select[data-qa="country"]', 'United States');
        await this.page.fill('input[data-qa="state"]', 'Test State');
        await this.page.fill('input[data-qa="city"]', 'Test City');
        await this.page.fill('input[data-qa="zipcode"]', '12345');
        await this.page.fill('input[data-qa="mobile_number"]', '1234567890');
        await this.page.click('button[data-qa="create-account"]');
    }   

    async registerSucess() {
        await expect(this.page.getByText('Account Created!')).toBeVisible();
    }

    async messageError(texto) {
        await expect(this.page.getByText(texto)).toBeVisible();
    }

    async buttonContinue() {
        await this.page.click('a[data-qa="continue-button"]');
    }

    async userIsLoggedIn() {
        await expect(this.page.getByText('Logged in as')).toBeVisible();
    }
}
module.exports = { RegisterPage };
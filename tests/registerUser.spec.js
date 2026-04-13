const { test } = require('@playwright/test');
const { RegisterPage } = require('../pages/registerPage');

test.describe('Feature 1: Register User', () => {
    let registerPage;

    test.beforeEach(async ({ page }) => {
        registerPage = new RegisterPage(page);
        await page.goto('/login', {
            waitUntil: 'domcontentloaded',
            timeout: 30000
        });
    });

    test('TC01 — User completes full registration and account is created', async ({ page }) => {
        // Dado que preencho nome e um e-mail novo
        const emailNew = `teste${Date.now()}@test.com`;
        await registerPage.newRegister('QA Tester', emailNew);
        
        await registerPage.registrationComplete();
        
        // Então exibe mensagem "ACCOUNT CREATED!"
        await registerPage.registerSucess('ACCOUNT CREATED!');

        // E clico no botão "Continue"  
        await registerPage.buttonContinue();

        // E sou redirecionado para a página inicial e vejo que estou logado
        await registerPage.userIsLoggedIn();

    });

    test('TC05 — Register User with existing email', async () => {
        // Realiza o registro com um e-mail já existente
        await registerPage.newRegister('Test', 'test@test.com');
        // Exibe mesanegm de erro 
        await registerPage.messageError('Email Address already exist!');
    });
});
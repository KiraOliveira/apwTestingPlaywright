const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');

test.describe('Parte 2: Autenticação (Login)', () => {
    let loginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await page.goto('/login', {
            waitUntil: 'domcontentloaded',
            timeout: 30000
        });
    });

    /*test('TC02 — Login User with correct email and password', async () => {
        await loginPage.realizarLogin('test@test.com', 'senha123');
        await loginPage.validarLoginSucesso();
    });**/

    test('TC03 — Login User with incorrect email and password', async () => {
        await loginPage.realizarLogin('errado@email.com', '12345');
        await loginPage.validarMensagemErro('Your email or password is incorrect!');
    });

    test('TC04 — Logout User', async ({ page }) => {
        await loginPage.realizarLogin('juju@ap605.com', 'senha123');
        await page.click('a[href="/logout"]');
        await expect(page).toHaveURL(/.*login/);
    });
});
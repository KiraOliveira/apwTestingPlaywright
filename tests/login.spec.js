const { test, expect } = require('@playwright/test');
const { LoginPage } = require('../pages/loginPage');

test.describe('Feature 2: Authentication (Login)', () => {
    let loginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await page.goto('/login', {
            waitUntil: 'domcontentloaded',
            timeout: 30000
        });
    });

    test('TC02 — Login User with correct email and password', async () => {
        await loginPage.login('teste1776060627030@test.com', '123459');
        await loginPage.loginSucess();
    });

    test('TC03 — Login User with incorrect email and password', async () => {
        await loginPage.login('error@email.com', '12345');
        await loginPage.messageError('Your email or password is incorrect!');
    });

    test('TC04 — Logout User', async ({ page }) => {
        await loginPage.login('teste1776060627030@test.com', '123459');
        await page.click('a[href="/logout"]');
        await expect(page).toHaveURL(/.*login/);
    });
});
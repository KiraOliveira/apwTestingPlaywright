const { test } = require('@playwright/test');
const { NewsletterPage } = require('../pages/NewsletterPage');

test.describe('Automação de Newsletter / Subscription', () => {
    let newsletterPage;
    const emailTeste = 'qa_tester@exemplo.com';

    test.beforeEach(async ({ page }) => {
        newsletterPage = new NewsletterPage(page);
    });

    test('TC10 — Verify Subscription in home page', async ({ page }) => {
        // Dado que o usuário está na home page
        await page.goto('https://www.automationexercise.com/');
        
        // Quando ele se inscreve no rodapé
        await newsletterPage.assinarNewsletter(emailTeste);
        
        // Então a mensagem de sucesso é exibida
        await newsletterPage.validarMensagemSucesso();
    });

    test('TC11 — Verify Subscription in Cart page', async ({ page }) => {
        // Dado que o usuário está na cart page
        await page.goto('https://www.automationexercise.com/view_cart');
        
        // Quando ele se inscreve no rodapé
        await newsletterPage.assinarNewsletter(emailTeste);
        
        // Então a mensagem de sucesso é exibida
        await newsletterPage.validarMensagemSucesso();
    });
});
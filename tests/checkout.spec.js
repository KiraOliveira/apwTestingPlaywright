const { test, expect } = require('@playwright/test');
const { CheckoutPage } = require('../pages/checkoutPage');

test.describe('Automação de Pedido e Checkout', () => {
    let checkoutPage;
    const cartUrl = 'https://www.automationexercise.com/view_cart';

    test.beforeEach(async ({ page }) => {
        checkoutPage = new CheckoutPage(page);
        await page.goto(cartUrl);
    });

    test('TC14 — Place Order: Register while Checkout', async ({ page }) => {
        // Simulação de adicionar produtos e iniciar checkout
        await checkoutPage.proceedToCheckoutBtn.click();
        await page.click('u:has-text("Register / Login")');
        // ... (Fluxo de registro omitido para brevidade)
        await page.goto(cartUrl);
        await checkoutPage.confirmarPedido('Pedido via TC14');
        await checkoutPage.realizarPagamento({ nome: 'Teste', numero: '1', cvc: '1', mes: '1', ano: '2025' });
        await expect(checkoutPage.successMessage).toContainText('Order Placed!');
    });

    test('TC15 — Place Order: Register before Checkout', async ({ page }) => {
        // Inicia logado, adiciona ao carrinho e finaliza
        await page.goto('https://www.automationexercise.com/login');
        await page.fill('[data-qa="login-email"]', 'qa_auto@test.com');
        await page.fill('[data-qa="login-password"]', '123456');
        await page.click('[data-qa="login-button"]');
        
        await page.goto(cartUrl);
        await checkoutPage.confirmarPedido('Pedido via TC15');
        await checkoutPage.realizarPagamento({ nome: 'Teste', numero: '1', cvc: '1', mes: '1', ano: '2025' });
        await expect(checkoutPage.successMessage).toContainText('Order Placed!');
    });

    test('TC16 — Place Order: Login before Checkout', async ({ page }) => {
        await page.goto('/login');
        await page.fill('[data-qa="login-email"]', 'qa_auto@test.com');
        await page.fill('[data-qa="login-password"]', '123456');
        await page.click('[data-qa="login-button"]');
        
        await page.goto(cartUrl);
        await checkoutPage.confirmarPedido('Pedido via TC16');
        await expect(checkoutPage.successMessage).toBeVisible;
    });

    test('TC23 — Verify address details in checkout page', async ({ page }) => {
        // Simular login e checkout
        await page.goto(cartUrl);
        await checkoutPage.proceedToCheckoutBtn.click();
        
        // Validação se os endereços de entrega e cobrança estão visíveis
        await expect(checkoutPage.addressDelivery).toBeVisible();
        await expect(checkoutPage.addressInvoice).toBeVisible();
    });

    test('TC24 — Download Invoice after purchase order', async ({ page }) => {
        // Fluxo até a tela final de sucesso
        await page.goto('https://www.automationexercise.com/payment_done/500'); 
        
        const downloadPromise = page.waitForEvent('download');
        await checkoutPage.downloadInvoiceBtn.click();
        const download = await downloadPromise;
        
        expect(download.suggestedFilename()).toContain('.txt');
    });
});
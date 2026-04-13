const { test, expect } = require('@playwright/test');
const { CartPage } = require('../pages/cartPage');

test.describe('Cenários de Teste - Carrinho de Compras', () => {
    let cartPage;

    test.beforeEach(async ({ page }) => {
        cartPage = new CartPage(page);
    });

    test('TC12 — Add Products in Cart', async ({ page }) => {
        await cartPage.adicionarProduto(0); // Primeiro produto
        await cartPage.adicionarProduto(1); // Segundo produto
        await cartPage.navegarParaCarrinho();
        
        await expect(cartPage.productRows).toHaveCount(2); //[cite: 7]
    });

    test('TC13 — Verify Product quantity in Cart', async ({ page }) => {
        await page.goto('https://www.automationexercise.com/product_details/1');
        await page.fill('#quantity', '4');
        await page.click('button:has-text("Add to cart")');
        await page.click('u:has-text("View Cart")');
        
        await cartPage.validarQuantidade('4'); //[cite: 7]
    });

    test('TC17 — Remove Products From Cart', async ({ page }) => {
        await cartPage.adicionarProduto(0);
        await cartPage.navegarParaCarrinho();
        await cartPage.removerProduto();
        
        await expect(cartPage.productRows).toHaveCount(0); //[cite: 7]
    });

    test('TC20 — Search Products and Verify Cart After Login', async ({ page }) => {
        await cartPage.adicionarProduto(0);
        await cartPage.loginLink.click();
        
        // Dados de login (Input para realização do teste)
        await page.fill('[data-qa="login-email"]', 'teste_qa@provider.com'); //[cite: 8]
        await page.fill('[data-qa="login-password"]', '123456'); //[cite: 8]
        await page.click('[data-qa="login-button"]');
        
        await cartPage.navegarParaCarrinho();
        await expect(cartPage.productRows).toHaveCount(1); //[cite: 7]
    });

    test('TC22 — Add to cart from Recommended items', async ({ page }) => {
        await page.goto('https://www.automationexercise.com/');
        await cartPage.recommendedSection.scrollIntoViewIfNeeded();
        await page.click('.recommended_items .add-to-cart >> nth=0');
        await page.click('u:has-text("View Cart")');
        
        await expect(cartPage.productRows).toHaveCount(1); //[cite: 7]
    });
});
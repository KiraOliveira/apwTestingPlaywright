const { test, expect } = require('@playwright/test');
const { CartPage } = require('../pages/cartPage');
const { LoginPage } = require('../pages/loginPage');

test.describe('Cenários de Teste - Carrinho de Compras', () => {
    let cartPage;
    let loginPage;

    test.beforeEach(async ({ page }) => {
        cartPage = new CartPage(page);
        loginPage = new LoginPage(page);
        await page.goto('/login', {
            waitUntil: 'domcontentloaded',
            timeout: 30000
        });
        // Bloqueia domínios de anúncios para evitar que overlays travem o modal
        await page.route('**/*.{png,jpg,jpeg}', route => {
            const url = route.request().url();
            if (url.includes('googleads') || url.includes('doubleclick')) {
                route.abort();
            } else {
                route.continue();
        }
    });
    });

    test('TC12 — Add Products in Cart', async ({ page }) => {
        // Aqui ele vai logar primeiro e depois acessar a página do carrinho para iniciar os testes
        await loginPage.login('teste1776060627030@test.com', '123459');

        // Aqui ele vai acessar a página do carrinho e iniciar a adição dos produtos
        await cartPage.navegarParaCarrinho();
    
        await cartPage.adicionarProduto(1); // Primeiro produto
        await cartPage.adicionarProduto(2); // Segundo produto
        await cartPage.navegarParaCarrinho();
        
        await expect(cartPage.productRows).toHaveCount(2); 
    });

    test('TC13 — Verify Product quantity in Cart', async ({ page }) => {
        await page.goto('/product_details/1');
        await page.fill('#quantity', '4');
        await page.click('button:has-text("Add to cart")');
        await page.click('u:has-text("View Cart")');
        
        await cartPage.validarQuantidade('4'); 
    });

    test('TC17 — Remove Products From Cart', async ({ page }) => {
        await cartPage.adicionarProduto(0);
        await cartPage.navegarParaCarrinho();
        await cartPage.removerProduto();
        
        await expect(cartPage.productRows).toHaveCount(1);
    });

    test('TC20 — Search Products and Verify Cart After Login', async ({ page }) => {
        await cartPage.adicionarProduto(0);
        await cartPage.loginLink.click();
        
        // Dados de login (Input para realização do teste)
        await loginPage.login('teste1776060627030@test.com', '123459');
        await loginPage.loginSucess();
        
        await cartPage.navegarParaCarrinho();
        await expect(cartPage.productRows).toHaveCount(2); //[cite: 7]
    });

    test('TC22 — Add to cart from Recommended items', async ({ page }) => {
        await page.goto('/');
        await cartPage.recommendedSection.scrollIntoViewIfNeeded();
        await page.click('.recommended_items .add-to-cart >> nth=0');
        await page.click('u:has-text("View Cart")');
        
        await expect(cartPage.productRows).toHaveCount(1); //[cite: 7]
    });
});
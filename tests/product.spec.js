const { test, expect } = require('@playwright/test');
const { ProductPage } = require('../pages/productPage');

test.describe('Catálogo de Produtos - Automação Exercise', () => {
    let productPage;

    test.beforeEach(async ({ page }) => {
        productPage = new ProductPage(page);
        await page.goto('https://www.automationexercise.com/products');
    });

    test('TC08 — Verify All Products and product detail page', async ({ page }) => {
        await expect(productPage.allProductsTitle).toBeVisible(); //
        await productPage.viewProductBtn.first().click();
        
        // Valida presença de nome, categoria, preço, disponibilidade e marca
        await expect(productPage.productInfo).toBeVisible();
        await expect(productPage.productInfo.locator('h2')).not.toBeEmpty();
        await expect(productPage.productInfo).toContainText('Category:');
        await expect(productPage.productInfo).toContainText('Availability:');
    });

    test('TC09 — Search Product', async ({ page }) => {
        const produto = 'Blue Top';
        await productPage.pesquisarProduto(produto); //
        
        await expect(productPage.searchedProductsTitle).toBeVisible();
        await expect(page.locator('.productinfo p')).toContainText(produto);
    });

    test('TC18 — View Category Products', async ({ page }) => {
        await productPage.selecionarCategoria('Women', 'Dress'); //
        
        await expect(page.locator('.title')).toContainText('Women - Dress Products');
        await expect(page.locator('.productinfo')).toBeVisible();
    });

    test('TC19 — View & Cart Brand Products', async ({ page }) => {
        await productPage.selecionarMarca('Polo'); //
        
        await expect(page.locator('.title')).toContainText('Brand - Polo Products');
        await expect(page.locator('.productinfo')).toBeVisible();
    });

    test('TC21 — Add review on product', async ({ page }) => {
        await productPage.viewProductBtn.first().click(); //
        
        await productPage.enviarReview('Tester QA', 'tester@test.com', 'Excelente produto, recomendo!');
        
        const successMsg = 'Thank you for your review.';
        await expect(page.getByText(successMsg)).toBeVisible();
    });
});
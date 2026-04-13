const { expect } = require('@playwright/test');

class CartPage {
    constructor(page) {
        this.page = page;
        // Locators
        this.productRows = page.locator('#cart_info_table tbody tr');
        this.quantityField = page.locator('.cart_quantity button');
        this.deleteBtn = page.locator('.cart_quantity_delete');
        this.emptyCartMsg = page.locator('#empty_cart');
        this.recommendedSection = page.locator('.recommended_items');
        this.loginLink = page.getByRole('link', { name: 'Signup / Login' });
        this.cartLink = page.getByRole('link', { name: 'Cart' });
    }

    async navegarParaCarrinho() {
        await this.page.goto('/view_cart');
    }

    async adicionarProduto(index = 0) {
        await this.page.goto('/products');

    // --- Add first product ---
    const firstProduct = this.page.locator('.productinfo .add-to-cart').nth(0);
    await firstProduct.scrollIntoViewIfNeeded();
    await firstProduct.click();

    // Aguarda o modal e clica em Continue (usando dispatchEvent por segurança extra)
    // O index (0) pega o primeiro card de produto da lista
    const continueBtn = this.page.locator('text=Continue Shopping');
    await continueBtn.waitFor({ state: 'visible', timeout: 15000 });
    await continueBtn.dispatchEvent('click'); 

    // --- Add second product ---
    // O index (1) pega o segundo card de produto da lista
    const secondProduct = this.page.locator('.productinfo .add-to-cart').nth(1);
    await secondProduct.scrollIntoViewIfNeeded();
    await secondProduct.click();

    // Agora vamos para o carrinho para validar
    const viewCartBtn = this.page.locator('u:has-text("View Cart")');
    await viewCartBtn.waitFor({ state: 'visible' });
    await viewCartBtn.dispatchEvent('click');

    // Validação Final
    const rows = this.page.locator('#cart_info_table tbody tr');
    // Antes de contar, vamos garantir que a tabela não está vazia
    await rows.first().waitFor({ state: 'visible' });

    await expect(rows).toHaveCount(2);
    }

    async removerProduto() {
        await this.deleteBtn.first().click();
    }

    async validarQuantidade(quantidade) {
        await expect(this.quantityField).toHaveText(quantidade);
    }
}

module.exports = { CartPage };
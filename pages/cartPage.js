const { expect } = require('@playwright/test');

class CartPage {
    constructor(page) {
        this.page = page;
        // Locators
        this.productRows = page.locator('tr[id^="product-"]');
        this.quantityField = page.locator('.cart_quantity button');
        this.deleteBtn = page.locator('.cart_quantity_delete');
        this.emptyCartMsg = page.locator('#empty_cart');
        this.recommendedSection = page.locator('.recommended_items');
        this.loginLink = page.getByRole('link', { name: 'Signup / Login' });
        this.cartLink = page.getByRole('link', { name: 'Cart' });
    }

    async navegarParaCarrinho() {
        await this.page.goto('/view_cart'); //[cite: 55]
    }

    async adicionarProduto(index = 0) {
        await this.page.goto('/products');
        await this.page.hover(`.single-products >> nth=${index}`);
        await this.page.click(`.add-to-cart >> nth=${index}`);
        await this.page.click('button:has-text("Continue Shopping")');
    }

    async removerProduto() {
        await this.deleteBtn.first().click();
    }

    async validarQuantidade(quantidade) {
        await expect(this.quantityField).toHaveText(quantidade);
    }
}

module.exports = { CartPage };
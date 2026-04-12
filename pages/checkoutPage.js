const { expect } = require('@playwright/test');

class CheckoutPage {
    constructor(page) {
        this.page = page;
        // Locators
        this.cartBtn = page.getByRole('link', { name: ' Cart' });
        this.proceedToCheckoutBtn = page.locator('.check_out');
        this.addressDelivery = page.locator('#address_delivery');
        this.addressInvoice = page.locator('#address_invoice');
        this.commentTextArea = page.locator('textarea[name="message"]');
        this.placeOrderBtn = page.locator('a[href="/payment"]');
        
        // Pagamento e Sucesso
        this.nameOnCardInput = page.locator('input[name="name_on_card"]');
        this.cardNumberInput = page.locator('input[name="card_number"]');
        this.cvcInput = page.locator('input[name="cvc"]');
        this.expiryMonthInput = page.locator('input[name="expiry_month"]');
        this.expiryYearInput = page.locator('input[name="expiry_year"]');
        this.payButton = page.locator('[data-qa="pay-button"]');
        this.successMessage = page.locator('[data-qa="order-placed"] b');
        this.downloadInvoiceBtn = page.locator('.check_out:has-text("Download Invoice")');
    }

    async acessarCarrinho() {
        await this.cartBtn.click();
    }

    async confirmarPedido(comentario) {
        await this.proceedToCheckoutBtn.click();
        await this.commentTextArea.fill(comentario);
        await this.placeOrderBtn.click();
    }

    async realizarPagamento(dados) {
        await this.nameOnCardInput.fill(dados.nome);
        await this.cardNumberInput.fill(dados.numero);
        await this.cvcInput.fill(dados.cvc);
        await this.expiryMonthInput.fill(dados.mes);
        await this.expiryYearInput.fill(dados.ano);
        await this.payButton.click();
    }
}

module.exports = { CheckoutPage };
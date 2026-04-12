const { expect } = require('@playwright/test');

class NewsletterPage {
    /**
     * @param {import('@playwright/test').Page} page
     */
    constructor(page) {
        this.page = page;
        // Seletores baseados nos passos do BDD
        this.footerSection = page.locator('footer');
        this.subscriptionEmailInput = page.locator('#susbscribe_email');
        this.subscribeButton = page.locator('#subscribe');
        this.successMessage = page.locator('.alert-success');
    }

    async assinarNewsletter(email) {
        // Rola até o rodapé conforme instruído nos cenários
        await this.footerSection.scrollIntoViewIfNeeded();
        await this.subscriptionEmailInput.fill(email);
        await this.subscribeButton.click();
    }

    async validarMensagemSucesso() {
        // Mensagem esperada: 'You have been successfully subscribed!'
        const mensagem = 'You have been successfully subscribed!';
        await expect(this.successMessage).toBeVisible();
        await expect(this.successMessage).toHaveText(mensagem);
    }
}

module.exports = { NewsletterPage };
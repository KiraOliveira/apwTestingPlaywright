const { expect } = require('@playwright/test');

class ContactPage {
    constructor(page) {
        this.page = page;
        // Seletores baseados no site automationexercise.com/contact_us
        this.nameInput = page.locator('[data-qa="name"]');
        this.emailInput = page.locator('[data-qa="email"]');
        this.subjectInput = page.locator('[data-qa="subject"]');
        this.messageInput = page.locator('[data-qa="message"]');
        this.fileInput = page.locator('input[name="upload_file"]');
        this.submitButton = page.locator('[data-qa="submit-button"]');
        this.successMessage = page.locator('.contact-form .alert-success');
    }

    async preencherFormulario(dados, caminhoArquivo) {
        await this.nameInput.fill(dados.nome);
        await this.emailInput.fill(dados.email);
        await this.subjectInput.fill(dados.assunto);
        await this.messageInput.fill(dados.mensagem);
        // Anexa o arquivo conforme instrução "attach a file"
        await this.fileInput.setInputFiles(caminhoArquivo);
    }

    async submeter() {
        // O sistema exibe um alerta nativo do navegador ao clicar em Submit
        this.page.once('dialog', dialog => dialog.accept());
        await this.submitButton.click();
    }

    async validarSucesso() {
        // Mensagem esperada conforme o arquivo: 'Success! Your details have been submitted successfully.'
        const mensagemEsperada = 'Success! Your details have been submitted successfully.';
        await expect(this.successMessage).toBeVisible();
        await expect(this.successMessage).toHaveText(mensagemEsperada);
    }
}

module.exports = { ContactPage };
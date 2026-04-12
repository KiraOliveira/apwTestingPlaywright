const { test } = require('@playwright/test');
const { ContactPage } = require('../pages/ContactPage');
const path = require('path');

test.describe('Suporte ao Cliente - Automação', () => {
    let contactPage;

    test.beforeEach(async ({ page }) => {
        contactPage = new ContactPage(page);
        // Dado que o usuário está na página 'Contact Us'
        await page.goto('https://www.automationexercise.com/contact_us');
    });

    test('TC06 — User submits a contact form with all required fields and a file attachment', async () => {
        const dadosTeste = {
            nome: 'QA Tester',
            email: 'tester@exemplo.com',
            assunto: 'Suporte Técnico',
            mensagem: 'Solicitação de suporte via automação Playwright.'
        };
        
        // Caminho para um arquivo dummy de teste
        const caminhoArquivo = path.join(__dirname, 'test_file.txt');

        // Quando preenche os campos e anexa o arquivo
        await contactPage.preencherFormulario(dadosTeste, caminhoArquivo);
        
        // E clica em 'Submit'
        await contactPage.submeter();
        
        // Então a mensagem de sucesso é exibida
        await contactPage.validarSucesso();
    });
});
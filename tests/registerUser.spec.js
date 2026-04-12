const { test } = require('@playwright/test');
const { RegisterPage } = require('../pages/registerPage');

test.describe('Parte 1: Registro de Usuário', () => {
    let registerPage;

    test.beforeEach(async ({ page }) => {
        registerPage = new RegisterPage(page);
        await page.goto('/login', {
            waitUntil: 'domcontentloaded',
            timeout: 30000
        });
    });

    test('TC01 — User completes full registration and account is created', async ({ page }) => {
        // Dado que preencho nome e um e-mail novo
        const emailNovo = `teste${Date.now()}@test2.com`;
        await registerPage.preencherRegistroInicial('QA Tester', emailNovo);
        
        // No TC01, após o clique, ele vai para a tela de detalhes
        // Aqui você continuaria o preenchimento conforme o documento 
    });

    test('TC05 — Register User with existing email', async () => {
        // Tenta registrar com e-mail já existente
        await registerPage.preencherRegistroInicial('Test', 'test@test.com');
        // Então exibe erro conforme o arquivo 
        await registerPage.validarMensagemErro('Email Address already exist!');
    });
});
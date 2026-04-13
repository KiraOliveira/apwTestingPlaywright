# Projeto de Automação: Automation Exercise com Playwright

## 🚀 Resumo do Projeto
Este projeto tem como objetivo a automação de testes de interface (UI) do site Automation Exercise, uma plataforma projetada especificamente para a prática de testes de software. A suíte de testes cobre fluxos críticos de ponta a ponta, incluindo gerenciamento de carrinho, busca de produtos, checkout de pedidos, inscrição em newsletters e suporte ao cliente.

---

## 🛠️ Tecnologias Utilizadas
* Node.js: Ambiente de execução Javascript.

* Playwright: Framework de automação para testes de ponta a ponta.

* JavaScript: Linguagem de programação utilizada nos scripts.

* Page Object Model (POM): Padrão de design para melhorar a manutenção e reduzir a duplicação de código.

---

## 📂 Estrutura de Pastas
O projeto segue uma estrutura organizada para separar a lógica da página das especificações de teste:

```
├── pages/               # Page Objects (Seletores e Ações)
│   ├── CartPage.js      # Gerenciamento do Carrinho
│   ├── ProductPage.js   # Catálogo e Reviews de Produtos
│   ├── CheckoutPage.js  # Fluxo de Pedidos e Pagamento
│   ├── NewsletterPage.js # Inscrição em Newsletter
│   └── ContactPage.js    # Formulário de Suporte
├── tests/               # Specs de Teste (Cenários BDD)
│   ├── cart.spec.js
│   ├── catalog.spec.js
│   ├── checkout.spec.js
│   ├── newsletter.spec.js
│   └── contact.spec.js
├── package.json         # Dependências do projeto
└── playwright.config.js # Configurações do Playwright
```

---

## 📝 Cenários de Teste (BDD)

### ⚙️ Como Executar o Projeto
1. Pré-requisitos
Certifique-se de ter o Node.js instalado em sua máquina (versão 14 ou superior).

2. Download e Instalação

```bash
git clone git@github.com:KiraOliveira/apwTestingPlaywright.git
```

3. Execução dos Testes
* Para rodar todos os testes em modo headless (segundo plano):
```bash
npx playwright test
```

* Para rodar os testes e visualizar a execução (modo UI):
```bash
npx playwright test --ui
```

* Para visualizar o relatório após a execução:
```bash
npx playwright show-report
```
---

### 📋 Cenários Automatizados
A suíte contempla os seguintes casos de teste:

Autenticação (TC02, TC03 e TC04): Login com dados corretos, incorretos e logout.

Registro (TC01 e TC05): Novo registro e registro com dados já existentes.

Catálogo (TC08, TC09, TC18, TC19, TC21): Validação de detalhes, busca, filtros por categoria/marca e envio de reviews.

Carrinho (TC12, TC13, TC17, TC20, TC22): Adição de múltiplos produtos, ajuste de quantidades e persistência após login.

Newsletter (TC10, TC11): Assinatura de newsletter na Home e na página do Carrinho.

Checkout (TC14, TC15, TC16, TC23, TC24): Fluxo completo de compra, validação de endereço e download de fatura.

Suporte (TC06): Envio de formulário de contato com anexo de arquivo.

### Execução dos testes
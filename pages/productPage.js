const { expect } = require('@playwright/test');

class ProductPage {
    constructor(page) {
        this.page = page;
        // Locators baseados na interface do site
        this.productsLink = page.getByRole('link', { name: ' Products' });
        this.searchField = page.locator('#search_product');
        this.submitSearch = page.locator('#submit_search');
        this.allProductsTitle = page.locator('.title:has-text("All Products")');
        this.searchedProductsTitle = page.locator('.title:has-text("Searched Products")');
        this.viewProductBtn = page.locator('.choose >> text=View Product');
        
        // Locators para Detalhes e Review
        this.productInfo = page.locator('.product-information');
        this.reviewName = page.locator('#name');
        this.reviewEmail = page.locator('#email');
        this.reviewText = page.locator('#review');
        this.submitReviewBtn = page.locator('#button-review');
    }

    async acessarProdutos() {
        await this.productsLink.click();
    }

    async pesquisarProduto(nome) {
        await this.searchField.fill(nome);
        await this.submitSearch.click();
    }

    async selecionarCategoria(genero, subcategoria) {
        await this.page.click(`a[data-toggle="collapse"]:has-text("${genero}")`);
        await this.page.click(`a:has-text("${subcategoria}")`);
    }

    async selecionarMarca(marca) {
        await this.page.click(`.brands-name >> text=${marca}`);
    }

    async enviarReview(nome, email, comentario) {
        await this.reviewName.fill(nome);
        await this.reviewEmail.fill(email);
        await this.reviewText.fill(comentario);
        await this.submitReviewBtn.click();
    }
}

module.exports = { ProductPage };
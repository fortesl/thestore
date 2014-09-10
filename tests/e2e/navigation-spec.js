(function() {
    'use strict';

    var ProductsListPage = require('./product-list-page');
    var ProductDetailPage = require('./product-detail-page');
    var HomePage = require('./home-page');

    describe('Home', function () {
        var homePage;

        beforeEach(function() {
            homePage = new HomePage();
        });

        it('should have a search icon', function() {
            expect(homePage.isSearchIconVisible()).toEqual(true);
        });

        it('should have a footer navigation bar', function() {
            expect(homePage.isFooterNavigationBarVisible()).toEqual(true);
        });

    });

    describe('ProductList', function() {

        var productListPage;

        beforeEach(function() {
            productListPage = new ProductsListPage();
            browser.debugger();
        });

        it('should show a product list on the first page', function () {
            expect(productListPage.getProductListRows().count()).toBeGreaterThan(0);
            expect(productListPage.getProductIdForRow(0)).toBeTruthy();
            expect(productListPage.getProductNameForRow(0)).toBeTruthy();
            expect(productListPage.getProductPriceForRow(0)).toBeTruthy();
            expect(productListPage.getProductImagesForRow(0)).toBeTruthy();
        });

    });

    describe('ProductDetail', function() {

        var productDetailPage;

        beforeEach(function() {
            productDetailPage =  new ProductDetailPage('Azurite');
            browser.debugger();
        });

        it('should show expected detail for productid=Azurite', function () {
            expect(productDetailPage.getProductName()).toBeTruthy();
            expect(productDetailPage.getProductPrice()).toEqual('$110.50');
        });

    });

})();

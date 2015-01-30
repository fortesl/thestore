/**
 * Name: productList-spec.js
 * Created by lfortes on 1/2/2015.
 */

(function () {
    'use strict';

    var ProductsListPage = require('./pageObjects/product-list-page');

    describe('ProductList', function() {

        var productListPage;

        beforeEach(function() {
            productListPage = new ProductsListPage();
        });

        it('should show a product list on the first page', function () {
            expect(productListPage.getProductListRows().count()).toBeGreaterThan(0);
            expect(productListPage.getProductNameForRow(0)).toBeTruthy();
            expect(productListPage.getProductPriceForRow(0)).toBeTruthy();
            expect(productListPage.getProductDescriptionForRow(0)).toBeTruthy();
        });

    });



})();
/**
 * Name: productDetail-spec.js
 * Created by lfortes on 1/2/2015.
 */

(function () {
    'use strict';

    var ProductDetailPage = require('./pageObjects/product-detail-page');

    describe('ProductDetail', function() {

        var productDetailPage;

        beforeEach(function() {
            productDetailPage =  new ProductDetailPage('Azurite');
            browser.debugger();
        });

        it('should show expected detail for productid=Azurite', function () {
            expect(productDetailPage.getProductName()).toBeTruthy();
            expect(productDetailPage.getProductPrice()).toContain('110.5');
        });

    });

})();
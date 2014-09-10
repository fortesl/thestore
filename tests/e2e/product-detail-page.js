/**
 * Created by fortesl on 9/5/2014.
 */
(function () {
    'use strict';

    var ProductDetailPage = function(productId) {
        browser.get('#/products/' + productId);
    };

    ProductDetailPage.prototype.getProductName = function() {
        return element(by.binding('productDetailCtrl.product.name'));
    };

    ProductDetailPage.prototype.getProductPrice = function() {
        return element(by.binding('productDetailCtrl.product.price')).getText();
    };

    module.exports = ProductDetailPage;

})();

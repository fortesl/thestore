/**
 * Created by fortesl on 9/5/2014.
 */
(function () {
    'use strict';

    var ProductListPage = function() {
        browser.get('#/products');
    };

    ProductListPage.prototype.getProductListRows = function() {
        return element.all(by.repeater('product in productCtrl.products | filter:query | orderBy:productCtrl.sortOrder'));
    };

    ProductListPage.prototype.getProductNameForRow = function(row) {
        return element(by.repeater('product in productCtrl.products | filter:query | orderBy:productCtrl.sortOrder').row(row).column('product.name'));
    };

    ProductListPage.prototype.getProductPriceForRow = function(row) {
        return element(by.repeater('product in productCtrl.products | filter:query | orderBy:productCtrl.sortOrder').row(row).column('product.price'));
    };

    ProductListPage.prototype.getProductIdForRow = function(row) {
        return element(by.repeater('product in productCtrl.products | filter:query | orderBy:productCtrl.sortOrder').row(row).column('product.id'));
    };

    ProductListPage.prototype.getProductImagesForRow = function(row) {
        return element(by.repeater('product in productCtrl.products | filter:query | orderBy:productCtrl.sortOrder').row(row).column('product.images'));
    };

    module.exports = ProductListPage;

})();
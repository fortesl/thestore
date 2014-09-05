(describe('Routing Test', function() {
    'use strict';
    
    it('should show a product list, header & footer on the first page', function() {

        browser.get('/');

        var rows = element.all(by.repeater('product in productCtrl.products'));
        expect(rows.count()).toBeGreaterThan(0);

        var firstRowName = element(by.repeater('product in productCtrl.products').row(0).column('product.name'));
        var firstRowPrice = element(by.repeater('product in productCtrl.products').row(0).column('product.price'));
        var firstRowImages = element(by.repeater('product in productCtrl.products').row(0).column('product.images'));
        var firstRowId = element(by.repeater('product in productCtrl.products').row(0).column('product.id'));

        expect(firstRowId).toBeTruthy();
        expect(firstRowName).toBeTruthy();
        expect(firstRowPrice).toBeTruthy();
        expect(firstRowImages).toBeTruthy();

        expect(element(by.css('.glyphicon-search')).isDisplayed()).toBe(true);
        expect(element(by.css('.navbar-fixed-bottom')).isDisplayed()).toBe(true);

    });

    it('should navigate to product-detail page', function() {

        var productId = 'Azurite';
        browser.get('#/products/' + productId);
        expect(browser.getCurrentUrl()).toContain('#/products/' + productId);

        var productName = element(by.binding('productDetailCtrl.product.name'));
        expect(productName.getText()).toContain('Azurite');
        var productPrice = element(by.binding('productDetailCtrl.product.price'));
        expect(productPrice.getText()).toEqual('$110.50');

//        element(by.id('reviewsTab')).click();
//        expect(element(by.name('ReviewForm'))).toBeTruthy();
//
//        var review = element(by.model('reviewCtrl.review.body'));
//        var email = element(by.model('reviewCtrl.review.author'));
//        var stars = element(by.model('reviewCtrl.review.stars'));
//        review.sendKeys('I really enjoyed this product. Would sure buy again');
//        email.sendKeys('lmlf100@gmail.com');

//        element(by.css('.btn btn-primary')).click();

//        expect(email.getText()).toBeFalsy();

    });
}));

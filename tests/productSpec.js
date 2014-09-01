/**
 * Created by fortesl on 8/30/2014.
 */

describe('ProductController', function() {
    'use strict';

    //Instantiate a new version of the 'product' module before each test
    beforeEach(module('product'));

    var productCtrl, productListService;

    //inject $controller and $httpBackend  before each test
    beforeEach(inject(function($controller, ProductListService) {
        spyOn(ProductListService, 'get').andCallThrough()
        productListService = ProductListService;
        productCtrl = $controller('ProductController');
    }));

    it('products should be loaded from server', function() {
        expect(productListService.get).toHaveBeenCalled();
        expect(productListService.get.callCount).toEqual(1);
    })

});

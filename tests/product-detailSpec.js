/**
 * Created by fortesl on 9/1/2014.
 */

describe('ProductDetailController', function() {
    'use strict';

    //Instantiate a new version of the 'product-detail' module before each test
    beforeEach(module('productDetail'));

    var productDetailCtrl, mockBackend;

    //inject $controller and $httpBackend  before each test
    beforeEach(inject(function($controller, $httpBackend) {

        mockBackend = $httpBackend;

        mockBackend.expectGET('data/Azurite.json').respond({
            "id": "Azurite",
            "soldOut": false,
            "name":"Azurite",
            "description":"Some gems have hidden qualities beyond their luster, beyond their shine... Azurite is one of those gems.",
            "shine":8,
            "price":110.5,
            "rarity":7,
            "color":"#CCC",
            "faces":14,
            "images":["images/Chrysanthemum.jpg","images/Desert.jpg","images/Hydrangeas.jpg"],
            "reviews":
                [
                    {"stars":5,"body":"I love this gem!","author":"joe@example.org","createdOn":1397490980837},
                    {"stars":1,"body":"This gem sucks.","author":"tim@example.org","createdOn":1397490980837}
                ]
        });

        productDetailCtrl = $controller('ProductDetailController');
    }));

 /*
    afterEach(function() {
        mockBackend.verifyNoOutstandingExpectation();
        mockBackend.verifyNoOutstandingRequest();
    });
  */

    it('should be defined', function() {
        expect(productDetailCtrl).toBeDefined();
    });

    /*
    it('Should load product from server', function() {
        expect(productDetailCtrl.product).toBeUndefined();
        mockBackend.flush();
        expect(productDetailCtrl.product.name).toBeTruthy();
    });
    */

});

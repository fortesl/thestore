/**
 * Created by fortesl on 8/30/2014.
 */

describe('ProductController', function() {

    //Instantiate a new version of the 'product' module before each test
    beforeEach(module('product'));

    var productCtrl, mockService;

    //mock ProductListService
    beforeEach(module(function($provide) {
        mockService = {
            get: function() {
                return [{
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
                }];
            }
        };
        $provide.value('ProductListService', mockService);

    }));

    //Inject the ProductController
    beforeEach(inject(function($controller) {
        productCtrl = $controller('ProductController');
    }));

    //ProductController exists in module
    it('ProductController exists', function() {
        expect(productCtrl).toBeDefined();
        expect(productCtrl.products).toBeDefined();
    })


     it('ProductController Should have products', function() {
         expect(productCtrl.products.length).toBeGreaterThan(0);
    });

    it('products should have valid properties', function() {
        expect(productCtrl.products[0].id).toBeTruthy();
        expect(productCtrl.products[0].name).toBeTruthy();
        expect(productCtrl.products[0].price).toBeGreaterThan(0);
        expect(productCtrl.products[0].description).toBeTruthy();
        expect(productCtrl.products[0].images.length).toBeTruthy();
    });
});

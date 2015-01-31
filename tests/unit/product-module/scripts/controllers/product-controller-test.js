(function() {
    'use strict';

    describe('ProductController with spies on ProductService.getList', function() {

        var testCtrl, productService;
        beforeEach(module('product'));

        beforeEach(inject(function($controller, ProductService) {
            productService = ProductService;
            spyOn(productService, 'getList').andCallThrough();
            testCtrl = $controller('ProductController');
        }));

        it('should call ProductService.getList', function() {
            expect(productService.getList).toHaveBeenCalled();
            expect(productService.getList.callCount).toEqual(1);
            expect(testCtrl.products.length).toEqual(0);
        });
    });

    describe('ProductController with mocked $http calls', function() {

        beforeEach(module('product'));

        var testCtrl, httpBackend, rootScope, controller;

        beforeEach(inject(function($controller, $httpBackend, $rootScope) {
            httpBackend = $httpBackend;
            rootScope = $rootScope;
            controller = $controller;
        }));

        it('should load products from $httpBackend', function() {
            //controller instantiated
            httpBackend.expectGET('storeData/products.json')
                .respond(404, {msg: 'Not Found'});
            testCtrl = controller('ProductController');
            expect(testCtrl.products).toEqual([]);

            //simulate server response
            httpBackend.flush();

            //and check the error message
            expect(testCtrl.errorMessage).toEqual('Not Found');

            httpBackend.expectGET('storeData/products.json').respond([{name:'Azurite', description:'A world class diamond', id:'Azurite'}]);
            testCtrl = controller('ProductController');
            //simulate server response
            httpBackend.flush();
            expect(testCtrl.products.length).toEqual(1);

            rootScope.$emit('$translateChangeSuccess');
            expect(testCtrl.productSort.length).toBeGreaterThan(0);
        });


        afterEach( function() {
            // Ensure that all expects set on the $ httpBackend
            // were actually called
            httpBackend.verifyNoOutstandingExpectation();

            // Ensure that all requests to the server
            // have actually responded (using flush())
            httpBackend.verifyNoOutstandingRequest();
        });

    });

})();

/**
 * product-detail-controller-test.js
 * Created by fortesl on 9/4/2014.
 */

(function() {
    'use strict';

    describe('Controller: ProductDetailController', function() {

        beforeEach(module('storeApp'));

        var ctrl, mockBackend, controller, routeParams;
        beforeEach(inject(function($controller, $httpBackend, $routeParams) {
            mockBackend = $httpBackend;
            controller = $controller;
            routeParams = $routeParams;
            mockBackend.expectGET('i18n/messages_en.json').respond({
                "LANGUAGE": "English"
            });
        }));

        it('should get product details', function() {
            mockBackend.expectGET('storeData/Azurite.json').respond({
                "id": "Azurite",
                "onHand": 4,
                "name": "Azurite",
                "description": "Some gems have hidden qualities beyond their luster, beyond their shine... Azurite is one of those gems."
            });

            routeParams.productId = 'Azurite';
            ctrl = controller('ProductDetailController', routeParams);
            expect(Object.getOwnPropertyNames(ctrl.product).length).toEqual(0);
            mockBackend.flush();
            expect(ctrl.product.name).toEqual('Azurite');

            mockBackend.expectGET('storeData/NotAzurite.json').respond(404, {msg:"Not Found"});
            routeParams.productId = 'NotAzurite';
            ctrl = controller('ProductDetailController', routeParams);
            mockBackend.flush();
            expect(ctrl.errorMessage).toEqual('Not Found');

        });


        afterEach(function() {
           mockBackend.verifyNoOutstandingExpectation();
           mockBackend.verifyNoOutstandingRequest();
        });
    });

})();

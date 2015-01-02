/**
 * product-detail-controller-test.js
 * Created by fortesl on 9/4/2014.
 */

(function() {
    'use strict';

    describe('Controller: ProductDetailController', function() {

        beforeEach(module('storeApp'));

        var ctrl, mockBackend;
        beforeEach(inject(function($controller, $httpBackend, $routeParams) {
            mockBackend = $httpBackend;
            mockBackend.expectGET('i18n/messages_en.json').respond({
                "LANGUAGE": "English"
            });
            mockBackend.expectGET('storeData/Azurite.json').respond({
                    "id": "Azurite",
                    "onHand": 4,
                    "name": "Azurite",
                    "description": "Some gems have hidden qualities beyond their luster, beyond their shine... Azurite is one of those gems."
                });

            $routeParams.productId = 'Azurite';
            ctrl = $controller('ProductDetailController', $routeParams);
        }));

        it('should get product details', function() {
            expect(Object.getOwnPropertyNames(ctrl.product).length).toEqual(0);

            mockBackend.flush();

            expect(ctrl.product.name).toEqual('Azurite');
        });


        afterEach(function() {
           mockBackend.verifyNoOutstandingExpectation();
           mockBackend.verifyNoOutstandingRequest();
        });
    });

})();

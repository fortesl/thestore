/**
 * Created by fortesl on 9/1/2014.
 */

(function() {
    'use strict';

    angular.module('product').controller('ProductDetailController', ['$routeParams', 'ProductService', 'ProductLabels',
        function($routeParams, ProductService, ProductLabels) {
            var self = this;

            self.init = function() {
                self.productId = $routeParams.productId;
                self.product = {};
                self.labels = ProductLabels;

                ProductService.getDetail(self.productId).then(
                    function(response) {
                        self.product = response.data;
                    },
                    function(errResponse) {
                        console.error(errResponse.data.msg);
                    });
            };

            self.init();

        }
    ]);

})();
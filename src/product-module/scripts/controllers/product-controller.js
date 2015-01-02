/**
 * Name: product-controller.js
 * Created by lfortes
 */


(function() {
    'use strict';

    angular.module('product').controller('ProductController', ['ProductService', '$rootScope', 'ProductLabels',
        function(ProductService, $rootScope, ProductLabels) {

            var self = this;

            self.init = function() {
                self.products = [];
                self.selectedProduct = 0;
                self.sortOrder = '';
                self.labels = ProductLabels;
                self.productSort = [];

                $rootScope.$on('$translateChangeSuccess', function() {
                    self.setProductSortItems();
                });

                ProductService.getList().then(
                    function(response) {
                        self.products = response.data;
                        self.selectRandomProduct();
                    },
                    function(errResponse) {
                        ProductService.errorMessage = errResponse.data.msg;
                        self.errorMessage = errResponse.data.msg;
                    }
                );
            };

            self.setProductSortItems = function() {
                self.productSort.length = 0;
                self.productSort.push({value:'name', label:self.labels.sortByProductNameAsc()});
                self.productSort.push({value:'-name', label:self.labels.sortByProductNameDesc()});
                self.productSort.push({value:'price', label:self.labels.sortByProductPriceAsc()});
                self.productSort.push({value:'-price', label:self.labels.sortByProductPriceDesc()});
            };

            self.selectRandomProduct = function() {
                self.selectedProduct = Math.floor((Math.random() * self.products.length));
                return self.selectedProduct;
            };

            self.init();
        }
    ]);

})();
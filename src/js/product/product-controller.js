(function() {
    'use strict';

    var app = angular.module('product');

    app.controller('ProductController', ['ProductService', '$filter',
        function(ProductService, $filter) {

            var self = this;
            self.products = [];
            self.selectedProduct = 0;
            self.sortOrder = '';
            self.productSort = [
                {value:'name', label:$filter('translate')('SORT_BY_PRODUCT_NAME_ASC')},
                {value:'-name', label:$filter('translate')('SORT_BY_PRODUCT_NAME_DESC')},
                {value:'price', label:$filter('translate')('SORT_BY_PRODUCT_PRICE_ASC')},
                {value:'-price', label:$filter('translate')('SORT_BY_PRODUCT_PRICE_DESC')}
            ];

            self.selectRandomProduct = function() {
                self.selectedProduct = Math.floor((Math.random() * self.products.length));
                return self.selectedProduct;
            };

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
        }
    ]);

    app.directive('productList', function() {
        return {
            restrict: 'E',
            templateUrl: 'views/product/product-list.html'
        };
    });

    app.directive('productCarousel', function() {
        return {
            restrict: 'E',
            templateUrl: 'views/product/product-carousel.html'
        };
    });


})();
(function() {
    'use strict';

    var app = angular.module('product');

    app.controller('ProductController', ['ProductService', '$rootScope', '$translate',
        function(ProductService, $rootScope, $translate) {

            $rootScope.storeTitle = $translate.instant('PRODUCT_LIST_TITLE');

            var self = this;
            self.products = [];
            self.selectedProduct = 0;
            self.sortOrder = '';

            self.productSort = [
                {value:'name', label:'Product Name (A to Z)'},
                {value:'-name', label:'Product Name (Z to A)'},
                {value:'price', label:'Price (Low to High)'},
                {value:'-price', label:'Price (High to Low)'}
            ];

            $rootScope.$on('$translateChangeSuccess', function() {
                self.setProductSortItems();
            });

            self.setProductSortItems = function() {
                self.productSort.length = 0;
                self.productSort.push({value:'name', label:$translate.instant('SORT_BY_PRODUCT_NAME_ASC')});
                self.productSort.push({value:'-name', label:$translate.instant('SORT_BY_PRODUCT_NAME_DESC')});
                self.productSort.push({value:'price', label:$translate.instant('SORT_BY_PRODUCT_PRICE_ASC')});
                self.productSort.push({value:'-price', label:$translate.instant('SORT_BY_PRODUCT_PRICE_DESC')});
            };



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
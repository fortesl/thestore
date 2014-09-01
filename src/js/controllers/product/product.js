(function() {
    'use strict';

    var app = angular.module('product', []);

    app.controller('ProductController', ['ProductListService',
        function(ProductListService) {
            var self = this;
            self.products = [];
            self.selectedProduct = 0;
            self.sortOrder = '';
            self.productSort = [
                {value:"name", label:"Product Name (A to Z)"},
                {value:"-name", label:"Product Name (Z to A)"},
                {value:"price", label:"Price (Low to High)"},
                {value:"-price", label:"Price (High to Low)"}
            ];

            self.selectRandomProduct = function() {
                self.selectedProduct = Math.floor((Math.random() * self.products.length));
                return self.selectedProduct;
            };

            ProductListService.get().success(function(data) {
                self.products = data;
                self.selectRandomProduct();
            });
        }
    ]);

    app.factory('ProductListService', ['$http', function($http) {
        return {
            get: function() { return $http.get('data/products.json'); }
        };
    }]);

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
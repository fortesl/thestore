/**
 * Name: product-app.js
 * Created by lfortes on 11/27/2014.
 */

(function () {
    'use strict';

    angular
        .module('product', ['ngRoute', 'pascalprecht.translate'])

        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.
                when('/products', {
                    templateUrl: 'modules/product-module/views/products.html',
                    controller: 'ProductController as productCtrl'
                }).
                when('/products/:productId', {
                    templateUrl: 'modules/product-module/views/product-details.html',
                    controller: 'ProductDetailController as productDetailCtrl'
                });
        }]);

})();
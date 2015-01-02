/**
 * Name: product-list-directive.js
 * Created by lfortes on 11/27/2014.
 */

(function () {
    'use strict';

    angular.module('product').directive('stProductList', function() {
        return {
            restrict: 'E',
            templateUrl: 'product-module/views/product-list.html'
        };
    });

})();
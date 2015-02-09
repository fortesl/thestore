/**
 * Name: product-detail-description.js
 * Created by lfortes on 11/27/2014.
 */

(function () {
    'use strict';

    angular.module('product').directive('stProductDetailDescription', function() {
        return {
            restrict: 'A',
            templateUrl: 'modules/product-module/views/product-detail-description.html'
        };
    });

})();
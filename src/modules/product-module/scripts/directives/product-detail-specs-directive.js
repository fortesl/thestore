/**
 * Name: product-detail-specs-directive.js
 * Created by lfortes on 11/27/2014.
 */

(function () {
    'use strict';

    angular.module('product').directive('stProductDetailSpecs', function() {
        return {
            restrict: 'A',
            templateUrl: 'modules/product-module/views/product-detail-specs.html'
        };
    });

})();
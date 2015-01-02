/**
 * Name: product-detail-submit-review-directive.js
 * Created by lfortes on 11/27/2014.
 */

(function () {
    'use strict';

    angular.module('product').directive('stProductDetailSubmitReview', function() {
        return {
            restrict: 'E',
            templateUrl: 'product-module/views/product-detail-submit-review.html'
        };
    });

})();
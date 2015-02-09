/**
 * Name: product-detail-reviews-directive.js
 * Created by lfortes on 11/27/2014.
 */

(function () {
    'use strict';

    angular.module('product').directive('stProductDetailReviews', function() {
        return {
            restrict: 'A',
            templateUrl: 'modules/product-module/views/product-detail-reviews.html',
            controller: [function() {
                var self = this;
                self.review = {};
                self.starSystem = [5, 4, 3, 2, 1];

                self.addReview = function(product) {
                    self.review.createdOn = Date.now();
                    product.reviews.push(this.review);
                    self.review = {};
                };
            }],
            controllerAs: 'reviewCtrl'
        };
    });

})();
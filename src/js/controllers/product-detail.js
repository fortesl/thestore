/**
 * Created by fortesl on 9/1/2014.
 */

(function() {
    'use strict';

    var app = angular.module('productDetail', []);

    app.controller('ProductDetailController', ['$routeParams', 'ProductDetailService',
        function($routeParams, ProductDetailService) {
            this.productId = $routeParams.productId;
            var self = this;

            ProductDetailService.get(self.productId).success(function(data) {
                self.product = data;
            });
        }
    ]);

    app.factory('ProductDetailService', ['$http', function($http) {
        return {
            get: function(productId) { return $http.get('data/' + productId + '.json'); }
        };
    }]);

    app.directive('productSubmitReview', function() {
        return {
            restrict: 'E',
            templateUrl: "views/product/product-submit-review.html"
        };
    });

    app.directive('productTabs', function() {
        return {
            restrict: 'E',
            templateUrl: "views/product/product-tabs.html",
            controller: [function() {
                var self = this;
                self.tab = 1;

                self.selectTab = function(tab) {
                    self.tab = tab;
                };

                self.isSelected = function(tab) {
                    return self.tab === tab;
                };
            }],
            controllerAs: "panelCtrl"
        };
    });

    app.directive('productSpecs', function() {
        return {
            restrict: 'A',
            templateUrl: "views/product/product-specs.html"
        };
    });

    app.directive('productDescription', function() {
        return {
            restrict: 'A',
            templateUrl: "views/product/product-description.html"
        };
    });

    app.directive('productReviews', function() {
        return {
            restrict: 'A',
            templateUrl: "views/product/product-reviews.html",
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

    app.directive('productImageGallery', function() {
        return {
            restrict: 'E',
            templateUrl: "views/product/product-image-gallery.html",
            controller: [function() {
                var self = this;
                self.current = 0;

                self.setCurrent = function(current) {
                    self.current = current;
                };
            }],
            controllerAs: "galleryCtrl"
        };
    });


})();
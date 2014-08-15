(function() {
    "use strict";

    var app = angular.module('store-products', []);
    
    app.directive('productSubmitReview', function() {
        return {
          restrict: 'E',
          templateUrl: "partials/product-submit-review.html"
        };
    });
    
    app.directive('productTabs', function() {
       return {
           restrict: 'E',
           templateUrl: "partials/product-tabs.html",
           controller: function() {
                this.tab = 1;

                this.selectTab = function(tab) {
                  this.tab = tab;  
                };

                this.isSelected = function(tab) {
                  return this.tab === tab;
                };
           },
           controllerAs: "panel"
       }; 
    });
    
    app.directive('productSpecs', function() {
        return {
            restrict: 'A',
            templateUrl: "partials/product-specs.html"
        };
    });
    
    app.directive('productDescription', function() {
        return {
            restrict: 'A',
            templateUrl: "partials/product-description.html"
        };
    });
    
    app.directive('productReviews', function() {
        return {
            restrict: 'A',
            templateUrl: "partials/product-reviews.html",
            controller: function() {
                this.review = {};
                this.starSystem = [5,4,3,2,1];

                this.addReview = function(product) {
                    this.review.createdOn = Date.now();
                    product.reviews.push(this.review);
                    this.review={};
                };
             },
             controllerAs:'reviewCtrl'
        };
    });

    app.directive('productList', function() {
        return {
            restrict: 'E',
            templateUrl: "partials/product-list.html"
        };
    });

    app.directive('productCarousel', function() {
        return {
            restrict: 'E',
            templateUrl: "partials/product-carousel.html"
        };
    });
    
    app.directive('productImageGallery', function() {
       return {
            restrict: 'E',
            templateUrl: "partials/product-image-gallery.html",
            controller: function() {
               this.current = 0;

               this.setCurrent = function(current) {
                 this.current = current;  
               };
           },
           controllerAs: "gallery"
       }; 
    });
    
})();


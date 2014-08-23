(function() {
    "use strict";

    var app = angular.module('store', ['store-products']);

    app.controller('StoreController', ['$http',
        function($http) {
            var self = this;
            self.products = [];

            $http.get('data/products.json').success(function(data) {
                self.products = data;
            });
        }
    ]);

    app.controller('ProductController', ['$routeParams', '$http',
        function($routeParams, $http) {
            this.productId = $routeParams.productId;
            var self = this;

            $http.get('data/' + self.productId + '.json').success(function(data) {
                self.product = data;
            });
        }
    ]);
    
    app.controller('FooterController', ['$http', 
        function($http) {
            var self = this;
            self.metadata = {};
            
            $http.get('data/metadata.json').success(function(data) {
                self.metadata = data;
            });
        }
    ]);

    app.directive('siteHeader', function() {
        return {
            restrict: 'E',
            templateUrl: 'site-header.html'
        };
    });

    app.directive('siteFooter', function() {
        return {
            restrict: 'E',
            templateUrl: 'site-footer.html'
        };
    });


})();
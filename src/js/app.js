(function() {
    'use strict';

    var storeApp = angular.module('storeApp', ['ngRoute', 'product', 'user']);
    angular.module('product', []);

    storeApp.config(['$routeProvider',
        function($routeProvider) {
            $routeProvider.
            when('/', {
                templateUrl: 'views/product/products.html',
                controller: 'ProductController as productCtrl'
            }).
            when('/products/:productId', {
                templateUrl: 'views/product/product-details.html',
                controller: 'ProductDetailController as productDetailCtrl'
            }).
            when('/signup', {
                templateUrl: 'views/user/sign-up.html',
                controller: 'UserController as userCtrl'
            }).
            otherwise({
                redirectTo: '/'
            });
        }
    ]);


    storeApp.factory('MetadataService', ['$http', function($http) {
        return {
            get: function() { return $http.get('data/metadata.json'); }
        };
    }]);


    storeApp.directive('siteHeader', function() {
        return {
            restrict: 'E',
            templateUrl: 'site-header.html'
        };
    });

    storeApp.directive('siteFooter', function() {
        return {
            restrict: 'E',
            templateUrl: 'site-footer.html',
            controller: ['MetadataService', function(MetadataService) {
                var self = this;
                MetadataService.get().success(function(data){
                    self.metadata = data;
                });
            }],
            controllerAs: 'footerCtrl'
        };
    });

})();
   
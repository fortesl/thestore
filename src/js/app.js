(function() {
    "use strict";

    var storeApp = angular.module('storeApp', ['ngRoute', 'store']);

    storeApp.config(['$routeProvider',
      function($routeProvider) {
        $routeProvider.
          when('/products', {
            templateUrl: 'partials/products.html',
            controller: 'StoreController as storeCtrl'
          }).
          when('/products/:productId', {
            templateUrl: 'partials/product-details.html',
            controller: 'ProductController as productCtrl'
          }).
          otherwise({
            redirectTo: '/products'
          });
      }]);   
    
})();

   
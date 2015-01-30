/**
 * Name: store-ui-router.js
 * Created by lfortes on 11/14/2014.
 */

(function () {
    'use strict';

    angular.module('storeApp').config(['$routeProvider', '$httpProvider', '$translateProvider',

        function($routeProvider, $httpProvider, $translateProvider) {

            $routeProvider.
                when('/', {
                    templateUrl: 'product-module/views/products.html',
                    controller: 'ProductController as productCtrl'
                }).
                when('/products', {
                    templateUrl: 'product-module/views/products.html',
                    controller: 'ProductController as productCtrl'
                }).
                when('/products/:productId', {
                    templateUrl: 'product-module/views/product-details.html',
                    controller: 'ProductDetailController as productDetailCtrl'
                }).
                when('/signup', {
                    templateUrl: 'user-module/views/sign-up.html',
                    controller: 'UserController as userCtrl',
                    resolve: {
                        isLoggedIn: ['$q', 'lfFirebaseAuthService', function($q, lfFirebaseAuthService) {
                            if (lfFirebaseAuthService.isLoggedIn()) {
                                return $q(function(resolve, reject) {
                                    reject('user already in');
                                });
                            }
                        }]
                    }
                }).
                when('/signin', {
                    templateUrl: 'user-module/views/sign-in.html',
                    controller: 'UserController as userCtrl',
                    resolve: {
                        isLoggedIn: ['$q', 'lfFirebaseAuthService', function($q, lfFirebaseAuthService) {
                            if (lfFirebaseAuthService.isLoggedIn()) {
                                return $q(function(resolve, reject) {
                                    reject('user already in');
                                });
                            }
                        }]
                    }
                }).
                when('/changepassword', {
                    templateUrl: 'user-module/views/change-password.html',
                    controller: 'UserController as userCtrl',
                    resolve: {
                        isLoggedIn: ['$q', 'lfFirebaseAuthService', function($q, lfFirebaseAuthService) {
                            if (!lfFirebaseAuthService.isLoggedIn()) {
                                return $q(function(resolve, reject) {
                                    reject('user not logged in');
                                });
                            }
                        }]
                    }
                }).
                when('/logout', {
                    resolve: {
                        logout: ['lfFirebaseAuthService', function(lfFirebaseAuthService) {
                            lfFirebaseAuthService.logout();
                            return 1;
                        }]
                    },
                    redirectTo: '/'
                }).
                otherwise({
                    redirectTo: '/'
                });

            // enable http caching
            $httpProvider.defaults.cache = true;

            //language - localization
            $translateProvider.useStaticFilesLoader({
                prefix: 'i18n/messages_',
                suffix: '.json'
            });
            $translateProvider.preferredLanguage('en');
        }
    ]);

})();
/**
 * Name: user-app.js
 * Created by lfortes on 11/27/2014.
 */

(function () {
    'use strict';

    angular
        .module('user', ['ngRoute', 'directives.inputMatch', 'pascalprecht.translate', 'lfFirebaseAuth'])

        .config(['$routeProvider', function($routeProvider) {
            $routeProvider.
                when('/signup', {
                    templateUrl: 'modules/user-module/views/sign-up.html',
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
                    templateUrl: 'modules/user-module/views/sign-in.html',
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
                when('/logout', {
                    resolve: {
                        logout: ['lfFirebaseAuthService', function(lfFirebaseAuthService) {
                            lfFirebaseAuthService.logout();
                            return 1;
                        }]
                    },
                    redirectTo: '/'
                }).
                when('/changepassword', {
                    templateUrl: 'modules/user-module/views/change-password.html',
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
                });
        }]);

})();
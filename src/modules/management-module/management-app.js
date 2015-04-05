/**
 * Name: management-app.js
 * Created by lfortes on 2/8/2015.
 */

(function () {
    'use strict';

    angular
        .module('management', ['ngRoute', 'pascalprecht.translate', 'angularSpinner', 'lfFirebaseAuth', 'firebase', 'directives.inputMatch', 'lf-toastr'])

        .constant('FIREBASE_URL',  'https://thestore.firebaseio.com')

        .config(['$routeProvider', '$httpProvider', '$translateProvider',
            function($routeProvider, $httpProvider, $translateProvider) {

                $routeProvider.
                    when('/add-product', {
                        resolve:  {
                            isLoggedIn: ['$q', 'lfFirebaseAuthService', function($q, lfFirebaseAuthService) {
                                if (!lfFirebaseAuthService.isLoggedIn()) {
                                    return $q(function(resolve, reject) {
                                        reject('user is not logged in');
                                    });
                                }
                            }]
                        },
                        templateUrl: 'modules/management-module/views/add-product.html',
                        controller: 'AddProductController as addProductCtrl'
                    }).
                    otherwise({
                        redirectTo: '/add-product'
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
/**
 * Name: store-app.js
 * Created by lfortes on 11/14/2014.
 *
 * Defines angular modules for this project
 */

(function() {
    'use strict';

    angular
        .module('storeApp', ['ngRoute', 'product', 'user', 'management', 'lfCookies', 'pascalprecht.translate', 'ui.bootstrap', 'angularSpinner'])

        .constant('FIREBASE_URL',  'https://thestore.firebaseio.com')

        .config(['$routeProvider', '$httpProvider', '$translateProvider',
            function($routeProvider, $httpProvider, $translateProvider) {

                $routeProvider.
                    when('/', {
                        templateUrl: 'modules/product-module/views/products.html',
                        controller: 'ProductController as productCtrl'
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
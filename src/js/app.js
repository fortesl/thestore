(function() {
    'use strict';

    var storeApp = angular.module('storeApp', ['ngRoute', 'product', 'user', 'pascalprecht.translate']);
    angular.module('product', ['pascalprecht.translate']);
    angular.module('user', []);


    //config routing and localization
    storeApp.config(['$routeProvider', '$httpProvider', '$translateProvider',

        function($routeProvider, $httpProvider, $translateProvider) {

            $routeProvider.
            when('/', {
                templateUrl: 'views/product/products.html',
                controller: 'ProductController as productCtrl'
            }).
            when('/products', {
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

            // enable http caching
            $httpProvider.defaults.cache = true;

            //language - localization
            $translateProvider.useStaticFilesLoader({
                prefix: 'i18n/messages_',
                suffix: '.json'
            });
            var language = getCookie('language') || 'en';
            $translateProvider.preferredLanguage(language);
        }
    ]);

    //services
    storeApp.factory('MetadataService', ['$http', function($http) {
        return {
            get: function() { return $http.get('storeData/metadata.json'); }
        };
    }]);

    storeApp.factory('SupportedLanguagesService', ['$http', function($http) {
        return {
            getLanguages: function() { return $http.get('i18n/supported_languages.json'); }
        };
    }]);


    //controller
    storeApp.controller('StoreController', ['$rootScope', '$translate', 'SupportedLanguagesService', 'MetadataService', function($rootScope, $translate, SupportedLanguagesService, MetadataService) {

        var self = this;

        //metadata
        MetadataService.get().success(function(data) {
            $rootScope.storeMetadata = data;
            $rootScope.storeTitle = data.name;
        });

        //language translations
        var setCurrentLanguage = function() {
            self.currentLanguage = self.supportedLanguages[0].code;
            var numberOfLanguages = self.supportedLanguages.length;
            var defaultLanguage = $translate.use();
            for (var i = 0; i < numberOfLanguages; i++) {
                if (self.supportedLanguages[i].code === defaultLanguage) {
                    self.currentLanguage = self.supportedLanguages[i].code;
                    break;
                }
            }
        };

        //language setup
        self.supportedLanguages = [];
        SupportedLanguagesService.getLanguages().then(
            function(response) {
                self.supportedLanguages = response.data;
                if(self.supportedLanguages.length) {
                    setCurrentLanguage();
                }
                else {
                    self.errorMessage = 'Store Error: supportedLanguages not found';
                }
            },
            function(errorResponse) {
                self.errorMessage = errorResponse.data.msg;
            }
        );

        self.switchLanguage = function (languageKey) {
            $translate.use(languageKey);
            //set-cookie
            setCookie('language', languageKey, 365);
        };

        self.setLanguageFromCookie = function() {
            var language = getCookie('language') || 'en';
            $translate.use(language);
        };

    }]);

    //directives
    storeApp.directive('siteHeader', function() {
        return {
            restrict: 'E',
            templateUrl: 'views/site-header.html'
        };
    });

    storeApp.directive('siteFooter', function() {
        return {
            restrict: 'E',
            templateUrl: 'views/site-footer.html'
        };
    });


    //utils
    var setCookie = function (name, value, expirationDays) {
        var d = new Date();
        d.setTime(d.getTime() + (expirationDays*24*60*60*1000));
        var expires = 'expires='+d.toUTCString();
        document.cookie = name + "=" + value + "; " + expires;
    };

    var getCookie = function (name) {
        var cookieName = name + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)===' ') { c = c.substring(1); }
            if (c.indexOf(cookieName) !== -1) {
                return c.substring(cookieName.length,c.length);
            }
        }
        return '';
    };

})();
   
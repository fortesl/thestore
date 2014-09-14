(function() {
    'use strict';

    var storeApp = angular.module('storeApp', ['ngRoute', 'product', 'user', 'pascalprecht.translate']);
    angular.module('product', []);
    angular.module('user', []);


    //config routing and localization
    storeApp.config(['$routeProvider','$translateProvider',

        function($routeProvider, $translateProvider) {

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

            //locallization
            $translateProvider.useStaticFilesLoader({
                prefix: '/i18n/messages_',
                suffix: '.json'
            });

            $translateProvider.preferredLanguage('en');
        }
    ]);

    //services
    storeApp.factory('MetadataService', ['$http', function($http) {
        return {
            get: function() { return $http.get('data/metadata.json'); }
        };
    }]);

    storeApp.factory('SupportedLanguagesService', ['$http', function($http) {
        return {
            getLanguages: function() { return $http.get('i18n/supported_languages.json'); }
        };
    }]);


    //controller
    storeApp.controller('StoreController', ['$translate', 'SupportedLanguagesService', function($translate, SupportedLanguagesService) {

        var self = this;

        //language setup
        self.supportedLanguages = [];
        SupportedLanguagesService.getLanguages().then(
            function(response) {
                self.supportedLanguages = response.data;
                if(self.supportedLanguages.length) {
                    self.currentLanguage = self.supportedLanguages[0].code;
                    var defaultLanguage = $translate.use();
                    for (var i = 0; i < this.supportedLanguages.length; i++) {
                        if (self.supportedLanguages[i].code === defaultLanguage) {
                            self.currentLanguage = self.supportedLanguages[i].code;
                            break;
                        }
                    }
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
        };


    }]);

    //directives
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
   
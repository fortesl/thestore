/**
 * Name: store-controller.js
 * Created by lfortes on 11/14/2014.
 */

(function () {
    'use strict';

    angular.module('storeApp').controller('StoreController', [ 'MetadataService', '$rootScope', 'SupportedLanguagesService', '$translate', 'LFCookieService', '$injector',
        function(MetadataService, $rootScope, SupportedLanguagesService, $translate, LFCookieService, $injector) {

        var self = this;
        self.supportedLanguages = [];
        self.currentLanguage = {};
        var defaultLanguage;

        var init = function() {

            MetadataService.get().then(function (response) {
                self.storeMetadata = response.data;
                $rootScope.storeTitle = response.name;
            });

            //language setup
            SupportedLanguagesService.get().then(
                function(response) {
                    self.supportedLanguages = response.data;
                    if(self.supportedLanguages.length) {
                        self.setCurrentLanguage();
                        $injector.invoke(['StoreLabels', function(StoreLabels){
                            self.labels = StoreLabels;
                        }]);
                    }
                });


        };
        init();

        self.setCurrentLanguage = function () {
            if(self.supportedLanguages.length) {
                defaultLanguage = self.supportedLanguages[0];
                var numberOfLanguages = self.supportedLanguages.length;
                for (var i = 0; i < numberOfLanguages; i++) {
                    if (self.supportedLanguages[i].default) {
                        defaultLanguage = self.supportedLanguages[i];
                        break;
                    }
                }
            }
            if (!self.getLanguageFromCookie()) {
                self.currentLanguage = defaultLanguage;
                $translate.use(self.currentLanguage.code);
            }
        };

        self.switchLanguage = function (language) {
            self.currentLanguage = language;
            LFCookieService.setCookie('language', language.code, 365);
            $translate.use(self.currentLanguage.code);
        };

        self.getLanguageFromCookie = function() {
            var languageCode  = LFCookieService.getCookie('language');
            if (languageCode) {
                selectLanguage(languageCode);
                $translate.use(self.currentLanguage.code);
                return true;
            }
            return false;
        };

        var selectLanguage = function(languageCode) {
            angular.forEach(self.supportedLanguages, function(language) {
                if (languageCode === language.code) {
                    self.currentLanguage = language;
                }
            });
        };

    }]);

})();
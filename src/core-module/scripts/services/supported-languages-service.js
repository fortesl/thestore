/**
 * Name: supported-languages-service.js
 * Created by lfortes on 11/14/2014.
 */

(function () {
    'use strict';

    angular.module('storeApp').factory('SupportedLanguagesService', ['$http', function($http) {
        return {
            get: function() { return $http.get('i18n/supported_languages.json'); }
        };
    }]);


})();
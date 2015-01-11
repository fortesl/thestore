/**
 * Name: supported-languages-service-mock.js
 * Created by lfortes on 1/8/2015.
 */

(function () {
    'use strict';

    angular.module('SupportedLanguagesServiceMock', []).factory('SupportedLanguagesService', ['$q', function($q) {
        return {
            get: function() {

                return $q(function(resolve) {
                    var languages = angular.fromJson('{"data": [{"name": "English", "code": "en"},{"name": "Portugues", "code": "pt_BR", "default": true}]}');
                    resolve(languages);
                });
            }
        };
    }]);

})();
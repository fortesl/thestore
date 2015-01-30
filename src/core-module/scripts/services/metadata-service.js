/**
 * Name: metadata-service.js
 * Created by lfortes on 11/14/2014.
 */

(function () {
    'use strict';

    angular.module('storeApp').factory('MetadataService', ['$http', function($http) {
        return {
            get: function() { return $http.get('storeData/metadata.json'); },
            authData: null
        };
    }]);

})();
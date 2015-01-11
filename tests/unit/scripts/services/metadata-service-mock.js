/**
 * Name: metadata-service-mock.js
 * Created by lfortes on 1/8/2015.
 */

(function () {
    'use strict';

    angular.module('MetadataServiceMock', []).factory('MetadataService', ['$q', function($q) {
        return {
            get: function() {
                return $q(function(resolve) {
                    var metadata = angular.fromJson('{"data": {"name": "TheStore","description": "An online store built on cool technologies."}}');
                    resolve(metadata);
                });
            }

        };
    }]);

})();
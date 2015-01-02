/**
 * Created by lfortes on 11/14/2014.
 */

(function () {
    'use strict';

    angular.module('storeApp').directive('stHeader', function() {
        return {
            restrict: 'E',
            templateUrl: 'views/store-header.html'
        };
    });

})();
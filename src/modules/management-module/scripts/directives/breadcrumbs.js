/**
 * Name: breadcrumbs.js
 * Created by lfortes on 3/22/2015.
 */

(function () {
    'use strict';

    angular.module('management').directive('stBreadcrumbs', function() {
        return {
            restrict: 'E',
            templateUrl: 'modules/management-module/views/breadcrumbs.html'
        };
    });

})();
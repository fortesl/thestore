/**
 * Name: select-department.js
 * Created by lfortes on 2/13/2015.
 */

(function () {
    'use strict';

    angular.module('management').directive('stSelectDepartment', function() {
        return {
            restrict: 'E',
            templateUrl: 'modules/management-module/views/select-department.html'
        };
    });


})();
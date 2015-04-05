/**
 * Name: select-category.js
 * Created by lfortes on 3/16/15.
 */

(function () {
    'use strict';

    angular.module('management').directive('stSelectCategory', function() {
        return {
            restrict: 'E',
            templateUrl: 'modules/management-module/views/select-category.html'
        };
    });


})();
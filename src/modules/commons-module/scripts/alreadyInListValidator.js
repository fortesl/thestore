/**
 * Name: duplicateDepartmentNameValidator.js
 * Created by lfortes on 4/14/2015.
 */

(function () {
    'use strict';

    angular.module('commons').
        directive('stAlreadyInListValidator', [function() {
            return {
                restrict: 'A',
                require: 'ngModel',
                scope: {
                    list: '=',
                    property: '@'
                },
                link: function(scope, element, attrs, ngModelCtrl) {
                    ngModelCtrl.$validators.inlist = function(item) {
                        var valid = true;
                        angular.forEach(scope.list, function(element) {
                            if (item && element[scope.property].toLowerCase() === item.toLowerCase()) {
                                valid = false;
                            }
                        });
                        return valid;
                    };
                }
            };
    }]);

})();
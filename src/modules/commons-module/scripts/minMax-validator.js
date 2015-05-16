/**
 * Name: minMax-validator.js
 * Created by lfortes on 4/14/2015.
 */

(function () {
    'use strict';

    angular.module('commons').
        directive('stMinMaxValidator', [function () {
            return {
                restrict: 'A',
                require: 'ngModel',
                scope: {
                    minValue: '=stMinMaxValidator'
                },
                link: function (scope, element, attrs, ngModelCtrl) {
                    ngModelCtrl.$validators.minMax = function(modelValue) {
                        return Number(modelValue) >= Number(scope.minValue);
                    };

                    scope.$watch('minValue', function() {
                        ngModelCtrl.$validate();
                    });
                }
            };

        }]);

})();
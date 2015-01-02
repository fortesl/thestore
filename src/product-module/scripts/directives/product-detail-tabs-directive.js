/**
 * Name: product-detail-tabs-directive.js
 * Created by lfortes on 11/27/2014.
 */

(function () {
    'use strict';

    angular.module('product').directive('stProductDetailTabs', function() {
        return {
            restrict: 'E',
            templateUrl: 'product-module/views/product-detail-tabs.html',
            controller: [function() {
                var self = this;
                self.isSelected = 1;

                self.selectTab = function(tab) {
                    self.isSelected = tab;
                };
            }],
            controllerAs: 'panelCtrl'
        };
    });

})();
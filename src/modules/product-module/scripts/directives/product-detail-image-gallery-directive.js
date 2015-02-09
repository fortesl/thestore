/**
 * Name: product-detail-image-gallery-directive.js
 * Created by lfortes on 11/27/2014.
 */

(function () {
    'use strict';

    angular.module('product').directive('stProductDetailImageGallery', function() {
        return {
            restrict: 'E',
            templateUrl: 'modules/product-module/views/product-detail-image-gallery.html',
            controller: [function() {
                var self = this;
                self.current = 0;

                self.setCurrent = function(current) {
                    self.current = current;
                };
            }],
            controllerAs: 'galleryCtrl'
        };
    });

})();
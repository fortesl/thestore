/**
 * Created by fortesl on 9/2/2014.
 */

(function() {
    'use strict';

    var app = angular.module('product');

    app.factory('ProductService', ['$http', function($http) {
        return {
            errorMessage: '',

            getList: function() { return $http.get('data/products.json', {cache: true} ); },

            getDetail: function(productId) { return $http.get('data/' + productId + '.json', {cache:true} ); }
        };
    }]);


})();
/**
 * Created by fortesl on 8/30/2014.
 */

(function () {
    'use strict';
    var app = angular.module('user');

    app.controller('UserController', [function() {
        var self = this;

        self.addUser = function() {
            window.console.log(self.user);
            self.user = {};
            return true;
        };

    }]);
})();

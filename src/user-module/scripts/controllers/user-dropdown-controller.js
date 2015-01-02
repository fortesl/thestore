/**
 * Name: user-dropdown-controller.js
 * Created by lfortes on 12/2/2014.
 */

(function () {
    'use strict';

    angular.module('user').controller('UserDropdownController', ['$rootScope', 'UserService', '$location', 'UserLabels', function($rootScope, UserService, $location, UserLabels) {

        var self = this;
        var userLoggedInEventListener = null;

        self.init = function() {

            self.labels = UserLabels;

            self.userDropdownItems = [
                {name: self.labels.logout(), link: 'logoutUser'},
                {divider: 'divider'},
                {name: self.labels.sellItems(), link: 'nada'}
            ];

            self.status = {
                isOpen: false
            };

            if (UserService.isLoggedIn()) {
                var user = UserService.user();
                self.userName = user.firstName + ' ' + user.lastName;
            }
            else {
                self.userName = '';
            }

            if (!userLoggedInEventListener) {
                userLoggedInEventListener = $rootScope.$on('USER_LOGGED_IN_EVENT', function () {
                    $rootScope.$apply(function() {
                        var user = UserService.user();
                        self.userName = user.firstName + ' ' + user.lastName;
                    });
                });
            }

        };

        self.toggleDropdown = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            self.status.isOpen = !self.status.isOpen;
        };

        self.userDropdownItemHandlers = function(handler) {
            if (handler === 'logoutUser') {
                self.logoutUser();
            }
        };

        //user setup
        self.logoutUser = function() {
            UserService.logout();
            self.userName = '';
            $location.path('/#/');
        };

        self.init();

    }]);

})();
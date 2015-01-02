/**
 * Name: user-dropdown-controller.js
 * Created by lfortes on 12/2/2014.
 */

(function () {
    'use strict';

    angular.module('user').controller('UserDropdownController', ['$rootScope', 'UserService', '$location', 'UserLabels', function($rootScope, UserService, $location, UserLabels) {

        var self = this;
        var userLoggedInEventListener = null;
        var changeLanguageEventListener = null;

        var setUserDropDownItems = function() {

            self.userDropdownItems = [
                {name: self.labels.logout(), link: 'logoutUser'},
                {divider: 'divider'},
                {name: self.labels.sellItems(), link: 'nada'}
            ];

        };

       self.init = function() {

            self.labels = UserLabels;

            self.status = {
                isOpen: false
            };
           self.userDropdownItems = [];

            if (UserService.isLoggedIn()) {
                setUserDropDownItems();
                var user = UserService.user();
                self.userName = user.firstName + ' ' + user.lastName;
            }
            else {
                self.userName = '';
            }

            if (!userLoggedInEventListener) {
                userLoggedInEventListener = $rootScope.$on('USER_LOGGED_IN_EVENT', function () {
                    $rootScope.$apply(function() {
                        setUserDropDownItems();
                        var user = UserService.user();
                        self.userName = user.firstName + ' ' + user.lastName;
                    });
                });
            }

           if (!changeLanguageEventListener) {
               changeLanguageEventListener = $rootScope.$on('$translateChangeSuccess', function() {
                   setUserDropDownItems();
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
            $rootScope.$apply(function() {
                self.userName = '';
                $location.path('/#/');
            });
        };

        self.init();

    }]);

})();
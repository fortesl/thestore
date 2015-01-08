/**
 * Name: user-controller.js
 * Created by fortesl on 8/30/2014.
 */

(function () {
    'use strict';

    angular.module('user').controller('UserController', ['UserService', '$location', '$rootScope', 'UserLabels', function(UserService, $location, $rootScope, UserLabels) {
        var self = this;

        self.init = function() {
            self.user = {};
            self.userServiceError = {};
            self.labels = UserLabels;
        };

        self.add = function() {
            UserService.add(self.user, function(userIn){
                 if (userIn) {
                     $rootScope.$emit('USER_LOGGED_IN_EVENT');
                     $rootScope.$apply(function() {
                         self.userServiceError = {};
                         $location.path('/#/');
                     });
                 }
                 else {
                     $rootScope.$apply(self.userServiceError = UserService.userServiceError());
                 }
                });
        };

        self.login = function() {
            UserService.login(self.user, function(userIn) {
                if (userIn) {
                    self.userServiceError = {};
                    $rootScope.$emit('USER_LOGGED_IN_EVENT');
                    var url = (UserService.isTemporaryPassword()) ? '/changepassword' : '/#/';
                    $rootScope.$apply(function() {
                        $location.path(url);
                    });
                }
                else {
                    $rootScope.$apply(self.userServiceError = UserService.userServiceError());
                }
            });
        };

        self.resetPassword = function() {
            self.userServiceError = {};
            if (!self.user.email) {
                self.userServiceError.message = self.labels.enterEmailAddress();
            }
            else {
                UserService.resetPassword(self.user, function (sent) {
                    if (sent) {
                        $rootScope.$apply( function() {
                            self.userServiceError.message = self.labels.resetPasswordEmail();
                            self.resetPasswordRequested = true;
                            self.user = {};
                        });
                    }
                    else {
                        $rootScope.$apply(function() {
                            self.userServiceError = UserService.userServiceError();
                            self.resetPasswordRequested = false;
                        });
                    }
                });
            }
        };

        self.currentUser = function() {
            self.user = UserService.user();
            return self.user;
        };

        self.changePassword = function() {
            UserService.changePassword(self.user, function(changedPassword) {
                if (changedPassword) {
                    $rootScope.$apply(function() {
                        self.userServiceError.message = self.labels.passwordChanged();
                        self.changedPassword = true;
                    });
                }
                else {
                    $rootScope.$apply(function() {
                        self.userServiceError = UserService.userServiceError();
                        self.changedPassword = false;
                    });
                }
            });
        };

        self.init();

    }]);
})();

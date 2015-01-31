/**
 * Name: user-controller.js
 * Created by fortesl on 8/30/2014.
 */

(function () {
    'use strict';

    angular.module('user').controller('UserController', ['lfFirebaseAuthService', '$location', '$rootScope', 'UserLabels', 'usSpinnerService',
        function(lfFirebaseAuthService, $location, $rootScope, UserLabels, usSpinnerService) {
        var self = this;

        var startSpinner = function() {
            if (usSpinnerService) {
                usSpinnerService.spin('spinner-1');
            }
        };

        var stopSpinner = function() {
            if (usSpinnerService) {
                usSpinnerService.stop('spinner-1');
            }
        };

        self.init = function() {
            self.user = {};
            self.userServiceError = {};
            self.labels = UserLabels;
        };

        self.add = function() {
            startSpinner();
            self.userServiceError.message = '...';
            return lfFirebaseAuthService.add(self.user, true).then(function(){
                self.userServiceError = {};
                stopSpinner();
                $location.path('/#/');
            }, function(error) {
                stopSpinner();
                self.userServiceError = error;
            });
        };

        self.login = function() {
            startSpinner();
            self.userServiceError.message = '...';
            return lfFirebaseAuthService.login(self.user).then(function() {
                self.userServiceError = {};
                var url = (lfFirebaseAuthService.isTemporaryPassword()) ? '/changepassword' : '/#/';
                stopSpinner();
                $location.path(url);
            }, function(error) {
                stopSpinner();
                self.userServiceError = error;
            });
        };

        self.resetPassword = function() {
            self.userServiceError = {};
            if (!self.user.email) {
                self.userServiceError.message = self.labels.enterEmailAddress();
            }
            else {
                startSpinner();
                self.userServiceError.message = '...';
                return lfFirebaseAuthService.resetPassword(self.user).then(function () {
                    self.userServiceError.message = self.labels.resetPasswordEmail();
                    self.resetPasswordRequested = true;
                    stopSpinner();
                    self.user = {};
                }, function (error) {
                    self.userServiceError = error;
                    stopSpinner();
                    self.resetPasswordRequested = false;
                });
            }
        };

        self.currentUser = function() {
            self.user = lfFirebaseAuthService.user();
            return self.user;
        };

        self.changePassword = function() {
            startSpinner();
            self.userServiceError.message = '...';
            return lfFirebaseAuthService.changePassword(self.user).then(function() {
                self.userServiceError.message = self.labels.passwordChanged();
                stopSpinner();
                self.changedPassword = true;
            }, function(error) {
                self.userServiceError = error;
                stopSpinner();
                self.changedPassword = false;
            });
        };

        self.init();

    }]);
})();

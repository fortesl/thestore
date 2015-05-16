/**
 * Name: user-controller.js
 * Created by fortesl on 8/30/2014.
 */

(function () {
    'use strict';

    angular.module('user').controller('UserController', ['lfFirebaseAuthService', '$location', '$rootScope', 'UserLabels', 'usSpinnerService', 'lfToastrService', '$routeParams',
        function(lfFirebaseAuthService, $location, $rootScope, UserLabels, usSpinnerService, lfToastrService, $routeParams) {
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

            if ($routeParams.emailAddress) {
                self.user.email = $routeParams.emailAddress;
            }
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
                lfToastrService.openToast(error.message, self.labels.signUp(), {timeOut: 5000, positionClass: 'toast-top-right'});
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
                lfToastrService.openToast(error.message, self.labels.signIn(), {timeOut: 5000, positionClass: 'toast-top-right'});
            });
        };

        self.resetPassword = function() {
            self.userServiceError = {};
            if (!self.user.email) {
                self.userServiceError.message = self.labels.enterEmailAddress();
                if (self.signinForm) {
                    self.signinForm.$setUntouched();
                }
            }
            else {
                startSpinner();
                self.userServiceError.message = '...';
                return lfFirebaseAuthService.resetPassword(self.user).then(function () {
                    self.userServiceError.message = self.labels.resetPasswordEmail();
                    self.resetPasswordRequested = true;
                    stopSpinner();
                    lfToastrService.openToast(self.labels.resetPasswordEmail(), self.labels.resetPassword(), {timeOut: 6000, positionClass: 'toast-top-right', type:'info'});
                    if (self.signinForm) {
                        self.signinForm.$setUntouched();
                    }
                }, function (error) {
                    self.userServiceError = error;
                    stopSpinner();
                    self.resetPasswordRequested = false;
                    lfToastrService.openToast(error.message, self.labels.resetPassword(), {timeOut: 5000, positionClass: 'toast-top-right'});
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
                lfToastrService.openToast(self.labels.passwordChanged(), self.labels.changePassword(), {timeOut: 6000, positionClass: 'toast-top-right', type:'success'});
            }, function(error) {
                self.userServiceError = error;
                stopSpinner();
                self.changedPassword = false;
                lfToastrService.openToast(error.message, self.labels.changePassword(), {timeOut: 5000, positionClass: 'toast-top-right'});
            });
        };

        self.init();

    }]);
})();

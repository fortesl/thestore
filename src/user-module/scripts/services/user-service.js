/**
 * Name: user-service.js
 * Created by lfortes on 11/27/2014.
 */

(function () {
    'use strict';

    angular.module('user').factory('UserService', ['STORE_DATA', '$rootScope', 'usSpinnerService', function(STORE_DATA, $rootScope, usSpinnerService) {

        var userServiceError = {};
        var user = {};
        var temporaryPassword = false;

        var loginAfterCreateUser = function(user, callback) {
            STORE_DATA.BACKEND.authWithPassword(user, function(error, authData) {
                if (error === null) {
                    var userData = {
                        userId: authData.uid,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        email: user.email
                    };
                    STORE_DATA.BACKEND.child('users').child(authData.uid).set(userData);
                    user = userData;
                    window.localStorage.setItem('storeUser', angular.toJson(userData));
                    callback(true);
                }
                else {
                    callback(false);
                }
            });
        };

        var getUserData = function(authData) {
            //TODO: get user from localStorage or backend
            var local = angular.fromJson(window.localStorage.getItem('storeUser'));
            if (local) {
                user = local;
            }
            else {
                var sync = STORE_DATA.BACKEND.child('users').child(authData.uid);
                sync.on('value', function(snapshot) {
                    user = snapshot.val();
                    window.localStorage.setItem('storeUser', angular.toJson(user));
                    $rootScope.$emit('USER_LOGGED_IN_EVENT');
                });
            }
        };

        var processServerResponse = function(error, callback) {
            if (error === null) {
                if (angular.isFunction(callback)) { callback(true); }
            }
            else {
                userServiceError = error;
                if (angular.isFunction(callback)) { callback(false); }
            }
        };

        return {
            add: function(user, callback) {
                usSpinnerService.spin('spinner-1');
                STORE_DATA.BACKEND.createUser(user, function(error) {
                    if (error === null) {
                        loginAfterCreateUser(user, function(userIn) {
                            if (angular.isFunction(callback)) { callback(userIn); }
                        });
                    } else {
                        userServiceError = error;
                        if (angular.isFunction(callback)) { callback(false); }
                    }
                    usSpinnerService.stop('spinner-1');
                });

            },

            login: function(user, callback) {
                usSpinnerService.spin('spinner-1');
                STORE_DATA.BACKEND.authWithPassword(user, function(error, authData) {
                    if (error === null) {
                        // user authenticated with Firebase
                        getUserData(authData);
                        temporaryPassword = authData.password.isTemporaryPassword;
                        if (angular.isFunction(callback)) { callback(true); }
                    } else {
                        userServiceError = error;
                        if (angular.isFunction(callback)) { callback(false); }
                    }
                    usSpinnerService.stop('spinner-1');
                });
            },

            isLoggedIn: function() {
                var authData = STORE_DATA.BACKEND.getAuth();
                if (authData) {
                    getUserData(authData);
                    return true;
                } else {
                    return false;
                }
            },

            logout: function() {
                STORE_DATA.BACKEND.unauth();
                user = {};
                localStorage.removeItem("storeUser");
            },

            userServiceError: function() { return userServiceError; },

            user: function() { return user; },

            resetPassword: function(user, callback) {
                usSpinnerService.spin('spinner-1');
                STORE_DATA.BACKEND.resetPassword({
                    email: user.email
                }, function(error) {
                    processServerResponse(error, callback);
                    usSpinnerService.stop('spinner-1');
                });
            },

            isTemporaryPassword: function() { return temporaryPassword; },

            changePassword: function(user, callback) {
                usSpinnerService.spin('spinner-1');
                STORE_DATA.BACKEND.changePassword(user, function(error) {
                    processServerResponse(error, callback);
                    usSpinnerService.stop('spinner-1');
                });
            }

        };
    }]);


})();
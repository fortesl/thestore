/**
 * user-service-mock.js
 * Created by fortesl on 9/4/2014.
 */

(function() {

    'use strict';

    angular.module('lfFirebaseAuthMock', []).factory('lfFirebaseAuthService', ['$q', function($q) {

        var userServiceError = {};
        var thisUser = {firstName: 'Luis', lastName: 'Fortes'};

        return {
            add: function(user) {
                return $q(function(resolve, reject) {
                    if (Object.getOwnPropertyNames(user).length) {
                        thisUser = user;
                        userServiceError = {};
                        resolve('success');
                    }
                    else {
                        thisUser = {};
                        userServiceError = {error:'bad'};
                        reject(userServiceError);
                    }
                });
            },

            login: function(user) {
                return $q(function(resolve, reject) {
                    if (Object.getOwnPropertyNames(user).length) {
                        thisUser = user;
                        userServiceError = {};
                        resolve('success');
                    }
                    else {
                        thisUser = {};
                        userServiceError = {error:'bad'};
                        reject(userServiceError);
                    }
                });
            },

            isLoggedIn: function() {
                if (Object.getOwnPropertyNames(thisUser).length) {
                    return true;
                }
                else {
                    return false;
                }
            },
            user : function() {
                return thisUser;
            },
            logout: function() {
                thisUser = {};
            },
            userServiceError: function() { return userServiceError; },
            isTemporaryPassword: function() { return true; },

            resetPassword: function(user) {
                return $q(function(resolve, reject) {
                    if (Object.getOwnPropertyNames(user).length) {
                        if (user.email === 'bademail') {
                            thisUser = {};
                            userServiceError = {error:'bad'};
                            reject(userServiceError);
                        }
                        else {
                            thisUser = user;
                            userServiceError = {};
                            resolve('success');
                        }
                    }
                    else {
                        thisUser = {};
                        userServiceError = {error:'bad'};
                        resolve('success');
                    }
                });
            },

            changePassword: function(user) {
                return $q(function(resolve, reject) {
                    if (Object.getOwnPropertyNames(user).length) {
                        thisUser = user;
                        userServiceError = {};
                        resolve('success');
                    }
                    else {
                        thisUser = {};
                        userServiceError = {error:'bad'};
                        reject(userServiceError);
                    }
                });
            }
        };
    }]);

})();

/**
 * user-service-mock.js
 * Created by fortesl on 9/4/2014.
 */

(function() {

    'use strict';

    angular.module('UserServiceMock', []).factory('UserService', function() {

        var userServiceError = {};
        var thisUser = {firstName: 'Luis', lastName: 'Fortes'};

        return {
            add: function(user, callback) {
                if (Object.getOwnPropertyNames(user).length) {
                    thisUser = user;
                    userServiceError = {};
                    if (callback) { callback(true); }
                }
                else {
                    thisUser = {};
                    userServiceError = {error:'bad'};
                    if (callback) { callback(false); }
                }
            },

            login: function(user, callback) {
                if (Object.getOwnPropertyNames(user).length) {
                    thisUser = user;
                    userServiceError = {};
                    if (callback) { callback(true); }
                }
                else {
                    thisUser = {};
                    userServiceError = {error:'bad'};
                    if (callback) { callback(false); }
                }
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
            userServiceError: function() { return userServiceError; }
        };
    });

})();

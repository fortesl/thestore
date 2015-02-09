/**
 * Name: user-labels.js
 * Created by lfortes on 12/31/2014.
 */

(function () {
    'use strict';

    angular.module('user').factory('UserLabels', ['$translate', function($translate) {
        return {
            signIn: function() { return $translate.instant('SIGN_IN'); },
            logout: function() { return  $translate.instant('LOGOUT'); },
            emailAddress: function() { return  $translate.instant('EMAIL_ADDRESS'); },
            username: function() { return  $translate.instant('USERNAME'); },
            password: function() { return  $translate.instant('PASSWORD'); },
            repeatPassword: function() { return  $translate.instant('REPEAT_PASSWORD'); },
            submit: function() { return  $translate.instant('SUBMIT'); },
            resetPassword: function() { return  $translate.instant('RESET_PASSWORD'); },
            resetPasswordEmail: function() { return  $translate.instant('RESET_PASSWORD_EMAIL'); },
            passwordChanged: function() { return  $translate.instant('PASSWORD_CHANGED'); },
            firstName: function() { return  $translate.instant('FIRST_NAME'); },
            lastName: function() { return  $translate.instant('LAST_NAME'); },
            passwordMinLength: function() { return  $translate.instant('PASSWORD_MIN_LENGTH'); },
            passwordMismatch: function() { return  $translate.instant('PASSWORD_FIELDS_MISMATCH'); },
            emailMismatch: function() { return  $translate.instant('EMAIL_FIELDS_MISMATCH'); },
            signUp: function() {  return $translate.instant('SIGN_UP'); },
            enterEmailAddress: function() { return  $translate.instant('ENTER_YOUR_EMAIL_ADDRESS'); },
            repeatEmailAddress: function() { return  $translate.instant('REPEAT_YOUR_EMAIL_ADDRESS'); },
            enterFirstName: function() { return  $translate.instant('ENTER_YOUR_FIRST_NAME'); },
            enterLastName: function() { return  $translate.instant('ENTER_YOUR_LAST_NAME'); },
            isNewUser: function() { return  $translate.instant('NEW_USER?'); },
            changePassword: function() { return  $translate.instant('CHANGE_PASSWORD'); },
            currentPassword: function() { return  $translate.instant('CURRENT_PASSWORD'); },
            newPassword: function() { return  $translate.instant('NEW_PASSWORD'); },
            repeatNewPassword: function() { return  $translate.instant('REPEAT_NEW_PASSWORD'); },
            changeYourPassword: function() { return  $translate.instant('CHANGE_YOUR_PASSWORD'); },
            continue: function() { return  $translate.instant('CONTINUE'); },
            sellItems: function() { return  $translate.instant('SELL_ITEMS'); }
        };
    }]);


})();
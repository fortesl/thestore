/**
 * Name: storeLabels.js
 * Created by lfortes on 1/1/2015.
 */

(function () {
    'use strict';

    angular.module('storeApp').factory('StoreLabels', ['$translate', function($translate) {
        return {
            go: function() { return $translate.instant('GO'); },
            search: function() { return $translate.instant('SEARCH'); },
            version: function() { return $translate.instant('VERSION_TEXT'); },
            issues: function() { return $translate.instant('ISSUES'); },
            about: function() { return $translate.instant('ABOUT'); },
            license: function() { return $translate.instant('LICENSE'); },
            contactUs: function() {return $translate.instant('CONTACTUS');},

            errorRequiredMsg: function() { return $translate.instant('ERROR_REQUIRED_MESSAGE');},
            errorMinLengthMsg: function() { return $translate.instant('ERROR_MINLENGTH_MESSAGE');},
            errorMaxLengthMsg: function() { return $translate.instant('ERROR_MAXLENGTH_MESSAGE');},
            errorEmailMsg: function() { return $translate.instant('ERROR_EMAIL_MESSAGE');},
            errorMismatchMsg: function() { return $translate.instant('ERROR_MISMATCH_MESSAGE');},
            errorInListMsg: function() { return $translate.instant('ERROR_INLIST_MESSAGE');}
        };
    }]);


    })();
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
            contactUs: function() {return $translate.instant('CONTACTUS');}
        };
    }]);


    })();
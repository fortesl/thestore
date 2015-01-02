/**
 * Name: lf-cookies.js
 * Created by lfortes on 11/14/2014.
 *
 * returns object with methods: setCookie and getCookie
 */

(function () {
    'use strict';

    angular.module('lfCookies', []).factory('LFCookieService', [function() {

        var setCookie = function (name, value, expirationDays) {
            var d = new Date();
            d.setTime(d.getTime() + (expirationDays*24*60*60*1000));
            var expires = 'expires='+d.toUTCString();
            document.cookie = name + "=" + value + "; " + expires;
        };

        var getCookie = function (name) {
            var cookieName = name + "=";
            var ca = document.cookie.split(';');
            for(var i=0; i<ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0)===' ') { c = c.substring(1); }
                if (c.indexOf(cookieName) !== -1) {
                    return c.substring(cookieName.length,c.length);
                }
            }
            return '';
        };

        return {
            /**
             * Sets a browser cookie
             * @param name cookie name.
             * @param value cookie value
             * @param expirationDays days until expiration date
             */
            setCookie: function(name, value, expirationDays) { setCookie(name, value, expirationDays); },

            /**
             * Returns a browser cookie
             * @param name cookie name
             */
            getCookie: function(name) { return getCookie(name); }
        };
    }]);

})();
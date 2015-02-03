/**
 * Name: e2eUtils.js
 * Created by lfortes on 1/12/2015.
 */

(function () {
    'use strict';

    var e2eUtils = {
        openHomePage: function() {
            browser.get('#/');
        },

        openPage: function(page) {
            browser.get('#' + page);
        },

        waitForPromiseTest: function(promiseFn, testFn, errMsg, timeOut) {
        browser.wait(function () {
            var deferred = protractor.promise.defer();
            promiseFn().then(function (data) {
                deferred.fulfill(testFn(data));
            });
            return deferred.promise;
        }, timeOut, errMsg);
    }

};

    module.exports = e2eUtils;
})();
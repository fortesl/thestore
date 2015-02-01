/**
 * Name: sign-in-spec.js
 * Created by lfortes on 1/12/2015.
 */

(function () {
    'use strict';

    var utils = require('../e2eUtils');
    var loginPage = require('./pageObjects/sign-in-page');

    describe('Login', function() {

        beforeEach(function() {
            utils.openHomePage();
            loginPage.openLoginPage();
        });

        it ('should have a sign-up and reset password links', function() {
            expect(loginPage.hasSignUpLink()).toBe(true);
            expect(loginPage.hasResetPasswordLink()).toBe(true);
        });

        it('should not allow an invalid user to login', function() {
            loginPage.enterEmailAddress('blabla@gmail.com');
            loginPage.enterPassword('fdsfsafdsafdsf');
            loginPage.sendLoginRequest().then(function() {

                utils.waitForPromiseTest(loginPage.errorOccurred, function(error) {
                    return error !== '...' && error.length;
                }, 4000, "Timeout waiting on Fb service");

                expect(loginPage.isLoginPageOpen()).toBe(true);
            });
        });

        it('should allow a valid user to login', function() {
            loginPage.enterEmailAddress('tiratf@gmail.com');
            loginPage.enterPassword('12345678');
            loginPage.sendLoginRequest().then(function() {

                utils.waitForPromiseTest(browser.getCurrentUrl, function(url) {
                    return url.indexOf('signin') < 0;
                }, 4000, "Timeout waiting on Fb service");

                expect(loginPage.isLoginPageOpen()).toBe(false);
            });
        });

    });

})();
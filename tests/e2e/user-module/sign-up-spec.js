/**
 * Name: sign-up-spec.js
 * Created by lfortes on 1/19/2015.
 */

(function () {
    'use strict';

    var utils = require('../e2eUtils');
    var signUpPage = require('./pageObjects/sign-up-page');

    describe('Sign-Up', function() {

        beforeEach(function() {
            utils.openHomePage();
            signUpPage.openSignUpPage();
        });

        it('should have a repeat password field, a repeat email field, a first name field and a last name field', function () {
            expect(signUpPage.hasRepeatPasswordField()).toBe(true);
            expect(signUpPage.hasRepeatEmailField()).toBe(true);
            expect(signUpPage.hasFirstNameField()).toBe(true);
            expect(signUpPage.hasLastNameField()).toBe(true);
        });

        it('Should not create a new account for existing user', function() {
            signUpPage.enterFirstName('Luis');
            signUpPage.enterLastName('Fortes');
            signUpPage.enterEmailAddress('fortesl@yahoo.com');
            signUpPage.enterRepeatEmailAddress('fortesl@yahoo.com');
            signUpPage.enterPassword('12345678');
            signUpPage.enterRepeatPassword('12345678');
            signUpPage.sendSignUpRequest().then(function() {

                utils.waitForPromiseTest(signUpPage.errorOccurred, function(error) {
                    return error !== '...' && error.length;
                }, 4000, "Timeout waiting on Fb service");

                expect(signUpPage.isSignUpPageOpen()).toBe(true);
            });
        });

        it('Should create a new account for a non existing user', function() {
            var t = (new Date()).getTime();
            signUpPage.enterFirstName('Luis');
            signUpPage.enterLastName('Fortes');
            signUpPage.enterEmailAddress(t + 'fortesl@yahoo.com');
            signUpPage.enterRepeatEmailAddress(t + 'fortesl@yahoo.com');
            signUpPage.enterPassword('12345678');
            signUpPage.enterRepeatPassword('12345678');
            signUpPage.sendSignUpRequest().then(function() {

                utils.waitForPromiseTest(browser.getCurrentUrl, function(url) {
                    return url.indexOf('signup') < 0;
                }, 4000, "Timeout waiting on Fb service");

                expect(signUpPage.isSignUpPageOpen()).toBe(false);
            });
        });

    });

})();
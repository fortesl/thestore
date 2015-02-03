/**
 * Name: login-page.js
 * Created by lfortes on 1/2/2015.
 */

(function () {
    'use strict';

    var selectors = {
        headerSignInLink: by.binding('userDropdownCtrl.labels.signIn()'),
        userNameLink: by.id('userName'),
        logoutLink: by.id('Logout'),
        passwordInput: by.id('inputPassword'),
        emailInput: by.id('inputEmail'),
        submitButton: by.css('.btn.btn-primary'),
        loginHeader: by.binding('userCtrl.labels.signIn()'),
        signUpLink: by.binding('userCtrl.labels.signUp()'),
        resetPasswordLink: by.binding('userCtrl.labels.resetPassword()'),
        errorMessage: by.binding('userCtrl.userServiceError.message')
    };

    var logout = function() {
        element(selectors.headerSignInLink).isDisplayed().then(function(displayed) {
            if (!displayed) {
            //user already logged-in, log-him out
            element(selectors.userNameLink).click();
            element(selectors.logoutLink).click();
            }
            else {
                browser.get('#/');
            }
        });
    };

    var loginPage = {
        openLoginPage: function() {
            logout();
            element(selectors.headerSignInLink).click();
        },
        enterEmailAddress: function(email) {
            element(selectors.emailInput).sendKeys(email);
        },
        enterPassword: function(password) {
            element(selectors.passwordInput).sendKeys(password);
        },
        sendLoginRequest: function() {
            return element(selectors.submitButton).click();
        },
        isLoginPageOpen: function() {
            return element(selectors.loginHeader).isPresent();
        },
        hasSignUpLink: function() {
            return element(selectors.signUpLink).isPresent();
        },
        hasResetPasswordLink: function() {
            return element(selectors.resetPasswordLink).isPresent();
        },
        errorOccurred: function () {
            return element(selectors.errorMessage).getText();
        }
    };

    module.exports = loginPage;
})();
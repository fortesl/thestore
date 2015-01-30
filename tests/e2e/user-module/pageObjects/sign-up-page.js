/**
 * Name: sign-up-page.js
 * Created by lfortes on 1/24/2015.
 */

(function () {
    'use strict';

    var loginPage = require('./sign-in-page');

    var selectors = {
        passwordInput: by.model('userCtrl.user.password'),
        repeatPasswordInput: by.model('userCtrl.user.repeatPassword'),
        emailInput: by.model('userCtrl.user.email'),
        repeatEmailInput: by.model('userCtrl.user.repeatEmail'),
        firstNameInput: by.model('userCtrl.user.firstName'),
        lastNameInput: by.model('userCtrl.user.lastName'),
        submitButton: by.css('.btn.btn-primary'),
        signUpHeader: by.binding('userCtrl.labels.signUp()'),
        registerLink: by.binding('userCtrl.labels.signUp()'),
        errorMessage: by.binding('userCtrl.userServiceError.message')
    };

    var signUpPage = {
        openSignUpPage: function() {
            loginPage.openLoginPage();
            element(selectors.registerLink).click();
        },
        enterEmailAddress: function(email) {
            element(selectors.emailInput).sendKeys(email);
        },
        enterPassword: function(password) {
            element(selectors.passwordInput).sendKeys(password);
        },
        enterFirstName: function(firstname) {
            element(selectors.firstNameInput).sendKeys(firstname); 
        },
        enterLastName: function(lastname) {
            element(selectors.lastNameInput).sendKeys(lastname);
        },
        enterRepeatPassword: function(password) {
            element(selectors.repeatPasswordInput).sendKeys(password);
        },
        enterRepeatEmailAddress: function(email) {
            element(selectors.repeatEmailInput).sendKeys(email);
        },
        sendSignUpRequest: function() {
            return element(selectors.submitButton).click();
        },
        isSignUpPageOpen: function() {
            return element(selectors.signUpHeader).isPresent();
        },
        hasFirstNameField: function() {
            return element(selectors.firstNameInput).isPresent();
        },
        hasLastNameField: function() {
            return element(selectors.lastNameInput).isPresent();
        },
        hasRepeatPasswordField: function() {
            return element(selectors.repeatPasswordInput).isPresent();
        },
        hasRepeatEmailField: function() {
            return element(selectors.repeatEmailInput).isPresent();
        },
        errorOccurred: function() {
            return element(selectors.errorMessage).getText();
        }
    };

    module.exports = signUpPage;


})();
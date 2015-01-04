/**
 * Name: login-page.js
 * Created by lfortes on 1/2/2015.
 */

(function () {
    'use strict';

    var loginPage = function() {
        var logout = function() {
            if (!element(by.binding('userDropdownCtrl.labels.signIn()')).isDisplayed()) {
                //user already logged-in, log-him out
                element(by.id('userName')).click();
                element(by.id('logout')).click();
            }
            else {
                browser.get('/');
            }
        };

        var show = function() {
            logout();
            var loginLink = element(by.binding('userDropdownCtrl.labels.signIn()'));
            if (!loginLink.isDisplayed()) {
                return false;
            }
            loginLink.click();
            if ((!element(by.id('inputPassword')).isDisplayed()) || !(element(by.id('inputEmail')).isDisplayed()) || (!element(by.css('.btn.btn-primary')).isDisplayed())) {
                return false;
            }
            return true;
        };

        return {
            openHomePage: function() {
                browser.get('/');
            },
            login: function(email, password) {
                if (!show()) {
                    return false;
                }

                element(by.id('inputEmail')).sendKeys(email);
                element(by.id('inputPassword')).sendKeys(password);
                element(by.css('.btn.btn-primary')).click();
                browser.driver.sleep(4000);
                return !(element(by.binding('userCtrl.labels.signIn()')).isPresent());
            }
        };
    };

    module.exports = loginPage();
})();
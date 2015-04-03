/**
 * Name: store-header-page.js
 * Created by lfortes on 1/12/2015.
 */

(function () {
    'use strict';

    var selectors = {
        headerNav: by.css('.st-header-nav'),
        headerLogo: by.css('.st-header-nav .st-header-logo'),
        searchBox: by.css('.st-header-nav .st-header-search-box'),
        userChoices:  by.css('.st-header-nav .st-header-user-choices'),
        loginLink: by.css('.st-header-nav .st-header-login-link'),
        languageOptions: by.css('.st-header-nav .st-header-language-options'),
        languageList: by.css('item in storeCtrl.supportedLanguages')
    };

    var headerPage =  {
        headerNavVisible: function() {
            return element(selectors.headerNav).isDisplayed() &&
                element(selectors.headerLogo).isDisplayed() &&
                element(selectors.searchBox).isDisplayed() &&
                (element(selectors.loginLink).isDisplayed() || element(by.css(selectors.userChoices)).isDisplayed()) &&
                element(selectors.languageOptions).isDisplayed();
        },
        clickHeaderLinks: function() {
//            element(selectors.headerLogo).click();
            element(selectors.languageOptions).click();
        }
    };

    module.exports = headerPage;

})();
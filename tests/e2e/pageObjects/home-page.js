/**
 * Created by fortesl on 9/5/2014.
 */
(function () {
    'use strict';

    var selectors = {
        headerNav: '.st-header-nav',
        headerLogo: '.st-header-nav .st-header-logo',
        searchBox: '.st-header-nav .st-header-search-box',
        userChoices:  '.st-header-nav .st-header-user-choices',
        loginLink: '.st-header-nav .st-header-login-link',
        languageOptions: '.st-header-nav .st-header-language-options',
        languageList: 'item in storeCtrl.supportedLanguages',


        footerNav: '.st-footer-nav',
        contactUsLink: '.st-footer-nav .st-footer-contact-link'
    };

    var HomePage =  {
        open: function() {
            browser.driver.manage().window().maximize();
            browser.get('/');
        },
        headerNavVisible: function() {
            return element(by.css(selectors.headerNav)).isDisplayed() &&
                    element(by.css(selectors.headerLogo)).isDisplayed() &&
                    element(by.css(selectors.searchBox)).isDisplayed() &&
                    (element(by.css(selectors.loginLink)).isDisplayed() || element(by.css(selectors.userChoices)).isDisplayed()) &&
                    element(by.css(selectors.languageOptions)).isDisplayed();
        },
        clickHeaderLinks: function() {
            element(by.css(selectors.headerLogo)).click();
            element(by.css(selectors.languageOptions)).click();
        },
        footerLinksVisible: function() {
            return element(by.css(selectors.footerNav)).isDisplayed() &&
                element(by.css(selectors.contactUsLink)).isDisplayed();
        },
        clickFooterLinks: function() {
            element(by.css(selectors.contactUsLink)).click();
        }
    };

    module.exports = HomePage;

})();
/**
 * Created by fortesl on 9/5/2014.
 */
(function () {
    'use strict';

    var selectors = {
        headerNav: '.st-nav-header',
        headerLogo: '.st-nav-header .st-brand-link',
        searchBox: '.st-nav-header .st-search-box',
        userChoices:  '.st-nav-header .st-user-choices',
        loginLink: '.st-nav-header .st-login-link',
        languageOptions: '.st-nav-header .st-language-options',
        languageList: 'item in storeCtrl.supportedLanguages',


        footerNav: '.st-nav-footer',
        contactUsLink: '.st-nav-footer .st-contact-link'
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
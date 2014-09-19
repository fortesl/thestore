/**
 * Created by fortesl on 9/5/2014.
 */
(function () {
    'use strict';

    var HomePage = function() {
        browser.get('/');
    };

    HomePage.prototype.isHeaderNavVisible =  function() {
        return element(by.css('.navbar-fixed-top')).isDisplayed();
    };


    HomePage.prototype.isFooterLinksVisible = function() {
        return element(by.css('.bs-docs-footer-links')).isDisplayed();
    };

    module.exports = HomePage;

})();
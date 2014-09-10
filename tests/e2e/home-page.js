/**
 * Created by fortesl on 9/5/2014.
 */
(function () {
    'use strict';

    var HomePage = function() {
        browser.get('/');
    };

    HomePage.prototype.isSearchIconVisible =  function() {
        return element(by.css('.glyphicon-search')).isDisplayed();
    };


    HomePage.prototype.isFooterNavigationBarVisible = function() {
        return element(by.css('.navbar-fixed-bottom')).isDisplayed();
    };

    module.exports = HomePage;

})();
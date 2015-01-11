/**
 * Name: homePage-spec.js
 * Created by lfortes on 1/2/2015.
 */

(function () {
    'use strict';

    var homePage = require('./pageObjects/home-page');

    describe('Home', function () {

        beforeEach(function() {
            homePage.open();
        });

        it('should have a header navigation bar', function() {
            homePage.clickHeaderLinks();
            expect(homePage.headerNavVisible()).toEqual(true);
        });

        it('should have a footer navigation bar', function() {
            homePage.clickFooterLinks();
            expect(homePage.footerLinksVisible()).toEqual(true);
        });

    });

})();
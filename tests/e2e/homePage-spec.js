/**
 * Name: homePage-spec.js
 * Created by lfortes on 1/2/2015.
 */

(function () {
    'use strict';

    var HomePage = require('./pageObjects/home-page');

    describe('Home', function () {
        var homePage;

        beforeEach(function() {
            homePage = new HomePage();
        });

        it('should have a header navigation bar', function() {
            expect(homePage.isHeaderNavVisible()).toEqual(true);
        });

        it('should have a footer navigation bar', function() {
            expect(homePage.isFooterLinksVisible()).toEqual(true);
        });

    });

})();
/**
 * Name: store-footer-spec.js
 * Created by lfortes on 1/12/2015.
 */

(function () {
    'use strict';

    var utils = require('../e2eUtils');
    var footerPage = require('./pageObjects/store-footer-page');

    describe('Footer', function () {

        beforeEach(function() {
            utils.openHomePage();
        });

        it('should have a footer navigation bar', function() {
            footerPage.clickFooterLinks();
            expect(footerPage.footerLinksVisible()).toEqual(true);
        });

    });


})();
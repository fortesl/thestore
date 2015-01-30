/**
 * Name: store-header-specs.js
 * Created by lfortes on 1/12/2015.
 */

(function () {
    'use strict';

    var utils = require('../e2eUtils');
    var headerPage = require('./pageObjects/store-header-page');

    describe('Header', function () {

        beforeEach(function() {
            utils.openHomePage();
        });

        it('should have a header navigation bar', function() {
            headerPage.clickHeaderLinks();
            expect(headerPage.headerNavVisible()).toEqual(true);
        });

    });

})();
/**
 * Name: loginPage-specs.js
 * Created by lfortes on 1/2/2015.
 */

(function () {
    'use strict';

    var loginPage = require('./pageObjects/login-page');

    describe('Login', function() {
        loginPage.openHomePage();

        it('should not allow an invalid user to login', function() {
            expect(loginPage.login('blalbla@gmail.com', 'kjfjhjhdss')).toBe(false);
        });

        //it('should allow a valid user to login', function() {
        //    expect(loginPage.login('tiratf@gmail.com', '12345678')).toBe(true);
        //});

    });

})();
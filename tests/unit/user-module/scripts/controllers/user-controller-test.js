/**
 * user-controller-test.js
 * Created by fortesl on 9/4/2014.
 */

(function () {
    'use strict';

    describe('Controller: UserController', function() {

        beforeEach(module('storeApp'));
        beforeEach(module('lfFirebaseAuthMock'));

        var ctrl;

        beforeEach(inject(function ($controller, $httpBackend) {
            $httpBackend.whenGET('i18n/messages_en.json').respond({
                "LANGUAGE": "English"
            });
            ctrl = $controller('UserController');
        }));

        it('should add user', function() {
            ctrl.user = {email:'lmlf99@gmail.com', password: 'mememe12'};
            ctrl.add();
            expect(ctrl.userServiceError.hasOwnProperty('error')).toBe(false);
            //ctrl.user = {};
            //ctrl.add();
            //expect(ctrl.userServiceError.hasOwnProperty('error')).toBe(true);
        });

        it('should log user in', function() {
            ctrl.user = {email: 'fortesl@yahoo.com', password: '12345678'};
            ctrl.login(ctrl.user);
            expect(ctrl.userServiceError.hasOwnProperty('error')).toBe(false);
            //ctrl.user = {};
            //ctrl.login(ctrl.user);
            //expect(ctrl.userServiceError.hasOwnProperty('error')).toBe(true);
        });

        //it('should reset user password', function() {
        //    ctrl.user = {email: 'fortesl@yahoo.com', password: '12345678'};
        //    ctrl.resetPassword();
        //    expect(ctrl.resetPasswordRequested).toBe(true);
            //ctrl.user = {email: 'bademail', password: '12345678'};
            //ctrl.resetPassword();
            //expect(ctrl.resetPasswordRequested).toBe(false);
            //ctrl.user = {};
            //ctrl.resetPassword();
            //expect(ctrl.userServiceError.hasOwnProperty('error')).toBe(true);
        //});

        //it('should return current user', function() {
        //    var user = ctrl.currentUser();
        //    expect(user.firstName).toEqual('Luis');
        //});
        //
        //it('should change user password', function() {
        //    ctrl.user = {email: 'fortesl@yahoo.com', password: '12345678'};
        //    ctrl.changePassword();
        //    expect(ctrl.changedPassword).toBe(true);
        //
            //ctrl.user = {};
            //ctrl.changePassword();
            //expect(ctrl.changedPassword).toBe(false);
        //});
    });

})();

/**
 * user-controller-test.js
 * Created by fortesl on 9/4/2014.
 */

(function () {
    'use strict';

    describe('Controller: UserController', function() {

        beforeEach(module('storeApp'));
        beforeEach(module('lfFirebaseAuthMock'));

        var ctrl, emailAddress = (new Date()).getTime()+'fortesl@yahoo.com';
        var password = '12345678';
        var firstName= 'Luis';
        var q, scope, lfFirebaseAuth;

        beforeEach(inject(function ($controller, $httpBackend, $q, lfFirebaseAuthService, $rootScope) {
            $httpBackend.whenGET('i18n/messages_en.json').respond({
                "LANGUAGE": "English"
            });
            q = $q;
            scope = $rootScope.$new();
            lfFirebaseAuth = lfFirebaseAuthService;
            ctrl = $controller('UserController');
        }));

        it('should add user with email and password', function() {
            var mockPromise = q.defer();
            spyOn(lfFirebaseAuth, 'add').andReturn(mockPromise.promise);
            ctrl.user = {email: emailAddress, password: password, firstName: firstName};
            ctrl.add().then(function () {
                expect(ctrl.userServiceError.hasOwnProperty('message')).toBe(false);
            });

            scope.$apply(function () {
                mockPromise.resolve();
            });
        });

        it('should not add user with invalid email and password', function() {
            var mockPromise = q.defer();
            spyOn(lfFirebaseAuth, 'add').andReturn(mockPromise.promise);
            ctrl.user = {};
            ctrl.add().then(function() {
                expect(ctrl.userServiceError.hasOwnProperty('message')).toBe(true);
            });

            scope.$apply(function() {
                mockPromise.reject({message: 'email and password missing!'});
            });

        });

        it('should log user in', function() {
            var mockPromise = q.defer();
            spyOn(lfFirebaseAuth, 'login').andReturn(mockPromise.promise);
            ctrl.user = {email: emailAddress, password: password};
            ctrl.login().then(function() {
                expect(ctrl.userServiceError.hasOwnProperty('message')).toBe(false);
            });

            scope.$apply(function () {
                mockPromise.resolve();
            });
        });

        it('should not login user with invalid email and password', function() {
            var mockPromise = q.defer();
            spyOn(lfFirebaseAuth, 'login').andReturn(mockPromise.promise);
            ctrl.user = {};
            ctrl.login().then(function() {
                expect(ctrl.userServiceError.hasOwnProperty('message')).toBe(true);
            });

            scope.$apply(function() {
                mockPromise.reject({message: 'email and password missing!'});
            });

        });

        it('should reset user password', function() {
            var mockPromise = q.defer();
            spyOn(lfFirebaseAuth, 'resetPassword').andReturn(mockPromise.promise);
            ctrl.user = {email: emailAddress, password: password};
            ctrl.resetPassword().then(function() {
                expect(ctrl.resetPasswordRequested).toBe(true);
            });

            scope.$apply(function () {
                mockPromise.resolve();
            });
        });

        it('should not reset password of unknown user', function() {
            var mockPromise = q.defer();
            spyOn(lfFirebaseAuth, 'resetPassword').andReturn(mockPromise.promise);
            ctrl.user = {email: 'bademail', password: '12345678'};
            ctrl.resetPassword().then(function() {
                expect(ctrl.resetPasswordRequested).toBe(false);
            });

            scope.$apply(function() {
                mockPromise.reject({message: 'bad email or password!'});
            });

        });

        it('should not reset password if email not given', function() {
            ctrl.user = {};
            ctrl.resetPassword();
            expect(ctrl.userServiceError.hasOwnProperty('message')).toBe(true);
        });

        it('should return current user', function() {
            var user = ctrl.currentUser();
            expect(user.firstName).toEqual('Luis');
        });


        it('should change user password', function() {
            var mockPromise = q.defer();
            spyOn(lfFirebaseAuth, 'changePassword').andReturn(mockPromise.promise);
            ctrl.user = {email: 'fortesl@yahoo.com', newPassword: 'mememe12', oldPassword: password};
            ctrl.changePassword().then(function() {
                expect(ctrl.changedPassword).toBe(true);
            });

            scope.$apply(function () {
                mockPromise.resolve();
            });
        });


        it('should not change user password if email and old password not given', function() {
            var mockPromise = q.defer();
            spyOn(lfFirebaseAuth, 'changePassword').andReturn(mockPromise.promise);
            ctrl.user = {};
            ctrl.changePassword().then(function() {
                expect(ctrl.changedPassword).toBe(false);
            });

            scope.$apply(function() {
                mockPromise.reject({message: 'email and password missing!'});
            });
        });

    });

})();

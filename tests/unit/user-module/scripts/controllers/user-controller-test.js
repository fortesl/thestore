/**
 * user-controller-test.js
 * Created by fortesl on 9/4/2014.
 */

(function () {
    'use strict';

    describe('Controller: UserController', function() {

        beforeEach(module('storeApp'));
        beforeEach(module('UserServiceMock'));

        var ctrl;

        beforeEach(inject(function ($controller, $httpBackend) {
            $httpBackend.whenGET('i18n/messages_en.json').respond({
                "LANGUAGE": "English"
            });
            ctrl = $controller('UserController');
        }));

    //    it('should add user', function() {
    //        ctrl.user = {email:'lmlf99@gmail.com', password: 'mememe12'};
    //        ctrl.add();
    //        expect(Object.getOwnPropertyNames(ctrl.userServiceError).length).toEqual(0);
    //        ctrl.user = {};
    //        ctrl.add();
    //        expect(Object.getOwnPropertyNames(ctrl.userServiceError).length).toBeGreaterThan(0);
    //    });
    //
    //    it('should log user in', function() {
    //        ctrl.user = {email: 'fortesl@yahoo.com', password: '12345678'};
    //        ctrl.login();
    //        expect(Object.getOwnPropertyNames(ctrl.userServiceError).length).toEqual(0);
    //        ctrl.user = {};
    //        ctrl.login();
    //        expect(Object.getOwnPropertyNames(ctrl.userServiceError).length).toBeGreaterThan(0);
    //    });
    //
    });


})();

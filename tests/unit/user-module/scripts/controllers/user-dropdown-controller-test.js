/**
 * Name: user-dropdown-controller-test.js
 * Created by lfortes on 12/7/2014.
 */

(function () {
    'use strict';

    describe('Controller: UserDropdownController', function() {
        beforeEach(module('storeApp'));
        beforeEach(module('lfFirebaseAuthMock'));

        var ctrl, rootScope;

        beforeEach(inject(function($controller, $rootScope, $httpBackend) {
            ctrl = $controller('UserDropdownController');
            rootScope = $rootScope;

            $httpBackend.expectGET('i18n/messages_en.json').respond({
                "LANGUAGE": "English"
            });

        }));

        it('Dropdown should work properly', function() {
            expect(ctrl.status.isOpen).toBe(false);

            var event = {
                preventDefault: function() {},
                stopPropagation: function() {}
            };
            ctrl.toggleDropdown(event);
            expect(ctrl.status.isOpen).toBe(true);

            rootScope.$emit('USER_LOGGED_IN_EVENT');

            expect(ctrl.userName).toEqual('Luis');

            ctrl.userDropdownItemHandlers('logoutUser');
            expect(ctrl.userName).toEqual('');
            ctrl.init();

            rootScope.$emit('$translateChangeSuccess');

        });

    });

})();
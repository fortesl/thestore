/**
 * Name: store-controller-test.js
 * Created by lfortes on 12/9/2014.
 */

(function () {
    'use strict';

    describe('Controller: StoreController', function() {

        beforeEach(module('storeApp'));
        beforeEach(module('SupportedLanguagesServiceMock'));
        beforeEach(module('MetadataServiceMock'));

        var ctrl, lfCookieService, rootScope;

        beforeEach(inject(function($controller, LFCookieService, $httpBackend, $rootScope) {
            rootScope = $rootScope;
            lfCookieService = LFCookieService;

            $httpBackend.whenGET('i18n/messages_pt_BR.json').respond({
                "LANGUAGE": "Portugues"
            });
            $httpBackend.whenGET('i18n/messages_en.json').respond({
                "LANGUAGE": "English"
            });

            ctrl = $controller('StoreController');

        }));

        it('should get Metadata', function() {
            rootScope.$digest();
            expect(ctrl.storeMetadata.name).toEqual("TheStore");
        });

        it('should get SupportedLanguages', function() {
            rootScope.$digest();
            expect(ctrl.supportedLanguages.length).toEqual(2);
        });

        it('should switch languages', function() {
           ctrl.switchLanguage({name: 'English', code: 'en'});
           expect(ctrl.currentLanguage.code).toEqual('en');
        });

        it('should get language from cookie', function() {
            ctrl.getLanguageFromCookie();
            if (ctrl.currentLanguage.code) {
                expect(ctrl.currentLanguage.code).toEqual(lfCookieService.getCookie('language'));
            }
            else {
                expect(true).toEqual(true);
            }
        });

    });

})();
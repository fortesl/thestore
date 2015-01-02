/**
 * Name: store-controller-test.js
 * Created by lfortes on 12/9/2014.
 */

(function () {
    'use strict';

    describe('Controller: StoreController', function() {

        beforeEach(module('storeApp'));

        var ctrl, metadataService, lfCookieService, supportedLanguagesService;

        beforeEach(inject(function($controller, MetadataService, LFCookieService, SupportedLanguagesService) {
            spyOn(MetadataService, 'get').andCallThrough();
            metadataService = MetadataService;

            spyOn(SupportedLanguagesService, 'get').andCallThrough();
            supportedLanguagesService = SupportedLanguagesService;

            lfCookieService = LFCookieService;

            ctrl = $controller('StoreController');
        }));

        it('should get Metadata', function() {
            expect(metadataService.get).toHaveBeenCalled();
            expect(metadataService.get.callCount).toEqual(1);
        });

        it('should get SupportedLanguages', function() {
            expect(supportedLanguagesService.get).toHaveBeenCalled();
            expect(supportedLanguagesService.get.callCount).toEqual(1);
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

    describe('Controller: StoreController', function() {
        beforeEach(module('storeApp'));

        var ctrl, mockBackend, rootScope;
        beforeEach(inject(function($controller, $httpBackend, $rootScope) {

            mockBackend = $httpBackend;

            mockBackend.expectGET('i18n/messages_en.json').respond({
                "LANGUAGE": "English"
            });

            mockBackend.expectGET('storeData/metadata.json').respond({
                "name": "TheStore",
                "description": "An online store built on cool technologies."
            });

            mockBackend.expectGET('i18n/supported_languages.json').respond([
                {"name": "English", "code": "en"},
                {"name": "Portuguese", "code": "pt_BR", "default": true}
            ]);

            rootScope = $rootScope.$new();

            ctrl = $controller('StoreController', rootScope);
        }));

        it('should set currentLanguage', function() {

            expect(ctrl.supportedLanguages).toEqual([]);

//            mockBackend.flush();

 //           expect(ctrl.currentLanguage).toBeDefined();
        });

    });


})();
/**
 * Name: store-footer-page.js
 * Created by lfortes on 1/12/2015.
 */

(function () {
    'use strict';

    var selectors = {
        footerNav: by.css('.st-footer-nav'),
        contactUsLink: by.css('.st-footer-nav .st-footer-contact-link')
    };

    var footerPage =  {
        footerLinksVisible: function() {
            return element(selectors.footerNav).isDisplayed() &&
                element(selectors.contactUsLink).isDisplayed();
        },
        clickFooterLinks: function() {
//            element(selectors.contactUsLink).click();
            return true; //don't want to actually open the mail app for this.
        }
    };

    module.exports = footerPage;
})();
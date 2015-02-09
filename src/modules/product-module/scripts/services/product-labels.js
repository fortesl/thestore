/**
 * Name: product-labels.js
 * Created by lfortes on 1/1/2015.
 */

(function () {
    'use strict';

    angular.module('product').factory('ProductLabels', ['$translate', function($translate) {
        return {
            sortOrder: function() { return $translate.instant('SORT_ORDER'); },
            invalidSearch: function() { return $translate.instant('INVALID_SEARCH_TERM'); },
            storeDescription: function() { return $translate.instant('AN_ONLINE_STORE'); },
            description: function() { return $translate.instant('DESCRIPTION'); },
            reviews: function() { return $translate.instant('REVIEWS'); },
            specifications: function() { return $translate.instant('SPECIFICATIONS'); },
            sortByProductNameAsc: function() { return $translate.instant('SORT_BY_PRODUCT_NAME_ASC'); },
            sortByProductNameDesc: function() { return $translate.instant('SORT_BY_PRODUCT_NAME_DESC'); },
            sortByProductPriceAsc: function() { return $translate.instant('SORT_BY_PRODUCT_PRICE_ASC'); },
            sortByProductPriceDesc: function() { return $translate.instant('SORT_BY_PRODUCT_PRICE_DESC'); },
            submitReview: function() { return $translate.instant('SUBMIT_A_REVIEW'); },
            writeReview: function() { return $translate.instant('WRITE_A_SHORT_REVIEW'); },
            reviewAuthor: function() { return $translate.instant('AUTHOR_EMAIL_ADDRESS'); },
            submit: function() { return $translate.instant('SUBMIT_REVIEW'); },
            rateTheProduct: function() { return $translate.instant('RATE_THE_PRODUCT'); }
        };
    }]);
})();
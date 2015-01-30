/**
 * Name: store-app.js
 * Created by lfortes on 11/14/2014.
 *
 * Defines angular modules for this project
 */

(function() {
    'use strict';

    angular

        .module('storeApp', ['ngRoute', 'product', 'user', 'lfCookies', 'pascalprecht.translate', 'ui.bootstrap.dropdown', 'angularSpinner', 'lfFirebaseAuth'])

        .constant('FIREBASE_URL',  'https://thestore.firebaseio.com');

})();
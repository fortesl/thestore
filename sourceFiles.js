'use strict';

var sources = {
    srcJsFiles: [
        'src/modules/core-module/core-app.js', 'src/modules/core-module/scripts/**/*.js',
        'src/modules/product-module/product-app.js', 'src/modules/product-module/scripts/**/*.js',
        'src/modules/management-module/management-app.js', 'src/modules/management-module/scripts/**/*.js',
        'src/modules/user-module/user-app.js', 'src/modules/user-module/scripts/**/*.js',
        'src/modules/commons-module/commons-app.js', 'src/modules/commons-module/scripts/**/*.js',
        ],
    vendorJsFiles: [
        'src/bower_components/jquery/dist/jquery.min.js',
        'src/bower_components/bootstrap/dist/js/bootstrap.min.js',
        'src/bower_components/angular/angular.min.js',
        'src/bower_components/angular-route/angular-route.js',
        'src/bower_components/angular-animate/angular-animate.min.js',
        'src/bower_components/angular-messages/angular-messages.min.js',
        'src/bower_components/firebase/firebase.js',
        'src/bower_components/angularfire/dist/angularfire.min.js',
        'src/bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
        'src/bower_components/angular-input-match/dist/angular-input-match.min.js',
        'src/bower_components/angular-translate/angular-translate.min.js',
        'src/bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.min.js',
        'src/bower_components/spin.js/spin.js',
        'src/bower_components/angular-spinner/angular-spinner.min.js',
        'src/bower_components/lf-cookies/lf-cookies.js',
        'src/bower_components/lf-firebase-auth/lf-firebase-auth-service.js',
        'src/bower_components/angular-toastr/dist/angular-toastr.tpls.min.js',
        'src/bower_components/lf-angular-toastr/lf-angular-toastr.js'
        ],
    unitTestFiles: [
        'src/bower_components/angular-mocks/angular-mocks.js',
        'tests/unit/**/*mock.js',
        'tests/unit/**/*test.js'
        ]
    };

module.exports = sources;
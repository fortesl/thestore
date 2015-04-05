// Karma configuration
// Generated on Fri Aug 29 2014 13:29:26 GMT-0500 (Central Daylight Time)

'use strict';

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'src/bower_components/angular/angular.js',
      'src/bower_components/angular-route/angular-route.js',
      'src/bower_components/angular-mocks/angular-mocks.js',
      'src/bower_components/angular-input-match/dist/angular-input-match.js',
      'src/bower_components/angular-translate/angular-translate.js',
      'src/bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
      'src/bower_components/firebase/firebase.js',
      'src/bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
      'src/bower_components/spin.js/spin.js',
      'src/bower_components/angular-spinner/angular-spinner.js',
      'src/bower_components/lf-firebase-auth/lf-firebase-auth-service.js',
      'src/bower_components/lf-cookies/lf-cookies.js',
    'src/modules/core-module/core-app.js', 'src/modules/core-module/scripts/**/*.js',
    'src/modules/product-module/product-app.js', 'src/modules/product-module/scripts/**/*.js',
    'src/modules/user-module/user-app.js', 'src/modules/user-module/scripts/**/*.js',
      'tests/unit/**/*mock.js',
      'tests/unit/**/*test.js'
    ],


    // list of files to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/modules/core-module/store-app.js' : ['coverage'],
      'src/modules/core-module/scripts/**/*.js' : ['coverage'],
      'src/modules/product-module/product-app.js' : ['coverage'],
      'src/modules/product-module/scripts/**/*.js' : ['coverage'],
      'src/modules/user-module/user-app.js' : ['coverage'],
      'src/modules/user-module/scripts/**/*.js' : ['coverage']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],

    // optionally, configure the reporter
    coverageReporter: {
      type : 'lcov',
      dir : 'coverage/'
    },


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: [
        'Chrome'
    ],

      // Which plugins to enable
      plugins: [
          'karma-phantomjs-launcher',
          'karma-chrome-launcher',
          'karma-jasmine',
          'karma-coverage'
      ],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false

  });
};

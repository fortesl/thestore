// Karma configuration
// Generated on Fri Aug 29 2014 13:29:26 GMT-0500 (Central Daylight Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'src/vendor/angular/angular.js',
      'src/vendor/angular-route/angular-route.js',
      'src/vendor/angular-mocks/angular-mocks.js',
      'src/vendor/angular-input-match/dist/angular-input-match.js',
      'src/vendor/angular-translate/angular-translate.js',
      'src/vendor/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
      'src/vendor/firebase/firebase.js',
      'src/vendor/angular-bootstrap/ui-bootstrap-tpls.js',
      'src/vendor/spin.js/spin.js',
      'src/vendor/angular-spinner/angular-spinner.js',
      'src/vendor/lf-firebase-auth/lf-firebase-auth-service.js',
        'src/vendor/lf-cookies/lf-cookies.js',
        'src/core-module/store-app.js',
        'src/core-module/scripts/**/*.js',
        'src/product-module/product-app.js',
        'src/product-module/scripts/**/*.js',
        'src/user-module/user-app.js',
        'src/user-module/scripts/**/*.js',
      'tests/unit/**/*mock.js',
      'tests/unit/**/*test.js'
    ],


    // list of files to exclude
    exclude: [
    ],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      'src/store-app.js' : ['coverage'],
      'src/scripts/**/*.js' : ['coverage'],
      'src/product-module/product-app.js' : ['coverage'],
      'src/product-module/scripts/**/*.js' : ['coverage'],
      'src/user-module/user-app.js' : ['coverage'],
      'src/user-module/scripts/**/*.js' : ['coverage']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],

    // optionally, configure the reporter
    coverageReporter: {
      type : 'html',
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
        'PhantomJS'
    ],

      // Which plugins to enable
      plugins: [
          'karma-phantomjs-launcher',
          'karma-jasmine'
      ],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false

  });
};

'use strict';

exports.config = {

    // The address where our server under test is running
    baseUrl: 'http://localhost:9000/',

    // Capabilities to be passed to the webdriver instance.
    capabilities: {
        'browserName': 'chrome',
        'name': 'thestore'
    },

    framework: 'jasmine',

    seleniumServerJar: './utils/selenium/selenium-server-standalone-2.44.0.jar',
    chromeDriver: './utils/selenium/chromedriver.exe',

    // Spec patterns are relative to the location of the
    // spec file. They may include glob patterns.
    specs: [
        'tests/e2e/**/*spec.js'
    ],

    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        showColors: true, // Use colors in the command line report.
        defaultTimeoutInterval: 30000,
        silent: true    //remove protractor dot reporter
    },

    onPrepare: function() {
        var SpecReporter = require('jasmine-spec-reporter');
        jasmine.getEnv().addReporter(new SpecReporter({
            displayStacktrace: true,
            displaySpecDuration: true
        })); //add jasmine spec reporter
        browser.driver.manage().window().maximize();
    }
};
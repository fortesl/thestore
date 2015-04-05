/**
 * Name: saucelabs.protractor.conf.js
 * Created by lfortes on 2/1/2015.
 */

'use strict';

exports.config = {
    // The address of a running selenium server.
//    seleniumAddress: 'http://localhost:4444/wd/hub',

    // The address where our server under test is running
    baseUrl: 'http://fortesl.github.io/thestore/#/',

    sauceUser: process.env.SAUCE_USERNAME,
    sauceKey: process.env.SAUCE_ACCESS_KEY,

    // Capabilities to be passed to the webdriver instance.
    capabilities: {
        'browserName': 'chrome',
        'tunnel-identifier': process.env.TRAVIS_JOB_NUMBER,
        'build': process.env.TRAVIS_BUILD_NUMBER,
        'name': 'thestore'
    },

    framework: 'jasmine',

    // Spec patterns are relative to the location of the
    // spec file. They may include glob patterns.
    specs: [
        'tests/e2e/**/*spec.js'
    ],

    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        showColors: true, // Use colors in the command line report.
        defaultTimeoutInterval: 30000,
        silent: true
    },

    onPrepare: function() {
        var SpecReporter = require('jasmine-spec-reporter');
        jasmine.getEnv().addReporter(new SpecReporter({
            displayStacktrace: true,
            displaySpecDuration: true
        })); //add jasmine spec reporter
    }
};

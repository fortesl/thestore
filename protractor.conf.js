exports.config = {
    // The address of a running selenium server.
//    seleniumAddress: 'http://localhost:4444/wd/hub',

    // The address where our server under test is running
    baseUrl: 'http://localhost:9000/',

    // Capabilities to be passed to the webdriver instance.
    capabilities: {
        'browserName': 'chrome',
        'name': 'thestore'
    },

    framework: 'jasmine',

    seleniumServerJar: './tests/e2e/utils/selenium-java/selenium-server-standalone-2.44.0.jar',
    chromeDriver: './tests/e2e/utils/selenium-java/chromedriver.exe',

    // Spec patterns are relative to the location of the
    // spec file. They may include glob patterns.
    specs: [
        //'tests/e2e/core-module/*spec.js',
        //'tests/e2e/product-module/*spec.js',
        //'tests/e2e/product-module/*specs.js',
//        'tests/e2e/user-module/sign-up-spec.js',
//        'tests/e2e/user-module/sign-in-spec.js'
        'tests/e2e/**/*spec.js'
    ],

    // Options to be passed to Jasmine-node.
    jasmineNodeOpts: {
        showColors: true, // Use colors in the command line report.
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
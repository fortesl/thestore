TheStore  TheStore  [![Build Status](https://travis-ci.org/fortesl/thestore.svg?branch=withFbB)](https://travis-ci.org/fortesl/thestore) [![devDependency Status](https://david-dm.org/luisfortes/thestore/dev-status.svg)](https://david-dm.org/luisfortes/thestore#info=devDependencies) [![Code Climate](https://codeclimate.com/github/luisfortes/thestore/badges/gpa.svg)](https://codeclimate.com/github/luisfortes/thestore) [![Test Coverage](https://codeclimate.com/github/luisfortes/thestore/badges/coverage.svg)](https://codeclimate.com/github/luisfortes/thestore)
========
An online store built on Bootstrap and Angular technologies. 

The focus of this project is on developing modular, testable, maintainable, and high quality code intent on delivering fast performance and the best possible user experience.

Follow <a href="https://twitter.com/the_onlinestore">@the_onlinestore</a> on twitter to stay informed on all commits and other changes.

View the <a href="http://fortesl.github.io/thestore/#/">demo website</a>


A development machine should have installed the following dependencies
======================================================================
- Java
- nodejs
- git
- ruby
- gulp (npm install -g gulp)
- bower (npm install -g bower)
- compass (gem install compass)

To install the project for development on your local dev machine
=========================================================
Either with <a href="https://github.com/fortesl/thestore">github</a> 
<ol>
    <li>Fork and clone the project to a local folder</li>
    <li>From the "thestore" folder, install build dependencies with the command: <b>npm install</b></li>
    <li>From the "thestore" folder, install run dependencies with the command: <b>bower install</b></li>
</ol>

Or with <a href="https://www.npmjs.org/package/thestore">npm</a> -
<ol>
    <li>Get the project to your local machine with the command: <b>npm install thestore</b></li>
    <li>From the "thestore" folder, install build dependencies with the command: <b>npm install</b></li>
    <li>From the "thestore" folder, install run dependencies with the command: <b>bower install</b></li>
</ol>


The source code can be found in the 'thestore/src' folder. Start a web server in development mode with the command:
<b>gulp dev</b>

Any changes made to source code will immediately reload on the web browser. JavaScript changes are automatically validated with jshint.

To create a 'build' folder to run the app with optimized resources ready for publishing, run the following command from the 'thestore' folder:
<b>gulp build</b>


upcoming features
=================
features in the dev queue for future releases

1. <a href="https://github.com/fortesl/thestore/issues/1"><strike>Move search box to navigation bar</strike></a><br>
2. <a href="https://github.com/fortesl/thestore/issues/2"><strike>implement a non-scrollable footer for the site</strike></a><br>
3. <a href="https://github.com/fortesl/thestore/issues/3"><strike>implement SignUp and Login links<strike></a><br>
4. <a href="https://github.com/fortesl/thestore/issues/4">Create functional shopping cart page</a><br>
5. <a href="https://github.com/fortesl/thestore/issues/5">Create admin mode, for admin users to add & remove products</a><br>
6. <a href="https://github.com/fortesl/thestore/issues/6"><strike>add additional properties like categories to products</strike></a><br>
7. <a href="https://github.com/fortesl/thestore/issues/7">Redesign home page & product details page to incorporate product categories and shopping cart buttons</a><br>
9. <a href="https://github.com/fortesl/thestore/issues/9"><strike>Enable i18n and l10 - internationalization and localization - with the angular-translate module</strike></a><br>


Contributing
============
Contribute to this project by implementing the features listed above or <a href="https://github.com/fortesl/thestore/issues">by adding</a> other features you want to work on.
Please follow the development guidelines established for this project.

Create unit tests for all your Javascript code in the folder 'thestore/tests/unit'. From the 'thestore' folder, run your unit tests with the command <b>gulp unitTesting</b>

If you add new UI or modify the existing UI, create user acceptance tests in the folder 'thestore/tests/e2e'. From the 'thestore' folder, run your e2e tests with the command <b>gulp acceptanceTesting</b>

Make sure your code builds by running the command: <b>grunt</b>

License
=======
<a href="https://github.com/fortesl/thestore/blob/master/LICENSE">ISC</a>

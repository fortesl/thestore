(function () {
    'use strict';

    var gulp = require('gulp'),
        path = require('path'),
        sass = require('gulp-ruby-sass'),
        rename = require('gulp-rename'),
        del = require('del'),
        uglify = require('gulp-uglify'),
        concat = require('gulp-concat'),
        browserSync = require('browser-sync'),
        templateCache = require('gulp-angular-templatecache'),
        karma = require('karma').server,
        jshint = require('gulp-jshint'),
        protractor = require('gulp-protractor').protractor,
        processhtml = require('gulp-processhtml'),
        copy = require('gulp-copy'),
        connect = require('gulp-connect'),
        htmlmin = require('gulp-htmlmin'),
        jsonminify = require('gulp-jsonminify'),

        srcJsFiles = [
        'src/modules/core-module/core-app.js', 'src/modules/core-module/scripts/**/*.js',
        'src/modules/product-module/product-app.js', 'src/modules/product-module/scripts/**/*.js',
        'src/modules/user-module/user-app.js', 'src/modules/user-module/scripts/**/*.js'
    ],
        vendorJsFiles = [
        'src/bower_components/angular-input-match/dist/angular-input-match.js',
        'src/bower_components/angular-translate/angular-translate.js',
        'src/bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
        'src/bower_components/spin.js/spin.js',
        'src/bower_components/angular-spinner/angular-spinner.js',
        'src/bower_components/lf-cookies/lf-cookies.js',
        'src/bower_components/lf-firebase-auth/lf-firebase-auth-service.js'
    ],
        testJsFiles = ['./tests/unit/**/*.js'],
        e2eJsFiles = ['./tests/e2e/**/*.js'],
        srcHtmlFiles = ['./src/**/*.html'],
        srcScssFiles = ['./src/modules/*/styles/**/*.scss'],
        srcSassMainFile = './src/theStore.scss',
        srcTemplateFiles = ['./src/modules/*/views/**/*.html'],

        srcDir = './src/',
        devDir = srcDir + 'dev/',
        buildDir = './build/',
        coverageReportDir = './coverage/',
        devJsFile = 'thestore.js',
        devVendorFile = 'vendors.js',
        devJsDir = devDir + 'js/',
        devTemplatesDir = devDir + 'templates/',
        devCssDir = devDir + 'css/';


    gulp.task('dev', ['concatScripts','concatVendorScripts', 'concatStyles', 'lint', 'tdd', 'serve'], function() {
        gulp.watch(srcJsFiles.concat(testJsFiles).concat(e2eJsFiles), ['lint', 'concatScripts']);
        gulp.watch(srcScssFiles, ['buildDevStyle']);
    });

    gulp.task('test', ['unitTesting', 'acceptanceTesting']);

    gulp.task('build', ['buildScript', 'buildVendorScript', 'buildHtml', 'buildCopy', 'buildData', 'buildI18n'], function() {
        browserSync({
            server: {
                baseDir: buildDir
            }
        });
    });

    gulp.task('concatScripts', function() {
        return gulp.src(srcJsFiles)
            .pipe(concat(devJsFile))
            .pipe(gulp.dest(devJsDir));
    });

    gulp.task('concatVendorScripts', function() {
        return gulp.src(vendorJsFiles)
            .pipe(concat(devVendorFile))
            .pipe(gulp.dest(devJsDir));
    });

    gulp.task('concatStyles', function() {
        return sass(srcSassMainFile, {style: 'compressed'})
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest(devCssDir));
    });

    gulp.task('cleanDev', function(cb) {
        del([devDir, coverageReportDir], cb);
    });

    gulp.task('cleanBuild', function(cb) {
        del([buildDir, coverageReportDir], cb);
    });

    gulp.task('lint', function() {
        return gulp.src(srcJsFiles.concat(testJsFiles).concat(e2eJsFiles).concat('Gulpfile.js'))
            .pipe(jshint())
            .pipe(jshint.reporter('default'));
    });

    gulp.task('serve', function() {
        browserSync({
            server: {
                baseDir: srcDir
            },
            files: [devCssDir + '*.css', srcHtmlFiles, devJsDir + '*.js']
        });
    });

    gulp.task('unitTesting', function(done) {
        karma.start({
            configFile: path.resolve('karma.conf.js'),
            singleRun: true,
            browsers: ['PhantomJS']
        }, done);
    });

    gulp.task('tdd', function(done) {
        karma.start({
            configFile: path.resolve('karma.conf.js')
        }, done);
    });


    gulp.task('connect', function() {
        connect.server({
            port: 9000,
            hostname: '0.0.0.0',
            keepalive: false,
            base: srcDir
        });
    });

    gulp.task('acceptanceTesting', ['connect'], function() {
        gulp.src(e2eJsFiles)
            .pipe(protractor({
                configFile: path.resolve('protractor.conf.js')
            }))
            .on('error', function(e) { console.log(e); throw e; });
    });

    gulp.task('ngtemplates', function() {
        gulp.src(srcTemplateFiles)
            .pipe(templateCache('templates.js', { module: 'storeApp', root: 'modules/' }))
            .pipe(gulp.dest(devTemplatesDir));
    });

    gulp.task('buildScript', ['ngtemplates'], function() {
        return gulp.src([devJsDir + devJsFile, devTemplatesDir + '*'])
            .pipe(uglify())
            .pipe(concat(devJsFile))
            .pipe(rename({suffix: '.tpls.min'}))
            .pipe(gulp.dest(buildDir));
    });

    gulp.task('buildVendorScript', function() {
        return gulp.src([devJsDir + devVendorFile])
            .pipe(uglify(devVendorFile))
            .pipe(rename({suffix: '.min'}))
            .pipe(gulp.dest(buildDir));
    });

    gulp.task('buildHtml', function() {
        return gulp.src(srcDir + 'index.html')
            .pipe(processhtml())
            .pipe(htmlmin({
                removeComments: true,
                collapseWhitespace: true,
                collapseBooleanAttributes: true,
                removeAttributeQuotes: true,
                removeRedundantAttributes: true,
                removeOptionalTags: true,
                removeScriptTypeAttributes:     true,
                removeStyleLinkTypeAttributes:  true,
                removeEmptyAttributes:          true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
            }))
            .pipe(gulp.dest(buildDir));
    });

    gulp.task('buildCopy', function () {
        return gulp.src([devCssDir + '*', srcDir + 'favicon.ico'])
            .pipe(copy(buildDir, {prefix: 3}));
    });

    gulp.task('buildData', function() {
        return gulp.src([srcDir + 'storeData/*'])
            .pipe(jsonminify())
            .pipe(gulp.dest(buildDir + 'storeData/'));
    });

    gulp.task('buildI18n', function() {
        return gulp.src([srcDir + 'i18n/*'])
            .pipe(jsonminify())
            .pipe(gulp.dest(buildDir + 'i18n/'));
    });

    gulp.task('saucelabsE2eTesting', function() {
        gulp.src(e2eJsFiles)
            .pipe(protractor({
                configFile: path.resolve('saucelabs.protractor.conf.js')
            }))
            .on('error', function(e) { console.log(e); throw e; });
    });

    gulp.task('CITest', ['unitTesting', 'saucelabsE2eTesting']); //runs automatically after push to repository.


    gulp.task('default', function() {
        console.log('Hello Gulp');
    });

})();
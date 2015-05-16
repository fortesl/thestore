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
    e2e = require('gulp-protractor').protractor,
    processhtml = require('gulp-processhtml'),
    copy = require('gulp-copy'),
    connect = require('gulp-connect'),
    htmlmin = require('gulp-htmlmin'),
    jsonminify = require('gulp-jsonminify'),
    
    sources = require('./sourceFiles'),

    e2eJsFiles = ['tests/e2e/**/*spec.js'],
    testJsFiles = ['./tests/**/*.js'],
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


gulp.task('dev', ['concatScripts','concatVendorScripts', 'concatStyles', 'lint', 'tdd', 'serve', 'watch']);

gulp.task('watch', function() {
    gulp.watch(sources.srcJsFiles.concat(testJsFiles).concat('sourceFiles.js'), ['lint', 'concatScripts']);
    gulp.watch(srcScssFiles, ['concatStyles']);
});

gulp.task('test', ['unitTesting', 'acceptanceTesting']);

gulp.task('build', ['buildScript', 'buildVendorScript', 'buildHtml', 'buildCopy', 'buildData'], function() {
    browserSync({
        server: {
            baseDir: buildDir
        }
    });
});

gulp.task('concatScripts', function() {
    return gulp.src(sources.srcJsFiles)
        .pipe(concat(devJsFile))
        .pipe(gulp.dest(devJsDir));
});

gulp.task('concatVendorScripts', function() {
    return gulp.src(sources.vendorJsFiles)
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
    return gulp.src(sources.srcJsFiles.concat(testJsFiles).concat('*.js'))
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('serve', function() {
    browserSync({
        server: {
            baseDir: srcDir
        },
        files: [devCssDir + '*.css', srcHtmlFiles, devJsDir + '*.js', srcDir + 'index.html']
    });
});

gulp.task('unitTesting', function(done) {
    karma.start({
        configFile: path.resolve('karma.conf.js'),
        singleRun: true,
        files: sources.vendorJsFiles.concat(sources.srcJsFiles).concat(sources.unitTestFiles),
        browsers: ['PhantomJS']
    }, done);
});

gulp.task('tdd', function(done) {
    karma.start({
        configFile: path.resolve('karma.conf.js'),
        files: sources.vendorJsFiles.concat(sources.srcJsFiles).concat(sources.unitTestFiles)
    }, done);
});

gulp.task('connect', function() {
    browserSync({
        server: {
            baseDir: srcDir,
            index: 'index.html'
        },
        port: 9000
    });
});

gulp.task('connect2', function() {
    connect.server({
        port: 9000,
        hostname: '0.0.0.0',
        keepalive: false,
        base: srcDir,
        middleware: function (connect, options) {
            return [

                function (req, resp, next) {
                    // handle the browsers request for favicon
                    if (req.url === '/favicon.ico') {
                        resp.writeHead(200,
                            {
                                'Content-Type': 'image/x-icon'
                            });
                        return;
                    }
                    // cache get requests to speed up tests
                    if (req.method === 'GET') {
                        resp.setHeader('Cache-control', 'public, max-age=3600');
                    }
                    next();
                },
                connect.static(options.base)
            ];
        }
    });
});

gulp.task('acceptanceTesting', ['connect2'], function() {
    gulp.src(e2eJsFiles)
        .pipe(e2e({
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
//        .pipe(uglify(devVendorFile))
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
    gulp.src([srcDir + 'storeData/*'])
        .pipe(jsonminify())
        .pipe(gulp.dest(buildDir + 'storeData/'));
    return gulp.src([srcDir + 'i18n/*'])
        .pipe(jsonminify())
        .pipe(gulp.dest(buildDir + 'i18n/'));
});

gulp.task('saucelabsE2eTesting', function() {
    gulp.src(e2eJsFiles)
        .pipe(e2e({
            configFile: path.resolve('saucelabs.protractor.conf.js')
        }))
        .on('error', function(e) { console.log(e); throw e; });
});

gulp.task('CITest', ['unitTesting', 'saucelabsE2eTesting']); //runs automatically after push to repository.


gulp.task('default', function() {
    console.log('Hello Gulp');
});
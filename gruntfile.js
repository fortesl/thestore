var fs = require('fs');

module.exports = function(grunt) {
    'use strict';
    //load npmtask
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-jsonmin');
    grunt.loadNpmTasks('grunt-contrib-concat-sourcemaps');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-aws');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-angular-templates');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-protractor-runner');
    grunt.loadNpmTasks('grunt-exec');

    //configure task
    grunt.initConfig({

       srcjsFiles: [
           'src/modules/core-module/core-app.js', 'src/modules/core-module/scripts/**/*.js',
           'src/modules/product-module/product-app.js', 'src/modules/product-module/scripts/**/*.js',
           'src/modules/user-module/user-app.js', 'src/modules/user-module/scripts/**/*.js'
       ],
       vendorjsFiles: [
           'src/bower_components/angular-input-match/dist/angular-input-match.js',
           'src/bower_components/angular-translate/angular-translate.js',
           'src/bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
           'src/bower_components/spin.js/spin.js',
           'src/bower_components/angular-spinner/angular-spinner.js',
           'src/bower_components/lf-cookies/lf-cookies.js',
           'src/bower_components/lf-firebase-auth/lf-firebase-auth-service.js'
       ],
       testjsFiles: ['tests/unit/**/*.js'],
       e2ejsFiles: ['tests/e2e/**/*.js'],
       srchtmlFiles: ['src/**/*.html'],
       srccssFiles: ['src/dev/css/**/*.css'],

       concat: {
           thestore: {
               dest: 'src/dev/js/thestore.js',
               src: '<%= srcjsFiles %>'
           },
           vendors: {
               dest: 'src/dev/js/vendors.js',
               src: ['<%= vendorjsFiles %>']
           }
       },

       processhtml: {
           build: {
               files: {'build/index.html': ['src/index.html']}
           }
       },

       jsonmin: {
           data: {
               files: [ {expand: true, cwd: 'src/storeData', src: ['**/*.json'], dest: 'build/storeData/'} ]
           },
           i18n: {
               files: [ {expand: true, cwd: 'src/i18n', src: ['**/*.json'], dest: 'build/i18n/'} ]
           }
       },

       htmlmin: {
           options: {
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
           },
           index: {
               files: {'build/index.html': 'build/index.html'}
           }
       },

       copy: {
           favicon: {
               dest: 'build/favicon.ico',
               src: 'src/favicon.ico'
           },
           css: {
               dest: 'build/css',
               src: 'src/dev/css/thestore.min.css'
           }
       },

       jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            src: ['Gruntfile.js','<%= srcjsFiles %>'],
            tests:  ['<%= testjsFiles %>'],
            e2e:  ['<%= e2ejsFiles %>']
       },

       uglify: {
           options: {
               mangle: true,
               preserveComments: false,
               compress: true
           },
           js: {
               files: {'build/js/thestore.min.js': ['<%= concat.thestore.dest %>']}
           },
           vendors: {
               files: {'build/js/vendors.min.js': ['<%= concat.vendors.dest %>']}
           }
       },

       clean: {
           build: ['build'],
           postbuild: ['<%= ngtemplates.storeApp.dest %>', 'src/js'],
           js: ['src/dev/js'],
           coverage: ['coverage']
       },

       aws: (grunt.file.exists('../aws.json')) ? grunt.file.readJSON('../aws.json') : null,
       s3: {
           options: {
               accessKeyId: '<%= aws.accessKeyId %>',
               secretAccessKey: '<%= aws.secretAccessKey %>',
               bucket: 'gostore'
           },
           build: {
               cwd: 'build/',
               src: '**'
           }
       },

        // The actual grunt server settings
        connect: {
            options: {
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost',
                livereload: 35729
            },
            livereload: {
                options: {
                    port: 9000,
                    open: true,
                    base: 'src'
                }
            },
            build: {
                options: {
                    livereload: true,
                    keepalive: true,
                    port: 9001,
                    open: true,
                    base: 'build'
                }
            },
            travis: {
                base: 'src',
                hostname: 'localhost',
                port: 9000
            }
        },

       watch: {
           js: {
               files: ['<%= srcjsFiles %>', '<%= testjsFiles %>'],
               tasks: ['lintjs', 'concat:thestore']
           },
           livereload: {
               options: {
                   livereload: '<%= connect.options.livereload %>'
               },
               files: [
                   'src/dev/js/thestore.js',
                   '<%= srchtmlFiles %>',
                   '<%= srccssFiles %>',
                   'i18n/messages_en.json'
               ]
           }
       },

        ngtemplates:  {
            storeApp:        {
                cwd: 'src',
                src:      '**/views/**/*.html',
                dest:     'src/modules/core-module/scripts/templates.js',
                options: {
                    htmlmin: {
                        removeComments: true,
                        collapseWhitespace: true,
                        collapseBooleanAttributes: true,
                        removeAttributeQuotes: true,
                        removeRedundantAttributes: true,
                        removeOptionalTags: true,
                        removeScriptTypeAttributes: true,
                        removeStyleLinkTypeAttributes: true,
                        removeEmptyAttributes: true
                    }
                }
            }
        },

        karma: {
            test: {
                configFile: 'karma.conf.js'
            },
            build: {
                configFile: 'karma.conf.js',
                browsers: ['PhantomJS'],
                singleRun: true
            }
        },

        protractor: {
            options: {
                configFile: "node_modules/protractor/referenceConf.js", // Default config file
                keepAlive: false, // If false, the grunt process stops when the test fails.
                noColor: false, // If true, protractor will not use colors in its output.
                args: {
                    // Arguments passed to the command
                }
            },
            test: {
                options: {
                    configFile: "protractor.conf.js", // Target-specific config file
                    args: {
                    } // Target-specific arguments
                }
            },
            cmdServer: {   // A running standalone selenium server.
                options: {
                    configFile: "cmd.protractor.conf.js", // Target-specific config file
                    args: {
                    } // Target-specific arguments
                }
            },
            travis: {
                options: {
                    configFile: "saucelabs.protractor.conf.js", // Target-specific config file
                    args: {
                    } // Target-specific arguments
                }
            }
        },

        exec: {//globally available selenium server.
            selenium: 'webdriver-manager start'
        }
    });
    
    grunt.registerTask('log-build', function() {
        this.requires('karma:build');
        this.requires('ngtemplates');
        this.requires('clean:build');
        this.requires('concat');
        this.requires('processhtml');
        this.requires('jsonmin');
        this.requires('htmlmin');
        this.requires('copy');
        this.requires('lintjs');
        this.requires('uglify');
        grunt.task.run('clean:postbuild');

        var message = 'Built on ' + new Date();
        fs.appendFileSync('build.log', message + '\n');
        grunt.log.writeln(message);
    });
    
    // makes jshint optional
    grunt.registerTask('lintjs', function() {
        if (grunt.file.exists('.jshintrc')) {
            grunt.task.run('jshint');
        }
        else {
            grunt.log.writeln('Warning: .jshintrc file not found. Javascript not linted!');
        }
    });

    grunt.registerTask('log-deployAWS', function() {
        var message = 'Deployed on ' + new Date();
        fs.appendFileSync('deployAWS.log', message + '\n');
        grunt.log.writeln(message);
    });

    grunt.registerTask('serve', 'start a connect web server', function () {
        grunt.task.run([
            'lintjs',
            'clean:js',
            'concat',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('unitTest', ['karma:test']);
    grunt.registerTask('e2eTest', ['protractor:test']);
    grunt.registerTask('build', ['karma:build', 'ngtemplates', 'clean:build', 'concat', 'processhtml', 'jsonmin', 'htmlmin', 'lintjs', 'uglify', 'copy', 'clean:postbuild', 'log-build',
        'connect:build']);
    grunt.registerTask('default', 'build');
    grunt.registerTask('deployAWS', ['s3', 'log-deployAWS']);

    grunt.registerTask('CITest', ['concat', 'connect:travis', 'karma:build', 'protractor:travis']); //runs automatically after push to repository.

};
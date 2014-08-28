var fs = require('fs');
module.exports = function(grunt) {
    "use strict";
    //load npmtask
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-jsonmin');
    grunt.loadNpmTasks('grunt-contrib-concat-sourcemaps');
    grunt.loadNpmTasks('grunt-processhtml');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-aws');

    //configure task
    grunt.initConfig({
       concat: {
           build: {
               dest: 'build/js/thestore.min.js',
               src: ['src/js/app.js', 'src/js/store.js', 'src/js/products.js']
           }
       },
       processhtml: {
           build: {
               files: {'build/index.html': ['src/index.html']}
           }
       },
       jsonmin: {
           data: {
               files: [ {expand: true, cwd: 'src/data', src: ['**/*.json'], dest: 'build/data/'} ]
           }
       },
       cssmin: {
           thestore: {
               files: {
                   'build/css/thestore.min.css': ['src/css/*.css']
               }
           }
       },
       htmlmin: {
           options: {
                removeComments: true,
                collapseWhitespace: true,
                collapseBooleanAttributes: true,
                removeAttributeQuotes: true,
                removeRedundantAttributes: true,
                removeOptionalTags: true
           },
           allhtml: {
                expand: true,
                cwd: 'src/',
                src: ['**/*.html', '!index.html'],
                dest: 'build/'
           },
           index: {
               files: {'build/index.html': 'build/index.html'}
           }
       },
       imagemin: {
           images: {
               files: [
                   {
                    expand: true,
                    cwd: 'src',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'build/'
                   }
               ]
           }
       },
       copy: {
           vendor: {
               files: [
                   {
                    expand:true, 
                    cwd: 'src/vendor',
                    src: ['**/*.{js,css,map}', '**/dist/fonts/*'], 
                    dest: 'build/vendor/'
                   }
               ]
           },
           images: {
               files: [
                   {
                       expand:true,
                       cwd: 'src/images',
                       src: ['**/*'],
                       dest: 'build/images/'
                   }
               ]
           },
           favicon: {
               dest: 'build/favicon.ico',
               src: 'src/favicon.ico'
           }
       },
       jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: ['src/js/**/*.js']
       },
       uglify: {
           options: {
               mangle: true,
               preserveComments: false,
               compress: {drop_console: true}
           },
           js: {
               files: {'<%= concat.build.dest %>': ['<%= concat.build.dest %>']}
           }
       },
       clean: {
           build: ["build"]
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
       }
    });
    
    grunt.registerTask('log-build', function() {
        this.requires('clean:build');
        this.requires('concat');
        this.requires('processhtml');
        this.requires('jsonmin');
        this.requires('cssmin');
        this.requires('htmlmin');
        this.requires('copy');
        this.requires('lintjs');
        this.requires('uglify');
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
            grunt.log.writeln("Warning: .jshintrc file not found. Javascript not linted!");
        }
    });

    grunt.registerTask('log-deployAWS', function() {
        var message = 'Deployed on ' + new Date();
        fs.appendFileSync('deployAWS.log', message + '\n');
        grunt.log.writeln(message);
    });
    
    grunt.registerTask('build', ['clean', 'concat', 'processhtml', 'jsonmin', 'cssmin', 'htmlmin', 'copy', 'lintjs', 'uglify', 'log-build']);
    grunt.registerTask('default', 'build');
    grunt.registerTask('deployAWS', ['s3', 'log-deployAWS']);
    
};
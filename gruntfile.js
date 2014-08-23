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

    //configure task
    grunt.initConfig({
       concat: {
           build: {
               dest: 'src/js/thestore.js',
               src: ['src/js/app.js', 'src/js/store.js', 'src/js/products.js']
           }
       },
       processhtml: {
           build: {
               files: {'build/tmp/index.html': ['src/index.html']}
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
                collapseWhitespace: true
           },
           allhtml: {
                expand: true,
                cwd: 'src/',
                src: ['**/*.html'],
                dest: 'build/'
           },
           index: {
               files: {'build/index.html': ['build/tmp/index.html']}
           }
       },
       imagemin: {
           images: {
               files: [
                   {
                    expand: true,
                    cwd: 'src/images',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: 'build/images/'
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
           deploy: {
               expand:true,
               cwd: 'build',
               dest: 'deploy/store/',
               src: ['**/*']
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
               files: {'build/js/thestore.min.js': ['src/js/thestore.js']}
           }
       },
       clean: {
           build: ["build"],
           tmp: ['build/tmp', 'src/js/thestore.js']
       }
    });
    
    //register store tasks
    grunt.registerTask('log-deploy', function() {
        this.requires('clean:build');
        this.requires('concat');
        this.requires('processhtml');
        this.requires('jsonmin');
        this.requires('cssmin');
        this.requires('htmlmin');
        this.requires('imagemin');
        this.requires('copy:vendor');
        this.requires('lintjs');
        this.requires('uglify');
        this.requires('clean:tmp');
        var message = 'Deployment on ' + new Date();
        fs.appendFileSync('deploy.log', message + '\n');
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

    
    grunt.registerTask('build', ['clean', 'concat', 'processhtml', 'jsonmin', 'cssmin', 'htmlmin', 'imagemin', 'copy:vendor', 'lintjs', 'uglify', 'clean:tmp', 'log-deploy']);
    grunt.registerTask('default', 'build');
    grunt.registerTask('deploy', ['copy:deploy'])
    
};
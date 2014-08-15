var fs = require('fs');
module.exports = function(grunt) {
    //load npmtask
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-imagemin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    
    //configure task
    grunt.initConfig({
       uglify: {
           options: {
               mangle: true,
               preserveComments: false,
               compress: {drop_console: true}
           },
           target1: {
               files: [
                   {
                       expand: true,
                       cwd: 'src/js',
                       src: ['**/*.js'], 
                       dest: 'build/js/'
                   }
               ]
           }
       },
       cssmin: {
           target1: {
               files: [
                   {src: 'src/css/*.css', dest: 'build/css/thestore.css'}
               ]
           }
       },
       htmlmin: {
           target1: {
               options: {
                   removeComments: true,
                   collapseWhitespace: true
               },
                expand: true,
                cwd: 'src/',
                src: ['**/*.html'],
                dest: 'build/'
           }
       },
       imagemin: {
           target1: {
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
                    src: ['**/*.min.*', '**/dist/fonts/*'], 
                    dest: 'build/vendor/'
                   }
               ]
           },
           data: {
               files: [
                   {
                    expand:true, 
                    cwd: 'src/data',
                    src: ['**/*'], 
                    dest: 'build/data/'
                   }
               ]
           }
       },
       clean: {
           build: ["build"]
       }
    });
    
    //register store tasks
    grunt.registerTask('log-deploy', function() {
        this.requires('uglify');
        var message = 'Deployment on ' + new Date();
        fs.appendFileSync('deploy.log', message + '\n');
        grunt.log.writeln(message);
    });

    
    grunt.registerTask('build', ['clean', 'uglify', 'cssmin', 'htmlmin', 'imagemin', 'copy', 'log-deploy'])
    
};
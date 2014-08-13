var fs = require('fs');
module.exports = function(grunt) {
    //load task
    grunt.loadNpmTasks('grunt-contrib-uglify');
    
    //configure task
    grunt.initConfig({
       uglify: {
           target1: {
               files: [
                   {
                       expand: true,
                       cwd:'src/js/',
                       src: '**/*.js',
                       dest: 'build/',
                       ext: '.min.js'
                   },
               ],
           }
       } 
    });
    
    grunt.registerTask('log-deploy', function() {
        this.requires('uglify');
        var message = 'Deployment on ' + new Date();
        fs.appendFileSync('deploy.log', message + '\n');
        grunt.log.writeln(message);
    });
    
    grunt.registerTask('build', ['uglify', 'log-deploy'])
    
};
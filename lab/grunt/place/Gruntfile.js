/*global module:false*/
module.exports = function(grunt) {

var mountFolder = function(connect,dir){
    return connect.static(require("path").resolve(dir));
};
var LIVERELOAD_PORT = 35729;
var lrSnippet = require('connect-livereload')({
    port:LIVERELOAD_PORT
});
  // Project configuration.
  grunt.initConfig({
    // Task configuration.
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {}
      },
      files:["src/scripts/**/*.js"]
    },
    connect:{
      options:{
        port:9000,
        hostname:"0.0.0.0"
      },
      livereload:{
        options:{
          middleware:function(connect){
            return [
              lrSnippet,
              mountFolder(connect,".tmp"),
              mountFolder(connect,"./")
            ];
          }
        }
      }
    },
    watch: {
      livereload:{
        options:{
          livereload: LIVERELOAD_PORT
        },
        files:["src/**/*"]
      },
      scripts:{
        files:['<%= jshint.files %>'],
        tasks:['jshint']
      }
    },
    groundskeeper:{
      dist:{
        expand:true,
        cwd:"src/scripts",
        src:["**/*.js"],
        dest:"src/scripts/",
        ext:".js",
        options:{
          console:false,
          debugger:false
        }
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-groundskeeper');

  // Default task.
  grunt.registerTask('default', ['connect:livereload','watch:livereload']);
  //Since the place is too hard to alter
  //grunt.registerTask('default', ['connect:livereload','watch']);
  grunt.registerTask('remove', ['groundskeeper']);
  grunt.registerTask('check', ['jshint']);
};

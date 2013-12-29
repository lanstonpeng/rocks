/*global module:false*/
module.exports = function(grunt) {

  var LIVERELOAD_PORT = 35729;
  var lrSnippet = require('connect-livereload')({
      port:LIVERELOAD_PORT
  });
  var livereloadMiddleware = function(connect,options){
    return [
      lrSnippet,
      connect.static(options.base)
    ];
  };
  var mountFolder = function(connect,dir){
    return connect.static(require("path").resolve(dir));
  };
  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: 'main.js',
        dest: 'dist/main.min.js'
      }
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
        files:["index.html"]
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-connect');

  // Default task.
  grunt.registerTask('default', ['connect:livereload','watch:livereload']);
  /*
  grunt.registerTask('server',function(target){
    grunt.task.run(["connect:livereload","open","watch"]);
  });
  */

};

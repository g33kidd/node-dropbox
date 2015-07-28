module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-clear');

  grunt.initConfig({
    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['test/test.js']
      }
    },
    watch: {
      files: ['test/**', 'lib/**'],
      tasks: ['clear', 'mochaTest']
    }
  });

  grunt.registerTask('default', 'mochaTest');

}

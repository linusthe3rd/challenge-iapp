module.exports = function (grunt) {
    'use strict';

    // Load grunts tasks from package.json
    require('load-grunt-tasks')(grunt);

    // =========================================================
    // Task Configuration
    // =========================================================

    grunt.initConfig({
        connect: {
            server: {
                options: {
                    base: 'src',
                    port: 9000
                }
            }
        },
        jshint: {
            app: {
                options: {
                    jshintrc: 'src/.jshintrc'
                },
                files: {
                    src: ['src/**/*.js', '!src/vendor/**/*.js']
                }
            },
        },
        less: {
            dev: {
                files: {
                    'src/style.css': 'src/style.less'
                }
            }
        },
        watch: {
            less: {
                files: 'src/**/*.less',
                tasks: 'less:dev',
                interrupt: true
            },
            jshint: {
              files: ['<%= jshint.app.files.src %>'],
              tasks: ['jshint:app']
            }
        },
    });

    // =========================================================
    // Task Definition
    // =========================================================

    //
    // Start local server to access files from localhost.
    //
    grunt.registerTask('server', function() {
        grunt.task.run([
            'less:dev',
            'connect:server',
            'watch'
        ]);
    });

    grunt.registerTask('default', ['server']);
};
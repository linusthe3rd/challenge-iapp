module.exports = function (grunt) {
    'use strict';

    // Load grunts tasks from package.json
    require('load-grunt-tasks')(grunt);

    // Load local grunt tasks
    grunt.loadTasks("grunt_tasks");

    // =========================================================
    // Task Configuration
    // =========================================================

    grunt.initConfig({
        clean: {
            build: ['dist']
        },
        connect: {
            server: {
                options: {
                    // base: '',
                    port: 9000
                }
            }
        },
        copy: {
            dist: {
                files: [
                    {src: 'src/index.html', dest: "dist/index.html"},
                    {   // Filtered assets.
                        expand: true,
                        cwd: 'src/',
                        src: [
                            '**/*.*',
                            '!style.css',
                            '!**/*.less'
                        ],
                        dest: 'dist/'
                    }
                ]
            }
        },
        cssmin: {
          compress: {
            files: {
              'dist/style.min.css': ['dist/style.css']
            }
          }
        },
        'gh-pages': {
            options: {
              base: 'dist'
            },
            src: ['**']
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
                    'src/style.css': 'src/less/style.less'
                }
            },
            dist: {
                files: {
                    'dist/style.css': 'src/less/style.less'
                }
            }
        },
        requirejs: {
            dist: {
                options: {
                    baseUrl: 'src/',
                    name: 'app/app',
                    optimize: 'uglify2',
                    out: 'dist/app.min.js',
                    preserveLicenseComments: false,
                    mainConfigFile: 'src/app/requireConfig.js'
                }
            }
        },
        templateInline: {
            dist: {
                files: {
                    'dist/index.html': ['src/**/*.tmpl.html']
                }
            }
        },
        usemin: {
            html: 'dist/index.html'
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

    grunt.registerTask('build', ['clean:build', 'copy', 'requirejs', 'less:dist', 'cssmin', 'usemin', 'templateInline']);

    grunt.registerTask('deploy', ['build', 'gh-pages']);
};
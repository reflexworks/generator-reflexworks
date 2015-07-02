// Generated on 2014-05-21 using generator-angular 0.7.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'

module.exports = function (grunt) {

    // 開発用のアプリケーションサーバー"connect"のミドルウェアを返します。
    // 静的ページを返すためのミドルウェアとライブリロードに対応するためのミドルウェアを返します。
    var getConnectMiddleware = function (connect, options) {
        var middlewares = [];
        var directory = options.directory || options.base[options.base.length - 1];
        if (!Array.isArray(options.base)) {
            options.base = [options.base];
        }

        // Setup the proxy
        middlewares.push(require('grunt-connect-proxy/lib/utils').proxyRequest);

        middlewares.push(
            function (req, res, next) {
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.setHeader('Access-Control-Allow-Methods', '*');
                res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
                next();
            }
        );

        options.base.forEach(function (base) {
            // Serve static files.
            middlewares.push(connect.static(base));
        });

        // Make directory browse-able.
        middlewares.push(connect.directory(directory));

        return middlewares;
    };

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

//    grunt.loadNpmTasks('grunt-connect-proxy');
    grunt.loadNpmTasks('grunt-react');

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        yeoman: {
            // configurable paths
            app: require('./bower.json').appPath || 'app',
            dist: 'dist'
        },

        // Watches files for changes and runs tasks based on the changed files
        watch: {
            js: {
                files: [
                        '<%= yeoman.app %>/scripts/{,*/}*.js',
                        '<%= yeoman.app %>/scripts/{,*/}*/{,*/}*.js'
                ],
                tasks: ['newer:jshint:all'],
                options: {
                    livereload: true
                }
            },
            jsTest: {
                files: ['test/spec/{,*/}*.js'],
                tasks: ['newer:jshint:test', 'karma']
            },
            compass: {
                files: [
                    '<%= yeoman.app %>/styles/**/*.{scss,sass}'
                ],
                tasks: ['compass:server', 'autoprefixer']
            },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            livereload: {
                options: {
                    livereload: '<%= yeoman.livereload %>',
                    middleware: getConnectMiddleware
                },
                files: [
                    '<%= yeoman.app %>/{,*/}*.html',
                    '<%= yeoman.app %>/{,*/}*/{,*/}*.html',
                    '.tmp/styles/{,*/}*.css',
                    '<%= yeoman.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            },
            react: {
                files: '<%= yeoman.app %>/server/**/*.jsx',
                tasks: ['react']
            }
        },

        // The actual grunt server settings
        connect: {
            options: {
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside.
//                hostname: '0.0.0.0',
                hostname: '127.0.0.1',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: true,
                    base: [
                        '.tmp',
                        '<%= yeoman.app %>'
                    ],
                    middleware: getConnectMiddleware
                }
            },
            test: {
                options: {
                    port: 9001,
                    base: [
                        '.tmp',
                        'test',
                        '<%= yeoman.app %>'
                    ]
                }
            },
            dist: {
                options: {
                    base: '<%= yeoman.dist %>'
                }
            },
            apimock: {
                proxies: [{
                    context: '/d',
                    host: '<%= serviceHostUrl %>',
                    port: 80,
//                    port: 3000,
                    https: false,
                    xforward: false,
                    headers: {
                        'host': 'localhost:8080'
                    }
                },{
                    context: '/p',
                    host: '<%= serviceHostUrl %>',
                    port: 80,
                    https: false,
                    xforward: false,
                    headers: {
                        'host': 'localhost:8080'
                    }
                },{
                    context: '/x',
                    host: '<%= serviceHostUrl %>',
                    port: 80,
                    https: false,
                    xforward: false,
                    headers: {
                        'host': 'localhost:8080'
                    }
                }
                ]
                },
                virtualproduction: {
                    proxies: [{
                    context: '/apps',
                    host: 'localhost',
                    port: 9000,
                    https: false,
                    xforward: false,
                    rewrite: {
                        '^/apps': ''
                    }
                }, {
                    context: '/api',
                    host: 'localhost',
                    port: 3000,
                    https: false,
                    xforward: false
                },{
                    context: '/d',
                    host: '<%= serviceHostUrl %>',
                    port: 443,
                    https: true,
                    xforward: false,
                    headers: {
                        'host': 'localhost:8080'
                    }
                }]
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: [
                'Gruntfile.js',
                '<%= yeoman.app %>/scripts/{,*/}*.js'
            ],
            test: {
                options: {
                    jshintrc: 'test/.jshintrc'
                },
                src: ['test/spec/{,*/}*.js']
            }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.dist %>/*',
                        '!<%= yeoman.dist %>/.git*'
                    ]
                }]
            },
            server: '.tmp',
            distbower: '<%= yeoman.dist %>/bower_components'
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/styles/',
                    src: '{,*/}*.css',
                    dest: '.tmp/styles/'
                }]
            }
        },

        // Automatically inject Bower components into the app
        'bower-install': {
            app: {
                html: '<%= yeoman.app %>/index.html',
                ignorePath: '<%= yeoman.app %>/'
            }
        },




        // Compiles Sass to CSS and generates necessary files if requested
        compass: {
            options: {
                sassDir: '<%= yeoman.app %>/styles',
                cssDir: '.tmp/styles',
                generatedImagesDir: '.tmp/images/generated',
                imagesDir: '<%= yeoman.app %>/images',
                javascriptsDir: '<%= yeoman.app %>/scripts',
                fontsDir: '<%= yeoman.app %>/styles/fonts',
                importPath: '<%= yeoman.app %>/bower_components',
                httpImagesPath: '/images',
                httpGeneratedImagesPath: '/images/generated',
                httpFontsPath: '/styles/fonts',
                relativeAssets: false,
                assetCacheBuster: false,
                raw: 'Sass::Script::Number.precision = 10\n'
            },
            dist: {
                options: {
                    generatedImagesDir: '<%= yeoman.dist %>/images/generated'
                }
            },
            server: {
                options: {
                    debugInfo: true
                }
            }
        },

        // Renames files for browser caching purposes
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/scripts/{,*/}*.js',
                        '<%= yeoman.dist %>/styles/{,*/}*.css',
                        '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                        '<%= yeoman.dist %>/styles/fonts/*'
                    ]
                }
            }
        },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them
        useminPrepare: {
            html: '<%= yeoman.app %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>'
            }
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            html: ['<%= yeoman.dist %>/{,*/}*.html'],
            css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
            options: {
                assetsDirs: ['<%= yeoman.dist %>']
            }
        },

        // The following *-min tasks produce minified files in the dist folder
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.{png,jpg,jpeg,gif}',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },
        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.app %>/images',
                    src: '{,*/}*.svg',
                    dest: '<%= yeoman.dist %>/images'
                }]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.dist %>',
                    src: ['*.html', 'views/{,*/}*.html'],
                    dest: '<%= yeoman.dist %>'
                }]
            }
        },

        // Allow the use of non-minsafe AngularJS files. Automatically makes it
        // minsafe compatible so Uglify does not destroy the ng references
        ngmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/concat/scripts',
                    src: '*.js',
                    dest: '.tmp/concat/scripts'
                }]
            }
        },

        // Replace Google CDN references
        cdnify: {
            dist: {
                html: ['<%= yeoman.dist %>/*.html']
            }
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.app %>',
                    dest: '<%= yeoman.dist %>',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        'pdf/*',
                        'xls/*',
                        'server/**',
                        'language/*',
                        '*.html',
                        'views/{,*/}*.html',
                        'bower_components/**/*',
                        'images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                        'fonts/*'
                    ]
                }, {
                    expand: true,
                    cwd: '.tmp/images',
                    dest: '<%= yeoman.dist %>/images',
                    src: ['generated/*']
                }]
            },
            styles: {
                expand: true,
                cwd: '<%= yeoman.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            },
            fonts: {
                expand: true,
                cwd: '<%= yeoman.app %>/bower_components/bootstrap/dist',
                dest: '<%= yeoman.dist %>',
                src: ['fonts/*']
            }
        },

        // Run some tasks in parallel to speed up the build process
        concurrent: {
            server: [
                'compass:server'
            ],
            test: [
                'compass'
            ],
            dist: [
                'compass:dist'
            ]
        },

        // By default, your `index.html`'s <!-- Usemin block --> will take care of
        // minification. These next options are pre-configured if you do not wish
        // to use the Usemin blocks.
        // cssmin: {
        //   dist: {
        //     files: {
        //       '<%= yeoman.dist %>/styles/main.css': [
        //         '.tmp/styles/{,*/}*.css',
        //         '<%= yeoman.app %>/styles/{,*/}*.css'
        //       ]
        //     }
        //   }
        // },
        // uglify: {
        //   dist: {
        //     files: {
        //       '<%= yeoman.dist %>/scripts/scripts.js': [
        //         '<%= yeoman.dist %>/scripts/scripts.js'
        //       ]
        //     }
        //   }
        // },
        // concat: {
        //   dist: {}
        // },

        // Test settings
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        },

        //E2Eテストランナー protractorのタスク設定です。
        protractor: {
            options: {
                configFile: 'node_modules/protractor/docs/referenceConf.js', // Default config file
                keepAlive: false,
                noColor: false,
                args: {}
            },
            E2E_local: {
                options: {
                    configFile: 'protractor.conf.js',
                    args: {}
                }
            }
        },

        // APIのモックサーバーである"Node Easymock"を起動するためのタスク設定です。
        easymock: {
            api: {
                options: {
                    port: 3000,
                    path: 'api-mock/',
                    config: 'api-mock/config.json'
                }
            }
        },
        react: {
            dynamic_mappings: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>',
                        src: [ 'server/**/*.jsx' ],
                        dest: '<%= yeoman.dist %>',
                        ext: '.js'
                    }
                ]
            }
        }

    });

    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run(['appBuild', 'connect:dist:keepalive']);
        }
        grunt.task.run([
            'easymock:api',
            'clean:server',
            'bower-install',
            'concurrent:server',
            'configureProxies:apimock',
            'autoprefixer',
            'connect:livereload',
            'watch'
        ]);
    });

    grunt.registerTask('server', function () {
        grunt.log.warn('The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve']);
    });

    grunt.registerTask('test', [
        'clean:server',
        'concurrent:test',
        'autoprefixer',
        'connect:test',
        'karma'
    ]);

    grunt.registerTask('upload1', function() {
        console.log('start upload task1.');
        var exec = require('child_process').exec;
        var done = this.async();
        var command = './rxcp.sh dist http://<%= serviceHostUrl %>';
        var option  = { timeout : 300000 }; // 5 分でタイムアウト
        var callback = function(error, stdout, stderr) {
            if(error) {
                console.log('ERROR', error, stderr);
                done(false);
            } else {
                console.log(stdout);
                done();
            }
        };
        exec(command, option, callback)
    });

    grunt.registerTask('upload2', function() {
        console.log('start upload task2.');
        var exec = require('child_process').exec;
        var done = this.async();
        var command = './rxcp.sh  setup http://<%= serviceHostUrl %>/p nocontent';
        var option  = { timeout : 300000 }; // 5 分でタイムアウト
        var callback = function(error, stdout, stderr) {
            if(error) {
                console.log('ERROR', error, stderr);
                done(false);
            } else {
                console.log(stdout);
                done();
            }
        };
        exec(command, option, callback);
    });

    grunt.registerTask('upload3', function() {
        console.log('start upload task3.');
        var exec = require('child_process').exec;
        var done = this.async();
        var command = './rxcp.sh  userinit http://<%= serviceHostUrl %>/d';
        var option  = { timeout : 300000 }; // 5 分でタイムアウト
        var callback = function(error, stdout, stderr) {
            if(error) {
                console.log('ERROR', error, stderr);
                done(false);
            } else {
                console.log(stdout);
                done();
            }
        };
        exec(command, option, callback)
    });

    grunt.registerTask('upload', [
                                    'upload1',
                                    'upload2',
                                    'upload3'
                                    ]);

    grunt.registerTask('appBuild', [
        'clean:dist',
        'bower-install',
        'useminPrepare',
        'concurrent:dist',
        'autoprefixer',
        'concat',
        'ngmin',
        'copy:dist',
        'cdnify',
        'cssmin',
        'uglify',
        'rev',
        'usemin',
        'copy:fonts',
        'htmlmin',
        'react',
        'clean:distbower'
    ]);

    grunt.registerTask('deploy', ['appBuild','upload']);

    grunt.registerTask('default', [
        'newer:jshint',
        'appBuild'
    ]);
};

var path =  require('path')

module.exports = function (grunt) {
    var localConfig = {};
    // Load grunt tasks automatically, when needed
    require('jit-grunt')(grunt, {
        express: 'grunt-express-server',
        useminPrepare: 'grunt-usemin',
        ngtemplates: 'grunt-angular-templates',
        cdnify: 'grunt-google-cdn',
        protractor: 'grunt-protractor-runner',
        injector: 'grunt-asset-injector',
        buildcontrol: 'grunt-build-control'
    });

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    // Define the configuration for all the tasks
    grunt.initConfig({

        // Project settings
        pkg: grunt.file.readJSON('package.json'),
        yeoman: {
            // configurable paths
            client: require('./bower.json').appPath || 'client',
            dist: 'dist',
            gallery: 'server/app/widgets/gallery',
            dist_gallery: 'dist/server/app/widgets/gallery',
            dev:'dev'
        },
        express: {
            options: {
                port: process.env.PORT || 9000
            },
            dev: {
                options: {
                    script: 'dev/server/app.js',
                    debug: true
                }
            },
            prod: {
                options: {
                    script: 'dist/server/app.js'
                }
            }
        },
        open: {
            server: {
                url: 'http://localhost:<%= express.options.port %>'
            }
        },
        watch: {
            // injectJS: {
            //     files: [
            //         '<%= yeoman.client %>/{app,components,gallery}/**/*.js',
            //         '!<%= yeoman.client %>/{app,components,gallery}/**/*.spec.js',
            //         '!<%= yeoman.client %>/{app,components,gallery}/**/*.mock.js',
            //         '!<%= yeoman.client %>/app/app.js'],
            //     tasks: ['injector:scripts']
            // },
            // injectCss: {
            //     files: [
            //         '<%= yeoman.client %>/{app,components,gallery}/**/*.css'
            //     ],
            //     tasks: ['injector:css']
            // },
            // mochaTest: {
            //     files: ['server/**/*.spec.js'],
            //     tasks: ['env:test', 'mochaTest']
            // },
            // jsTest: {
            //     files: [
            //         '<%= yeoman.client %>/{app,components,gallery}/**/*.spec.js',
            //         '<%= yeoman.client %>/{app,components,gallery}/**/*.mock.js'
            //     ],
            //     tasks: ['newer:jshint:all', 'karma']
            // },
            gruntfile: {
                files: ['Gruntfile.js']
            },
            livereload: {
                files: [
                    '{.tmp,<%= yeoman.client %>}/{app}/**/*.css',
                    '{.tmp,<%= yeoman.client %>}/{app}/**/*.html',
                    '{.tmp,<%= yeoman.client %>}/{app}/**/*.js',
                    '{.tmp,<%= yeoman.client %>}/**/*.html',
                    //'!{.tmp,<%= yeoman.client %>}{app,components}/**/*.spec.js',
                    //'!{.tmp,<%= yeoman.client %>}/{app,components,gallery}/**/*.mock.js',
                    '<%= yeoman.client %>/assets/images/{,*//*}*.{png,jpg,jpeg,gif,webp,svg}'
                ],
                options: {
                    livereload: true
                }
            },
            express: {
                files: [
                    'server/**/*.{js,json,html,less}',
                    //'server/app/widgets/gallery/**/*.{js,css,html}'
                ],
                tasks: [
                    //'copy:dev',
                    //'babel:gallery',
                    //'babel:dev',        
                    //'copy:es2015',
                    'less:server',
                    'copy:dist',
                    'babel:dist_gallery',
                    //'cssmin',        
                    //'uglify',
                    'string-replace',
                    //'htmlmin',
                    'copy:dev',
                    'babel:gallery',
                    'babel:dev',        
                    'copy:es2015',
                    'express:dev', 
                    'wait'
                ],
                options: {
                    livereload: true,
                    nospawn: true //Without this option specified express won't be reloaded
                }
            }
        },

        // Make sure code styles are up to par and there are no obvious mistakes
        jshint: {
            options: {
                jshintrc: '<%= yeoman.client %>/.jshintrc',
                reporter: require('jshint-stylish')
            },
            server: {
                options: {
                    jshintrc: 'server/.jshintrc'
                },
                src: [
                    'server/**/*.js',
                    '!server/app/widgets/gallery/**/*.js',
                    //'!server/**/*.spec.js'
                ]
            },
            // serverTest: {
            //     options: {
            //         jshintrc: 'server/.jshintrc-spec'
            //     },
            //     src: ['server/**/*.spec.js']
            // },
            all: [
                '<%= yeoman.client %>/{app}/**/*.js',
                // '!<%= yeoman.client %>/{app,components,gallery}/**/*.spec.js',
                // '!<%= yeoman.client %>/{app,components,gallery}/**/*.mock.js'
            ],
            // test: {
            //     src: [
            //         '<%= yeoman.client %>/{app,components,gallery}/**/*.spec.js',
            //         '<%= yeoman.client %>/{app,components,gallery}/**/*.mock.js'
            //     ]
            // }
        },

        // Empties folders to start fresh
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= yeoman.dist %>/*',
                        '!<%= yeoman.dist %>/.git*',
                        '!<%= yeoman.dist %>/.openshift',
                        '!<%= yeoman.dist %>/Procfile'
                    ]
                },{
                    expand: true,
                    dot: true,                    
                    src: ['<%= yeoman.gallery %>/**/*.fx.html'],
                }]
            },
            server: '.tmp',
            dev:'dev',
        },

        // Add vendor prefixed styles
        autoprefixer: {
            options: {
                browsers: ['last 1 version']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: '.tmp/',
                    src: '{,*/}*.css',
                    dest: '.tmp/'
                }]
            }
        },

        // Debugging with node inspector
        'node-inspector': {
            custom: {
                options: {
                    'web-host': 'localhost',
                    'save-live-edit': true,
                    'saveLiveEdit': true
                }
            }
        },

        // Use nodemon to run server in debug mode with an initial breakpoint
        nodemon: {
            debug: {
                script: 'dev/server/app.js',
                options: {
                    nodeArgs: ['--debug-brk'],
                    env: {
                        PORT: process.env.PORT || 9000
                    },
                    callback: function (nodemon) {
                        nodemon.on('log', function (event) {
                            console.log(event.colour);
                        });

                        // opens browser on initial server start
                        nodemon.on('config:update', function () {
                            setTimeout(function () {
                                require('open')('http://localhost:8080/debug?port=5858');
                            }, 500);
                        });
                    }
                }
            }
        },

        // Automatically inject Bower components into the app
        // wiredep: {
        //     target: {
        //         src: '<%= yeoman.client %>/index.html',
        //         ignorePath: '<%= yeoman.client %>/',
        //         exclude: [/bootstrap-sass-official/, /bootstrap.js/, '/json3/', '/es5-shim/']
        //     }
        // },

        // Renames files for browser caching purposes
        // rev: {
        //     dist: {
        //         files: {
        //             src: [
        //                 '<%= yeoman.dist %>/public/{,*/}*.js',
        //                 '<%= yeoman.dist %>/public/{,*/}*.css',
        //                 '<%= yeoman.dist %>/public/assets/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
        //                 '<%= yeoman.dist %>/public/assets/fonts/*'
        //             ]
        //         }
        //     }
        // },

        // Reads HTML for usemin blocks to enable smart builds that automatically
        // concat, minify and revision files. Creates configurations in memory so
        // additional tasks can operate on them

        useminPrepare: {
            html: ['<%= yeoman.client %>/index.html'],
            options: {
                dest: '<%= yeoman.dist %>/public'
            }
        },

        // Performs rewrites based on rev and the useminPrepare configuration
        usemin: {
            html: ['<%= yeoman.dist %>/public/**/*.html'],
            css: ['<%= yeoman.dist %>/public/**/*.css'],
            js: ['<%= yeoman.dist %>/public/**/*.js'],
            options: {
                assetsDirs: [
                    '<%= yeoman.dist %>/public',
                    '<%= yeoman.dist %>/public/assets/images'
                ],
                // This is so we update image references in our ng-templates
                patterns: {
                    js: [
                        [/(assets\/images\/.*?\.(?:gif|jpeg|jpg|png|webp|svg))/gm, 'Update the JS to reference our revved images']
                    ]
                }
            }
        },

        // The following *-min tasks produce minified files in the dist folder
        imagemin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.client %>/assets/images',
                    src: '{,*/}*.{png,jpg,jpeg,gif}',
                    dest: '<%= yeoman.dist %>/public/assets/images'
                }]
            }
        },

        svgmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.client %>/assets/images',
                    src: '{,*/}*.svg',
                    dest: '<%= yeoman.dist %>/public/assets/images'
                }]
            }
        },

        // Allow the use of non-minsafe AngularJS files. Automatically makes it
        // minsafe compatible so Uglify does not destroy the ng references
        // ngAnnotate: {
        //     dist: {
        //         files: [{
        //             expand: true,
        //             cwd: '.tmp/concat',
        //             src: '*/**.js',
        //             dest: '.tmp/concat'
        //         }]
        //     }
        // },

        // Package all the html partials into a single javascript payload
        // ngtemplates: {
        //     options: {
        //         // This should be the name of your apps angular module
        //         module: 'cmmsApp',
        //         htmlmin: {
        //             collapseBooleanAttributes: true,
        //             collapseWhitespace: true,
        //             removeAttributeQuotes: true,
        //             removeEmptyAttributes: true,
        //             removeRedundantAttributes: true,
        //             removeScriptTypeAttributes: true,
        //             removeStyleLinkTypeAttributes: true
        //         },
        //         usemin: 'app/app.js'
        //     },
        //     main: {
        //         cwd: '<%= yeoman.client %>',
        //         src: ['{app,components,gallery}/**/*.html'],
        //         dest: '.tmp/templates.js'
        //     },
        //     tmp: {
        //         cwd: '.tmp',
        //         src: ['{app,components,gallery}/**/*.html'],
        //         dest: '.tmp/tmp-templates.js'
        //     }
        // },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: false,
                    removeEmptyAttributes: false,
                    removeRedundantAttributes: false,
                    removeScriptTypeAttributes: false,
                    removeStyleLinkTypeAttributes: false
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.dist_gallery %>',
                    src: ['**/*.fx.html'],
                    dest: '<%= yeoman.dist_gallery %>',                    
                },{
                    expand: true,
                    cwd: '<%= yeoman.dist %>/public/bower_components/polymer',
                    src: ['**/*.html'],
                    dest: '<%= yeoman.dist %>/public/bower_components/polymer'
                }]
            },
        },

        babel: {
            dist_gallery: {    
                options: {
                    sourceMap: false,
                    presets: ['babel-preset-es2015']
                },            
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.dist_gallery %>',
                    src: ['**/*.js'],
                    dest: '<%= yeoman.dist_gallery %>',
                    ext:'.es5.js'
                }]
            },
            gallery: {    
                options: {
                    sourceMap: false,
                    presets: ['babel-preset-es2015']
                },            
                files: [{
                    expand: true,
                    cwd: 'dev/<%= yeoman.gallery %>',
                    src: ['**/*.js'],
                    dest: 'dev/<%= yeoman.gallery %>',
                    ext:'.es5.js'
                }]
            },
            dev: {    
                options: {
                    sourceMap: false,
                    presets: ['babel-preset-es2015'],
                    plugins: ["transform-async-to-generator"]
                },            
                files: [{
                    expand: true,
                    cwd: 'dev/server',
                    src: ['**/*.js'],
                    dest: '.tmp/dev/server',                    
                }]
            },

        },

        less: {            
            server: {    
                // options: {
                //     sourceMap: false,
                //     presets: ['babel-preset-es2015'],
                //     plugins: ["transform-async-to-generator"]
                // },            
                files: [{
                    expand: true,
                    cwd: 'server/app/widgets',
                    src: ['**/*.less'],
                    dest: 'server/app/widgets',
                    ext:'.css'                                        
                }]
            },
            // dev: {    
            //     // options: {
            //     //     sourceMap: false,
            //     //     presets: ['babel-preset-es2015'],
            //     //     plugins: ["transform-async-to-generator"]
            //     // },            
            //     files: [{
            //         expand: true,
            //         cwd: 'client',
            //         src: ['**/*.less','!/bower_components/**/*'],
            //         dest: 'client',
            //         ext:'.css'                                        
            //     }]
            // },

        },

        uglify: {
            dist: {
                options: {                    
                    mangle: false
                },
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.dist_gallery %>',
                    src: ['**/*.es5.js'],
                    dest: '<%= yeoman.dist_gallery %>',
                    ext:'.min.js'
                }]
            },
        },

        cssmin: {
            dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.dist_gallery %>',
                    src: ['**/*.css'],
                    dest: '<%= yeoman.dist_gallery %>',
                    ext: '.min.css'
                }]
            }
        },

        'string-replace': {
            css_dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.dist_gallery %>',
                    src: ['**/*.fx.html'],
                    dest: '<%= yeoman.dist_gallery %>',
                }],
                options: {
                    replacements: [{
                        pattern: /\/\* @import (.*?).css \*\//ig,
                        replacement: function (match, p1, p2, p3, p4) {
                            var dir = path.dirname(p4);
                            var filePath = path.join(dir, p1 + '.min.css');
                            
                            return grunt.file.read(filePath);
                        }
                    }]
                }
            },
            css: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.gallery %>',
                    src: ['**/*.fx.html'],
                    dest: '<%= yeoman.gallery %>',
                }],
                options: {
                    replacements: [{
                        pattern: /\/\* @import (.*?).css \*\//ig,
                        replacement: function (match, p1, p2, p3, p4) {
                            var dir = path.dirname(p4);
                            var filePath = path.join(dir, p1 + '.css');
                            
                            return grunt.file.read(filePath);
                        }
                    }]
                }
            },
            js_dist: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.dist_gallery %>',
                    src: ['**/*.fx.html'],
                    dest: '<%= yeoman.dist_gallery %>'
                }],
                options: {
                    replacements: [{
                        pattern: /\/\* @import (.*?).js \*\//ig,
                        replacement: function (match, p1, p2, p3, p4) {
                            var dir = path.dirname(p4);
                            var filePath = path.join(dir, p1 + '.min.js');

                            return grunt.file.read(filePath);
                        }
                    }]
                }
            },
            js: {
                files: [{
                    expand: true,
                    cwd: '<%= yeoman.gallery %>',
                    src: ['**/*.fx.html'],
                    dest: '<%= yeoman.gallery %>'
                }],
                options: {
                    replacements: [{
                        pattern: /\/\* @import (.*?).js \*\//ig,
                        replacement: function (match, p1, p2, p3, p4) {
                            var dir = path.dirname(p4);
                            var filePath = path.join(dir, p1 + '.js');
                            
                            return grunt.file.read(filePath);
                        }
                    }]
                }
            },
        },

        // Replace Google CDN references
        // cdnify: {
        //     dist: {
        //         html: ['<%= yeoman.dist %>/public/*.html']
        //     }
        // },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [{
                    expand: true,
                    //dest: '<%= yeoman.gallery %>',
                    src: [
                        'server/app/widgets/gallery/**/*.html'
                    ],
                    ext:'.fx.html'
                },{
                    expand: true,
                    dest: '<%= yeoman.dist %>',
                    src: [
                        'server/app/widgets/gallery/**/*.html'
                    ],
                    ext:'.fx.html'
                },{
                    expand: true,
                    //dest: '<%= yeoman.gallery %>',
                    src: [
                        'dist/server/app/widgets/gallery/**/*.html'
                    ],
                    ext:'.fx.html'
                },{
                    expand: true,
                    dot: true,
                    cwd: '<%= yeoman.client %>',
                    dest: '<%= yeoman.dist %>/public',
                    src: [
                        '*.{ico,png,txt}',
                        '.htaccess',
                        'bower_components/**/*',
                        'gallery/**/*',
                        'assets/**/*',
                        'index.html'
                    ]
                }, {
                    expand: true,
                    cwd: '.tmp/images',
                    dest: '<%= yeoman.dist %>/public/assets/images',
                    src: ['generated/*']
                }, {
                    expand: true,
                    dest: '<%= yeoman.dist %>',
                    src: [
                        'package.json',
                        'server/**/*'
                    ]
                }]
            },
            styles: {
                expand: true,
                cwd: '<%= yeoman.client %>',
                dest: '.tmp/',
                src: ['{app,components,gallery}/**/*.css']
            },
            dev:{
                files:[{
                    expand: true,
                    //dot: true,
                    
                    dest:'dev',
                    src:['client/**/*']
                },{
                    expand: true,
                    //dot: true,
                    //cwd: '<%= yeoman.client %>',
                    dest:'dev',
                    src:['server/**/*']
                }]                
            },
            es2015:{
                files:[{
                    expand: true,
                    //dot: true,
                    cwd: '.tmp/dev',
                    dest:'dev',
                    src:['server/**/*']
                }]
            }
        },

        buildcontrol: {
            options: {
                dir: 'dist',
                commit: true,
                push: true,
                connectCommits: false,
                message: 'Built %sourceName% from commit %sourceCommit% on branch %sourceBranch%'
            },
            // heroku: {
            //     options: {
            //         remote: 'heroku',
            //         branch: 'master'
            //     }
            // },
            // openshift: {
            //     options: {
            //         remote: 'openshift',
            //         branch: 'master'
            //     }
            // }
        },

        // Run some tasks in parallel to speed up the build process
        concurrent: {
            server: [],
            test: [],
            debug: {
                tasks: [
                    'nodemon',
                    'node-inspector'
                ],
                options: {
                    logConcurrentOutput: true
                }
            },
            dist: [
                'imagemin',
                'svgmin'
            ]
        },

        // Test settings
        // karma: {
        //     unit: {
        //         configFile: 'karma.conf.js',
        //         singleRun: true
        //     }
        // },

        // mochaTest: {
        //     options: {
        //         reporter: 'spec'
        //     },
        //     src: ['server/**/*.spec.js']
        // },

        // protractor: {
        //     options: {
        //         configFile: 'protractor.conf.js'
        //     },
        //     chrome: {
        //         options: {
        //             args: {
        //                 browser: 'chrome'
        //             }
        //         }
        //     }
        // },

        env: {
            test: {
                NODE_ENV: 'test'
            },
            prod: {
                NODE_ENV: 'production'
            },
            all: localConfig
        },

        // injector: {
        //     options: {

        //     },
        //     // Inject application script files into index.html (doesn't include bower)
        //     scripts: {
        //         options: {
        //             transform: function (filePath) {
        //                 filePath = filePath.replace('/client/', '');
        //                 filePath = filePath.replace('/.tmp/', '');
        //                 return '<script src="' + filePath + '"></script>';
        //             },
        //             starttag: '<!-- injector:js -->',
        //             endtag: '<!-- endinjector -->'
        //         },
        //         files: {
        //             '<%= yeoman.client %>/index.html': [
        //                 ['{.tmp,<%= yeoman.client %>}/{app,components,gallery}/**/*.js',
        //                     '!{.tmp,<%= yeoman.client %>}/app/app.js',
        //                     '!{.tmp,<%= yeoman.client %>}/{app,components,gallery}/**/*.spec.js',
        //                     '!{.tmp,<%= yeoman.client %>}/{app,components,gallery}/**/*.mock.js']
        //             ]
        //         }
        //     },

        //     // Inject component css into index.html
        //     css: {
        //         options: {
        //             transform: function (filePath) {
        //                 filePath = filePath.replace('/client/', '');
        //                 filePath = filePath.replace('/.tmp/', '');
        //                 return '<link rel="stylesheet" href="' + filePath + '">';
        //             },
        //             starttag: '<!-- injector:css -->',
        //             endtag: '<!-- endinjector -->'
        //         },
        //         files: {
        //             '<%= yeoman.client %>/index.html': [
        //                 '<%= yeoman.client %>/{app,components,gallery}/**/*.css'
        //             ]
        //         }
        //     }
        // },
    });

    // Used for delaying livereload until after server has restarted
    grunt.registerTask('wait', function () {
        grunt.log.ok('Waiting for server reload...');

        var done = this.async();

        setTimeout(function () {
            grunt.log.writeln('Done waiting!');
            done();
        }, 1500);
    });

    grunt.registerTask('express-keepalive', 'Keep grunt running', function () {
        this.async();
    });

    grunt.registerTask('serve', function (target) {
        if (target === 'dist') {
            return grunt.task.run([
                'build', 
                'env:all', 
                'env:prod', 
                'express:prod', 
                'wait', 
                'open', 
                'express-keepalive'
            ]);
        }

        if (target === 'debug') {
            return grunt.task.run([
                'clean:server',
                'env:all',
                'concurrent:server',
                //'injector',
                //'wiredep',
                //'autoprefixer',
                'concurrent:debug'
            ]);
        }

        grunt.task.run([
            'clean:server',
            'env:all',
            'concurrent:server',
            //'injector',
            //'wiredep',
            //'autoprefixer',
            'express:dev',
            'wait',
            'open',
            'watch'
        ]);
    });

    

    // grunt.registerTask('test', function (target) {
    //     if (target === 'server') {
    //         return grunt.task.run([
    //             'env:all',
    //             'env:test',
    //             //'mochaTest'
    //         ]);
    //     }

    //     else if (target === 'client') {
    //         return grunt.task.run([
    //             'clean:server',
    //             'env:all',
    //             //'concurrent:test',
    //             //'injector',
    //             //'autoprefixer',
    //             //'karma'
    //         ]);
    //     }

    //     else if (target === 'e2e') {
    //         return grunt.task.run([
    //             'clean:server',
    //             'env:all',
    //             //'env:test',
    //             //'concurrent:test',
    //             //'injector',
    //             //'wiredep',
    //             //'autoprefixer',
    //             'express:dev',
    //             //'protractor'
    //         ]);
    //     }

    //     else grunt.task.run([
    //         //'test:server',
    //         //'test:client'
    //     ]);
    // });

    grunt.registerTask('build', [
        'clean',
        'concurrent:dist',
        //'injector',
        //'wiredep',
        //'useminPrepare',
        'autoprefixer',
        //'ngtemplates',
        //'concat',
        //'ngAnnotate',
        'less:server',
        'copy:dist',
        'babel:dist_gallery',
        'cssmin',        
        'uglify',
        'string-replace',
        'htmlmin',
        'copy:dev',
        'babel:gallery',
        'babel:dev',        
        'copy:es2015',        
        //'cdnify',
        //'rev',
        //'usemin'
    ]);

    grunt.registerTask('default', [
        'newer:jshint',
        //'test',
        'build'
    ]);
};
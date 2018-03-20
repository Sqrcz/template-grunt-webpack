const pkg = require('./package.json')

module.exports = function(grunt) {
    require('jit-grunt')(grunt)

    grunt.initConfig({
        less: {
            development: {
                files: {
                    'static/css/main.css': 'assets/less/main.less'
                }
            }
        },
        postcss: {
            options: {
                map: {
                    inline: false
                },
                processors: [
                    require('autoprefixer')({
                        browsers: pkg.broeserslist
                    }),
                    require('cssnano')()
                ]
            },
            dist: {
                src: 'static/css/*.css'
            }
        },
        concat: {
            js: {
                files: {
                    'static/js/main.js': [
                        'assets/scripts/main.js',
                    ],
                },
            },
        },
        watch: {
            configFiles: {
                files: ['Gruntfile.js', 'package.json'],
                options: {
                    reload: true
                }
            },
            styles: {
                files: [
                    'assets/less/**/*.less',
                ],
                options: {
                    spawn: false
                },
                tasks: ['styles'],
            },
            scripts: {
                files: [
                    'assets/scripts/**/*.js',
                ],
                options: {
                    spawn: false
                },
                tasks: ['scripts'],
            },
        },
        browserSync: {
            bsFiles: {
                src: [
                    '*.html',
                    '<%= postcss.dist.src %>',
                    'static/js/**/*.js',
                ]
            },
            options: {
                watchTask: true,
                open: 'external',
                server: true
            }
        }
    })

    grunt.registerTask('styles', ['less'])

    grunt.registerTask('scripts', ['concat'])

    grunt.registerTask('default', ['styles', 'scripts', 'browserSync', 'watch'])

    grunt.registerTask('prod', ['less', 'postcss'])
}

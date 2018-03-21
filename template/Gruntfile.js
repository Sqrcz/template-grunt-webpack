const pkg = require('./package.json')
const webpackConfig = require('./config/webpack.config')

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
        webpack: {
            options: {
                stats: !grunt.option('env') || grunt.option('env') === 'dev'
            },
            prod: webpackConfig,
            dev: Object.assign({
                watch: true
            }, webpackConfig)
        },
        watch: {
            configFiles: {
                files: ['Gruntfile.js', 'package.json', './config/webpac.config.js'],
                options: {
                    reload: true
                },
                tasks: ['default'],
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

    grunt.registerTask('scripts', ['webpack'])

    grunt.registerTask('default', ['styles', 'scripts', 'browserSync', 'watch'])

    grunt.registerTask('prod', ['less', 'postcss'])
}

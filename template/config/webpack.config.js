const path = require('path')
const webpack = require('webpack')

module.exports = {
    // devtool: debug ? "inline-sourcemap" : null,
    entry: './assets/scripts/main.js',
    output: {
        path: path.resolve(__dirname, '../static/js'),
        filename: 'main.js'
    },
    stats: {
        colors: true
    },
    watch: false,
    // plugins: debug ? [] : [
    plugins: [
        // new webpack.optimize.DedupePlugin(),
        // new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            mangle: false,
            sourcemap: false
        }),
    ],
}

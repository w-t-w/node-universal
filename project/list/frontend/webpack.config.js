const path = require('path');

const OUTPUT_DIR = path.resolve(process.cwd(), './project/list/backend/source/static');

// webpack config
const webpackConfig = {
    devtool: false,
    mode: 'production',
    target: 'web',
    entry: {
        web_index: './project/list/frontend/page/index.js'
    },
    output: {
        publicPath: '',
        path: OUTPUT_DIR,
        filename: '[name].js',
        chunkFilename: '[name].js',
        library: {
            type: 'umd'
        }
    },
    stats: {
        preset: 'minimal'
    },
    module: {
        rules: [{
            test: /\.js[x]?$/,
            use: [{
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true
                }
            }]
        }]
    }
};

module.exports = webpackConfig;
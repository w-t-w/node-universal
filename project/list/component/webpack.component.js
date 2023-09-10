const path = require('path');

const OUTPUT_DIR = path.resolve(process.cwd(), './project/list/component/build');

// webpack component config
const componentConfig = {
    mode: 'production',
    devtool: false,
    target: 'web',
    entry: {
        component_index: './project/list/component/page/index.js'
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
            exclude: /node_modules/,
            use: [{
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true
                }
            }]
        }]
    }
};

module.exports = componentConfig;
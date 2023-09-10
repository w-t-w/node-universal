const path = require('path');

const OUTPUT_DIR = path.resolve(process.cwd(), './project/list/backend/build');

// webpack ssr config
const ssrConfig = {
    mode: 'production',
    devtool: false,
    target: 'node',
    entry: {
        ssr_index: './project/list/backend/page/index.js'
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

module.exports = ssrConfig;
const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
const mkdirp = require('mkdirp');
const MFS = require('memory-fs');

const SOURCE_DIR = path.resolve(process.cwd(), './framework/workspace/src');

function upload(config_name, data_config_name, template_config_name) {
    const CONFIG_DIR = path.resolve(process.cwd(), `./framework/config/${config_name}`);
    mkdirp.sync(CONFIG_DIR);

    const TEMPLATE_DIR = path.resolve(CONFIG_DIR, `${template_config_name}.tpl`);
    const SOURCE_TEMPLATE_DIR = path.resolve(SOURCE_DIR, 'template', 'framework_template.html');
    fs.createReadStream(SOURCE_TEMPLATE_DIR, 'utf-8').pipe(fs.createWriteStream(TEMPLATE_DIR, 'utf-8'));

    const compilerTask = webpack({
        devtool: false,
        mode: 'development',
        target: 'node',
        entry: {
            [data_config_name]: './framework/workspace/src/config/framework_config.js'
        },
        output: {
            publicPath: '',
            path: `/${config_name}`,
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
            }, {
                test: /\.proto$/,
                use: [{
                    loader: 'text-loader'
                }]
            }]
        }
    });

    const DATA_CONFIG_DIR = path.resolve(CONFIG_DIR, `${data_config_name}.js`);
    const mfs = new MFS();
    compilerTask.outputFileSystem = mfs;
    compilerTask.run((err) => {
        if (err) return;
        const content = mfs.readFileSync(`/${config_name}/${data_config_name}.js`, 'utf-8');
        fs.writeFileSync(DATA_CONFIG_DIR, content, 'utf-8');
    });
}

module.exports = upload;
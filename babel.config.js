const babelConfig = {
    sourceType: 'unambiguous',
    presets: [[
        '@babel/preset-env',
        {
            modules: false,
            loose: false,
            useBuiltIns: 'usage',
            corejs: {
                version: 3,
                proposal: true
            }
        }
    ], [
        '@babel/preset-react',
        {
            runtime: 'automatic'
        }
    ]]
};

module.exports = babelConfig;
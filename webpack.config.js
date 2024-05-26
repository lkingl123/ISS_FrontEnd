const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
    const config = await createExpoWebpackConfigAsync(env, argv);

    // Add polyfills for Node.js core modules
    config.resolve.fallback = {
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        assert: require.resolve('assert'),
        zlib: require.resolve('browserify-zlib'),
        vm: require.resolve('vm-browserify')
    };

    return config;
};

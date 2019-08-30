const path = require('path');

module.exports = (env = {}) => {
  return {
    entry: {
      'kintone-js-sdk.min':'./src/browser/main.js',
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
      library: 'kintoneJSSDK',
      libraryTarget: 'umd',
      globalObject: `(typeof self !== 'undefined' ? self : this)`
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader',
          },
        }
      ]
    },
    watch: env.watch
  };
};
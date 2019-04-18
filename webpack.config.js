const path = require('path');

module.exports = (env = {}) => {
  return {
    entry: {
      'kintone-js-sdk.min': './src/browser/main.js'
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          },
        }
      ]
    },
    watch: env.watch
  };
};
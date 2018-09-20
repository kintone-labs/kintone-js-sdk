const path = require('path');

module.exports = (env = {}) => {
  return {
    entry: {
      'kintone-js-sdk.min': './src/main.js'
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          include: [require.resolve('kintone-basejs-sdk')],
          use: {
            loader: 'babel-loader'
          },
        }
      ]
    },
    node: {
      fs: 'empty',
      net: 'empty',
      tls: 'empty'
    },
    watch: env.watch
  };
};
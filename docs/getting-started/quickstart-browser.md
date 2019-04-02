# Quickstart Javascript

## Create a customization
### Using *kintone-js-sdk.min.js* file

* Attach a below file from './dist' folder in kintone-js-sdk into kintone app
```
kintone-js-sdk.min.js
```
* Create index.js file

```javascript
(function () {
    kintone.events.on("app.record.index.show", function (ev) {
        var conn = new kintoneJSSDK.Connection();
        var app = new kintoneJSSDK.App(conn);

        app.getApps().then(rsp => {
            console.log(rsp);
        }).catch(err => {
            console.log(err.get());
        });
    });
}());
```
* Attach index.js file into [kintone app setting](https://get.kintone.help/hc/en-us/articles/115001237528#App
)
![](../img/result.PNG)

### Install package from npm
Step 1: Run commands
```
$ mkdir test
$ cd ./test
$ mkdir src
$ mkdir dist
```
Step 2: Add the below files to test/ folder

* *package.json* file
```javascript
{
  "name": "use-kintone-js-sdk",
  "version": "0.1.0",
  "description": "",
  "main": "src/index.js",
  "license": "",
  "author": "Cybozu, Inc.",
  "scripts": {
    "build": "webpack --mode development --watch"
  },
  "repository": {
    "type": "git",
    "url": ""
  },
  "directories": {
    "doc": ""
  },
  "dependencies": {
    "cross-env": "^5.1.3",
    "@kintone/kintone-js-sdk": "*"
  },
  "devDependencies": {
    "@babel/core": "^7.0.0",
    "@babel/preset-env": "^7.0.0",
    "babel-loader": "^8.0.2",
    "webpack": "^4.17.2",
    "webpack-cli": "^3.1.0"
  }
}

```

* *webpack.config.js* file
```javascript
const path = require('path');

module.exports = (env = {}) => {
  return {
    entry: {
      'index.min': './src/index.js'
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js',
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          include: [require.resolve('@kintone/kintone-js-sdk')],
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
```

* *.babelrc* file
```javascript
{
    "presets": [
        "@babel/preset-env"
    ]
}
```

Step 3: Add the index.js file to src/ folder

```javacript
import {Connection, App} from '@kintone/kintone-js-sdk';
kintone.events.on("app.record.index.show", function (ev) {
    const conn = new Connection();
    const app = new App(conn);

    app.getApps().then(rsp => {
        console.log(rsp);
    }).catch(err => {
        console.log(err.get());
    });
});
```


Step 4: Run belows command

```
$ npm install
$ npm run build
```

```
result:
* ./dist/index.min.js
```

* Attach index.min.js file into [kintone app setting](https://get.kintone.help/hc/en-us/articles/115001237528#App
)
![](../img/result.PNG)

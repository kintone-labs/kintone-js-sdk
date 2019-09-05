# kintone-js-sdk
REST API client of kintone for node.js and javascript 

# How to build

## Requirement

```
* Node.js
* Git
```

```
$git clone https://github.com/kintone/kintone-ui-component.git
$npm install
$npm run build
```
### Output
```
/dist/kintone-js-sdk.min.js
/esm/browser/main.js
/cjs/node/main.js
```

# Installation
For CommonJS usage: npm i @kintone/kintone-js-sdk

# Usage
* UMD: include <i>kintone-js-sdk.min.js</i> from <i>dist</i> folder <br/>
```
const kintone = window.kintoneJSSDK;
```
* CommonJS: install kintone-js-sdk using "npm i kintone-js-sdk"<br/>
```
const kintone = require('@kintone/kintone-js-sdk')
```
* ESM: install kintone-js-sdk using "npm i @kintone/kintone-js-sdk"<br/>
```
import * as kintoneJSSDK from '@kintone/kintone-js-sdk'
```


# Document
[kintone-js-sdk](https://kintone.github.io/kintone-js-sdk)

# License
MIT License

# Copyright
Copyright(c) Cybozu, Inc.

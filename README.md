# kintone-js-sdk
REST API client of kintone for node.js and javascript 

# Installation
For CommonJS usage: npm i @kintone/kintone-js-sdk

## Note
From v0.5.0 completely changed parameters of all modules' constructors and functions to single object parameters.
If you will not use v0.5.0 or upper, please specify the version to install.<br/>
ex.
```
npm i @kintone/kintone-js-sdk@v0.4.2
```

# Usage
* UMD: include <i>kintone-js-sdk.min.js</i> from <i>dist</i> folder <br/>
```
const kintone = window.kintoneJSSDK;
```
* CommonJS: install kintone-js-sdk using "npm i @kintone/kintone-js-sdk"<br/>
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

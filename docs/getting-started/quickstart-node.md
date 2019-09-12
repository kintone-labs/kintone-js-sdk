# Quickstart Nodejs

## Requirement

* [Node.js](https://nodejs.org/en/) (Version 8.9.3 or later)
* [npm](https://www.npmjs.com/package/extract-text-webpack-plugin) (Version 5.5.1 or later)

## How to use

Step 1: Run commands

```shell
$ mkdir test
$ cd ./test
$ npm init
$ npm install --save @kintone/kintone-js-sdk
```
Step 2: Add **index.js** file to test/ folder

<details class="tab-container" open>
<Summary>Get record sample</Summary>

<strong class="tab-name">Source code</strong>
<pre class="inline-code">

    const kintone = require('@kintone/kintone-js-sdk');

    let auth = new kintone.Auth();
    const passwordAuthParam = {
        username: 'YOUR_USER_NAME',
        password: 'YOUR_PASSWORD'
    };
    auth.setPasswordAuth(passwordAuthParam);

    const connParam = {
        domain: 'YOUR_DOMAIN',
        auth: auth
    };
    let connection = new kintone.Connection(connParam);

    let kintoneRecord = new kintone.Record({connection});

    const params = {
        app:  'YOUR_APPID',
        id: 'RECORD_ID'
    };
    kintoneRecord.getRecord(params).then((rsp) => {
        console.log(rsp);
    }).catch((err) => {
        // The promise function always reject with KintoneAPIExeption
        console.log(err.get());
    });

</pre>
</details>

Step 3: Run index.js file
```
$ node index.js
```

<details class="tab-container" open>
<Summary>Get record response</Summary>

<strong class="tab-name">Response success</strong>
<pre class="inline-code">

    {
        "record":{
            // record data should be here
        }
    }

</pre>
<strong class="tab-name">Response error</strong>
<pre class="inline-code">

    {
        id: '{ID}',
        code: '{CODE}',
        message: '{Message string}',
        errors: '{JSON String}'
    }

</pre>
</details>
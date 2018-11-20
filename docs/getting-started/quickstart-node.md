# Quickstart Nodejs

## Requirement

* [Node.js](https://nodejs.org/en/) (Version 8.9.3 or later)
* [npm](https://www.npmjs.com/package/extract-text-webpack-plugin) (Version 5.5.1 or later)

## How to use

```shell
cd your-project
npm init
npm install --save kintone-js-sdk
```

## Code example

<details class="tab-container" open>
<Summary>Get record sample</Summary>

** Source code **

```javascript

const kintone = require('kintone-js-sdk');

let kintoneAuthWithAPIToken = (new kintone.Auth()).setApiToken('MY_TOKEN');
let kintoneConnection = new kintone.Connection('your.FQDN.tld', kintoneAuthWithAPIToken);

let kintoneRecord = new kintone.Record(kintoneConnection);

let appID = {your_app_id};
let recordID = {record_id_that_will_be_retrived};
kintoneRecord.getRecord(appID, recordID)
    .then((rsp) => {
        console.log(rsp);
    })
    .catch((err) => {
        // The promise function always reject with KintoneAPIExeption
        console.log(err.get());
    });
```

** Response success**

```javascript
{
    "record":{
        // record data should be here
    }
}
```

** Response error**

```javascript
{
    id: '{ID}',
    code: '{CODE}',
    message: '{Message string}',
    errors: '{JSON String}'
}
```

</details>

<details class="tab-container" open>
<Summary>Get record sample with Async</Summary>

** Source code **

```javascript

const kintone = require('kintone-js-sdk');

let kintoneAuthWithAPIToken = (new kintone.Auth()).setApiToken('MY_TOKEN');
let kintoneConnection = new kintone.Connection('your.FQDN', kintoneAuthWithAPIToken);

let kintoneRecord = new kintone.Record(kintoneConnection);

let appID = {your_app_id};
let recordID = {record_id_that_will_be_retrived};
let getRecord = async () => {
     try {
        let recordResult = await kintoneRecord.getRecord(appID, recordID);
        console.log(recordResult);
    } catch (error) {
        // The promise function always reject with KintoneAPIExeption
        console.log(error.get());
    }
}
getRecord();
```

** Response success**

```javascript
{
    "record":{
        // record data should be here
    }
}
```

** Response error**

```javascript
{ 
    id: '{ID}',
    code: '{CODE}',
    message: '{Message string}',
    errors: '{JSON String}'
}
```

</details>
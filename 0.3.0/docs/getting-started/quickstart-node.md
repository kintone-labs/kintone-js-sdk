# Quickstart Nodejs

## Requirement

* [Node.js](https://nodejs.org/en/) (Version 8.9.3 or later)
* [npm](https://www.npmjs.com/package/extract-text-webpack-plugin) (Version 5.5.1 or later)

## How to use

```shell
cd your-project
npm init
npm install --save @kintone/kintone-js-sdk
```

## Code example

<details class="tab-container" open>
<Summary>Get record sample</Summary>

<strong class="tab-name">Source code</strong>
<pre class="inline-code">

    const kintone = require('@kintone/kintone-js-sdk');

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

</pre>
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

<details class="tab-container" open>
<Summary>Get record sample with Async</Summary>

<strong class="tab-name">Source code</strong>

<pre class="inline-code">

    const kintone = require('@kintone/kintone-js-sdk');

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

</pre>

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
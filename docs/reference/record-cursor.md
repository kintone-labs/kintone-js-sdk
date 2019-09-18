# Record Cursor

Provide functions to work with kintone Cursor

Currently, there's the only cursor for records.

## Constructor

**Parameter**

| Name| Type| Required| Description |
| --- | --- | --- | --- |
| params | Object | (optional) | `This parameter is required for Nodejs` <br>Constructor params.
| connection | [Connection](../connection) | (optional) | The connection module of this SDK.<br>If initializing in a browser environment on kintone, this parameter can be `omitted` to use session authentication.

**Sample code**

<details class="tab-container" open>
<Summary>Init Record Cursor module</Summary>

<strong class="tab-name">Javascript</strong>

<pre class="inline-code">

    (function(kintoneJSSDK) {
        'use strict';
        // with connection
        // Define Authentication object
        const kintoneAuth = new kintoneJSSDK.Auth();
        const paramsAuth = {
            username: 'YOUR_USER_NAME',
            password: 'YOUR_PASSWORD'
        };
        kintoneAuth.setPasswordAuth(paramsAuth);

        const paramsConnection = {
            domain: 'YOUR_DOMAIN',
            auth: kintoneAuth
        };
        const connection = new kintoneJSSDK.Connection(paramsConnection);
        // with connection
        var kintoneRC = new kintoneJSSDK.RecordCursor({connection});

        // without connection, module will use session authentication of kintone
        var kintoneRC = new kintoneJSSDK.RecordCursor();

        //...
  
    }(window.kintoneJSSDK));


</pre>

<strong class="tab-name">Nodejs</strong>

<pre class="inline-code">

    const kintone = require('@kintone/kintone-js-sdk');

    const passwordAuthParam = {
        username: 'YOUR_USERNAME',
        password: 'YOUR_PASSWORD'
    };
    const auth = new kintone.Auth();
    auth.setPasswordAuth(passwordAuthParam);

    const connParam = {
        domain: 'YOUR_DOMAIN',
        auth: auth
    };
    const kintoneConn = new kintone.Connection(connParam);
    
    const kintoneRC = new kintone.RecordCursor({connection: kintoneConn});

</pre>

</details>

## Methods

### createCursor(params)

> Create a cursor.

**Parameter**

| Name| Type| Required| Description |
| --- | --- | --- | --- |
| params | Object | yes | Create cursor params
| params.app | Integer | yes | The kintone app ID
| params.fields | Array<String\> | (optional) | List of field codes you want in the response.
| params.query | String | (optional) | [The query string](https://developer.kintone.io/hc/en-us/articles/360019245194) that will specify what records will be responded.
| params.size | Integer | (optional) | Number of records to retrieve per request. <br> Default: 100. <br>Maximum: 500.

**Return**

Promise

**Sample code**

<details class="tab-container" open>
<Summary>Create cursor</Summary>

<strong class="tab-name">Javascript</strong>

<pre class="inline-code">
    var rcOption = {
        app: YOUR_APP_ID,
        fields: ['YOUR_FIELD_CODE'],
        query: 'YOUR_QUERY',
        size: YOUR_SIZE
    }

    kintoneRC.createCursor(rcOption).then(function(creatCursorResponse){
        var myCursor = creatCursorResponse;
        console.log('Cursor ID: ' + myCursor.id );
        console.log('Total Count: ' + myCursor.totalCount );
    }).catch((err) => {
        // This SDK return err with KintoneAPIException
        console.log(err);
    });

</pre>

<strong class="tab-name">Nodejs</strong>

<pre class="inline-code">
    const rcOption = {
        app: YOUR_APP_ID,
        fields: ['YOUR_FIELD_CODE'],
        query: 'YOUR_QUERY',
        size: YOUR_SIZE
    }

    kintoneRC.createCursor(rcOption).then(function(creatCursorResponse){
        const myCursor = creatCursorResponse;
        console.log('Cursor ID: ' + myCursor.id );
        console.log('Total Count: ' + myCursor.totalCount );
    }).catch((err) => {
        // This SDK return err with KintoneAPIException
        console.log(err);
    });

</pre>

</details>

### getRecords(params)

> Get one block of records.

**Parameter**

| Name| Type| Required| Description |
| --- | --- | --- | --- |
| params | Object | yes | Get records create
| params.id | String | yes | Cursor ID

**Return**

Promise

| Name| Type| Description |
| --- | --- | --- |
| records | Array | The array of records data
| next | Boolean | Show states whether there are more records to get from kintone of cursor.

**Sample code**

<details class="tab-container" open>
<Summary>Get Records Once</Summary>

<strong class="tab-name">Javascript</strong>

<pre class="inline-code">
    var rcOption = {
        app: YOUR_APP_ID,
        fields: ['YOUR_FIELD_CODE'],
        query: 'YOUR_QUERY',
        size: YOUR_SIZE
    }
        
    kintoneRC.createCursor(rcOption).then(function(creatCursorResponse){
        var myCursor = creatCursorResponse;
        return kintoneRC.getRecords({id: myCursor.id})
    }).then(function (getRecordsResponse) {
        console.log('Records result: ');
        console.log(getRecordsResponse);
    }).catch((err) => {
        // This SDK return err with KintoneAPIException
        console.log(err);
    });

</pre>

<strong class="tab-name">Nodejs</strong>

<pre class="inline-code">

    const rcOption = {
        app: YOUR_APP_ID,
        fields: ['YOUR_FIELD_CODE'],
        query: 'YOUR_QUERY',
        size: YOUR_SIZE
    }
    
    kintoneRC.createCursor(rcOption).then(function(creatCursorResponse){
        const myCursor = creatCursorResponse;
        return kintoneRC.getRecords({id: myCursor.id})
    }).then(function (getRecordsResponse) {
        console.log('Records result: ');
        console.log(getRecordsResponse);
    }).catch((err) => {
        // This SDK return err with KintoneAPIException
        console.log(err);
    });

</pre>

</details>

### getAllRecords(params)

> Get all records 

**Parameter**

| Name| Type| Required| Description |
| --- | --- | --- | --- |
| params | Object | yes | Get all records param
| params.id | String | yes | Cursor ID

**Return**

Promise&lt;GetRecordsResponse&gt;

| Name| Type| Description |
| --- | --- | --- |
| records | Array | The array of records data
| totalCount | Integer | The number of records response.

**Sample code**

<details class="tab-container" open>
<Summary>Get All Records</Summary>

<strong class="tab-name">Javascript</strong>

<pre class="inline-code">

    var rcOption = {
        app: YOUR_APP_ID,
        fields: ['YOUR_FIELD_CODE'],
        query: 'YOUR_QUERY',
        size: YOUR_SIZE
    }
    
    kintoneRC.createCursor(rcOption).then(function(creatCursorResponse){
        var myCursor = creatCursorResponse;
        return kintoneRC.getAllRecords({id: myCursor.id})
    }).then(function (getAllRecordsResponse) {
        console.log('All records result: ');
        console.log(getAllRecordsResponse);
    }).catch((err) => {
        // This SDK return err with KintoneAPIException
        console.log(err);
    });

</pre>

<strong class="tab-name">Nodejs</strong>

<pre class="inline-code">

    const rcOption = {
        app: YOUR_APP_ID,
        fields: ['YOUR_FIELD_CODE'],
        query: 'YOUR_QUERY',
        size: YOUR_SIZE
    }
    
    kintoneRC.createCursor(rcOption).then(function(creatCursorResponse){
        const myCursor = creatCursorResponse;
        return kintoneRC.getAllRecords({id: myCursor.id})
    }).then(function (getAllRecordsResponse) {
        console.log('All records result: ');
        console.log(getAllRecordsResponse);
    }).catch((err) => {
        // This SDK return err with KintoneAPIException
        console.log(err);
    });

</pre>

</details>

### deleteCursor(params)

> Delete a cursor

**Parameter**

| Name| Type| Required| Description |
| --- | --- | --- | --- |
| params | Object | yes | Delete cursor param
| params.id | String | yes | Cursor ID

**Return**

None

**Sample code**

<details class="tab-container" open>
<Summary>Delete Cursor</Summary>

<strong class="tab-name">Javascript</strong>

<pre class="inline-code">

    var rcOption = {
        app: YOUR_APP_ID,
        fields: ['YOUR_FIELD_CODE'],
        query: 'YOUR_QUERY',
        size: YOUR_SIZE
    }
    
    kintoneRC.createCursor(rcOption).then(function(creatCursorResponse){
        var myCursor = creatCursorResponse;
        return kintoneRC.deleteCursor({id: myCursor.id})
    }).then(function (getAllRecordsResponse) {
        console.log('Cursor Deleted');
    }).catch((err) => {
        // This SDK return err with KintoneAPIException
        console.log(err);
    });

</pre>

<strong class="tab-name">Nodejs</strong>

<pre class="inline-code">

    const rcOption = {
        app: YOUR_APP_ID,
        fields: ['YOUR_FIELD_CODE'],
        query: 'YOUR_QUERY',
        size: YOUR_SIZE
    }
    
    kintoneRC.createCursor(rcOption).then(function(creatCursorResponse){
        const myCursor = creatCursorResponse;
        return kintoneRC.deleteCursor({id: myCursor.id})
    }).then(function (getAllRecordsResponse) {
        console.log('Cursor Deleted');
    }).catch((err) => {
        // This SDK return err with KintoneAPIException
        console.log(err);
    });

</pre>

</details>

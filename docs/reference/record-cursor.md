# Record Cursor

Provide functions to work with kintone Cursor

Currently there's only cursor for records.

## Constructor

**Parameter**

| Name| Type| Required| Description |
| --- | --- | --- | --- |
| connection | [Connection](../connection) | (optional) | The connection module of this SDK. If initializing in browser environment on kintone, this parameter can be ommited to use session authentication.

**Sample code**

<details class="tab-container" open>
<Summary>Init Record Cursor module</Summary>

<strong class="tab-name">Javascript</strong>

<pre class="inline-code">

    (function(kintoneJSSDK) {
        'use strict';
        const kintoneConnection = kintoneJSSDK.Connection;
        const kintoneRecordCursorModule = kintoneJSSDK.RecordCursor;
        
        // Init Connection
        const conn = new kintoneConnection();
        
        // Init RecordCursor module
        const kintoneRC = new kintoneRecordCursorModule({connection: conn})
            
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
        auth: kintoneAuth
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
| params.query | String | (optional) | [The query string](https://developer.kintone.io/hc/en-us/articles/213149287#getrecords) that will specify what records will be responded.
| params.size | Integer | (optional) | Number of records to retrieve per request. <br> Default: 100. <br>Maximum: 500.

**Return**

Promise&lt;CreateCursorResponse&gt; Cursor Object from kintone. 

| Name| Type| Description |
| --- | --- | --- |
| id | String | The cursor ID
| totalCount | Integer | The total count of records that match the query conditions

**Sample code**

<details class="tab-container" open>
<Summary>Init Record Cursor module</Summary>

<strong class="tab-name">Javascript</strong>

<pre class="inline-code">
    const rcOption = {
        app: appID,
        fields: [],
        query: '',
        size: 2
    }
        
    kintoneRC.createCursor(rcOption)
        .then(function(creatCursorResponse){
            const myCursor = creatCursorResponse;
            console.log('Cursor ID: ' + myCursor.id );
            console.log('Total Count: ' + myCursor.totalCount );
            })

</pre>

<strong class="tab-name">Nodejs</strong>

<pre class="inline-code">
    const rcOption = {
        app: appID,
        fields: [],
        query: '',
        size: 2
    }

    kintoneRC.createCursor(rcOption)
        .then(function(creatCursorResponse){
            const myCursor = creatCursorResponse;
            console.log('Cursor ID: ' + myCursor.id );
            console.log('Total Count: ' + myCursor.totalCount );
        })
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

Promise&lt;GetRecordCursorResponse&gt;

| Name| Type| Description |
| --- | --- | --- |
| records | Array | The array of records data
| next | Boolean | Show states whether there are more records to get from kintone of cursor.

**Sample code**

<details class="tab-container" open>
<Summary>Get Records Once</Summary>

<strong class="tab-name">Javascript</strong>

<pre class="inline-code">

    kintoneRC.getRecords({id: myCursor.id})
        .then(function(getRecordsResponse){
            console.log('RecordCursor result: ');
            console.log(getRecordsResponse);
        })

</pre>

<strong class="tab-name">Nodejs</strong>

<pre class="inline-code">

    kintoneRC.getRecords({id: myCursor.id})
        .then((getRecordsResponse) => {
            console.log('RecordCursor result: ');
            console.log(getRecordsResponse);
        })

</pre>

</details>

### getAllRecords(cursorID)

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

    kintoneRC.getAllRecords({id: myCursor.id})
        .then(function(getAllRecordsResponse){
            console.log('RecordCursor result: ');
            console.log(getAllRecordsResponse);
        })

</pre>

<strong class="tab-name">Nodejs</strong>

<pre class="inline-code">

    kintoneRC.getAllRecords({id: myCursor.id})
        .then((getAllRecordsResponse) => {
            console.log('RecordCursor result: ');
            console.log(getAllRecordsResponse);
        })

</pre>

</details>

### deleteCursor(cursorID)

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

    kintoneRC.deleteCursor({id: myCursor.id})
        .then(function(){
            console.log('Cursor Deleted');
        })
        .catch(function(error){
            console.log('Delete cursor fail');
            console.log(error)
        })

</pre>

<strong class="tab-name">Nodejs</strong>

<pre class="inline-code">

    kintoneRC.deleteCursor({id: myCursor.id})
        .then(function(){
            console.log('Cursor Deleted');
        })
        .catch(function(error){
            console.log('Delete cursor fail');
            console.log(error)
        })

</pre>

</details>

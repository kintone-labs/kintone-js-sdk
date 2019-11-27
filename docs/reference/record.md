# Record

Provide manipulate functions on records: get, update, delete, update the record status & assignees in the kintone app

## Constructor

**Parameters**

| Name| Type| Required| Description |
| --- | --- | --- | --- |
| params | Object | (conditional) | `Required for nodejs` <br>Constructor params.
| params.connection | [Connection](../connection) | (conditional) | The connection module of this SDK.<br>If initializing in a browser environment on kintone, this parameter can be `omitted` to use session authentication.

**Sample code**

<details class="tab-container" open>
<Summary>Init record module</Summary>

<strong class="tab-name">Javascript</strong>

<pre class="inline-code">

  (function(kintoneJSSDK) {
      'use strict';
      // with connection
      // Define Authentication object
      var kintoneAuth = new kintoneJSSDK.Auth();
      var paramsAuth = {
          username: 'YOUR_USER_NAME',
          password: 'YOUR_PASSWORD'
      };
      kintoneAuth.setPasswordAuth(paramsAuth);

      var paramsConnection = {
          domain: 'YOUR_DOMAIN',
          auth: kintoneAuth
      };
      var connection = new kintoneJSSDK.Connection(paramsConnection);
      var kintoneRecord = new kintoneJSSDK.Record({connection});

      // without connection, module will use session authentication of kintone
      var kintoneRecord = new kintoneJSSDK.Record();
  }(window.kintoneJSSDK));

</pre>

<strong class="tab-name">Nodejs</strong>

<pre class="inline-code">

  const kintone = require('@kintone/kintone-js-sdk');

  const kintoneAuth = new kintone.Auth();
  const paramsAuth = {
      username: 'YOUR_USER_NAME',
      password: 'YOUR_PASSWORD'
  };
  kintoneAuth.setPasswordAuth(paramsAuth);

  const paramsConnection = {
      domain: 'YOUR_DOMAIN',
      auth: kintoneAuth
  };
  const connection = new kintone.Connection(paramsConnection);
  const kintoneRecord = new kintone.Record({connection});

</pre>

</details>

## Methods

### getRecord(params)

> Retrieves details of 1 record from an app.

**Parameters**

| Name| Type| Required| Description |
| --- | --- | --- | --- |
| params | Object | yes | Get record params
| params.app | Integer | yes | The kintone app ID
| params.id | Integer | yes | The record ID in kintone app


**Return**

Promise

**Sample code**

<details class="tab-container" open>
<Summary>Get record</Summary>

<strong class="tab-name">Javascript</strong>

<pre class="inline-code">

  var app = YOUR_APP_ID;
  var id = YOUR_RECORD_ID;
  kintoneRecord.getRecord({app, id}).then((rsp) => {
    console.log(rsp);
  }).catch((err) => {
    // This SDK return err with KintoneAPIException
    console.log(err);
  });

</pre>

<strong class="tab-name">Nodejs</strong>

<pre class="inline-code">

  const app = YOUR_APP_ID;
  const id = YOUR_RECORD_ID;
  kintoneRecord.getRecord({app, id}).then((rsp) => {
    console.log(rsp);
  }).catch((err) => {
    // This SDK return err with KintoneAPIException
    console.log(err);
  });

</pre>

</details>

### getRecords(params)

> Retrieves details of multiple records from an app using a query string.

**Parameters**

| Name| Type| Required| Description |
| --- | --- | --- | --- |
| params | Object | yes | Get records params
| params.app | Integer | yes | The kintone app ID
| params.query | String | (optional) | [The query string](https://developer.kintone.io/hc/en-us/articles/360019245194) that will specify what records will be responded.
| params.fields | Array<String\> | (optional) | List of field codes you want in the response.
| params.totalCount | Boolean | (optional) | If "true", the request will retrieve the total count of records match with query conditions.

**Return**

Promise

**Sample code**

<details class="tab-container" open>
<Summary>Get records</Summary>

<strong class="tab-name">Javascript</strong>

<pre class="inline-code">

  var app = YOUR_APP_ID;
  var query = 'YOUR_QUERY_STRING';
  var fields = [
      'YOUR_FIELD_CODE',
      // another fieldCode
  ]
  var totalCount = 'YOUR_DECIDE_TRUE_OR_FALSE';
  kintoneRecord.getRecords({app, query, fields, totalCount}).then((rsp) => {
    console.log(rsp);
  }).catch((err) => {
    // This SDK return err with KintoneAPIException
    console.log(err);
  });

</pre>

<strong class="tab-name">Nodejs</strong>

<pre class="inline-code">

  const app = YOUR_APP_ID;
  const query = 'YOUR_QUERY_STRING';
  const fields = [
      'YOUR_FIELD_CODE',
      // another fieldCode
  ]
  const totalCount = 'YOUR_DECIDE_TRUE_OR_FALSE';
  kintoneRecord.getRecords({app, query, fields, totalCount}).then((rsp) => {
    console.log(rsp);
  }).catch((err) => {
    // This SDK return err with KintoneAPIException
    console.log(err);
  });

</pre>

</details>

### getAllRecordsByQuery(params)

>* Retrieves details of all records from an app using a query string.
>* Number of records can be retrieved at once is greater than the default limitations

**Parameters**

| Name| Type| Required| Description |
| --- | --- | --- | --- |
| params | Object | yes | Get records by query params
| params.app | Integer | yes | The kintone app ID
| params.query | String | (optional) | [The query string](https://developer.kintone.io/hc/en-us/articles/360019245194) that will specify what records will be responded.
| params.fields | Array<String\> | (optional) | List of field codes you want in the response.
| params.totalCount | Boolean | (optional) | If "true", the request will retrieve the total count of records match with query conditions.
| params.seek | Boolean | (optional) | Default value is "false".<br> ・false：using offset method<br> You can get all records within the limits of offset.(※[Around July 2020, cybozu plan to set an offset upper limit of 10,000](https://developer.cybozu.io/hc/ja/articles/202331474#step2))<br> You can not specify "offset" and "limit" clause on the query when you use offset method because these clauses are already used internally.<br><br> ・true：using seek method<br>You get all records(over limitation of offset) in order by record ID. <br>But you can not specify "order by", "offset" and "limit" clause on the query when you use seek method because these clauses are already used internally. |

*usage about offset and seek method*

>[・usage about offset method and seek method(ja)](https://developer.cybozu.io/hc/ja/articles/360030757312)  
>[・info about offset method(us)](https://developer.kintone.io/hc/en-us/articles/230613327-Get-all-records-from-an-App-the-offset-method-)  
>[・info about seek method(us)](https://developer.kintone.io/hc/en-us/articles/360014037114-Get-all-records-from-an-App-the-seek-method-)

**Return**

Promise

**Sample code**

<details class="tab-container" open>
<Summary>Get all records by the query without limitation</Summary>

<strong class="tab-name">Javascript</strong>

<pre class="inline-code">

  var app = YOUR_APP_ID;
  var query = 'YOUR_QUERY_STRING';
  var fields = [
      'YOUR_FIELD_CODE',
      // another fieldCode
  ]
  var totalCount = 'YOUR_DECIDE_TRUE_OR_FALSE';
  var seek = 'YOUR_DECIDE_TRUE_OR_FALSE';
  kintoneRecord.getAllRecordsByQuery({app, query, fields, totalCount, seek}).then((rsp) => {
    console.log(rsp);
  }).catch((err) => {
    // This SDK return err with KintoneAPIException
    console.log(err);
  });

</pre>

<strong class="tab-name">Nodejs</strong>

<pre class="inline-code">

  const app = YOUR_APP_ID;
  const query = 'YOUR_QUERY_STRING';
  const fields = [
      'YOUR_FIELD_CODE',
      // another fieldCode
  ]
  const totalCount = 'YOUR_DECIDE_TRUE_OR_FALSE';
  const seek = 'YOUR_DECIDE_TRUE_OR_FALSE';
  kintoneRecord.getAllRecordsByQuery({app, query, fields, totalCount, seek}).then((rsp) => {
    console.log(rsp);
  }).catch((err) => {
    // This SDK return err with KintoneAPIException
    console.log(err);
  });

</pre>

</details>

### getAllRecordsByCursor(params)

>* Retrieves details of all records from an app using a query string.
>* Can't indicate limit and offset of the query.
>* Number of records can be retrieved at once is greater than the default limitations

**Parameters**

| Name| Type| Required| Description |
| --- | --- | --- | --- |
| params | Object | yes | Params to get all record by cursor
| params.app | Integer | yes | The kintone app ID
| params.query | String | (optional) | [The query string](https://developer.kintone.io/hc/en-us/articles/360019245194) that will specify what records will be responded.
| option.fields | Array<String\> | (optional) | List of field codes you want in the response.

**Return**

Promise

**Sample code**

<details class="tab-container" open>
<Summary>Get all records by cursor</Summary>

<strong class="tab-name">Javascript</strong>

<pre class="inline-code">
  var rcOption = {
    app: YOUR_APP_ID,
    fields: [
      'YOUR_FIELD_CODE',
      // another fieldCode
    ],
    query: 'YOUR_QUERY_STRING'
  };
  
  kintoneRecord.getAllRecordsByCursor(rcOption).then((rsp) => {
    console.log(rsp);
  }).catch((err) => {
    // This SDK return err with KintoneAPIException
    console.log(err);
  });

</pre>

<strong class="tab-name">Nodejs</strong>

<pre class="inline-code">

  const rcOption = {
    app: YOUR_APP_ID,
    fields: [
      'YOUR_FIELD_CODE',
      // another fieldCode
    ],
    query: 'YOUR_QUERY_STRING'
  };
  
  kintoneRecord.getAllRecordsByCursor(rcOption).then((rsp) => {
    console.log(rsp);
  }).catch((err) => {
    // This SDK return err with KintoneAPIException
    console.log(err);
  });

</pre>

</details>

### addRecord(params)

>Add one record to an app.

**Parameters**

| Name| Type| Required| Description |
| --- | --- | --- | --- |
| params | Object | yes | Params to add record
| params.app | Integer | yes | The kintone app ID
| params.record | JSONObject | (optional) | The record data to be added to kintone app. About the format, please look at the sample below or [reference](#reference) at the end of this page

**Return**

Promise

**Sample code**

<details class="tab-container" open>
<Summary>Add record</Summary>

<strong class="tab-name">Javascript</strong>

<pre class="inline-code">

  var app = YOUR_APP_ID;
  var record = {
    YOUR_FIELD_CODE: {
      value: 'VALUE_OF_YOUR_FIELD_CODE'
    },
    // Another fieldcode here
  };
  kintoneRecord.addRecord({app, record}).then((rsp) => {
    console.log(rsp);
  }).catch((err) => {
    // This SDK return err with KintoneAPIException
    console.log(err);
  });

</pre>

<strong class="tab-name">Nodejs</strong>

<pre class="inline-code">

  const app = YOUR_APP_ID;
  const record = {
      YOUR_FIELD_CODE: {
          value: 'VALUE_OF_YOUR_FIELD_CODE'
      },
      // Another fieldcode here
  };
  kintoneRecord.addRecord({app, record}).then((rsp) => {
    console.log(rsp);
  }).catch((err) => {
    // This SDK return err with KintoneAPIException
    console.log(err);
  });

</pre>

</details>

### addRecords(params)

>* Add multiple records to an app.
>* Can insert over 100 record to kintone app.

**Parameters**

| Name| Type| Required| Description |
| --- | --- | --- | --- |
| params | Object | yes | Params to add records
| params.app | Integer | yes | The kintone app ID
| params.records | Array<JSONObject\> | yes | List of records data to be added to kintone app. About the format, please look at the sample below or [reference](#reference) at the end of this page.

**Return**

Promise

**Sample code**

<details class="tab-container" open>
<Summary>Add multiple records</Summary>

<strong class="tab-name">Javascript</strong>

<pre class="inline-code">

  var app = YOUR_APP_ID;
  var record = {
      YOUR_FIELD_CODE: {
          value: 'VALUE_OF_YOUR_FIELD_CODE'
      },
      // Another fieldcode here
  };
  var records = [
      record,
      // another record
  ];
  kintoneRecord.addRecords({app, records}).then((rsp) => {
    console.log(rsp);
  }).catch((err) => {
    // This SDK return err with KintoneAPIException
    console.log(err);
  });

</pre>

<strong class="tab-name">Nodejs</strong>

<pre class="inline-code">

  const app = YOUR_APP_ID;
  const record = {
    YOUR_FIELD_CODE: {
      value: 'VALUE_OF_YOUR_FIELD_CODE'
    },
    // Another fieldcode here
  };
  const records = [
    record
    // another record
  ];
  kintoneRecord.addRecords({app, records}).then((rsp) => {
    console.log(rsp);
  }).catch((err) => {
    // This SDK return err with KintoneAPIException
    console.log(err);
  });

</pre>

</details>


### addAllRecords(params)

>* Add multiple records to an app.
>* Can insert no limit records from index 101 onwards to kintone app, rollback on per unit of 2000 record.

**Parameters**

| Name| Type| Required| Description |
| --- | --- | --- | --- |
| params | Object | yes | Params to add all record
| params.app | Integer | yes | The kintone app ID
| params.records | Array<JSONObject\> | yes | List of records data to be added to kintone app. About the format, please look at the sample below or [reference](#reference) at the end of this page.

**Return**

Promise

**Sample code**

<details class="tab-container" open>
<Summary>Add all records without limitation</Summary>

<strong class="tab-name">Javascript</strong>

<pre class="inline-code">

  var app = YOUR_APP_ID;
  var record = {
      YOUR_FIELD_CODE: {
          value: 'VALUE_OF_YOUR_FIELD_CODE'
      },
      // Another fieldcode here
  };
  var records = [
      record,
      // another record
  ];
  kintoneRecord.addAllRecords({app, records}).then((rsp) => {
    console.log(rsp);
  }).catch((err) => {
    // Ex: User update 6000 records: 
    // Case 1: the error occurs in record 0
    // err response
    // {
    //   results: [KintoneAPIException, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},{}]
    // }
    // Case 2: the error occurs in record 4000
    // err response
    // {
    //   results: [
    //    AddRecordsResponse,
    //    AddRecordsResponse,
    //    AddRecordsResponse,
    //    AddRecordsResponse,
    //    AddRecordsResponse,
    //    AddRecordsResponse,
    //    AddRecordsResponse,
    //    AddRecordsResponse,
    //    AddRecordsResponse,
    //    AddRecordsResponse,
    //    AddRecordsResponse,
    //    AddRecordsResponse,
    //    AddRecordsResponse,
    //    AddRecordsResponse,
    //    AddRecordsResponse,
    //    AddRecordsResponse,
    //    AddRecordsResponse,
    //    AddRecordsResponse,
    //    AddRecordsResponse,
    //    AddRecordsResponse,
    //    KintoneAPIException,
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {}
    //  ]
    // }
    console.log(err)
  });

</pre>

<strong class="tab-name">Nodejs</strong>

<pre class="inline-code">

  const app = YOUR_APP_ID;
  const record = {
    YOUR_FIELD_CODE: {
      value: 'VALUE_OF_YOUR_FIELD_CODE'
    },
    // Another fieldcode here
  };
  const records = [
    record
    // another record
  ];
  kintoneRecord.addAllRecords({app, records}).then((rsp) => {
    console.log(rsp);
  }).catch((err) => {
    // Ex: User update 6000 records: 
    // Case 1: the error occurs in record 0
    // err response
    // {
    //   results: [KintoneAPIException, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},{}]
    // }
    // Case 2: the error occurs in record 4000
    // err response
    // {
    //   results: [
    //    AddRecordsResponse,
    //    AddRecordsResponse,
    //    AddRecordsResponse,
    //    AddRecordsResponse,
    //    AddRecordsResponse,
    //    AddRecordsResponse,
    //    AddRecordsResponse,
    //    AddRecordsResponse,
    //    AddRecordsResponse,
    //    AddRecordsResponse,
    //    AddRecordsResponse,
    //    AddRecordsResponse,
    //    AddRecordsResponse,
    //    AddRecordsResponse,
    //    AddRecordsResponse,
    //    AddRecordsResponse,
    //    AddRecordsResponse,
    //    AddRecordsResponse,
    //    AddRecordsResponse,
    //    AddRecordsResponse,
    //    KintoneAPIException,
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {}
    //  ]
    // }
    console.log(err)
  });

</pre>

</details>


### updateRecordByID(params)

> Updates details of 1 record in an app by specifying its record number.

**Parameters**

| Name| Type| Required| Description |
| --- | --- | --- | --- |
| params | Object | yes | Params to update record by id
| params.app | Integer | yes | The kintone app ID
| params.id | Integer | yes | The record ID on kintone app
| params.record | JSONObject | (optional) | The record data to be updated in  kintone app. About the format, please look at the sample below or [reference](#reference) at the end of this page.
| params.revision | Integer | (optional) | The revision number of record

**Return**

Promise

**Sample code**

<details class="tab-container" open>
<Summary>Update record by ID</Summary>

<strong class="tab-name">Javascript</strong>

<pre class="inline-code">

  var app = YOUR_APP_ID;
  var id = YOUR_RECORD_ID;
  var record = {
      YOUR_FIELD_CODE: {
          value: 'VALUE_OF_YOUR_FIELD_CODE'
      },
      // Another fieldcode here
  };
  var revision = REVISION_OF_RECORD;
  kintoneRecord.updateRecordByID({app, id, record, revision}).then((rsp) => {
    console.log(rsp);
  }).catch((err) => {
    // This SDK return err with KintoneAPIException
    console.log(err);
  });

</pre>

<strong class="tab-name">Nodejs</strong>

<pre class="inline-code">

  const app = YOUR_APP_ID;
  const id = YOUR_RECORD_ID;
  const record = {
    YOUR_FIELD_CODE: {
      value: 'VALUE_OF_YOUR_FIELD_CODE'
    },
    // Another fieldcode here
  };
  const revision = REVISION_OF_RECORD;
  kintoneRecord.updateRecordByID({app, id, record, revision}).then((rsp) => {
    console.log(rsp);
  }).catch((err) => {
    // This SDK return err with KintoneAPIException
    console.log(err);
  });

</pre>

</details>

### updateRecordByUpdateKey(params)

> Updates details of 1 record in an app by a unique key.

**Parameters**

| Name| Type| Required| Description |
| --- | --- | --- | --- |
| params | Object | yes | Params to update record by update key
| params.app | Integer | yes | The kintone app ID
| params.updateKey | JSONObject | yes | The unique key of the record to be updated. About the format, please look at the sample below or [reference](#reference) at the end of this page.
| params.record | JSONObject | (optional) | The record data will be updated to kintone app. About the format, please look at the sample below or [reference](#reference) at the end of this page.
| params.revision | Integer | (optional) | The revision number of record

**Return**

Promise

**Sample code**

<details class="tab-container" open>
<Summary>Update record by UpdateKey</Summary>

<strong class="tab-name">Javascript</strong>

<pre class="inline-code">

  var app = YOUR_APP_ID;
  var updateKey = {
    field: 'YOUR_FIELD_CODE',
    value: 'YOUR_FIELD_CODE_VALUE'
  };
  var record = {
    YOUR_FIELD_CODE: {
      value: 'VALUE_OF_YOUR_FIELD_CODE'
    },
    // Another fieldcode here
  };
  var revision = REVISION_OF_RECORD;
  kintoneRecord.updateRecordByUpdateKey({app, updateKey, record, revision}).then((rsp) => {
    console.log(rsp);
  }).catch((err) => {
    // This SDK return err with KintoneAPIException
    console.log(err);
  });

</pre>

<strong class="tab-name">Nodejs</strong>

<pre class="inline-code">

  const app = YOUR_APP_ID;
  const updateKey = {
    field: 'YOUR_FIELD_CODE',
    value: 'YOUR_FIELD_CODE_VALUE'
  };
  const record = {
    YOUR_FIELD_CODE: {
      value: 'VALUE_OF_YOUR_FIELD_CODE'
    },
    // Another fieldcode here
  };
  const revision = REVISION_OF_RECORD;
  kintoneRecord.updateRecordByUpdateKey({app, updateKey, record, revision}).then((rsp) => {
    console.log(rsp);
  }).catch((err) => {
    // This SDK return err with KintoneAPIException
    console.log(err);
  });

</pre>

</details>

### updateRecords(params)

>* Updates details of multiple records in an app, by specifying their record number, or a different unique key.
>* Can update over 100 record to kintone app.

**Parameters**

| Name| Type| Required| Description |
| --- | --- | --- | --- |
| params | Object | yes | Params to update records
| params.app | Integer | yes | The kintone app ID
| params.records | Array<JSONObject\> | (optional) | The record data will be updated to kintone app. About the format, please look at the sample below or [reference](#reference) at the end of this page.

**Return**

Promise

**Sample code**

<details class="tab-container" open>
<Summary>Update multiple records</Summary>

<strong class="tab-name">Javascript</strong>

<pre class="inline-code">

  var app = YOUR_APP_ID;
  var record = {
    YOUR_FIELD_CODE: {
      value: 'VALUE_OF_YOUR_FIELD_CODE'
    },
    // Another fieldcode here
  };

  // This object can not have both "id" and "updateKey" keys at the same time.
  var recordUpdate = {
    // Required, if updateKey will not be specified.
    id: YOUR_RECORD_ID, 
    // Required, if id will not be specified.
    updateKey: { 
      field: 'YOUR_FIELD_CODE',
      value: 'YOUR_FIELD_CODE_VALUE'
    },
    record: record,
    revision: RECORD_REVISION_NUMBER
  };
  var records= [
    recordUpdate,
    // Another recordUpdate
  ]
  kintoneRecord.updateRecords({app, records}).then((rsp) => {
      console.log(rsp);
    }).catch((err) => {
      // This SDK return err with KintoneAPIException
      console.log(err);
    });

</pre>

<strong class="tab-name">Nodejs</strong>

<pre class="inline-code">

  const app = YOUR_APP_ID;
  const record = {
      YOUR_FIELD_CODE: {
          value: 'VALUE_OF_YOUR_FIELD_CODE'
      },
      // Another fieldcode here
  };

  // This object can not have both "id" and "updateKey" keys at the same time.
  const recordUpdate = {
      // Required, if updateKey will not be specified.
      id: YOUR_RECORD_ID, 
      // Required, if id will not be specified.
      updateKey: { 
          field: 'YOUR_FIELD_CODE',
          value: 'YOUR_FIELD_CODE_VALUE'
      },
      record: record,
      revision: RECORD_REVISION_NUMBER
  };
  const records = [
      recordUpdate,
      // Another recordUpdate
  ]
  kintoneRecord.updateRecords({app, records}).then((rsp) => {
    console.log(rsp);
  }).catch((err) => {
    // This SDK return err with KintoneAPIException
    console.log(err);
  });

</pre>

</details>

### updateAllRecords(params)

>* Updates details of multiple records in an app, by specifying their record number, or a different unique key.
>* Can update no limit records from index 101 onwards to kintone app, rollback on per unit of 2000 record.

**Parameters**

| Name| Type| Required| Description |
| --- | --- | --- | --- |
| params | Object | yes | Params to update all records
| params.app | Integer | yes | The kintone app ID
| params.records | Array<JSONObject\> | yes | The record data will be updated to kintone app. About the format, please look at the sample below or [reference](#reference) at the end of this page.

**Return**

Promise

**Sample code**

<details class="tab-container" open>
<Summary>Update all records without limitation</Summary>

<strong class="tab-name">Javascript</strong>

<pre class="inline-code">

  var app = YOUR_APP_ID;
  var record = {
    YOUR_FIELD_CODE: {
      value: 'VALUE_OF_YOUR_FIELD_CODE'
    },
    // Another fieldcode here
  };

  // This object can not have both "id" and "updateKey" keys at the same time.
  var recordUpdate = {
    // Required, if updateKey will not be specified.
    id: YOUR_RECORD_ID, 
    // Required, if id will not be specified.
    updateKey: { 
      field: 'YOUR_FIELD_CODE',
      value: 'YOUR_FIELD_CODE_VALUE'
    },
    record: record,
    revision: RECORD_REVISION_NUMBER
  };
  var records = [
    recordUpdate,
    // Another recordUpdate
  ]
  kintoneRecord.updateAllRecords({app, records}).then((rsp) => {
      console.log(rsp);
    }).catch((err) => {
      // Ex: User update 6000 records: 
    // Case 1: the error occurs in record 0
    // err response
    // {
    //   results: [KintoneAPIException, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},{}]
    // }
    // Case 2: the error occurs in record 4000
    // err response
    // {
    //   results: [
    //    UpdateRecordsResponse,
    //    UpdateRecordsResponse,
    //    UpdateRecordsResponse,
    //    UpdateRecordsResponse,
    //    UpdateRecordsResponse,
    //    UpdateRecordsResponse,
    //    UpdateRecordsResponse,
    //    UpdateRecordsResponse,
    //    UpdateRecordsResponse,
    //    UpdateRecordsResponse,
    //    UpdateRecordsResponse,
    //    UpdateRecordsResponse,
    //    UpdateRecordsResponse,
    //    UpdateRecordsResponse,
    //    UpdateRecordsResponse,
    //    UpdateRecordsResponse,
    //    UpdateRecordsResponse,
    //    UpdateRecordsResponse,
    //    UpdateRecordsResponse,
    //    UpdateRecordsResponse,
    //    KintoneAPIException,
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {}
    //  ]
    // }
    console.log(err)
    });

</pre>

<strong class="tab-name">Nodejs</strong>

<pre class="inline-code">

  const app = YOUR_APP_ID;
  const record = {
      YOUR_FIELD_CODE: {
          value: 'VALUE_OF_YOUR_FIELD_CODE'
      },
      // Another fieldcode here
  };

  // This object can not have both "id" and "updateKey" keys at the same time.
  const recordUpdate = {
      // Required, if updateKey will not be specified.
      id: YOUR_RECORD_ID, 
      // Required, if id will not be specified.
      updateKey: { 
          field: 'YOUR_FIELD_CODE',
          value: 'YOUR_FIELD_CODE_VALUE'
      },
      record: record,
      revision: RECORD_REVISION_NUMBER
  };
  const records = [
      recordUpdate,
      // Another recordUpdate
  ]
  kintoneRecord.updateAllRecords({app, records}).then((rsp) => {
    console.log(rsp);
  }).catch((err) => {
    // Ex: User update 6000 records: 
    // Case 1: the error occurs in record 0
    // err response
    // {
    //   results: [KintoneAPIException, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},{}]
    // }
    // Case 2: the error occurs in record 4000
    // err response
    // {
    //   results: [
    //    UpdateRecordsResponse,
    //    UpdateRecordsResponse,
    //    UpdateRecordsResponse,
    //    UpdateRecordsResponse,
    //    UpdateRecordsResponse,
    //    UpdateRecordsResponse,
    //    UpdateRecordsResponse,
    //    UpdateRecordsResponse,
    //    UpdateRecordsResponse,
    //    UpdateRecordsResponse,
    //    UpdateRecordsResponse,
    //    UpdateRecordsResponse,
    //    UpdateRecordsResponse,
    //    UpdateRecordsResponse,
    //    UpdateRecordsResponse,
    //    UpdateRecordsResponse,
    //    UpdateRecordsResponse,
    //    UpdateRecordsResponse,
    //    UpdateRecordsResponse,
    //    UpdateRecordsResponse,
    //    KintoneAPIException,
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {}
    //  ]
    // }
    console.log(err)
  });

</pre>
</details>

### deleteRecords(params)

>* Delete multiple records in an app.
>* Can delete over 100 records to kintone app.

**Parameters**

| Name| Type| Required| Description |
| --- | --- | --- | --- |
| params | Object | yes | Params to delete records
| params.app | Integer | yes | The kintone app ID
| params.ids | Array<Integer\> | yes | The list **ids** of record will be delete.

**Return**

None

**Sample code**

<details class="tab-container" open>
<Summary>Delete multi record</Summary>

<strong class="tab-name">Javascript</strong>

<pre class="inline-code">

  var app = YOUR_APP_ID;
  var ids = [YOUR_RECORD_ID]
  kintoneRecord.deleteRecords({app, ids}).then((rsp) => {
      console.log(rsp);
    }).catch((err) => {
      // This SDK return err with KintoneAPIException
      console.log(err);
    });

</pre>

<strong class="tab-name">Nodejs</strong>

<pre class="inline-code">

  const app = YOUR_APP_ID;
  const ids = [YOUR_RECORD_ID]
  kintoneRecord.deleteRecords({app, ids}).then((rsp) => {
    console.log(rsp);
  }).catch((err) => {
    // This SDK return err with KintoneAPIException
    console.log(err);
  });

</pre>

</details>

### deleteRecordsWithRevision(params)

> Delete multiple records in an app with revision.

**Parameters**

| Name| Type| Required| Description |
| --- | --- | --- | --- |
| params | Object | yes | Params to delete record with revision
| params.app | Integer | yes | The kintone app ID
| params.idsWithRevision | JSONObject | yes | JSONObject format by HashTable<`Integer`, `Integer`\> (**key**: `The Id of record`, **value**: `The Revision of record.`)

**Return**

None

**Sample code**

<details class="tab-container" open>
<Summary>Delete record with revision</Summary>

<strong class="tab-name">Javascript</strong>

<pre class="inline-code">

  var app = YOUR_APP_ID;
  var idsWithRevision = {
    YOUR_RECORD_ID: REVISION_OF_RECORD
  }
  kintoneRecord.deleteRecordsWithRevision({app, idsWithRevision}).then((rsp) => {
    console.log(rsp);
  }).catch((err) => {
    // This SDK return err with KintoneAPIException
    console.log(err);
  });

</pre>

<strong class="tab-name">Nodejs</strong>

<pre class="inline-code">

  const app = YOUR_APP_ID;
  const idsWithRevision = {
      YOUR_RECORD_ID: REVISION_OF_RECORD
  }
  kintoneRecord.deleteRecordsWithRevision({app, idsWithRevision}).then((rsp) => {
    console.log(rsp);
  }).catch((err) => {
    // This SDK return err with KintoneAPIException
    console.log(err);
  });

</pre>

</details>

### deleteAllRecordsByQuery(params)

>* Deletes all records in an app by query string
>* Can delete no limit records from index 101 onwards to kintone app, rollback on per unit of 2000 record.

**Parameters**

| Name| Type| Required| Description |
| --- | --- | --- | --- |
| params | Object | yes | Delete all records by query
| params.app | Integer | yes | The kintone app ID
| params.query | String | (optional) | [The query string](https://developer.kintone.io/hc/en-us/articles/360019245194) that will specify what records will be responded. <br>The query parameter can't indicate limit and offset.

**Return**

Promise

**Sample code**

<details class="tab-container" open>
<Summary>Delete all records by query string</Summary>

<strong class="tab-name">Javascript</strong>

<pre class="inline-code">

  var app = YOUR_APP_ID;
  var query = 'YOUR_QUERY_STRING';
  kintoneRecord.deleteAllRecordsByQuery({app, query}).then((rsp) => {
      console.log(rsp);
  })
  .catch((err) => {
      // Ex: User update 6000 records: 
    // Case 1: the error occurs in record 0
    // err response
    // {
    //   results: [KintoneAPIException, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},{}]
    // }
    // Case 2: the error occurs in record 4000
    // err response
    // {
    //   results: [
    //    RecordsResponseDelete,
    //    RecordsResponseDelete,
    //    RecordsResponseDelete,
    //    RecordsResponseDelete,
    //    RecordsResponseDelete,
    //    RecordsResponseDelete,
    //    RecordsResponseDelete,
    //    RecordsResponseDelete,
    //    RecordsResponseDelete,
    //    RecordsResponseDelete,
    //    RecordsResponseDelete,
    //    RecordsResponseDelete,
    //    RecordsResponseDelete,
    //    RecordsResponseDelete,
    //    RecordsResponseDelete,
    //    RecordsResponseDelete,
    //    RecordsResponseDelete,
    //    RecordsResponseDelete,
    //    RecordsResponseDelete,
    //    RecordsResponseDelete,
    //    KintoneAPIException,
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {}
    //  ]
    // }
    console.log(err)
  });

</pre>

<strong class="tab-name">Nodejs</strong>

<pre class="inline-code">

  const app = YOUR_APP_ID;
  const query = 'YOUR_QUERY_STRING';
  kintoneRecord.deleteAllRecordsByQuery({app, query}).then((rsp) => {
      console.log(rsp);
  })
  .catch((err) => {
    // Ex: User update 6000 records: 
    // Case 1: the error occurs in record 0
    // err response
    // {
    //   results: [KintoneAPIException, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {},{}]
    // }
    // Case 2: the error occurs in record 4000
    // err response
    // {
    //   results: [
    //    RecordsResponseDelete,
    //    RecordsResponseDelete,
    //    RecordsResponseDelete,
    //    RecordsResponseDelete,
    //    RecordsResponseDelete,
    //    RecordsResponseDelete,
    //    RecordsResponseDelete,
    //    RecordsResponseDelete,
    //    RecordsResponseDelete,
    //    RecordsResponseDelete,
    //    RecordsResponseDelete,
    //    RecordsResponseDelete,
    //    RecordsResponseDelete,
    //    RecordsResponseDelete,
    //    RecordsResponseDelete,
    //    RecordsResponseDelete,
    //    RecordsResponseDelete,
    //    RecordsResponseDelete,
    //    RecordsResponseDelete,
    //    RecordsResponseDelete,
    //    KintoneAPIException,
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {},
    //    {}
    //  ]
    // }
    console.log(err)
  });

</pre>

</details>

### upsertRecord(params)

>* Insert or update a record to kintone app.
>* Insert the record if the updateKey doesn't exist and update the record if the updateKey exists.

**Parameters**

| Name| Type| Required| Description |
| --- | --- | --- | --- |
| params | Object | yes | Params to upsert record
| params.app | Integer | yes | The kintone app ID
| params.updateKey | JSONObject | yes | The unique key of the record to be updated. About the format, please look at the sample below or [reference](#reference) at the end of this page.
| params.record | JSONObject | yes | The record data will be added to kintone app. About the format, please look at the sample below or [reference](#reference) at the end of this page.
| params.revision | Integer | (optional) | The revision number of record

**Return**

Promise

**Sample code**

<details class="tab-container" open>
<Summary>Upsert record by UpdateKey</Summary>

<strong class="tab-name">Javascript</strong>

<pre class="inline-code">

  var app = YOUR_APP_ID;
  var updateKey = {
    field: 'YOUR_FIELD_CODE',
    value: 'YOUR_FIELD_CODE_VALUE'
  };
  var record = {
    YOUR_FIELD_CODE: {
      value: 'VALUE_OF_YOUR_FIELD_CODE'
    },
    // Another fieldcode here
  };
  var revision = REVISION_OF_RECORD;
  kintoneRecord.upsertRecord({app, updateKey, record, revision}).then((rsp) => {
    console.log(rsp);
  }).catch((err) => {
    // This SDK return err with KintoneAPIException
    console.log(err);
  });

</pre>

<strong class="tab-name">Nodejs</strong>

<pre class="inline-code">

  const app = YOUR_APP_ID;
  const updateKey = {
    field: 'YOUR_FIELD_CODE',
    value: 'YOUR_FIELD_CODE_VALUE'
  };
  const record = {
    YOUR_FIELD_CODE: {
      value: 'VALUE_OF_YOUR_FIELD_CODE'
    },
    // Another fieldcode here
  };
  const revision = REVISION_OF_RECORD;
  kintoneRecord.upsertRecord({app, updateKey, record, revision}).then((rsp) => {
    console.log(rsp);
  }).catch((err) => {
    // This SDK return err with KintoneAPIException
    console.log(err);
  });

</pre>

</details>

### upsertRecords(params)

>* Insert or update up to 1500 records to kintone app.<br>
>* If the records are over 1500, It is thrown Error.<br>
>* Insert the records if the updateKey doesn't exist and update the records if the updateKey exists.

**Parameters**

| Name| Type| Required| Description |
| --- | --- | --- | --- |
| params | Object | yes | Params to upsert records
| params.app | Integer | yes | The kintone app ID
| params.records | Array<JSONObject\> | yes | The record data Array which has updateKey and record. About the format, please look at the sample below or [reference](#reference) at the end of this page.

**Return**

Promise

**Sample code**

<details class="tab-container" open>
<Summary>Upsert records by UpdateKey</Summary>

<strong class="tab-name">Javascript</strong>

<pre class="inline-code">

  var app = YOUR_APP_ID;
  var records = [
    {
      updateKey: {
        field: 'YOUR_FIELD_CODE',
        value: 'YOUR_FIELD_CODE_VALUE_1'
      },
      record: {
        YOUR_FIELD_CODE: {
          value: 'VALUE_OF_YOUR_FIELD_CODE 1'
        },
      }
    },
    {
      updateKey: {
        field: 'YOUR_FIELD_CODE',
        value: 'YOUR_FIELD_CODE_VALUE_2'
      },
      record: {
        YOUR_FIELD_CODE: {
          value: 'VALUE_OF_YOUR_FIELD_CODE 2'
        },
      }
    },
    {
      updateKey: {
        field: 'YOUR_FIELD_CODE',
        value: 'YOUR_FIELD_CODE_VALUE_3'
      },
      record: {
        YOUR_FIELD_CODE: {
          value: 'VALUE_OF_YOUR_FIELD_CODE 3'
        },
      }
    }
  ];
  kintoneRecord.upsertRecords({app, records}).then((resp) => {
    console.log(resp);
  }).catch((err) => {
    /// Ex: User upsert over 100 records: 
    // Case 1: the error occurs on a first record
    // err response
    // {
    //   results: [KintoneAPIException, {},...]
    // }
    // Case 2: the error occurs on the 100th or more record 
    // err response
    // {
    //   results: [{},..., KintoneAPIException, {},...]
    // }
    console.log(err);
  });

</pre>

<strong class="tab-name">Nodejs</strong>

<pre class="inline-code">

  const app = YOUR_APP_ID;
  const records = [
    {
      updateKey: {
        field: 'YOUR_FIELD_CODE',
        value: 'YOUR_FIELD_CODE_VALUE_1'
      },
      record: {
        YOUR_FIELD_CODE: {
          value: 'VALUE_OF_YOUR_FIELD_CODE 1'
        },
      }
    },
    {
      updateKey: {
        field: 'YOUR_FIELD_CODE',
        value: 'YOUR_FIELD_CODE_VALUE_2'
      },
      record: {
        YOUR_FIELD_CODE: {
          value: 'VALUE_OF_YOUR_FIELD_CODE 2'
        },
      }
    },
    {
      updateKey: {
        field: 'YOUR_FIELD_CODE',
        value: 'YOUR_FIELD_CODE_VALUE_3'
      },
      record: {
        YOUR_FIELD_CODE: {
          value: 'VALUE_OF_YOUR_FIELD_CODE 3'
        },
      }
    }
  ];
  kintoneRecord.upsertRecords({app, records}).then((resp) => {
    console.log(resp);
  }).catch((err) => {
    /// Ex: User upsert over 100 records: 
    // Case 1: the error occurs on a first record
    // err response
    // {
    //   results: [KintoneAPIException, {},...]
    // }
    // Case 2: the error occurs on the 100th or more record 
    // err response
    // {
    //   results: [{},..., KintoneAPIException, {},...]
    // }
    console.log(err);
  });

</pre>

</details>

### updateRecordAssignees(params)

> Update assignees of a record.

**Parameters**

| Name| Type| Required| Description |
| --- | --- | --- | --- |
| params | Object | yes | Params to update record assignees
| params.app | Integer | yes | The kintone app ID
| params.id | Integer | yes | The record ID of kintone app
| params.assignees | Array<String\> | yes | The user codes of the assignees
| params.revision | Integer | (optional) | The revision number of record

**Return**

Promise

**Sample code**

<details class="tab-container" open>
<Summary>update record Assignees</Summary>

<strong class="tab-name">Javascript</strong>

<pre class="inline-code">

  var app = YOUR_APP_ID;
  var id = YOUR_RECORD_ID;
  var assignees = ['YOUR_ASSIGNEE'];
  var revision = REVISION_OF_RECORD;

  kintoneRecord.updateRecordAssignees({app, id, assignees, revision}).then((rsp) => {
    console.log(rsp);
  }).catch((err) => {
    // This SDK return err with KintoneAPIException
    console.log(err);
  });

</pre>

<strong class="tab-name">Nodejs</strong>

<pre class="inline-code">

  const app = YOUR_APP_ID;
  const id = YOUR_RECORD_ID;
  const assignees = ['YOUR_ASSIGNEE'];
  const revision = REVISION_OF_RECORD;

  kintoneRecord.updateRecordAssignees({app, id, assignees, revision}).then((rsp) => {
    console.log(rsp);
  }).catch((err) => {
    // This SDK return err with KintoneAPIException
    console.log(err);
  });

</pre>

</details>

### updateRecordStatus(params)

> Updates the Status of a record of an app.

**Parameters**

| Name| Type| Required| Description |
| --- | --- | --- | --- |
| params | Object | yes | Params to update record status
| params.app | Integer | yes | The kintone app ID.
| params.id | Integer | yes | The record ID on kintone app.
| params.action | String | yes | The Action name will be run.
| params.assignee | String | (conditional) | The next Assignee. Specify the Assignee's login name.<br>Required, if the "Assignee List" of the current status is set to "User chooses one assignee from the list to take action", and a selectable assignee exists.
| params.revision | Integer | (optional) | The revision of record

**Return**

Promise

**Sample code**

<details class="tab-container" open>
<Summary>Update record status</Summary>

<strong class="tab-name">Javascript</strong>

<pre class="inline-code">

  var app = YOUR_APP_ID;
  var id = YOUR_RECORD_ID;
  var action = 'YOUR_ACTION_NAME';
  var assignee = 'YOUR_ASSIGNEE';
  var revision = REVISION_OF_RECORD;

  kintoneRecord.updateRecordStatus({app, id, action, assignee, revision}).then((rsp) => {
    console.log(rsp);
  }).catch((err) => {
    // This SDK return err with KintoneAPIException
    console.log(err);
  });

</pre>

<strong class="tab-name">Nodejs</strong>

<pre class="inline-code">

  const app = YOUR_APP_ID;
  const id = YOUR_RECORD_ID;
  const action = YOUR_ACTION_NAME;
  const assignee = 'YOUR_ASSIGNEE';
  const revision = REVISION_OF_RECORD;

  kintoneRecord.updateRecordStatus({app, id, action, assignee, revision}).then((rsp) => {
    console.log(rsp);
  }).catch((err) => {
    // This SDK return err with KintoneAPIException
    console.log(err);
  });

</pre>

</details>

### updateRecordsStatus(params)

> Updates the Status of multiple records of an app.

**Parameters**

| Name| Type| Required| Description |
| --- | --- | --- | --- |
| params | Object | yes | Params to update records status
| params.app | Integer | yes | The kintone app ID
| params.records | Array<JSONObject\> | yes | The record status data. See the below sample codes and [reference](#reference) at the end of this page to know the format.

**Return**

Promise

**Sample code**

<details class="tab-container" open>
<Summary>Update status of multiple records</Summary>

<strong class="tab-name">Javascript</strong>

<pre class="inline-code">

  var app = YOUR_APP_ID;
  var recordStatusUpdateItem = {
    id: YOUR_RECORD_ID,
    action: 'YOUR_ACTION_NAME',
    assignee: 'YOUR_ASSIGNEE',
    revision: 'YOUR_RECORD_REVISION'
  }
  var records = [
    recordStatusUpdateItem,
    // another data like recordStatusUpdateItem
  ];
  kintoneRecord.updateRecordsStatus({app, records}).then((rsp) => {
    console.log(rsp);
  }).catch((err) => {
    // This SDK return err with KintoneAPIException
    console.log(err);
  });

</pre>

<strong class="tab-name">Nodejs</strong>

<pre class="inline-code">

  const app = YOUR_APP_ID;
  const recordStatusUpdateItem = {
      id: YOUR_RECORD_ID,
      action: 'YOUR_ACTION_NAME',
      assignee: 'YOUR_ASSIGNEE',
      revision: YOUR_RECORD_REVISION
  }
  const records = [
      recordStatusUpdateItem,
      //another data like recordStatusUpdateItem
  ];
  kintoneRecord.updateRecordsStatus({app, records}).then((rsp) => {
    console.log(rsp);
  }).catch((err) => {
    // This SDK return err with KintoneAPIException
    console.log(err);
  });

</pre>

</details>

### getComments(params)

> Retrieves multiple comments from a record in an app.

**Parameters**

| Name| Type| Required| Description |
| --- | --- | --- | --- |
| params | Object | yes | Params to get comments
| params.app | Integer | yes | The kintone app ID
| params.record | Integer | yes | The ID of record
| params.order | String | (optional) | The sort order of the Comment ID. Please select **asc** or **desc**
| params.offset | Integer | (optional) | The number of first comments will be ignored.
| params.limit | Integer | (optional) | The number of records to retrieve.

**Return**

Promise

**Sample code**

<details class="tab-container" open>
<Summary>Get comments</Summary>

<strong class="tab-name">Javascript</strong>

<pre class="inline-code">

  var app = YOUR_APP_ID;
  var record = YOUR_RECORD_ID;
  var order = 'YOUR_ORDER_TYPE'; // asc or desc
  var offset = YOUR_OFFSET_NUMBER;
  var limit = YOUR_LIMIT_NUMBER;
  kintoneRecord.getComments({app, record, order, offset, limit}).then((rsp) => {
    console.log(rsp);
  }).catch((err) => {
    // This SDK return err with KintoneAPIException
    console.log(err);
  });

</pre>

<strong class="tab-name">Nodejs</strong>

<pre class="inline-code">

  const app = YOUR_APP_ID;
  const record = YOUR_RECORD_ID;
  const order = 'YOUR_ORDER_TYPE'; // asc or desc
  const offset = YOUR_OFFSET_NUMBER;
  const limit = YOUR_LIMIT_NUMBER;
  kintoneRecord.getComments({app, record, order, offset, limit}).then((rsp) => {
    console.log(rsp);
  }).catch((err) => {
    // This SDK return err with KintoneAPIException
    console.log(err);
  });

</pre>

</details>

### addComment(params)

>Add a comment to a record in an app.

**Parameters**

| Name| Type| Required| Description |
| --- | --- | --- | --- |
| params | Object | yes | Params to add comment
| params.app | Integer | yes | The kintone app ID |
| params.record | Integer | yes | The ID of record |
| params.comment | JSONObject | yes | About the format, please look at the sample below or [reference](#reference) at the end of this page.|

**Return**

Promise

**Sample code**

<details class="tab-container" open>
<Summary>Add comment</Summary>

<strong class="tab-name">Javascript</strong>

<pre class="inline-code">

  var app = YOUR_APP_ID;
  var record = YOUR_RECORD_ID;
  var comment = {
    text: 'YOUR_COMMENT_CONTENT',
    mentions: [
      {
        code: 'YOUR_MEMBER_CODE',
        type: 'YOUR_MEMBER_TYPE' // either `USER` or `GROUP` or `ORGANIZATION`
      },
      // another mention here
    ]
  };
  kintoneRecord.addComment({app, record, comment}).then((rsp) => {
    console.log(rsp);
  }).catch((err) => {
    // This SDK return err with KintoneAPIException
    console.log(err);
  });

</pre>

<strong class="tab-name">Nodejs</strong>

<pre class="inline-code">

  const app = YOUR_APP_ID;
  const record = YOUR_RECORD_ID;
  const comment = {
    text: 'YOUR_COMMENT_CONTENT',
    mentions: [
      {
        code: 'YOUR_MEMBER_CODE',
        type: 'YOUR_MEMBER_TYPE' // either `USER` or `GROUP` or `ORGANIZATION`
      },
      // another mention here
    ]
  };
  kintoneRecord.addComment({app, record, comment}).then((rsp) => {
    console.log(rsp);
  }).catch((err) => {
    // This SDK return err with KintoneAPIException
    console.log(err);
  });

</pre>

</details>

### deleteComment(params)

>Delete a comment in a record in an app.

**Parameters**

| Name| Type| Required| Description |
| --- | --- | --- | --- |
| params | Object | yes | Params to delete comment
| params.app | Integer | yes | The kintone app ID
| params.record | Integer | yes | The record ID on kintone app
| params.comment | Integer | yes | The comment ID on kintone record

**Return**

Promise

**Sample code**

<details class="tab-container" open>
<Summary>Delete comment</Summary>

<strong class="tab-name">Javascript</strong>

<pre class="inline-code">

  var app = YOUR_APP_ID;
  var record = YOUR_RECORD_ID;
  var comment = YOUR_COMMENT_ID;
  kintoneRecord.deleteComment({app, record, comment}).then((rsp) => {
    console.log(rsp);
  }).catch((err) => {
    // This SDK return err with KintoneAPIException
    console.log(err);
  });

</pre>

<strong class="tab-name">Nodejs</strong>

<pre class="inline-code">

  const app = YOUR_APP_ID;
  const record = YOUR_RECORD_ID;
  const comment = YOUR_COMMENT_ID;
  kintoneRecord.deleteComment({app, record, comment}).then((rsp) => {
    console.log(rsp);
  }).catch((err) => {
    // This SDK return err with KintoneAPIException
    console.log(err);
  });
    
</pre>

</details>

## Reference

- [Get Record](https://developer.kintone.io/hc/en-us/articles/213149287/) `on developer network`
- [Add Record](https://developer.kintone.io/hc/en-us/articles/212494628/)`on developer network`
- [Update Record](https://developer.kintone.io/hc/en-us/articles/213149027/)`on developer network`
- [Delete Record](https://developer.kintone.io/hc/en-us/articles/212494558/)`on developer network`
- [Get Comments](https://developer.kintone.io/hc/en-us/articles/219105188)`on developer network`
- [Add Comment](https://developer.kintone.io/hc/en-us/articles/219501367)`on developer network`
- [Delete Comment](https://developer.kintone.io/hc/en-us/articles/219562607)`on developer network`
- [Update Record Status](https://developer.kintone.io/hc/en-us/articles/213149747)`on developer network`
- [Update Record Assignees](https://developer.kintone.io/hc/en-us/articles/219563427)`on developer network`

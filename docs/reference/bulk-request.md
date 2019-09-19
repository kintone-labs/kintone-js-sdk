# Bulk Request

The Bulk Request API allows multiple API requests to run on multiple kintone apps. The below API can be used with the Bulk Request API:

- Add Record
- Add Records
- Update Record
- Update Records
- Delete Records
- Update Status
- Update Statuses
- Update Assignees

## Constructor

**Parameters**

| Name| Type| Required| Description |
| --- | --- | --- | --- |
| params | Object | (conditional) |`Required for nodejs`<br> Constructor params.
| params.connection | [Connection](../connection) | (conditional) | The connection module of this SDK. If initializing in browser environment on kintone, this parameter can be ommited to use session authentication.

**Sample code**

<details class="tab-container" open>
<Summary>Init bulk request module</Summary>

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
    var kintoneBulkRequest = new kintoneJSSDK.BulkRequest({connection});

    // without connection, module will use session authentication of kintone
    var kintoneBulkRequest = new kintoneJSSDK.BulkRequest();
  }(window.kintoneJSSDK));


</pre>

<strong class="tab-name">Nodejs</strong>

<pre class="inline-code">

  const kintone = require('@kintone/kintone-js-sdk');
  const kintoneBulkRequest = new kintone.BulkRequest({connection});

</pre>

</details>

## Methods

> All below methods (excluded `execute()` method) will add request to queue, you must execute the `execute()` function to get result of BulkRequest.

### addRecord({app, record})

**Parameters**

See at [Record - addRecord](../record#addrecordparams)

**Return**

[BulkRequest](#bulkrequest)

### addRecords({app, records})

**Parameters**

See at [Record - addRecords](../record#addrecordsparams)

**Return**

[BulkRequest](#bulkrequest)

### updateRecordByID({app, id, record, revision})

**Parameters**

See at [Record - updateRecordByID](../record#updaterecordbyidparams)

**Return**

[BulkRequest](#bulkrequest)

### updateRecordByUpdateKey({app, updateKey, record, revision})

**Parameters**

See at [Record - updateRecordByUpdateKey](../record#updaterecordbyupdatekeyparams)

**Return**

[BulkRequest](#bulkrequest)

### updateRecords({app, records})

**Parameters**

See at [Record - updateRecords](../record#updaterecordsparams)

**Return**

[BulkRequest](#bulkrequest)

### deleteRecords({app, ids})

**Parameters**

See at [Record - deleteRecords](../record#deleterecordsparams)

**Return**

[BulkRequest](#bulkrequest)

### deleteRecordsWithRevision({app, idsWithRevision})

**Parameters**

See at [Record - deleteRecordsWithRevision](../record#deleterecordswithrevisionparams)

**Return**

[BulkRequest](#bulkrequest)

### updateRecordAssignees({app, record, assignees, revision})

**Parameters**

See at [Record - updateRecordAssignees](../record#updaterecordassigneesparams)

**Return**

[BulkRequest](#bulkrequest)

### updateRecordStatus({app, id, action, assignee, revision})

**Parameters**

See at [Record - updateRecordStatus](../record#updaterecordstatusparams)

**Return**

[BulkRequest](#bulkrequest)

### updateRecordsStatus({app, records})

**Parameters**

See at [Record - updateRecordsStatus](../record#updaterecordsstatusparams)

**Return**

[BulkRequest](#bulkrequest)

### execute()

> Execute the bulk request and get data response

**Parameters**

(none)

**Return**

[Promise]

**Sample code**

<details class="tab-container" open>
<Summary>Execute bulk request</Summary>

<strong class="tab-name">Javascript</strong>

<pre class="inline-code">

  var responseBulkRequest = kintoneBulkRequest
    .addRecord({/* [Args]*/})
    .addRecords({/* [Args]*/})
    .updateRecordByID({/* [Args]*/})
    .updateRecordByUpdateKey({/* [Args]*/})
    .updateRecords({/* [Args]*/})
    .deleteRecords({/*[Args]*/})
    .deleteRecordsWithRevision({/* [Args]*/})
    .updateRecordAssignees({/* [Args]*/})
    .updateRecordStatus({/* [Args]*/})
    .updateRecordsStatus({/* [Args]*/})
    .execute();

  responseBulkRequest.then((resp) => {
    console.log(resp);
  }).catch((err) => {
    // The error will be an array if there are errors occur in addRecord, addRecords, updateRecords, updateRecords,deleteRecords... function 
    if (Array.isArray(err)) {  
        for (let i = 0; i < err.length; i++) {
            // Need to check the type of error because err array can have some empty object like: 
            // [KintoneAPIException ,{},{},{},{}]
            if (err[i] instanceof kintoneJSSDK.KintoneAPIException) {
                console.log(err[i]);
            }   
        }
    } 
    // The error will be a KintoneAPIException if setting wrong Auth, Connection ... for BulkRequest
    else {  
        console.log(err);
    }
  });

</pre>

<strong class="tab-name">Nodejs</strong>

<pre class="inline-code">

  const responseBulkRequest = kintoneBulkRequest
    .addRecord({/* [Args]*/})
    .addRecords({/* [Args]*/})
    .updateRecordByID({/* [Args]*/})
    .updateRecordByUpdateKey({/* [Args]*/})
    .updateRecords({/* [Args]*/})
    .deleteRecords({/*[Args]*/})
    .deleteRecordsWithRevision({/* [Args]*/})
    .updateRecordAssignees({/* [Args]*/})
    .updateRecordStatus({/* [Args]*/})
    .updateRecordsStatus({/* [Args]*/})
    .execute();

  responseBulkRequest.then((resp) => {
    console.log(resp);
  }).catch((err) => {
    if (Array.isArray(err)) {  // The error will be an array if there are errors occur in addRecord, addRecords, updateRecords, updateRecords,deleteRecords... function 
        for (let i = 0; i < err.length; i++) {
            // Need to check the type of error because err array can have some empty object like: 
            // [KintoneAPIException ,{},{},{},{}]
            if (err[i] instanceof kintone.KintoneAPIException) {
                console.log(err[i]);
            }
        }
    } else {  // the error will be an element if setting wrong Auth, Connection ... for BulkRequest
        console.log(err);
    }
  });
  
</pre>

</details>

## Reference

- [Get Record](https://developer.kintone.io/hc/en-us/articles/213149287/) `on developer network`
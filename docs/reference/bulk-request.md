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

### **Parameter**

| Name| Type| Required| Description |
| --- | --- | --- | --- |
| connection | [Connection](../connection) | (optional) | The connection module of this SDK. If initializing in browser environment on kintone, this parameter can be ommited to use session authentication.

### **Sample code**

<details class="tab-container" open>
<Summary>Init bulk request module</Summary>

<strong class="tab-name">Javascript</strong>

<pre class="inline-code">
  // with connection
  var kintoneBulkRequest = new kintoneJSSDK.BulkRequest(connection);

  // without connection, module will use session authentication of kintone
  var kintoneBulkRequest = new kintoneJSSDK.BulkRequest();

</pre>

<strong class="tab-name">Nodejs</strong>

<pre class="inline-code">

  const kintone = require('@kintone/kintone-js-sdk');
  let kintoneBulkRequest = new kintone.BulkRequest(connection);

</pre>

</details>

## Methods

> All below methods (excluded `execute()` method) will add request to queue, you must execute the `execute()` function to get result of BulkRequest.

### addRecord(app, record)

**Parameter**

See at [Record - addRecord](../record#addrecordapp-record)

**Return**

[BulkRequest](#bulkrequest)

### addRecords(app, records)

**Parameter**

See at [Record - addRecords](../record#addrecordsapp-records)

**Return**

[BulkRequest](#bulkrequest)

### updateRecordByID(app, id, record, revision)

**Parameter**

See at [Record - updateRecordByID](../record#updaterecordbyidapp-id-record-revision)

**Return**

[BulkRequest](#bulkrequest)

### updateRecordByUpdateKey(app, updateKey, record, revision)

**Parameter**

See at [Record - updateRecordByUpdateKey](../record#updaterecordbyupdatekeyapp-updatekey-record-revision)

**Return**

[BulkRequest](#bulkrequest)

### updateRecords(app, records)

**Parameter**

See at [Record - updateRecords](../record#updaterecordsapp-records)

**Return**

[BulkRequest](#bulkrequest)

### deleteRecords(app, ids)

**Parameter**

See at [Record - deleteRecords](../record#deleterecordsapp-ids)

**Return**

[BulkRequest](#bulkrequest)

### deleteRecordsWithRevision(app, idsWithRevision)

**Parameter**

See at [Record - deleteRecordsWithRevision](../record#deleterecordswithrevisionapp-idswithrevision)

**Return**

[BulkRequest](#bulkrequest)

### updateRecordAssignees(app, record, assignees, revision)

**Parameter**

See at [Record - updateRecordAssignees](../record#updaterecordassigneesapp-id-assignees-revision)

**Return**

[BulkRequest](#bulkrequest)

### updateRecordStatus(app, id, action, assignee, revision)

**Parameter**

See at [Record - updateRecordStatus](../record#updaterecordstatusapp-id-action-assignee-revision)

**Return**

[BulkRequest](#bulkrequest)

### updateRecordsStatus(app, records)

**Parameter**

See at [Record - updateRecordsStatus](../record#updaterecordsstatusapp-records)

**Return**

[BulkRequest](#bulkrequest)

### execute()

> Execute the bulk request and get data response

**Parameter**

(none)

**Return**

[Promise]

**Sample code**

<details class="tab-container" open>
<Summary>Execute bulk request</Summary>

<strong class="tab-name">Javascript</strong>

<pre class="inline-code">

  var responseBulkRequest = kintoneBulkRequest
    .addRecord(/*[Args]*/)
    .addRecords(/*[Args]*/)
    .updateRecords(/*[Args]*/)
    .deleteRecords()
    .execute();

  responseBulkRequest.then((resp) => {
    console.log(resp);
  }).catch((err) => {
    // write error to console
    console.log(err.get());
    // Throw error
    err.throw();
  });

</pre>

<strong class="tab-name">Nodejs</strong>

<pre class="inline-code">

  const responseBulkRequest = kintoneBulkRequest
    .addRecord(/* [Args]*/)
    .addRecords(/* [Args]*/)
    .updateRecords(/* [Args]*/)
    .deleteRecords()
    .execute();

  responseBulkRequest.then((resp) => {
    console.log(resp);
  }).catch((err) => {
    // write error to console
    console.log(err.get());
    // Throw error
    err.throw();
  });
  
</pre>

</details>

## Reference

- [Get Record](https://developer.kintone.io/hc/en-us/articles/213149287/) `on developer network`
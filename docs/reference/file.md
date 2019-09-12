# File

Download and upload file via kintone Rest API.

## Constructor

**Parameter**

| Name| Type| Required| Description |
| --- | --- | --- | --- |
| params | Object | yes | The parameters that include **connection** property
| params.connection | [Connection](../connection) | (optional) | The connection module of this SDK. <br> Required in  If initializing in browser environment on kintone, this parameter can be ommited to use session authentication.

**Sample code**

<details class="tab-container" open>
<Summary>Init app sample</Summary>

<strong class="tab-name">Javascript</strong>

<pre class="inline-code">
  // with connection
  var kintoneFile = new kintoneJSSDK.File({connection: connection});

  // without connection, module will use session authentication of kintone
  var kintoneFile = new kintoneJSSDK.File();

</pre>

<strong class="tab-name">Nodejs</strong>

<pre class="inline-code">
  const kintone = require('@kintone/kintone-js-sdk');
  let kintoneFile = new kintone.File({connection: connection});

</pre>

</details>

## Methods

### upload(params)

> Upload file into kintone

**Parameter**

| Name| Type| Required| Description |
| --- | --- | --- | --- |
| params | Object | yes | The parameters that include **fileName, fileBlob, fileContent** properties
| params.fileName | String | yes | The name of file
| params.fileBlob | Blob | yes | `This param only use for Javascript` <br> The content of file
| params.fileContent | Stream | yes | `This param only use for Nodejs` <br> The content of file

**Return**

Promise

**Sample code**

<details class="tab-container" open>
<Summary>Upload file sample</Summary>

<strong class="tab-name">Javascript</strong>

<pre class="inline-code">
  var params = {
    fileBlob: 'your_file_blob',
    fileName: 'your_file_name'
  };
  kintoneFile.upload(params).then((rsp) => {
    console.log(rsp);
  }).catch((err) => {
    // This SDK return err with KintoneAPIException
    console.log(err.get());
  });
</pre>

<strong class="tab-name">Nodejs</strong>

<pre class="inline-code">
  const params = {
    fileContent: fs.createReadStream('./cd.png'),
    fileName: path.basename('./cd.png')
  };
  kintoneFile.upload(params).then((rsp) => {
    console.log(rsp);
  }).catch((err) => {
    // This SDK return err with KintoneAPIException
    console.log(err.get());
  });

</pre>

</details>

### upload(params)

> Upload file into kintone using <b>nodejs</b>

**Parameter**

| Name| Type| Required| Description |
| --- | --- | --- | --- |
| params | Object | yes | The parameters that include **filePath** property
| params.filePath | String | yes | The path of file

**Return**

Promise

**Sample code**

<details class="tab-container" open>
<Summary>Upload file sample</Summary>

<strong class="tab-name">Nodejs</strong>

<pre class="inline-code">
  const params = {
    filePath: './cd.png'
  };
  kintoneFile.upload(params).then((rsp) => {
    console.log(rsp);
  }).catch((err) => {
    // This SDK return err with KintoneAPIException
    console.log(err.get());
  });

</pre>

</details>

### download(params)

> Download file from kintone

**Parameter **

| Name| Type| Required| Description |
| --- | --- | --- | --- |
| params | Object | yes | The parameters that include **fileKey, outPutFilePath** properties
| params.fileKey | String | yes | The file key of the uploaded file on kintone.
| params.outPutFilePath | String | yes | `This param only use for Nodejs` <br> The full path of output file on your environment

**Return**

Promise

**Sample code**

<details class="tab-container" open>
<Summary>Get apps sample</Summary>

<strong class="tab-name">Javascript</strong>

<pre class="inline-code">
  var params = {
    fileKey: 'your_file_Key',
    outPutFilePath: 'your_output_directory'
  };
  kintoneFile.download(params).then(rsp => {
    //file blob
    console.log(rsp);
  }).catch((err) => {
    // This SDK return err with KintoneAPIException
    console.log(err.get());
  });

</pre>

<strong class="tab-name">Nodejs</strong>

<pre class="inline-code">
  const params = {
    fileKey: 'your_file_Key',
    outPutFilePath: 'your_output_directory'
  };
  kintoneFile.download(params).catch((err) => {
    // This SDK return err with KintoneAPIException
    console.log(err.get());
  });
  
</pre>

</details>

## Reference

- [Upload File ](https://developer.kintone.io/hc/en-us/articles/212494448-Upload-File)`on developer network`
- [Download File ](https://developer.kintone.io/hc/en-us/articles/212494468-Download-File)`on developer network`
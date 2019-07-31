# File

Download and upload file via kintone Rest API.

## Constructor

**Parameter**

| Name| Type| Required| Description |
| --- | --- | --- | --- |
| connection | [Connection](../connection) | (optional) | The connection module of this SDK. If initializing in browser environment on kintone, this parameter can be ommited to use session authentication.

**Sample code**

<details class="tab-container" open>
<Summary>Init app sample</Summary>

<strong class="tab-name">Javascript</strong>

<pre class="inline-code">
  // with connection
  var kintoneFile = new kintoneJSSDK.File(connection);

  // without connection, module will use session authentication of kintone
  var kintoneFile = new kintoneJSSDK.File();

</pre>

<strong class="tab-name">Nodejs</strong>

<pre class="inline-code">

  const kintone = require('@kintone/kintone-js-sdk');
  let kintoneFile = new kintone.File(connection);

</pre>

</details>

## Methods

### upload(fileName, fileBlob)

> Upload file into kintone

**Parameter**

| Name| Type| Required| Description |
| --- | --- | --- | --- |
| fileName | String | yes | The name of file
| fileBlob | Blob | yes | `This param only use for Javascript` <br> The content of file
| fileContent | Stream | yes | `This param only use for Nodejs` <br> The content of file

**Return**

Promise

**Sample code**

<details class="tab-container" open>
<Summary>Upload file sample</Summary>

<strong class="tab-name">Javascript</strong>

<pre class="inline-code">

  var fileBlob = 'your_file_blob';
  var fileName = 'your_file_name';
  kintoneFile.upload(fileName, fileBlob).then((rsp) => {
    console.log(rsp);
  }).catch((err) => {
    // This SDK return err with KintoneAPIExeption
    console.log(err.get());
  });

</pre>

<strong class="tab-name">Nodejs</strong>

<pre class="inline-code">

  const fileContent = fs.createReadStream('./cd.png');
  const fileName = path.basename('./cd.png');
  kintoneFile.upload(fileName, fileContent).then((rsp) => {
    console.log(rsp);
  }).catch((err) => {
    // This SDK return err with KintoneAPIExeption
    console.log(err.get());
  });

</pre>

</details>

### upload(filePath)

> Upload file into kintone using <b>nodejs</b>

**Parameter**

| Name| Type| Required| Description |
| --- | --- | --- | --- |
| filePath | String | yes | The path of file

**Return**

Promise

**Sample code**

<details class="tab-container" open>
<Summary>Upload file sample</Summary>

<strong class="tab-name">Nodejs</strong>

<pre class="inline-code">

  const filePath = './cd.png';
  
  kintoneFile.upload(filePath).then((rsp) => {
    console.log(rsp);
  }).catch((err) => {
    // This SDK return err with KintoneAPIExeption
    console.log(err.get());
  });

</pre>

</details>

### download(fileKey, outPutFilePath)

> Download file from kintone

**Parameter **

| Name| Type| Required| Description |
| --- | --- | --- | --- |
| fileKey | String | yes | The file key of the uploaded file on kintone.
| outPutFilePath | String | yes | `This param only use for Nodejs` <br> The full path of output file on your environment

**Return**

Promise

**Sample code**

<details class="tab-container" open>
<Summary>Get apps sample</Summary>

<strong class="tab-name">Javascript</strong>

<pre class="inline-code">

  var fileKey = 'your_file_Key';
  kintoneFile.download(fileKey).then(rsp => {
    //file blob
    console.log(rsp);
  }).catch((err) => {
    // This SDK return err with KintoneAPIExeption
    console.log(err.get());
  });

</pre>

<strong class="tab-name">Nodejs</strong>

<pre class="inline-code">

  const fileKey = 'your_file_Key';
  const outPutFilePath = 'your_output_directory';
  kintoneFile.download(fileKey, outPutFilePath).catch((err) => {
    // This SDK return err with KintoneAPIExeption
    console.log(err.get());
  });
  
</pre>

</details>

## Reference

- [Upload File](https://developer.kintone.io/hc/en-us/articles/212494448-Upload-File)`on developer network`
- [Download File](https://developer.kintone.io/hc/en-us/articles/212494468-Download-File)`on developer network`
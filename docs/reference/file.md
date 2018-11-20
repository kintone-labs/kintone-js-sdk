# File

Download and upload file via kintone Rest API.

## Constructor

**Parameter**

| Name| Type| Required| Description |
| --- | --- | --- | --- |
| connection | [Connection](./connection) | yes | The connection module of this SDK.

**Sample code**

<details class="tab-container" open>
<Summary>Init app sample</Summary>

** Javascript **

```javascript

var kintoneFile = new kintoneJSSDK.File(connection);
```

** Nodejs **

```javascript

const kintone = require('kintone-js-sdk');
let kintoneFile = new kintone.File(connection);
```

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

** Javascript **

```javascript
var fileBlob = 'your_file_blob';
var fileName = 'your_file_name';
kintoneFile.upload(fileName, fileBlob).then((rsp) => {
  console.log(rsp);
}).catch((err) => {
  // This SDK return err with KintoneAPIExeption
  console.log(err.get());
});
```

** Nodejs **

```javascript
const fileContent = fs.createReadStream('./cd.png');
const fileName = path.basename('./cd.png');
kintoneFile.upload(fileName, fileContent).then((rsp) => {
  console.log(rsp);
}).catch((err) => {
  // This SDK return err with KintoneAPIExeption
  console.log(err.get());
});
```

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

** Javascript **

```javascript
var fileKey = 'your_file_Key';
kintoneFile.download(fileKey).then(rsp => {
  console.log(rsp);
}).catch((err) => {
  // This SDK return err with KintoneAPIExeption
  console.log(err.get());
});
```

** Nodejs **

```javascript
const fileKey = 'your_file_Key';
const outPutFilePath = 'your_output_directory';
kintoneFile.download(fileKey, outPutFilePath).catch((err) => {
  // This SDK return err with KintoneAPIExeption
  console.log(err.get());
});
```

</details>

## Reference

- [Upload File](https://developer.kintone.io/hc/en-us/articles/212494448-Upload-File)`on developer network`
- [Download File](https://developer.kintone.io/hc/en-us/articles/212494468-Download-File)`on developer network`
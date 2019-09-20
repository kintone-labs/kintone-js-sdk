# File

Download and upload file via kintone Rest API.

## Constructor

**Parameters**

| Name| Type| Required| Description |
| --- | --- | --- | --- |
| params | Object | (conditional) | `Required for nodejs`<br> The parameters that include **connection** property
| params.connection | [Connection](../connection) | (conditional) | The connection module of this SDK. <br> If initializing in the browser environment on kintone, this parameter can be omitted to use session authentication.

**Sample code**

<details class="tab-container" open>
<Summary>Init app sample</Summary>

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
        // with connection
    var kintoneFile = new kintoneJSSDK.File({connection: connection});

    // without connection, module will use session authentication of kintone
    var kintoneFile = new kintoneJSSDK.File();
    // ...
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
  const kintoneFile = new kintone.File({connection: connection});

</pre>

</details>

## Methods

### upload(params)

> Upload file into kintone

**Parameters**

| Name| Type| Required| Description |
| --- | --- | --- | --- |
| params | Object | yes | The parameters that include **fileName, fileBlob, fileContent, filePath** properties
| params.filePath | String | (conditional) | `This parameter can only be used in nodejs environment` <br> The path of file to be uploaded. <br> Required, if **fileContent** parameter is not specified.
| params.fileContent | Stream | (conditional) | `This parameter can only be used in Nodejs environment`<br> The content of file. <br> Required, if **filePath** parameter is not specified. <br> If **filePath** parameter is specified, this parameter will be ignored.
| params.fileBlob | Blob | yes | `This parameter can only be used in browser environment` <br> The content of file.
| params.fileName | String | (conditional) | The name of file. <br> Required, if either **fileBlob** or **fileContent** parameter is specified. 


**Return**

Promise

**Sample code**

<details class="tab-container" open>
<Summary>Upload file sample</Summary>

<strong class="tab-name">Javascript</strong>

<pre class="inline-code">
  var params = {
    fileBlob: 'YOUR_FILE_BLOB',
    fileName: 'YOUR_FILE_NAME'
  };
  kintoneFile.upload(params).then((rsp) => {
    console.log(rsp);
  }).catch((err) => {
    // This SDK return err with KintoneAPIException
    console.log(err);
  });
</pre>

<strong class="tab-name">Nodejs</strong>

<pre class="inline-code">
  // Using fileName, fileContent
  const params = {
    fileContent: fs.createReadStream('YOUR_FILE_PATH'),
    fileName: path.basename('YOUR_FILE_PATH')
  };
  kintoneFile.upload(params).then((rsp) => {
    console.log(rsp);
  }).catch((err) => {
    // This SDK return err with KintoneAPIException
    console.log(err);
  });

  // Using filePath
  const param = {
    filePath: 'YOUR_FILE_PATH'
  };
  kintoneFile.upload(param).then((rsp) => {
    console.log(rsp);
  }).catch((err) => {
    // This SDK return err with KintoneAPIException
    console.log(err);
  });
</pre>

</details>

### download(params)

> Download file from kintone

**Parameters**

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
    fileKey: 'YOUR_FILE_KEY'
  };
  kintoneFile.download(params).then(rsp => {
    //file blob
    console.log(rsp);
  }).catch((err) => {
    // This SDK return err with KintoneAPIException
    console.log(err);
  });

</pre>

<strong class="tab-name">Nodejs</strong>

<pre class="inline-code">
  const params = {
    fileKey: 'YOUR_FILE_KEY',
    outPutFilePath: 'YOUR_OUTPUT_DIRECTORY'
  };
  kintoneFile.download(params).catch((err) => {
    // This SDK return err with KintoneAPIException
    console.log(err);
  });
  
</pre>

</details>

## Reference

- [Upload File ](https://developer.kintone.io/hc/en-us/articles/212494448-Upload-File)`on developer network`
- [Download File ](https://developer.kintone.io/hc/en-us/articles/212494468-Download-File)`on developer network`
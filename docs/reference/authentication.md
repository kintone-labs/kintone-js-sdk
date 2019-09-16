# Authentication

 * Authentication module will be used by [Connection](../connection).
 * This module allows authenticating with the Kintone app by:
    * Password Authentication
    * API token authentication
    * Basic authenticator

!!! warning

    - If both the Token and Password Authentication are specified, the Token Authentication will be ignored and the Password authentication will be used.

## Constructor

**Parameter**

(none)

**Sample code**

<details class="tab-container" open>
<Summary>Init authentication module</Summary>

<strong class="tab-name">Javascript</strong>

<pre class="inline-code">

    var kintoneAuth = new kintoneJSSDK.Auth();

</pre>

<strong class="tab-name">Nodejs</strong>

<pre class="inline-code">

    const kintone = require('@kintone/kintone-js-sdk');
    let kintoneAuth = new kintone.Auth();

</pre>

</details>

## Methods

### setPasswordAuth(params)

> Set password authentication for Authentication module.

**Parameter**

| Name| Type| Required| Description |
| --- | --- | --- | --- |
| params | Object | yes | The parameters that include **username, password** properties
| params.username | String | yes | The username that is able to authenticate on kintone app
| params.password | String | yes | The password that is able to authenticate on kintone app

**Return**

[Auth](../authentication)

**Sample code**

<details class="tab-container" open>
<Summary>Set password authentication</Summary>

<strong class="tab-name">Javascript</strong>

<pre class="inline-code">
    var basicAuth = {
        username: '{YOUR_USER_NAME}',
        password: '{YOUR_PASSWORD}'
    };
    kintoneAuth.setPasswordAuth(basicAuth);

</pre>

<strong class="tab-name">Nodejs</strong>

<pre class="inline-code">
    const basicAuth = {
        username: '{YOUR_USER_NAME}',
        password: '{YOUR_PASSWORD}'
    };
    kintoneAuth.setPasswordAuth(basicAuth);

</pre>

</details>

### setApiToken(params)

> Set Api Token for Authentication module.

**Parameter**

| Name| Type| Required| Description |
| --- | --- | --- | --- |
| params | Object | yes | The parameters that includes **apiToken** property 
| params.apiToken | String | yes | The apiToken that is able to authenticate on kintone app

**Return**

[Auth](../authentication)


<details class="tab-container" open>
<Summary>Set APIToken authentication</Summary>

<strong class="tab-name">Javascript</strong>

<pre class="inline-code">
    var params = {
        apiToken: '{your_token}'
    };
    kintoneAuth.setApiToken(params);

</pre>

<strong class="tab-name">Nodejs</strong>

<pre class="inline-code">
    const params = {
        apiToken: '{your_token}'
    };
    kintoneAuth.setApiToken(params);

</pre>

</details>

### setBasicAuth(params)

> Set Basic authentication for Authentication module.

**Parameter**

| Name| Type| Required| Description |
| --- | --- | --- | --- |
| params | Object | yes | The parameters that includes **username, password** properties  
| params.username | String | yes | The username that is able to authenticate on kintone app
| params.password | String | yes | The password that is able to authenticate on kintone app

**Return**

[Auth](../authentication)

**Sample code**

<details class="tab-container" open>
<Summary>Set basic authentication</Summary>

<strong class="tab-name">Javascript</strong>

<pre class="inline-code">
    var basicAuth = {
        username: 'YOUR_USER_NAME',
        password: 'YOUR_PASSWORD'
    };
    kintoneAuth.setBasicAuth(basicAuth);

</pre>
<strong class="tab-name">Nodejs</strong>

<pre class="inline-code">
    const basicAuth = {
        username: 'YOUR_USER_NAME',
        password: 'YOUR_PASSWORD'
    };
    kintoneAuth.setBasicAuth(basicAuth);
    
</pre>

</details>

### setClientCert(params)

> Setting Authentication with the client certificate & password set.

**Parameter**

| Name| Type| Required| Description |
| --- | --- | --- | --- |
| params | Object | yes | The parameters that includes **cert, password** properties  
| params.cert | BinaryData | yes | Binary data of client certificate
| params.password | String | yes | Password of client certificate

**Return**

[Auth](../authentication)

**Sample code**

<details class="tab-container" open>
<Summary>Set client certificate by binary data</Summary>

<strong class="tab-name">Nodejs</strong>

<pre class="inline-code">
    const filePath = 'YOUR_CERT_PATH_FILE';
    const params = {
        fileContent: fs.readFileSync(filePath),
        certPassword: 'YOUR_CERT_FILE_PASSWORD'
    };
    //set client cert by file content and password
    kintoneAuth.setClientCert(params);
    
</pre>

</details>

### setClientCertByPath(params)

> Setting Authentication with the client certificate & password set by file path

**Parameter**

| Name| Type| Required| Description |
| --- | --- | --- | --- |
| params | Object | yes | The parameters that includes **filePath, password** properties  
| params.filePath | String | yes | File path to client certificate
| params.password | String | yes | Password of client certificate

**Return**

[Auth](../authentication)

**Sample code**

<details class="tab-container" open>
<Summary>Set client certificate by path</Summary>

<strong class="tab-name">Nodejs</strong>

<pre class="inline-code">
    const params = {
        filePath: 'YOUR_CERT_PATH_FILE',
        certPassword: 'YOUR_CERT_FILE_PASSWORD'
    };
    //set client cert by file path and password
    kintoneAuth.setClientCertByPath(params);

</pre>

</details>
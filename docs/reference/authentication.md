# Authentication

Authentication module will be used by [Connection](../connection).
This module allows authenticating with the Kintone app by password authenticator or API token authenticator. This module is also supported the basic authenticator.

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

### setPasswordAuth(username, password)

> Set password authentication for Authentication module.

**Parameter**

| Name| Type| Required| Description |
| --- | --- | --- | --- |
| username | String | yes | The username that is able to authenticate on kintone app
| password | String | yes | The password that is able to authenticate on kintone app

**Return**

[Auth](../authentication)

**Sample code**

<details class="tab-container" open>
<Summary>Set password authentication</Summary>

<strong class="tab-name">Javascript</strong>

<pre class="inline-code">

    var username = '{your_user_name}';
    var password = '{your_password}';
    kintoneAuth.setPasswordAuth(username, password);

</pre>

<strong class="tab-name">Nodejs</strong>

<pre class="inline-code">

    let username = '{your_user_name}';
    let password = '{your_password}';
    kintoneAuth.setPasswordAuth(username, password);

</pre>

</details>

### setApiToken(apiToken)

> Set Api Token for Authentication module.

**Parameter**

| Name| Type| Required| Description |
| --- | --- | --- | --- |
| apiToken | String | yes | The apiToken that is able to authenticate on kintone app

**Return**

[Auth](../authentication)


<details class="tab-container" open>
<Summary>Set APIToken authentication</Summary>

<strong class="tab-name">Javascript</strong>

<pre class="inline-code">

    var apiToken = '{your_token}';
    kintoneAuth.setApiToken(apiToken);

</pre>

<strong class="tab-name">Nodejs</strong>

<pre class="inline-code">

    let apiTokenString = '{your_token}';
    kintoneAuth.setApiToken(apiTokenString);

</pre>

</details>

### setBasicAuth(username, password)

> Set Basic authentication for Authentication module.

**Parameter**

| Name| Type| Required| Description |
| --- | --- | --- | --- |
| username | String | yes | The username that is able to authenticate on kintone app
| password | String | yes | The password that is able to authenticate on kintone app

**Return**

[Auth](../authentication)

**Sample code**

<details class="tab-container" open>
<Summary>Set basic authentication</Summary>

<strong class="tab-name">Javascript</strong>

<pre class="inline-code">

    var username = '{your_user_name}';
    var password = '{your_password}';
    kintoneAuth.setBasicAuth(username, password);

</pre>
<strong class="tab-name">Nodejs</strong>

<pre class="inline-code">

    let username = '{your_user_name}';
    let password = '{your_password}';
    kintoneAuth.setBasicAuth(username, password);
    
</pre>

</details>

### setClientCert(BinaryData cert, String password)

> Setting Authentication with the client certificate & password set.

**Parameter**

| Name| Type| Required| Description |
| --- | --- | --- | --- |
| cert | BinaryData | yes | Binary data of client certificate
| password | String | yes | Password of client certificate

**Return**

[Auth](../authentication)

**Sample code**

<details class="tab-container" open>
<Summary>Set client certificate by binary data</Summary>

<strong class="tab-name">Nodejs</strong>

<pre class="inline-code">

    const filePath = "your_cert_path_file"
    const fileContent = fs.readFileSync(filePath);
    const certPassword = "your_cert_file_password"
    
    //set client cert by file content and password
    kintoneAuth.setClientCert(fileContent, certPassword);
    
</pre>

</details>

### setClientCertByPath(String filePath, String password)

> Setting Authentication with the client certificate & password set by file path

**Parameter**

| Name| Type| Required| Description |
| --- | --- | --- | --- |
| filePath | String | yes | File path to client certificate
| password | String | yes | Password of client certificate

**Return**

[Auth](../authentication)

**Sample code**

<details class="tab-container" open>
<Summary>Set client certificate by path</Summary>

<strong class="tab-name">Nodejs</strong>

<pre class="inline-code">

    const filePath = "your_cert_path_file"
    const certPassword = "your_cert_file_password"
    
    //set client cert by file path and password
    kintoneAuth.setClientCertByPath(filePath, certPassword);
    
</pre>

</details>

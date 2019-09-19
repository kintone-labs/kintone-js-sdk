# Connection

[Connection](#) module is used to connect to kintone Rest API

> This module execute requests using [axios](https://www.npmjs.com/package/axios)

## Constructor

**Parameter**

| Name| Type| Required| Description |
| --- | --- | --- | --- |
| params | Object | yes | The parameters that include **domain, auth, guestSpaceID** properties
| params.domain | String | (conditional) | `Required for nodejs` <br> The domain that is able to authenticate on kintone app
| params.auth | [Auth](../authentication) | (conditional) | `Required for nodejs` <br> The authentication object.
| params.guestSpaceID | Integer | (optional) | The guest space id. Use this parameter to connect to kintone guest space.

**Sample code**

<details class="tab-container" open>
<Summary>Init Connection module</Summary>

<strong class="tab-name">Javascript</strong>

<pre class="inline-code">
    // Define Authentication object
    var paramsAuth = {
        username: 'YOUR_USER_NAME',
        password: 'YOUR_PASSWORD'
    };
    var kintoneAuth = new kintoneJSSDK.Auth();
    kintoneAuth.setPasswordAuth(paramsAuth);

    // Define connection that included auth
    var paramsConnection = {
        auth: kintoneAuth
    };
    var kintoneConnectionWithAuthDemo = new kintoneJSSDK.Connection(paramsConnection);

    // Define connection that included guest space and auth
    var paramsConnection = {
        auth: kintoneAuth,
        guestSpaceID: GUEST_SPACE_ID
    };
    var kintoneConnectionWithGuestSpaceAndAuthDemo = new kintoneJSSDK.Connection(paramsConnection);

    // Define connection without auth included guest space 
    var paramsConnection = {
        guestSpaceID: GUEST_SPACE_ID
    };
    var kintoneConnectionWithGuestSpaceDemo = new kintoneJSSDK.Connection(paramsConnection);
</pre>

<strong class="tab-name">Nodejs</strong>
<pre class="inline-code">

    const kintone = require('@kintone/kintone-js-sdk');

    // Define Authentication object
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
    const kintoneConnection = new kintone.Connection(paramsConnection);

    // Define connection that included guest space
    const paramsConnection = {
        domain: 'YOUR_DOMAIN',
        auth: kintoneAuth,
        guestSpaceID: GUEST_SPACE_ID
    };
    const kintoneConnectionWithGuestSpaceDemo = new kintone.Connection(paramsConnection);

</pre>

</details>

## Methods

### setHeader(params)

> Set new header of the [Connection](./#)

**Parameter**

| Name| Type| Required| Description |
| --- | --- | --- | --- |
| params | Object | yes | The parameters that include **key, value** properties
| params.key | String | yes | The header's `key` name
| params.value | String | yes | The header's value of `key`

**Return**

[Connection](./#)

**Sample code**

<details class="tab-container" open>
<Summary>Set header of the Connection</Summary>

<strong class="tab-name">Javascript</strong>

<pre class="inline-code">
    var params = {
        key: 'YOUR_HEADER_KEY',
        value: 'YOUR_HEADER_VALUE'
    };
    kintoneConnection.setHeader(params);
</pre>

<strong class="tab-name">Nodejs</strong>

<pre class="inline-code">
    const params = {
        key: 'YOUR_HEADER_KEY',
        value: 'YOUR_HEADER_VALUE'
    };
    kintoneConnection.setHeader(params);

</pre>

</details>

### addRequestOption(params)

> Add option that supported by [axios](https://www.npmjs.com/package/axios) option

**Parameter**

| Name| Type| Required| Description |
| --- | --- | --- | --- |
| params | Object | yes | The parameters that include **key, value** properties
| params.key | String | yes | The option's `key` name
| params.value | String | yes | The option's value of `key`

**Return**

[Connection](./#)

**Sample code**

<details class="tab-container" open>
<Summary>Add request option of the Connection</Summary>

<strong class="tab-name">Javascript</strong>

<pre class="inline-code">
    var params = {
        key: 'YOUR_OPTION_KEY',
        value: 'YOUR_OPTION_VALUE'
    };
    kintoneConnection.addRequestOption(params);

</pre>

<strong class="tab-name">Nodejs</strong>

<pre class="inline-code">
    const params = {
        key: 'YOUR_OPTION_KEY',
        value: 'YOUR_OPTION_VALUE'
    };
    kintoneConnection.addRequestOption(params);
</pre>

</details>

### setProxy(params)

> Set proxy for the connection module. <br>
> This function is available on node.js environment only. <br>
> On Browser environment, proxy settings are controlled by the Browser.

**Parameter**

| Name| Type| Required| Description |
| --- | --- | --- | --- |
| params | Object | yes | The parameters that include **proxyHost, proxyPort, proxyUsername, proxyPassword** properties
| params.proxyHost | String | yes | The proxy host name
| params.proxyPort | String | yes | The proxy port number
| params.proxyUsername | String | optional | The username for proxy authentication. This parameter is required when proxy has authentication.
| params.proxyPassword | String | optional | The proxy port number. This parameter is required when proxy has authentication.

**Return**

[Connection](./#)

**Sample code**

<details class="tab-container" open>
<Summary>Set proxy for the Connection</Summary>

<strong class="tab-name">Nodejs</strong>

<pre class="inline-code">
    const params = {
        proxyHost: 'YOUR_PROXY_HOST',
        proxyPort: 'YOUR_PROXY_POST',
        proxyUsername: 'YOUR_PROXY_USER',
        proxyPassword: 'YOUR_PROXY_PASSWORD'
    };
    kintoneConnection.setProxy(params);
</pre>

</details>

### setHttpsProxy(params)

> Set SSL-secured proxy for the connection module. <br> 
> This function is available on node.js environment only. <br>
> On Browser environment, proxy settings are controlled by the Browser.

**Parameter**

| Name| Type| Required| Description |
| --- | --- | --- | --- |
| params | Object | yes | The parameters that include **proxyHost, proxyPort, proxyUsername, proxyPassword** properties
| params.proxyHost | String | yes | The proxy host name
| params.proxyPort | String | yes | The proxy port number
| params.proxyUsername | String | optional | The username for proxy authentication. This parameter is required when proxy has authentication.
| params.proxyPassword | String | optional | The proxy port number. This parameter is required when proxy has authentication.

**Return**

[Connection](./#)

**Sample code**

<details class="tab-container" open>
<Summary>Set proxy for the Connection</Summary>

<strong class="tab-name">Nodejs</strong>

<pre class="inline-code">
    const params = {
        proxyHost: 'YOUR_PROXY_HOST',
        proxyPort: 'YOUR_PROXY_POST',
        proxyUsername: 'YOUR_PROXY_USER',
        proxyPassword: 'YOUR_PROXY_PASSWORD'
    };
    kintoneConnection.setHttpsProxy(params);
</pre>

</details>

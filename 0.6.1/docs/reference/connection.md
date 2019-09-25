# Connection

[Connection](#) module is used to connect to kintone Rest API

> This module execute requests using [axios](https://www.npmjs.com/package/axios)

## Constructor

**Parameter**

| Name| Type| Required| Description |
| --- | --- | --- | --- |
| params | Object | yes | The parameters that include **domain, auth, guestSpaceID** properties
| params.domain | String | (condition) | `Required for nodejs` <br> The domain that is able to authenticate on kintone app
| params.auth | [Auth](../authentication) | (condition) | `Required for nodejs` <br> The authentication object.
| params.guestSpaceID | Integer | (optional) | The guest space id. Use this parameter to connect to kintone guest space.

**Sample code**

<details class="tab-container" open>
<Summary>Init Connection module</Summary>

<strong class="tab-name">Javascript</strong>

<pre class="inline-code">
    // Define Authentication object
    var paramsAuth = {
        username: '{your_user_name}',
        password: '{your_password}'
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
        guestSpaceID: {guest_Space_ID}
    };
    var kintoneConnectionWithGuestSpaceAndAuthDemo = new kintoneJSSDK.Connection(paramsConnection);

    // Define connection without auth included guest space 
    var paramsConnection = {
        guestSpaceID: {guest_Space_ID}
    };
    var kintoneConnectionWithGuestSpaceDemo = new kintoneJSSDK.Connection(paramsConnection);
</pre>

<strong class="tab-name">Nodejs</strong>
<pre class="inline-code">

    const kintone = require('@kintone/kintone-js-sdk');

    // Define Authentication object
    let kintoneAuth = new kintone.Auth();
    let paramsAuth = {
        username: '{your_user_name}';
        password: '{your_password}'
    };
    kintoneAuth.setPasswordAuth(paramsAuth);

    let paramsConnection = {
        domain: 'my.domain.tld',
        auth: kintoneAuth
    };
    let kintoneConnection = new kintone.Connection(paramsConnection);

    // Define connection that included guest space
    let paramsConnection = {
        domain: 'my.domain.tld',
        auth: kintoneAuth,
        guestSpaceID: {guest_Space_ID}
    };
    let kintoneConnectionWithGuestSpaceDemo = new kintone.Connection(paramsConnection);

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
        key: '{your_header_key}',
        value: '{your_header_value}'
    };
    kintoneConnection.setHeader(params);
</pre>

<strong class="tab-name">Nodejs</strong>

<pre class="inline-code">
    let params = {
        key: '{your_header_key}',
        value: '{your_header_value}'
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
        key: '{your_option_key}',
        value: '{your_option_value}'
    };
    kintoneConnection.addRequestOption(params);

</pre>

<strong class="tab-name">Nodejs</strong>

<pre class="inline-code">
    let params = {
        key: '{your_option_key}',
        value: '{your_option_value}'
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
        proxyHost: '{your_proxy_host}',
        proxyPort: '{your_proxy_post}',
        proxyUsername: '{your_proxy_user}',
        proxyPassword: '{your_proxy_password}'
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
        proxyHost: '{your_proxy_host}',
        proxyPort: '{your_proxy_post}',
        proxyUsername: '{your_proxy_user}',
        proxyPassword: '{your_proxy_password}'
    };
    kintoneConnection.setHttpsProxy(params);
</pre>

</details>

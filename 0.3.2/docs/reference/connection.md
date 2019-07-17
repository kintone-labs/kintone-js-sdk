# Connection

[Connection](#) module will used as a connector to connect to kintone Rest API

> This module excute the request process by [axios](https://www.npmjs.com/package/axios) npm.

## Constructor

**Parameter**

| Name| Type| Required| Description |
| --- | --- | --- | --- |
| domain | String | (condition) | `Required for nodejs` <br> The domain that is able to authenticate on kintone app
| auth | [Auth](../authentication) | (condition) | `Required for nodejs` <br> The authentication object.
| guestSpaceID | Integer | (optional) | The guest space id. Use this parameter to connect to kintone guest space.

**Sample code**

<details class="tab-container" open>
<Summary>Init Connection module</Summary>

<strong class="tab-name">Javascript</strong>

<pre class="inline-code">

    // Define Authentication object
    var kintoneAuth = new kintoneJSSDK.Auth();
    var username = '{your_user_name}';
    var password = '{your_password}';
    kintoneAuth.setPasswordAuth(username, password);

    // Define connection that included auth
    var kintoneConnection = new kintoneJSSDK.Connection( kintoneAuth);

    // Define connection that included guest space 
    var guestSpaceID = '{guest_Space_ID}';
    var kintoneConnectionWithGuestSpaceDemo =
        new kintoneJSSDK.Connection(kintoneAuth, guestSpaceID);

    // Define connection without  auth
    var guestSpaceID = '{guest_Space_ID}';
    var kintoneConnectionWithGuestSpaceDemo =
        new kintoneJSSDK.Connection(null, guestSpaceID);

</pre>

<strong class="tab-name">Nodejs</strong>
<pre class="inline-code">

    const kintone = require('@kintone/kintone-js-sdk');

    // Define Authentication object
    let kintoneAuth = new kintone.Auth();
    let username = '{your_user_name}';
    let password = '{your_password}';
    kintoneAuth.setPasswordAuth(username, password);

    let myDomainName = 'my.domain.tld';
    let kintoneConnection = new kintone.Connection(myDomainName, kintoneAuth);

    // Define connection that included guest space
    let guestSpaceID = /*{guestSpaceID}*/;
    let kintoneConnectionWithGuestSpaceDemo =
        new kintone.Connection(myDomainName, kintoneAuth, guestSpaceID);

</pre>

</details>

## Methods

### setHeader(key, value)

> Set new header of the [Connection](./#)

**Parameter**

| Name| Type| Required| Description |
| --- | --- | --- | --- |
| key | String | yes | The header's `key` name
| value | String | yes | The header's value of `key`

**Return**

[Connection](./#)

**Sample code**

<details class="tab-container" open>
<Summary>Set header of the Connection</Summary>

<strong class="tab-name">Javascript</strong>

<pre class="inline-code">

    var key = '{your_header_key}';
    var value = '{your_header_value}';
    kintoneConnection.setHeader(key, value);

</pre>

<strong class="tab-name">Nodejs</strong>

<pre class="inline-code">

    let key = '{your_header_key}';
    let value = '{your_header_value}';
    kintoneConnection.setHeader(key, value);

</pre>

</details>

### addRequestOption(key, value)

> Add option that supported by [axios](https://www.npmjs.com/package/axios) option

**Parameter**

| Name| Type| Required| Description |
| --- | --- | --- | --- |
| key | String | yes | The option's `key` name
| value | String | yes | The option's value of `key`

**Return**

[Connection](./#)

**Sample code**

<details class="tab-container" open>
<Summary>Set header of the Connection</Summary>

<strong class="tab-name">Javascript</strong>

<pre class="inline-code">

    var key = '{your_option_key}';
    var value = '{your_option_value}';
    kintoneConnection.addRequestOption(key, value);

</pre>

<strong class="tab-name">Nodejs</strong>

<pre class="inline-code">

    let key = '{your_option_key}';
    let value = '{your_option_value}';
    kintoneConnection.addRequestOption(key, value);

</pre>

</details>

### setProxy(proxyHost, proxyPort)

> Set the proxy for the [axios](https://www.npmjs.com/package/axios) option

**Parameter**

| Name| Type| Required| Description |
| --- | --- | --- | --- |
| proxyHost | String | yes | The proxy host name
| proxyPort | String | yes | The proxy port number

**Return**

[Connection](./#)

**Sample code**

<details class="tab-container" open>
<Summary>Set proxy for the Connection</Summary>

<strong class="tab-name">Javascript</strong>

<pre class="inline-code">

    var proxyHost = '{your_proxy_host}';
    var proxyPort = '{your_proxy_post}';
    kintoneConnection.setProxy(proxyHost, proxyPort);

</pre>

<strong class="tab-name">Nodejs</strong>

<pre class="inline-code">

    const proxyHost = '{your_proxy_host}';
    const proxyPort = '{your_proxy_post}';
    kintoneConnection.setProxy(proxyHost, proxyPort);
    
</pre>

</details>

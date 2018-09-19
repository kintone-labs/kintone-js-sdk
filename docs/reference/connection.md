# Connection

[Connection](#) module will used as a connector to connect to kintone Rest API

> This module excute the request process by [axios](https://www.npmjs.com/package/axios) npm.

## Constructor

**Parameter**

| Name| Type| Required| Description |
| --- | --- | --- | --- |
| domain | String | yes | The username that is able to authenticate on kintone app
| auth | [Auth](./authentication) | (condition) | The authentication object.
| guestSpaceID | Integer | (optional) | The guest space id. Use this parameter to connect to kintone guest space.

**Sample code**

<details class="tab-container" open>
<Summary>Init Connection module</Summary>

** Source code **

```javascript
// Define Authentication object
var kintoneAuth = new kintoneJSSDK.Auth();
var username = '{your_user_name}';
var password = '{your_password}';
kintoneAuth.setPasswordAuth(username, password);

var myDomainName = 'my.domain.tld';
var kintoneConnection = new kintoneJSSDK.Connection(myDomainName, kintoneAuth);

// Define connection that included guest space
var guestSpaceID = /*{guestSpaceID}*/;
var kintoneConnectionWithGuestSpaceDemo =
    new kintoneJSSDK.Connection(myDomainName, kintoneAuth, guestSpaceID);

```

</details>

## Methods

### setHeader(key, value)

> Set new header of the [Connection](./connection)

**Parameter**

| Name| Type| Required| Description |
| --- | --- | --- | --- |
| key | String | yes | The header's `key` name
| value | String | yes | The header's value of `key`

**Return**

[Connection](./connection)

**Sample code**

<details class="tab-container" open>
<Summary>Set header of the Connection</Summary>

** Source code **

```javascript
var key = '{your_header_key}';
var value = '{your_header_value}';
kintoneConnection.setHeader(key, value);
```

</details>

### addRequestOption(key, value)

> Add option that supported by [axios](https://www.npmjs.com/package/axios) option

**Parameter**

| Name| Type| Required| Description |
| --- | --- | --- | --- |
| key | String | yes | The option's `key` name
| value | String | yes | The option's value of `key`

**Return**

[Connection](./connection)

**Sample code**

<details class="tab-container" open>
<Summary>Set header of the Connection</Summary>

** Source code **

```javascript
var key = '{your_option_key}';
var value = '{your_option_value}';
kintoneConnection.addRequestOption(key, value);
```

</details>

### setProxy(proxyHost, proxyPort)

> Set the proxy for the [axios](https://www.npmjs.com/package/axios) option

**Parameter**

| Name| Type| Required| Description |
| --- | --- | --- | --- |
| proxyHost | String | yes | The proxy host name
| proxyPort | String | yes | The proxy port number

**Return**

[Connection](./connection)

**Sample code**

<details class="tab-container" open>
<Summary>Set proxy for the Connection</Summary>

** Source code **

```javascript
const proxyHost = '{your_proxy_host}';
const proxyPort = '{your_proxy_post}';
kintoneConnection.setProxy(proxyHost, proxyPort);
```

</details>

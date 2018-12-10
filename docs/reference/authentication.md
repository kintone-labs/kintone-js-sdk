# Authentication

Authentication module will be used by [Connection](./connection).
This module allows authenticating with the Kintone app by password authenticator or API token authenticator. This module is also supported the basic authenticator.

!!! warning

    - If both the Token and Password Authentication are specified, the Token Authentication will be ignored and the Password authentication will be used.

## Constructor

**Parameter**

(none)

**Sample code**

<details class="tab-container" open>
<Summary>Init authentication module</Summary>

** Javascript **

```javascript
var kintoneAuth = new kintoneJSSDK.Auth();
```

** Nodejs **

```javascript
const kintone = require('kintone-js-sdk');
let kintoneAuth = new kintone.Auth();
```

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

[Auth](./authentication)

**Sample code**

<details class="tab-container" open>
<Summary>Set password authentication</Summary>

** Javascript **

```javascript
var username = '{your_user_name}';
var password = '{your_password}';
kintoneAuth.setPasswordAuth(username, password);
```

** Nodejs **

```javascript
let username = '{your_user_name}';
let password = '{your_password}';
kintoneAuth.setPasswordAuth(username, password);
```

</details>

### setApiToken(apiToken)

> Set Api Token for Authentication module.

**Parameter**

| Name| Type| Required| Description |
| --- | --- | --- | --- |
| apiToken | String | yes | The apiToken that is able to authenticate on kintone app

**Return**

[Auth](./authentication)


<details class="tab-container" open>
<Summary>Set APIToken authentication</Summary>

** Javascript **

```javascript
var apiToken = '{your_token}';
kintoneAuth.setApiToken(apiToken);
```

** Nodejs **

```javascript
let apiTokenString = '{your_token}';
kintoneAuth.setApiToken(apiTokenString);
```

</details>

### setBasicAuth(username, password)

> Set Basic authentication for Authentication module.

**Parameter**

| Name| Type| Required| Description |
| --- | --- | --- | --- |
| username | String | yes | The username that is able to authenticate on kintone app
| password | String | yes | The password that is able to authenticate on kintone app

**Return**

[Auth](./authentication)

**Sample code**

<details class="tab-container" open>
<Summary>Set basic authentication</Summary>

** Javascript **

```javascript
var username = '{your_user_name}';
var password = '{your_password}';
kintoneAuth.setBasicAuth(username, password);
```
** Nodejs **

```javascript
let username = '{your_user_name}';
let password = '{your_password}';
kintoneAuth.setBasicAuth(username, password);
```

</details>

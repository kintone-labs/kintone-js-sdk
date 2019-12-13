# kintoneAPIException

Handle error responses from kintone Rest API

## Methods

### getHttpErrorCode()

**Parameters**

(none)

**Return**

Integer

**Sample code**

<details class="tab-container" open>
<Summary>Get HTTP error code</Summary>

<strong class="tab-name">Javascript</strong>

<pre class="inline-code">

    var appID = {your_invalid_app_id};
    kintoneApp.getApp(appID).catch(function(err) {
      // This SDK return err with KintoneAPIExeption
      console.log(err.getHttpErrorCode());
    });

</pre>

<strong class="tab-name">Nodejs</strong>

<pre class="inline-code">

    let appID = {your_invalid_app_id};
    kintoneApp.getApp(appID).catch((err) => {
      // This SDK return err with KintoneAPIExeption
      console.log(err.getHttpErrorCode());
    });

</pre>

</details>

### getErrorResponse()

**Parameters**

(none)

**Return**

[Error Response](https://developer.kintone.io/hc/en-us/articles/212495188#responses)

**Sample code**

<details class="tab-container" open>
<Summary>Get error response</Summary>

<strong class="tab-name">Javascript</strong>

<pre class="inline-code">

    var appID = {your_invalid_app_id};
    kintoneApp.getApp(appID).catch(function(err) {
      // This SDK return err with KintoneAPIExeption
      console.log(err.getErrorResponse());
    });

</pre>

<strong class="tab-name">Nodejs</strong>

<pre class="inline-code">

    let appID = {your_invalid_app_id};
    kintoneApp.getApp(appID).catch((err) => {
      // This SDK return err with KintoneAPIExeption
      console.log(err.getErrorResponse());
    });

</pre>

</details>

### get()

**Parameters**

(none)

**Return**

[Error Response](https://developer.kintone.io/hc/en-us/articles/212495188#responses)

**Sample code**

<details class="tab-container" open>
<Summary>Get original error</Summary>

<strong class="tab-name">Javascript</strong>

<pre class="inline-code">

    var appID = {your_invalid_app_id};
    kintoneApp.getApp(appID).catch(function(err) {
      // This SDK return err with KintoneAPIExeption
      console.log(err.get());
    });

</pre>

<strong class="tab-name">Nodejs</strong>

<pre class="inline-code">

    let appID = {your_invalid_app_id};
    kintoneApp.getApp(appID).catch((err) => {
      // This SDK return err with KintoneAPIExeption
      console.log(err.get());
    });

</pre>

</details>

### getOriginError()

**Parameters**

(none)

**Return**

Object

**Sample code**

<details class="tab-container" open>
<Summary>Get original error</Summary>

<strong class="tab-name">Javascript</strong>

<pre class="inline-code">

    var appID = {your_invalid_app_id};
    kintoneApp.getApp(appID).catch(function(err) {
      // This SDK return err with KintoneAPIExeption
      console.log(err.getOriginError());
    });

</pre>

<strong class="tab-name">Nodejs</strong>

<pre class="inline-code">

    let appID = {your_invalid_app_id};
    kintoneApp.getApp(appID).catch((err) => {
      // This SDK return err with KintoneAPIExeption
      console.log(err.getOriginError());
    });

</pre>

</details>

## Reference

- [kintone REST API Overview](https://developer.kintone.io/hc/en-us/articles/212495188)`on developer network`
- [axios](https://www.npmjs.com/package/axios)`on npmjs`
# kintoneAPIException

Handle error responses from kintone Rest API

## Methods

### get()

**Parameter**

(none)

**Return**

[Kintone Error Response](https://developer.kintone.io/hc/en-us/articles/212495188#responses)

**Sample code**

<details class="tab-container" open>
<Summary>Get app with error response</Summary>

<strong class="tab-name">Javascript</strong>

<pre class="inline-code">

    var appID = {your_invalid_app_id};
    kintoneApp.getApp(appID).catch((err) => {
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

<strong class="tab-name">Response</strong>

<pre class="inline-code">
    {
        "id":"kintone_error_id",
        "code":"{kintone_error_code}",
        "message":"{kintone_error_message}",
        "errors": [
            /*errors items here*/
        ]

    }

</pre>

</details>

### getAll()

**Parameter**

(none)

**Return**

The result of Promise.Reject()

**Sample code**

<details class="tab-container" open>
<Summary>Get apps with error response</Summary>

<strong class="tab-name">Javascript</strong>

<pre class="inline-code">

    var appID = {your_invalid_app_id};
    kintoneApp.getApp(appID).catch((err) => {
    // This SDK return err with KintoneAPIExeption
    console.log(err.getAll());
    });

</pre>

<strong class="tab-name">Nodejs</strong>

<pre class="inline-code">

    let appID = {your_invalid_app_id};
    kintoneApp.getApp(appID)
        .catch((err) => {
            // This SDK return err with KintoneAPIExeption
            console.log(err.getAll());
        });

</pre>

<strong class="tab-name">Response</strong>

<pre class="inline-code">
    // Response error object

</pre>

</details>

### throw()

> This function will throw result of [get()](#get) function

<strong class="tab-name">Parameter</strong>

(none)

**Return**

(none)

### throwAll()

> This function will throw result of [getAll()](#getall) function

**Parameter **

(none)

**Return**

(none)

## Reference

- [kintone REST API Overview](https://developer.kintone.io/hc/en-us/articles/212495188)`on developer network`
- [axios](https://www.npmjs.com/package/axios)`on npmjs`
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

** Source code **

```javascript
var appID = {your_invalid_app_id};
kintoneApp.getApp(appID).catch((err) => {
  // This SDK return err with KintoneAPIExeption
  console.log(err.get());
});
```

** Response **

```javascript
{
    "message":"{kintone_error_message}",
    "id":"kintone_error_id",
    "code":"{kintone_error_code}"
}
// In the some case, the kintone Rest API will response with detail errors
{
    "message":"{kintone_error_message}",
    "id":"kintone_error_id",
    "code":"{kintone_error_code}",
    "errors": [
        /*errors items here*/
    ]

}
```

</details>

### getAll()

**Parameter **

(none)

**Return**

The result of Promise.Reject()

**Sample code**

<details class="tab-container" open>
<Summary>Get apps with error response</Summary>

** Source code **

```javascript
var appID = {your_invalid_app_id};
kintoneApp.getApp(appID).catch((err) => {
  // This SDK return err with KintoneAPIExeption
  console.log(err.getAll());
});
```

</details>

### throw()

> This function will throw result of [get()](#get) function

**Parameter **

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
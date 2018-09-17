/**
 * kintone api - js client
 */

import * as kintoneBaseJSSDK from 'kintone-basejs-sdk';
/**
 * Connection module
 */
export class Connection extends kintoneBaseJSSDK.Connection {

  /**
     * @param {String} domain
     * @param {KintoneAuth} auth
     * @param {Integer} kintoneGuestSpaceID
     */
  constructor(domain, auth, guestSpaceID) {
    if (auth instanceof kintoneBaseJSSDK.Auth) {
      super(domain, auth, guestSpaceID);
      this.kintoneAuth = auth;
    } else {
      super(domain, new kintoneBaseJSSDK.Auth(), guestSpaceID);
      this.kintoneAuth = undefined;
    }
  }
  /**
     * request to URL
     * @param {String} method
     * @param {String} restAPIName
     * @param {String} body
     * @return {Promise}
     */
  request(methodName, restAPIName, body) {
    if (window && window.kintone && !this.kintoneAuth) {
      // use kintone.api
      return kintone.api(super.getUri(restAPIName), String(methodName).toUpperCase(), body).then((response) => {
        return response;
      }).catch(err => {
        return {
          response: {
            data: err
          }};
      });
    }
    return super.request(methodName, restAPIName, body);
  }
  /**
   * Upload file from local to kintone environment
   * @param {String} fileName
   * @param {Blob} fileBlob
   * @return {Promise}
   */
  upload(fileName, fileBlob) {
    const formData = new FormData();
    if (window.kintone !== undefined) {
      formData.append('__REQUEST_TOKEN__', kintone.getRequestToken());
      this.setHeader('X-Requested-With', 'XMLHttpRequest');
    }
    formData.append('file', fileBlob, fileName);
    return super.requestFile('POST', 'FILE', formData);
  }
}

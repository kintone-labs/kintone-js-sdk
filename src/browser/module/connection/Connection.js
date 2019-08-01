import * as kintoneBaseJSSDK from '../../../base/main';
/**
 * Connection module
 */
export class Connection extends kintoneBaseJSSDK.Connection {

  /**
     * @param {kintoneBaseJSSDK.Auth} auth
     * @param {Integer} guestSpaceID
     */
  constructor(auth, guestSpaceID) {
    if (auth instanceof kintoneBaseJSSDK.Auth) {
      super(window.location.host, auth, guestSpaceID);
      this.kintoneAuth = auth;
    } else {
      super(window.location.host, new kintoneBaseJSSDK.Auth(), guestSpaceID);
      this.kintoneAuth = undefined;
    }
    this.headers = [];
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
        const error = {
          response: {
            data: err
          }
        };
        throw error;
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
      this.setHeader({key: 'X-Requested-With', value: 'XMLHttpRequest'});
    }
    formData.append('file', fileBlob, fileName);
    return super.requestFile('POST', 'FILE', formData);
  }
}

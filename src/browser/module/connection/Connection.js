import axios from 'axios';
import * as kintoneBaseJSSDK from '../../../base/main';

const FILE_RESPONSE_TYPE_KEY = 'responseType';
const FILE_RESPONSE_TYPE_VALUE = 'blob';

/**
 * Connection module
 */
export class Connection extends kintoneBaseJSSDK.Connection {

  /**
     * @param {Object} params
     * @param {kintoneBaseJSSDK.Auth} params.auth
     * @param {Integer} params.guestSpaceID
     */
  constructor({auth, guestSpaceID} = {}) {
    if (auth instanceof kintoneBaseJSSDK.Auth) {
      const domain = window.location.host;
      super({domain, auth, guestSpaceID});
      this.kintoneAuth = auth;
    } else {
      const domain = window.location.host;
      const basicAuth = new kintoneBaseJSSDK.Auth();
      super({domain, auth: basicAuth, guestSpaceID});
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
        const error = {
          response: {
            data: err
          }
        };
        throw error;
      });
    }
    return this._requestByAxious(methodName, restAPIName, body);
  }
  /**
   * send request by axios
   * @param {String} methodName
   * @param {String} restAPIName
   * @param {Object} body
   * @return {Promise}
   */
  _requestByAxious(methodName, restAPIName, body) {
    const requestOptions = this.getRequestOptions(methodName, restAPIName, body);

    const request = axios(requestOptions).then(response => {
      return response.data;
    });
    return request;
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
      this._setLocalHeaders({key: 'X-Requested-With', value: 'XMLHttpRequest'});
    }
    formData.append('file', fileBlob, fileName);
    return this.requestFile('POST', 'FILE', formData);
  }

  /**
   * request to URL
   * @param {String} methodName
   * @param {String} restAPIName
   * @param {String} body
   * @return {Promise}
   */
  requestFile(methodName, restAPIName, body) {
    // Set Header
    const headersRequest = this.getRequestHeader();

    // Set request options
    const requestOptions = Object.assign({}, this.options);
    requestOptions.method = String(methodName).toUpperCase();
    requestOptions.url = this.getURL(restAPIName);
    requestOptions.headers = headersRequest;
    // set data to param if using GET method
    if (requestOptions.method === 'GET') {
      requestOptions.params = body;
      requestOptions[FILE_RESPONSE_TYPE_KEY] = FILE_RESPONSE_TYPE_VALUE;
    } else {
      requestOptions.data = body;
    }
    // Execute request
    const request = axios(requestOptions).then(response => {
      return response.data;
    }).catch(err => {
      return this._handleError(err);
    }).catch(err => {
      throw new kintoneBaseJSSDK.KintoneAPIException(err);
    });
    return request;
  }

  _handleError(error) {
    if (error.request.responseType === 'blob' && error.response.data instanceof Blob) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          error.response.data = JSON.parse(reader.result);
          reject(error);
        };
        reader.onerror = () => {
          reject(error);
        };
        reader.readAsText(error.response.data);
      });
    }
    return Promise.reject(error);
  }
}

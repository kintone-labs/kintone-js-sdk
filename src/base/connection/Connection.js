import axios from 'axios';
import Auth from '../authentication/Auth';
import HTTPHeader from '../model/http/HTTPHeader';
import KintoneAPIException from '../exception/KintoneAPIException';
import packageFile from'../../../package.json';
import CONNECTION_CONST from './constant';
const DEFAULT_PORT = '443';
const FILE_RESPONSE_TYPE_KEY = 'responseType';
const FILE_RESPONSE_TYPE_VALUE = 'blob';
/**
 * Connection module
 */
class Connection {
  /**
   * @param {Object} params
   * @param {String} params.domain
   * @param {Auth} params.auth
   * @param {Number} params.guestSpaceID
   */
  constructor({domain, auth, guestSpaceID} = {}) {
    this.domain = domain;
    this.guestSpaceID = parseInt(guestSpaceID, 10);

    this.headers = [];
    this.options = {};

    this.setAuth(auth);
    this.addRequestOption({key: CONNECTION_CONST.BASE.PROXY, value: false});
    this.USER_AGENT = '';

    this.setHeader(
      {key: CONNECTION_CONST.BASE.USER_AGENT,
        value: CONNECTION_CONST.BASE.USER_AGENT_BASE_VALUE
          .replace('{name}',
            packageFile.name || 'kintone-js-sdk')
          .replace('{version}', packageFile.version || '(none)')
      });
  }

  /**
   * request to URL
   * @param {String} methodName
   * @param {String} restAPIName
   * @param {Object} body
   * @return {Promise}
   */
  request(methodName, restAPIName, body) {
    const method = String(methodName).toUpperCase();
    const uri = this.getUri(restAPIName);
    // Set Header
    const headersRequest = {};
    // set header with credentials
    this.auth.createHeaderCredentials().forEach((httpHeaderObj) => {
      headersRequest[httpHeaderObj.getKey()] = httpHeaderObj.getValue();
    });
    this.headers.forEach((httpHeaderObj) => {
      const headerKey = httpHeaderObj.getKey();
      if (headersRequest.hasOwnProperty(headerKey) && headerKey === CONNECTION_CONST.BASE.USER_AGENT) {
        headersRequest[headerKey] += ' ' + httpHeaderObj.getValue();
      } else {
        headersRequest[headerKey] = httpHeaderObj.getValue();
      }
      this.USER_AGENT = headersRequest[CONNECTION_CONST.BASE.USER_AGENT];
    });
    // Set request options
    const requestOptions = this.copyObject(this.options);
    requestOptions.method = method;
    requestOptions.url = uri;
    // set data to param if using GET method
    if (requestOptions.method === 'GET') {
      requestOptions.params = body;
      delete requestOptions.data;
      if (this.isExceedLimitUri(uri, body)) {
        requestOptions.params = {_method: method};
        requestOptions.method = 'POST';
        headersRequest[CONNECTION_CONST.BASE.X_HTTP_METHOD_OVERRIDE] = method;
        requestOptions.data = body;
      }
      requestOptions.paramsSerializer = this.serializeParams;
    } else {
      requestOptions.data = body;
    }
    requestOptions.headers = headersRequest;
    // Execute request
    const request = axios(requestOptions).then(response => {
      return response.data;
    });
    // reset header
    this.refreshHeader();
    return request;
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
    const headersRequest = {};
    // set header with credentials
    this.auth.createHeaderCredentials().forEach((httpHeaderObj) => {
      headersRequest[httpHeaderObj.getKey()] = httpHeaderObj.getValue();
    });
    this.headers.forEach((httpHeaderObj) => {
      const headerKey = httpHeaderObj.getKey();
      if (headersRequest.hasOwnProperty(headerKey) && headerKey === CONNECTION_CONST.BASE.USER_AGENT) {
        headersRequest[headerKey] += ' ' + httpHeaderObj.getValue();
      } else {
        headersRequest[headerKey] = httpHeaderObj.getValue();
      }
      this.USER_AGENT = headersRequest[CONNECTION_CONST.BASE.USER_AGENT];
    });

    // Set request options
    const requestOptions = this.copyObject(this.options);
    requestOptions.method = String(methodName).toUpperCase();
    requestOptions.url = this.getUri(restAPIName);
    requestOptions.headers = headersRequest;
    // set data to param if using GET method
    if (requestOptions.method === 'GET') {
      requestOptions.params = body;
      requestOptions[FILE_RESPONSE_TYPE_KEY] = FILE_RESPONSE_TYPE_VALUE;
    } else {
      requestOptions.data = body;
    }
    this.axiousInterceptErrRsp();
    // Execute request
    const request = axios(requestOptions).then(response => {
      return response.data;
    }).catch(err => {
      throw new KintoneAPIException(err);
    });
    this.refreshHeader();
    return request;
  }

  copyObject(obj) {
    if (!Object.assign) {
      Object.defineProperty(Object, 'assign', {
        enumerable: false,
        configurable: true,
        writable: true,
        value: function(target) {
          'use strict';
          if (target === undefined || target === null) {
            throw new TypeError('Cannot convert first argument to object');
          }

          const to = Object(target);
          for (let i = 1; i < arguments.length; i++) {
            let nextSource = arguments[i];
            if (nextSource === undefined || nextSource === null) {
              continue;
            }
            nextSource = Object(nextSource);

            const keysArray = Object.keys(Object(nextSource));
            for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
              const nextKey = keysArray[nextIndex];
              const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);
              if (desc !== undefined && desc.enumerable) {
                to[nextKey] = nextSource[nextKey];
              }
            }
          }
          return to;
        }
      });
    }
    return Object.assign({}, obj);
  }

  axiousInterceptErrRsp() {
    axios.interceptors.response.use(
      response => {
        return response;
      },
      error => {
        if (
          error.request.responseType === 'blob' &&
            error.response.data instanceof Blob &&
            error.response.data.type &&
            error.response.data.type.toLowerCase().indexOf('json') !== -1
        ) {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
              error.response.data = JSON.parse(reader.result);
              resolve(Promise.reject(error));
            };
            reader.onerror = () => {
              reject(error);
            };
            reader.readAsText(error.response.data);
          });
        }
        return Promise.reject(error);
      }
    );
  }

  /**
   * Download file from kintone
   * @param {String} body
   * @return {Promise}
   */
  download(body) {
    return this.requestFile('GET', 'FILE', body);
  }

  serializeParams(object) {
    const parseParams = (obj, prefix) => {
      const queryArray = [];
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          let subPrefix = '';
          if (Array.isArray(obj)) {
            subPrefix = prefix ? prefix + '[' + key + ']' : key;
          } else {
            subPrefix = prefix ? prefix + '.' + key : key;
          }
          const value = obj[key];
          if (value !== undefined) {
            queryArray.push(
              (value !== null && typeof value === 'object') ? parseParams(value, subPrefix) : subPrefix + '=' + encodeURIComponent(value)
            );
          }
        }
      }
      return queryArray.join('&');
    };

    return parseParams(object);
  }

  isExceedLimitUri(url, param) {
    let numCharactor = `${url}?`.length;
    numCharactor += this.serializeParams(param).length;
    return numCharactor > CONNECTION_CONST.BASE.LIMIT_REQUEST_URI_CHARACTER;
  }

  /**
   * auto get uri for request
   * @param {String} url - api name or FQDN
   * @return {String}
   */
  getUri(url) {
    let urlFQDN = CONNECTION_CONST.BASE.SCHEMA + '://' + this.domain;
    const apiNameUpperCase = String(url).toUpperCase();
    urlFQDN += ':' + DEFAULT_PORT;
    if (CONNECTION_CONST.PATH.hasOwnProperty(apiNameUpperCase)) {
      urlFQDN += this.getPathURI(apiNameUpperCase);
    } else {
      urlFQDN = (!url.match(/http/)) ? urlFQDN + url : url;
    }
    return urlFQDN;
  }
  /**
   * getPathURI
   * @param {String} apiName
   * @return {String}
   */
  getPathURI(apiName) {
    let pathURI = '';
    if (this.guestSpaceID > 0) {
      pathURI += CONNECTION_CONST.BASE.BASE_GUEST_URL.replace(CONNECTION_CONST.BASE.PREFIX_API_NAME, CONNECTION_CONST.PATH[apiName])
        .replace(CONNECTION_CONST.BASE.PREFIX_GUESTSPACEID, this.guestSpaceID);
    } else {
      pathURI += CONNECTION_CONST.BASE.BASE_URL.replace(CONNECTION_CONST.BASE.PREFIX_API_NAME, CONNECTION_CONST.PATH[apiName]);
    }
    return pathURI;
  }
  /**
   * Add option for request
   * @param {Object} params
   * @param {String} params.key
   * @param {*} params.value refer: https://www.npmjs.com/package/axios
   * @return {this}
   */
  addRequestOption({key, value}) {
    this.options[key] = value;
    return this;
  }
  removeRequestOption(key) {
    delete this.options[key];
    return this;
  }
  /**
   * set header for request
   * @param {Object} params
   * @param {String} params.key
   * @param {String} params.value
   * @return {this}
   */
  setHeader({key, value}) {
    this.headers.push(new HTTPHeader(key, value));
    return this;
  }
  /**
   * set auth for connection
   * @param {Auth} auth
   * @return {this}
   */
  setAuth(auth) {
    if (!(auth instanceof Auth)) {
      throw new Error(`${auth} not an instance of Auth`);
    }
    this.auth = auth;
    return this;
  }

  refreshHeader() {
    const header = [];
    if (this.USER_AGENT) {
      header.push(new HTTPHeader(CONNECTION_CONST.BASE.USER_AGENT, this.USER_AGENT));
    }
    this.headers = header;
  }
}
export default Connection ;

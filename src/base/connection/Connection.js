import Auth from '../authentication/Auth';
import HTTPHeader from '../model/http/HTTPHeader';
import packageFile from '../../../package.json';
import CONNECTION_CONST from './constant';
const DEFAULT_PORT = '443';
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

    this.globalHeaders = [];
    this.localHeaders = [];
    this.options = {};

    this.setAuth(auth);
    this.addRequestOption({key: CONNECTION_CONST.BASE.PROXY, value: false});
  }

  /**
   * Get header request
   * @return {Object}
   */
  getRequestHeader() {
    const headersRequest = {};
    // set header with credentials
    this.auth.createHeaderCredentials().forEach((httpHeaderObj) => {
      headersRequest[httpHeaderObj.getKey()] = httpHeaderObj.getValue();
    });

    const userAgent = CONNECTION_CONST.BASE.USER_AGENT_BASE_VALUE
      .replace('{name}', packageFile.name || 'kintone-js-sdk')
      .replace('{version}', packageFile.version || '(none)');

    const headers = this.globalHeaders.concat(this.localHeaders);
    this.localHeaders = [];
    headers.forEach((httpHeaderObj) => {
      const headerKey = httpHeaderObj.getKey();
      if (headerKey === CONNECTION_CONST.BASE.USER_AGENT) {
        headersRequest[headerKey] = userAgent + ' ' + httpHeaderObj.getValue();
      } else {
        headersRequest[headerKey] = httpHeaderObj.getValue();
      }
    });
    return headersRequest;
  }

  /**
   * Get request options
   * @param {String} methodName
   * @param {String} restAPIName
   * @param {Object} body
   * @return {Object}
   */
  getRequestOptions(methodName, restAPIName, body) {
    const method = String(methodName).toUpperCase();
    const url = this.getURL(restAPIName);
    // Set Header
    const headersRequest = this.getRequestHeader();
    // Set request options
    const requestOptions = Object.assign({}, this.options);
    requestOptions.method = method;
    requestOptions.url = url;
    // set data to param if using GET method
    if (requestOptions.method === 'GET') {
      requestOptions.params = body;
      if (this.isExceedLimitUri(url, body)) {
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
    return requestOptions;
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
  getURL(url) {
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
  /**
   * set header for all request
   * @param {Object} params
   * @param {String} params.key
   * @param {String} params.value
   * @return {this}
   */
  setHeader({key, value}) {
    this.globalHeaders.push(new HTTPHeader(key, value));
    return this;
  }
  /**
   * set header for specify request
   * @param {Object} params
   * @param {String} params.key
   * @param {String} params.value
   * @return {this}
   */
  _setLocalHeaders({key, value}) {
    this.localHeaders.push(new HTTPHeader(key, value));
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
}
export default Connection;

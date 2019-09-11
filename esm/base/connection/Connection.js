function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

import axios from 'axios';
import Auth from '../authentication/Auth';
import HTTPHeader from '../model/http/HTTPHeader';
import KintoneAPIException from '../exception/KintoneAPIException';
import packageFile from '../../../package.json';
import CONNECTION_CONST from './constant';
var DEFAULT_PORT = '443';
var FILE_RESPONSE_TYPE_KEY = 'responseType';
var FILE_RESPONSE_TYPE_VALUE = 'blob';
/**
 * Connection module
 */

var Connection =
/*#__PURE__*/
function () {
  /**
   * @param {Object} params
   * @param {String} params.domain
   * @param {Auth} params.auth
   * @param {Number} params.guestSpaceID
   */
  function Connection() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        domain = _ref.domain,
        auth = _ref.auth,
        guestSpaceID = _ref.guestSpaceID;

    _classCallCheck(this, Connection);

    this.domain = domain;
    this.guestSpaceID = parseInt(guestSpaceID, 10);
    this.headers = [];
    this.options = {};
    this.setAuth(auth);
    this.addRequestOption({
      key: CONNECTION_CONST.BASE.PROXY,
      value: false
    });
    this.USER_AGENT = '';
    this.setHeader({
      key: CONNECTION_CONST.BASE.USER_AGENT,
      value: CONNECTION_CONST.BASE.USER_AGENT_BASE_VALUE.replace('{name}', packageFile.name || 'kintone-js-sdk').replace('{version}', packageFile.version || '(none)')
    });
  }
  /**
   * request to URL
   * @param {String} methodName
   * @param {String} restAPIName
   * @param {Object} body
   * @return {Promise}
   */


  _createClass(Connection, [{
    key: "request",
    value: function request(methodName, restAPIName, body) {
      var _this = this;

      var method = String(methodName).toUpperCase();
      var uri = this.getUri(restAPIName); // Set Header

      var headersRequest = {}; // set header with credentials

      this.auth.createHeaderCredentials().forEach(function (httpHeaderObj) {
        headersRequest[httpHeaderObj.getKey()] = httpHeaderObj.getValue();
      });
      this.headers.forEach(function (httpHeaderObj) {
        var headerKey = httpHeaderObj.getKey();

        if (headersRequest.hasOwnProperty(headerKey) && headerKey === CONNECTION_CONST.BASE.USER_AGENT) {
          headersRequest[headerKey] += ' ' + httpHeaderObj.getValue();
        } else {
          headersRequest[headerKey] = httpHeaderObj.getValue();
        }

        _this.USER_AGENT = headersRequest[CONNECTION_CONST.BASE.USER_AGENT];
      }); // Set request options

      var requestOptions = this.copyObject(this.options);
      requestOptions.method = method;
      requestOptions.url = uri; // set data to param if using GET method

      if (requestOptions.method === 'GET') {
        requestOptions.params = body;
        delete requestOptions.data;

        if (this.isExceedLimitUri(uri, body)) {
          requestOptions.params = {
            _method: method
          };
          requestOptions.method = 'POST';
          headersRequest[CONNECTION_CONST.BASE.X_HTTP_METHOD_OVERRIDE] = method;
          requestOptions.data = body;
        }

        requestOptions.paramsSerializer = this.serializeParams;
      } else {
        requestOptions.data = body;
      }

      requestOptions.headers = headersRequest; // Execute request

      var request = axios(requestOptions).then(function (response) {
        return response.data;
      }); // reset header

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

  }, {
    key: "requestFile",
    value: function requestFile(methodName, restAPIName, body) {
      var _this2 = this;

      // Set Header
      var headersRequest = {}; // set header with credentials

      this.auth.createHeaderCredentials().forEach(function (httpHeaderObj) {
        headersRequest[httpHeaderObj.getKey()] = httpHeaderObj.getValue();
      });
      this.headers.forEach(function (httpHeaderObj) {
        var headerKey = httpHeaderObj.getKey();

        if (headersRequest.hasOwnProperty(headerKey) && headerKey === CONNECTION_CONST.BASE.USER_AGENT) {
          headersRequest[headerKey] += ' ' + httpHeaderObj.getValue();
        } else {
          headersRequest[headerKey] = httpHeaderObj.getValue();
        }

        _this2.USER_AGENT = headersRequest[CONNECTION_CONST.BASE.USER_AGENT];
      }); // Set request options

      var requestOptions = this.copyObject(this.options);
      requestOptions.method = String(methodName).toUpperCase();
      requestOptions.url = this.getUri(restAPIName);
      requestOptions.headers = headersRequest; // set data to param if using GET method

      if (requestOptions.method === 'GET') {
        requestOptions.params = body;
        requestOptions[FILE_RESPONSE_TYPE_KEY] = FILE_RESPONSE_TYPE_VALUE;
      } else {
        requestOptions.data = body;
      }

      this.axiousInterceptErrRsp(); // Execute request

      var request = axios(requestOptions).then(function (response) {
        return response.data;
      }).catch(function (err) {
        throw new KintoneAPIException(err);
      });
      this.refreshHeader();
      return request;
    }
  }, {
    key: "copyObject",
    value: function copyObject(obj) {
      if (!Object.assign) {
        Object.defineProperty(Object, 'assign', {
          enumerable: false,
          configurable: true,
          writable: true,
          value: function value(target) {
            'use strict';

            if (target === undefined || target === null) {
              throw new TypeError('Cannot convert first argument to object');
            }

            var to = Object(target);

            for (var i = 1; i < arguments.length; i++) {
              var nextSource = arguments[i];

              if (nextSource === undefined || nextSource === null) {
                continue;
              }

              nextSource = Object(nextSource);
              var keysArray = Object.keys(Object(nextSource));

              for (var nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex++) {
                var nextKey = keysArray[nextIndex];
                var desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);

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
  }, {
    key: "axiousInterceptErrRsp",
    value: function axiousInterceptErrRsp() {
      axios.interceptors.response.use(function (response) {
        return response;
      }, function (error) {
        if (error.request.responseType === 'blob' && error.response.data instanceof Blob && error.response.data.type && error.response.data.type.toLowerCase().indexOf('json') !== -1) {
          return new Promise(function (resolve, reject) {
            var reader = new FileReader();

            reader.onload = function () {
              error.response.data = JSON.parse(reader.result);
              resolve(Promise.reject(error));
            };

            reader.onerror = function () {
              reject(error);
            };

            reader.readAsText(error.response.data);
          });
        }

        return Promise.reject(error);
      });
    }
    /**
     * Download file from kintone
     * @param {String} body
     * @return {Promise}
     */

  }, {
    key: "download",
    value: function download(body) {
      return this.requestFile('GET', 'FILE', body);
    }
  }, {
    key: "serializeParams",
    value: function serializeParams(object) {
      var parseParams = function parseParams(obj, prefix) {
        var queryArray = [];

        for (var key in obj) {
          if (obj.hasOwnProperty(key)) {
            var subPrefix = '';

            if (Array.isArray(obj)) {
              subPrefix = prefix ? prefix + '[' + key + ']' : key;
            } else {
              subPrefix = prefix ? prefix + '.' + key : key;
            }

            var value = obj[key];

            if (value !== undefined) {
              queryArray.push(value !== null && _typeof(value) === 'object' ? parseParams(value, subPrefix) : subPrefix + '=' + encodeURIComponent(value));
            }
          }
        }

        return queryArray.join('&');
      };

      return parseParams(object);
    }
  }, {
    key: "isExceedLimitUri",
    value: function isExceedLimitUri(url, param) {
      var numCharactor = "".concat(url, "?").length;
      numCharactor += this.serializeParams(param).length;
      return numCharactor > CONNECTION_CONST.BASE.LIMIT_REQUEST_URI_CHARACTER;
    }
    /**
     * auto get uri for request
     * @param {String} url - api name or FQDN
     * @return {String}
     */

  }, {
    key: "getUri",
    value: function getUri(url) {
      var urlFQDN = CONNECTION_CONST.BASE.SCHEMA + '://' + this.domain;
      var apiNameUpperCase = String(url).toUpperCase();
      urlFQDN += ':' + DEFAULT_PORT;

      if (CONNECTION_CONST.PATH.hasOwnProperty(apiNameUpperCase)) {
        urlFQDN += this.getPathURI(apiNameUpperCase);
      } else {
        urlFQDN = !url.match(/http/) ? urlFQDN + url : url;
      }

      return urlFQDN;
    }
    /**
     * getPathURI
     * @param {String} apiName
     * @return {String}
     */

  }, {
    key: "getPathURI",
    value: function getPathURI(apiName) {
      var pathURI = '';

      if (this.guestSpaceID > 0) {
        pathURI += CONNECTION_CONST.BASE.BASE_GUEST_URL.replace(CONNECTION_CONST.BASE.PREFIX_API_NAME, CONNECTION_CONST.PATH[apiName]).replace(CONNECTION_CONST.BASE.PREFIX_GUESTSPACEID, this.guestSpaceID);
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

  }, {
    key: "addRequestOption",
    value: function addRequestOption(_ref2) {
      var key = _ref2.key,
          value = _ref2.value;
      this.options[key] = value;
      return this;
    }
  }, {
    key: "removeRequestOption",
    value: function removeRequestOption(key) {
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

  }, {
    key: "setHeader",
    value: function setHeader(_ref3) {
      var key = _ref3.key,
          value = _ref3.value;
      this.headers.push(new HTTPHeader(key, value));
      return this;
    }
    /**
     * set auth for connection
     * @param {Auth} auth
     * @return {this}
     */

  }, {
    key: "setAuth",
    value: function setAuth(auth) {
      if (!(auth instanceof Auth)) {
        throw new Error("".concat(auth, " not an instance of Auth"));
      }

      this.auth = auth;
      return this;
    }
  }, {
    key: "refreshHeader",
    value: function refreshHeader() {
      var header = [];

      if (this.USER_AGENT) {
        header.push(new HTTPHeader(CONNECTION_CONST.BASE.USER_AGENT, this.USER_AGENT));
      }

      this.headers = header;
    }
  }]);

  return Connection;
}();

export default Connection;
import "core-js/modules/es.array.concat";
import "core-js/modules/es.array.join";
import "core-js/modules/es.function.name";
import "core-js/modules/es.object.assign";
import "core-js/modules/es.parse-int";
import "core-js/modules/es.string.match";
import "core-js/modules/es.string.replace";
import "core-js/modules/web.dom-collections.for-each";
import _typeof from "@babel/runtime/helpers/typeof";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import Auth from '../authentication/Auth';
import HTTPHeader from '../model/http/HTTPHeader';
import packageFile from '../../../package.json';
import CONNECTION_CONST from './constant';
var DEFAULT_PORT = '443';
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
    this.globalHeaders = [];
    this.localHeaders = [];
    this.options = {};
    this.setAuth(auth);
    this.addRequestOption({
      key: CONNECTION_CONST.BASE.PROXY,
      value: false
    });
  }
  /**
   * Get header request
   * @return {Object}
   */


  _createClass(Connection, [{
    key: "getRequestHeader",
    value: function getRequestHeader() {
      var headersRequest = {}; // set header with credentials

      this.auth.createHeaderCredentials().forEach(function (httpHeaderObj) {
        headersRequest[httpHeaderObj.getKey()] = httpHeaderObj.getValue();
      });
      var userAgent = CONNECTION_CONST.BASE.USER_AGENT_BASE_VALUE.replace('{name}', packageFile.name || 'kintone-js-sdk').replace('{version}', packageFile.version || '(none)');
      var headers = this.globalHeaders.concat(this.localHeaders);
      this.localHeaders = [];
      headers.forEach(function (httpHeaderObj) {
        var headerKey = httpHeaderObj.getKey();

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

  }, {
    key: "getRequestOptions",
    value: function getRequestOptions(methodName, restAPIName, body) {
      var method = String(methodName).toUpperCase();
      var url = this.getURL(restAPIName); // Set Header

      var headersRequest = this.getRequestHeader(); // Set request options

      var requestOptions = Object.assign({}, this.options);
      requestOptions.method = method;
      requestOptions.url = url; // set data to param if using GET method

      if (requestOptions.method === 'GET') {
        requestOptions.params = body;

        if (this.isExceedLimitUri(url, body)) {
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

      requestOptions.headers = headersRequest;
      return requestOptions;
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
    key: "getURL",
    value: function getURL(url) {
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
    /**
     * set header for all request
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

  }, {
    key: "_setLocalHeaders",
    value: function _setLocalHeaders(_ref4) {
      var key = _ref4.key,
          value = _ref4.value;
      this.localHeaders.push(new HTTPHeader(key, value));
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
  }]);

  return Connection;
}();

export default Connection;
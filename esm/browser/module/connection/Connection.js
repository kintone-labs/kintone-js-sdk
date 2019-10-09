import "core-js/modules/es.object.assign";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.promise";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _get from "@babel/runtime/helpers/get";
import _inherits from "@babel/runtime/helpers/inherits";
import axios from 'axios';
import * as kintoneBaseJSSDK from '../../../base/main';
var FILE_RESPONSE_TYPE_KEY = 'responseType';
var FILE_RESPONSE_TYPE_VALUE = 'blob';
/**
 * Connection module
 */

export var Connection =
/*#__PURE__*/
function (_kintoneBaseJSSDK$Con) {
  _inherits(Connection, _kintoneBaseJSSDK$Con);

  /**
     * @param {Object} params
     * @param {kintoneBaseJSSDK.Auth} params.auth
     * @param {Integer} params.guestSpaceID
     */
  function Connection() {
    var _this;

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        auth = _ref.auth,
        guestSpaceID = _ref.guestSpaceID;

    _classCallCheck(this, Connection);

    if (auth instanceof kintoneBaseJSSDK.Auth) {
      var domain = window.location.host;
      _this = _possibleConstructorReturn(this, _getPrototypeOf(Connection).call(this, {
        domain: domain,
        auth: auth,
        guestSpaceID: guestSpaceID
      }));
      _this.kintoneAuth = auth;
    } else {
      var _domain = window.location.host;
      var basicAuth = new kintoneBaseJSSDK.Auth();
      _this = _possibleConstructorReturn(this, _getPrototypeOf(Connection).call(this, {
        domain: _domain,
        auth: basicAuth,
        guestSpaceID: guestSpaceID
      }));
      _this.kintoneAuth = undefined;
    }

    return _possibleConstructorReturn(_this);
  }
  /**
     * request to URL
     * @param {String} method
     * @param {String} restAPIName
     * @param {String} body
     * @return {Promise}
     */


  _createClass(Connection, [{
    key: "request",
    value: function request(methodName, restAPIName, body) {
      if (window && window.kintone && !this.kintoneAuth) {
        // use kintone.api
        return kintone.api(_get(_getPrototypeOf(Connection.prototype), "getURL", this).call(this, restAPIName), String(methodName).toUpperCase(), body).then(function (response) {
          return response;
        }).catch(function (err) {
          var error = {
            response: {
              data: err
            }
          };
          throw error;
        });
      }

      return this._requestByAxios(methodName, restAPIName, body);
    }
    /**
     * send request by axios
     * @param {String} methodName
     * @param {String} restAPIName
     * @param {Object} body
     * @return {Promise}
     */

  }, {
    key: "_requestByAxios",
    value: function _requestByAxios(methodName, restAPIName, body) {
      var requestOptions = this.getRequestOptions(methodName, restAPIName, body);
      var request = axios(requestOptions).then(function (response) {
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

  }, {
    key: "upload",
    value: function upload(fileName, fileBlob) {
      var formData = new FormData();

      if (window.kintone !== undefined) {
        formData.append('__REQUEST_TOKEN__', kintone.getRequestToken());

        this._setLocalHeaders({
          key: 'X-Requested-With',
          value: 'XMLHttpRequest'
        });
      }

      formData.append('file', fileBlob, fileName);
      return this.requestFile('POST', 'FILE', formData);
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
      var headersRequest = this.getRequestHeader(); // Set request options

      var requestOptions = Object.assign({}, this.options);
      requestOptions.method = String(methodName).toUpperCase();
      requestOptions.url = this.getURL(restAPIName);
      requestOptions.headers = headersRequest; // set data to param if using GET method

      if (requestOptions.method === 'GET') {
        requestOptions.params = body;
        requestOptions[FILE_RESPONSE_TYPE_KEY] = FILE_RESPONSE_TYPE_VALUE;
      } else {
        requestOptions.data = body;
      } // Execute request


      var request = axios(requestOptions).then(function (response) {
        return response.data;
      }).catch(function (err) {
        return _this2._handleError(err);
      }).catch(function (err) {
        throw new kintoneBaseJSSDK.KintoneAPIException(err);
      });
      return request;
    }
  }, {
    key: "_handleError",
    value: function _handleError(error) {
      if (error.request.responseType === 'blob' && error.response.data instanceof Blob) {
        return new Promise(function (resolve, reject) {
          var reader = new FileReader();

          reader.onload = function () {
            error.response.data = JSON.parse(reader.result);
            reject(error);
          };

          reader.onerror = function () {
            reject(error);
          };

          reader.readAsText(error.response.data);
        });
      }

      return Promise.reject(error);
    }
  }]);

  return Connection;
}(kintoneBaseJSSDK.Connection);
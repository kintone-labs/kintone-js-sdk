"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _main = require("../../base/main");

var _constant = _interopRequireDefault(require("./constant"));

var _https = _interopRequireDefault(require("https"));

var _formData = _interopRequireDefault(require("form-data"));

var _tls = _interopRequireDefault(require("tls"));

var _axios = _interopRequireDefault(require("axios"));

var _tunnel = _interopRequireDefault(require("tunnel"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/* eslint-disable node/no-extraneous-require */
var CONTENT_TYPE_KEY = 'Content-Type';
var FILE_RESPONSE_TYPE_KEY = 'responseType';
var FILE_RESPONSE_TYPE_VALUE = 'arraybuffer';

var Connection =
/*#__PURE__*/
function (_BaseConnection) {
  _inherits(Connection, _BaseConnection);

  /**
     * @param {Object} params
     * @param {String} params.domain
     * @param {Auth} params.auth
     * @param {Number} params.guestSpaceID
     */
  function Connection() {
    var _this;

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        domain = _ref.domain,
        auth = _ref.auth,
        guestSpaceID = _ref.guestSpaceID;

    _classCallCheck(this, Connection);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Connection).call(this, {
      domain: domain,
      auth: auth,
      guestSpaceID: guestSpaceID
    }));

    _this.setClientCert();

    return _this;
  }
  /**
   * Set certificate for request by data
   * @param {String} proxyHost
   * @param {String} proxyPort
   * @return {this}
   */


  _createClass(Connection, [{
    key: "setClientCert",
    value: function setClientCert() {
      if (!this.auth.getClientCertData()) {
        return;
      }

      var httpsAgent = new _https.default.Agent({
        pfx: this.auth.getClientCertData(),
        passphrase: this.auth.getPassWordCert()
      });
      this.addRequestOption({
        key: _constant.default.BASE.HTTPS_AGENT,
        value: httpsAgent
      });
    }
    /**
     * Set http proxy for request
     * @param {Object} params
     * @param {String} params.proxyHost
     * @param {String} params.proxyPort
     * @param {String} params.proxyUsername
     * @param {String} params.proxyPassword
     * @return {this}
     */

  }, {
    key: "setProxy",
    value: function setProxy() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        proxyHost: proxyHost,
        proxyPort: proxyPort
      },
          proxyHost = _ref2.proxyHost,
          proxyPort = _ref2.proxyPort,
          proxyUsername = _ref2.proxyUsername,
          proxyPassword = _ref2.proxyPassword;

      var option = {
        proxy: {
          host: proxyHost,
          port: proxyPort
        }
      };

      if (proxyUsername && proxyPassword) {
        option.proxy.proxyAuth = "".concat(proxyUsername, ":").concat(proxyPassword);
      }

      if (this.auth.getClientCertData()) {
        option.pfx = this.auth.getClientCertData();
        option.passphrase = this.auth.getPassWordCert();
      }

      var httpsAgent = _tunnel.default.httpsOverHttp(option);

      this.addRequestOption({
        key: _constant.default.BASE.HTTPS_AGENT,
        value: httpsAgent
      });
      return this;
    }
    /**
     * Set https proxy for request
     * @param {Object} params
     * @param {String} params.proxyHost
     * @param {String} params.proxyPort
     * @param {String} params.proxyUsername
     * @param {String} params.proxyPassword
     * @return {this}
     */

  }, {
    key: "setHttpsProxy",
    value: function setHttpsProxy() {
      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        proxyHost: proxyHost,
        proxyPort: proxyPort
      },
          proxyHost = _ref3.proxyHost,
          proxyPort = _ref3.proxyPort,
          proxyUsername = _ref3.proxyUsername,
          proxyPassword = _ref3.proxyPassword;

      var option = {
        proxy: {
          host: proxyHost,
          port: proxyPort
        }
      };

      if (proxyUsername && proxyPassword) {
        option.proxy.proxyAuth = "".concat(proxyUsername, ":").concat(proxyPassword);
      }

      if (this.auth.getClientCertData()) {
        option.pfx = this.auth.getClientCertData();
        option.passphrase = this.auth.getPassWordCert();
      }

      var httpsAgent = _tunnel.default.httpsOverHttps(option);

      this.addRequestOption({
        key: _constant.default.BASE.HTTPS_AGENT,
        value: httpsAgent
      });
      return this;
    }
    /**
     * upload file to kintone
     * @param {String} fileName
     * @param {String} fileContent
     * @return {Promise}
     */

  }, {
    key: "upload",
    value: function upload(fileName, fileContent) {
      var formData = new _formData.default();
      formData.append('file', fileContent, fileName);
      this.setHeader({
        key: CONTENT_TYPE_KEY,
        value: formData.getHeaders()['content-type']
      });
      return this.requestFile('POST', 'FILE', formData);
    }
    /**
     * request to URL
     * @param {String} methodName
     * @param {String} restAPIName
     * @param {Object} body
     * @return {Promise}
     */

  }, {
    key: "request",
    value: function request(methodName, restAPIName, body) {
      var _this2 = this;

      var method = String(methodName).toUpperCase();
      var uri = this.getUri(restAPIName); // Set Header

      var headersRequest = {}; // set header with credentials

      this.auth.createHeaderCredentials().forEach(function (httpHeaderObj) {
        headersRequest[httpHeaderObj.getKey()] = httpHeaderObj.getValue();
      });
      this.headers.forEach(function (httpHeaderObj) {
        var headerKey = httpHeaderObj.getKey();

        if (headersRequest.hasOwnProperty(headerKey) && headerKey === _constant.default.BASE.USER_AGENT) {
          headersRequest[headerKey] += ' ' + httpHeaderObj.getValue();
        } else {
          headersRequest[headerKey] = httpHeaderObj.getValue();
        }

        _this2.USER_AGENT = headersRequest[_constant.default.BASE.USER_AGENT];
      }); // Set request options

      var requestOptions = this.copyObject(this.options);
      requestOptions.method = method;
      requestOptions.url = uri;

      if (requestOptions.hasOwnProperty('httpsAgent')) {
        try {
          _tls.default.createSecureContext(requestOptions.httpsAgent.options);
        } catch (err) {
          return Promise.reject(err);
        }
      } // set data to param if using GET method


      if (requestOptions.method === 'GET') {
        requestOptions.params = body;
        delete requestOptions.data;

        if (this.isExceedLimitUri(uri, body)) {
          requestOptions.params = {
            _method: method
          };
          requestOptions.method = 'POST';
          headersRequest[_constant.default.BASE.X_HTTP_METHOD_OVERRIDE] = String(methodName).toUpperCase();
          requestOptions.data = body;
        }

        requestOptions.paramsSerializer = this.serializeParams;
      } else {
        requestOptions.data = body;
      }

      requestOptions.headers = headersRequest; // Execute request

      var request = (0, _axios.default)(requestOptions).then(function (response) {
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
      var _this3 = this;

      // Set Header
      var headersRequest = {}; // set header with credentials

      this.auth.createHeaderCredentials().forEach(function (httpHeaderObj) {
        headersRequest[httpHeaderObj.getKey()] = httpHeaderObj.getValue();
      });
      this.headers.forEach(function (httpHeaderObj) {
        var headerKey = httpHeaderObj.getKey();

        if (headersRequest.hasOwnProperty(headerKey) && headerKey === _constant.default.BASE.USER_AGENT) {
          headersRequest[headerKey] += ' ' + httpHeaderObj.getValue();
        } else {
          headersRequest[headerKey] = httpHeaderObj.getValue();
        }

        _this3.USER_AGENT = headersRequest[_constant.default.BASE.USER_AGENT];
      }); // Set request options

      var requestOptions = this.copyObject(this.options);
      requestOptions.method = String(methodName).toUpperCase();
      requestOptions.url = this.getUri(restAPIName);
      requestOptions.headers = headersRequest;

      if (requestOptions.hasOwnProperty(_constant.default.BASE.HTTPS_AGENT)) {
        try {
          _tls.default.createSecureContext(requestOptions.httpsAgent.options);
        } catch (err) {
          return Promise.reject(new _main.KintoneAPIException(err));
        }
      } // set data to param if using GET method


      if (requestOptions.method === 'GET') {
        requestOptions.params = body;
        requestOptions[FILE_RESPONSE_TYPE_KEY] = FILE_RESPONSE_TYPE_VALUE;
      } else {
        requestOptions.data = body;
      } // Execute request


      var request = (0, _axios.default)(requestOptions).then(function (response) {
        return response.data;
      }).catch(function (err) {
        throw new _main.KintoneAPIException(err);
      });
      this.refreshHeader();
      return request;
    }
  }]);

  return Connection;
}(_main.Connection);

var _default = Connection;
exports.default = _default;
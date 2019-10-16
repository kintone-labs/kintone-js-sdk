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

/* eslint-disable node/no-extraneous-require */
const CONTENT_TYPE_KEY = 'Content-Type';
const FILE_RESPONSE_TYPE_KEY = 'responseType';
const FILE_RESPONSE_TYPE_VALUE = 'arraybuffer';

class Connection extends _main.Connection {
  /**
     * @param {Object} params
     * @param {String} params.domain
     * @param {Auth} params.auth
     * @param {Number} params.guestSpaceID
     */
  constructor({
    domain,
    auth,
    guestSpaceID
  } = {}) {
    super({
      domain,
      auth,
      guestSpaceID
    });
    this.setClientCert();
  }
  /**
   * Set certificate for request by data
   * @param {String} proxyHost
   * @param {String} proxyPort
   * @return {this}
   */


  setClientCert() {
    if (!this.auth.getClientCertData()) {
      return;
    }

    const httpsAgent = new _https.default.Agent({
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


  setProxy({
    proxyHost,
    proxyPort,
    proxyUsername,
    proxyPassword
  } = {
    proxyHost,
    proxyPort
  }) {
    const option = {
      proxy: {
        host: proxyHost,
        port: proxyPort
      }
    };

    if (proxyUsername && proxyPassword) {
      option.proxy.proxyAuth = `${proxyUsername}:${proxyPassword}`;
    }

    if (this.auth.getClientCertData()) {
      option.pfx = this.auth.getClientCertData();
      option.passphrase = this.auth.getPassWordCert();
    }

    const httpsAgent = _tunnel.default.httpsOverHttp(option);

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


  setHttpsProxy({
    proxyHost,
    proxyPort,
    proxyUsername,
    proxyPassword
  } = {
    proxyHost,
    proxyPort
  }) {
    const option = {
      proxy: {
        host: proxyHost,
        port: proxyPort
      }
    };

    if (proxyUsername && proxyPassword) {
      option.proxy.proxyAuth = `${proxyUsername}:${proxyPassword}`;
    }

    if (this.auth.getClientCertData()) {
      option.pfx = this.auth.getClientCertData();
      option.passphrase = this.auth.getPassWordCert();
    }

    const httpsAgent = _tunnel.default.httpsOverHttps(option);

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


  upload(fileName, fileContent) {
    const formData = new _formData.default();
    formData.append('file', fileContent, fileName);

    this._setLocalHeaders({
      key: CONTENT_TYPE_KEY,
      value: formData.getHeaders()['content-type']
    });

    return this.requestFile('POST', 'FILE', formData);
  }
  /**
   * Download file from kintone
   * @param {String} body
   * @return {Promise}
   */


  download(body) {
    return this.requestFile('GET', 'FILE', body);
  }
  /**
   * request to URL
   * @param {String} methodName
   * @param {String} restAPIName
   * @param {Object} body
   * @return {Promise}
   */


  request(methodName, restAPIName, body) {
    const requestOptions = this.getRequestOptions(methodName, restAPIName, body);
    return this._handleSecureContextError(requestOptions).then(() => {
      // Execute request
      return (0, _axios.default)(requestOptions);
    }).then(response => {
      return response.data;
    }).catch(err => {
      throw err;
    });
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
    const headersRequest = this.getRequestHeader(); // Set request options

    const requestOptions = Object.assign({}, this.options);
    requestOptions.method = String(methodName).toUpperCase();
    requestOptions.url = this.getURL(restAPIName);
    requestOptions.headers = headersRequest; // set data to param if using GET method

    if (requestOptions.method === 'GET') {
      requestOptions.params = body;
      requestOptions[FILE_RESPONSE_TYPE_KEY] = FILE_RESPONSE_TYPE_VALUE;
    } else {
      requestOptions.data = body;
    }

    return this._handleSecureContextError(requestOptions).then(() => {
      // Execute request
      return (0, _axios.default)(requestOptions);
    }).then(response => {
      return response.data;
    }).catch(err => {
      throw new _main.KintoneAPIException(err);
    });
  }

  _handleSecureContextError(requestOptions) {
    if (requestOptions.hasOwnProperty(_constant.default.BASE.HTTPS_AGENT)) {
      try {
        _tls.default.createSecureContext(requestOptions.httpsAgent.options);
      } catch (err) {
        return Promise.reject(err);
      }
    }

    return Promise.resolve(true);
  }

}

var _default = Connection;
exports.default = _default;
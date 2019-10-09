"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _main = require("../../base/main");

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Authentication module
 */
class Auth extends _main.Auth {
  constructor(basicAuth, passwordAuth, apiToken) {
    super(basicAuth, passwordAuth, apiToken);
    this.cert = null;
    this.passwordCert = null;
  }
  /**
   * Set certificate for request by data
   * @param {Object} params
   * @param {fileContent} params.cert
   * @param {String} params.password
   * @return {this}
   */


  setClientCert({
    cert,
    password
  }) {
    this.cert = cert;
    this.passwordCert = password;
    return this;
  }
  /**
   * Set certificate for request by path
   * @param {Object} params
   * @param {String} params.filePath
   * @param {String} params.password
   * @return {this}
   */


  setClientCertByPath({
    filePath,
    password
  }) {
    try {
      const fileContent = _fs.default.readFileSync(filePath);

      this.cert = fileContent;
      this.passwordCert = password;
      return this;
    } catch (err) {
      throw new Error(`File path is not valid`);
    }
  }
  /**
   * Get the client certificate data
   * @return {cert}
   */


  getClientCertData() {
    return this.cert;
  }
  /**
   * Get the password of certificate
   * @return {passwordCert}
   */


  getPassWordCert() {
    return this.passwordCert;
  }

}

var _default = Auth;
exports.default = _default;
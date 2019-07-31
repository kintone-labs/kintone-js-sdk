const fs = require('fs');
const BaseAuth = require('../../base/main').Auth;


/**
 * Authentication module
 */
class Auth extends BaseAuth {
  constructor(basicAuth, passwordAuth, apiToken) {
    super(basicAuth, passwordAuth, apiToken);
    this.cert = null;
    this.passwordCert = null;
  }

  /**
   * Set certificate for request by data
   * @param {fileContent} cert
   * @param {String} password
   * @return {this}
   */
  setClientCert(options) {
    this.cert = options.cert;
    this.passwordCert = options.password;
    return this;
  }

  /**
   * Set certificate for request by path
   * @param {String} filePath
   * @param {String} password
   * @return {this}
   */
  setClientCertByPath(options) {
    try {
      const fileContent = fs.readFileSync(options.filePath);
      this.cert = fileContent;
      this.passwordCert = options.password;
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

module.exports = Auth;

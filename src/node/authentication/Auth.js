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
  setClientCert(cert, password) {
    this.cert = cert;
    this.passwordCert = password;
    return this;
  }

  /**
   * Set certificate for request by path
   * @param {String} filePath
   * @param {String} password
   * @return {this}
   */
  setClientCertByPath(filePath, password) {
    try {
      const fileContent = fs.readFileSync(filePath);
      this.cert = fileContent;
      this.passwordCert = password;
      return this;
    } catch (err) {
      throw new Error(`File path is not valid`);
    }
  }

  /**
   * Get the certificate
   * @param {fileContent} cert
   * @param {String} password
   * @return {cert}
   */
  getCert() {
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

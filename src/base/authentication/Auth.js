const AUTH_CONST = require('./constant');
const KintoneCredential = require('../model/authentication/Credential');
const KintoneHTTPHeader = require('../model/http/HTTPHeader');

/**
 * Authentication module
 */
class Auth {
  constructor() {
    this.basicAuth = null;
    this.passwordAuth = null;
    this.apiToken = null;
  }

  /**
     * setBasicAuth
     * @param {Object} params
     * @param {String} params.username
     * @param {String} params.password
     * @return {this}
     */
  setBasicAuth({username, password}) {
    this.basicAuth = new KintoneCredential(username, password);
    return this;
  }

  /**
     * getBasicAuth
     * @return {KintoneCredential}
     */
  getBasicAuth() {
    return this.basicAuth;
  }

  /**
     * setPasswordAuth
     * @param {Object} params
     * @param {String} params.username
     * @param {String} params.password
     * @return {this}
     */
  setPasswordAuth({username, password}) {
    this.passwordAuth = new KintoneCredential(username, password);
    return this;
  }

  /**
     * getPasswordAuth
     * @return {KintoneCredential}
     */
  getPasswordAuth() {
    return this.passwordAuth;
  }

  /**
     * setApiToken
     * @param {Object} params
     * @param {String} params.apiToken
     * @return {this}
     */
  setApiToken({apiToken}) {
    this.apiToken = apiToken;
    return this;
  }

  /**
     * getApiToken
     * @return {String}
     */
  getApiToken() {
    return this.apiToken;
  }
  /**
     * createHeaderCredentials
     * @return {Array<HTTPHeader>}
     */
  createHeaderCredentials() {
    const headerCredentials = [];
    if (this.apiToken) {
      headerCredentials.push(new KintoneHTTPHeader(AUTH_CONST.HEADER_KEY_AUTH_APITOKEN, this.apiToken));
    }
    if (this.basicAuth) {
      headerCredentials.push(
        new KintoneHTTPHeader(
          AUTH_CONST.HEADER_KEY_AUTH_BASIC,
          'Basic ' + (Buffer.from(this.basicAuth.getUsername() + ':' + this.basicAuth.getPassword()).toString('base64'))
        )
      );
    }
    if (this.passwordAuth) {
      headerCredentials.push(
        new KintoneHTTPHeader(
          AUTH_CONST.HEADER_KEY_AUTH_PASSWORD,
          Buffer.from(this.passwordAuth.getUsername() + ':' + this.passwordAuth.getPassword()).toString('base64')
        )
      );
    }
    return headerCredentials;
  }
}

module.exports = Auth;

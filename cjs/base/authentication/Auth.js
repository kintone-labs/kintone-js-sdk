"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _constant = _interopRequireDefault(require("./constant"));

var _Credential = _interopRequireDefault(require("../model/authentication/Credential"));

var _HTTPHeader = _interopRequireDefault(require("../model/http/HTTPHeader"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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


  setBasicAuth({
    username,
    password
  }) {
    this.basicAuth = new _Credential.default(username, password);
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


  setPasswordAuth({
    username,
    password
  }) {
    this.passwordAuth = new _Credential.default(username, password);
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


  setApiToken({
    apiToken
  }) {
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
      headerCredentials.push(new _HTTPHeader.default(_constant.default.HEADER_KEY_AUTH_APITOKEN, this.apiToken));
    }

    if (this.basicAuth) {
      headerCredentials.push(new _HTTPHeader.default(_constant.default.HEADER_KEY_AUTH_BASIC, 'Basic ' + Buffer.from(this.basicAuth.getUsername() + ':' + this.basicAuth.getPassword()).toString('base64')));
    }

    if (this.passwordAuth) {
      headerCredentials.push(new _HTTPHeader.default(_constant.default.HEADER_KEY_AUTH_PASSWORD, Buffer.from(this.passwordAuth.getUsername() + ':' + this.passwordAuth.getPassword()).toString('base64')));
    }

    return headerCredentials;
  }

}

var _default = Auth;
exports.default = _default;
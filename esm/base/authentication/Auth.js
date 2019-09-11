function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

import AUTH_CONST from './constant';
import KintoneCredential from '../model/authentication/Credential';
import KintoneHTTPHeader from '../model/http/HTTPHeader';
/**
 * Authentication module
 */

var Auth =
/*#__PURE__*/
function () {
  function Auth() {
    _classCallCheck(this, Auth);

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


  _createClass(Auth, [{
    key: "setBasicAuth",
    value: function setBasicAuth(_ref) {
      var username = _ref.username,
          password = _ref.password;
      this.basicAuth = new KintoneCredential(username, password);
      return this;
    }
    /**
       * getBasicAuth
       * @return {KintoneCredential}
       */

  }, {
    key: "getBasicAuth",
    value: function getBasicAuth() {
      return this.basicAuth;
    }
    /**
       * setPasswordAuth
       * @param {Object} params
       * @param {String} params.username
       * @param {String} params.password
       * @return {this}
       */

  }, {
    key: "setPasswordAuth",
    value: function setPasswordAuth(_ref2) {
      var username = _ref2.username,
          password = _ref2.password;
      this.passwordAuth = new KintoneCredential(username, password);
      return this;
    }
    /**
       * getPasswordAuth
       * @return {KintoneCredential}
       */

  }, {
    key: "getPasswordAuth",
    value: function getPasswordAuth() {
      return this.passwordAuth;
    }
    /**
       * setApiToken
       * @param {Object} params
       * @param {String} params.apiToken
       * @return {this}
       */

  }, {
    key: "setApiToken",
    value: function setApiToken(_ref3) {
      var apiToken = _ref3.apiToken;
      this.apiToken = apiToken;
      return this;
    }
    /**
       * getApiToken
       * @return {String}
       */

  }, {
    key: "getApiToken",
    value: function getApiToken() {
      return this.apiToken;
    }
    /**
       * createHeaderCredentials
       * @return {Array<HTTPHeader>}
       */

  }, {
    key: "createHeaderCredentials",
    value: function createHeaderCredentials() {
      var headerCredentials = [];

      if (this.apiToken) {
        headerCredentials.push(new KintoneHTTPHeader(AUTH_CONST.HEADER_KEY_AUTH_APITOKEN, this.apiToken));
      }

      if (this.basicAuth) {
        headerCredentials.push(new KintoneHTTPHeader(AUTH_CONST.HEADER_KEY_AUTH_BASIC, 'Basic ' + Buffer.from(this.basicAuth.getUsername() + ':' + this.basicAuth.getPassword()).toString('base64')));
      }

      if (this.passwordAuth) {
        headerCredentials.push(new KintoneHTTPHeader(AUTH_CONST.HEADER_KEY_AUTH_PASSWORD, Buffer.from(this.passwordAuth.getUsername() + ':' + this.passwordAuth.getPassword()).toString('base64')));
      }

      return headerCredentials;
    }
  }]);

  return Auth;
}();

export default Auth;
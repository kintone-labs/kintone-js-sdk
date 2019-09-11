"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * Credential model
 */
var Credential =
/*#__PURE__*/
function () {
  /**
     * @param {String} username
     * @param {String} password
     */
  function Credential(username, password) {
    _classCallCheck(this, Credential);

    this.username = username;
    this.password = password;
  }
  /**
     * Get username of Credential model
     * @return {String}
     */


  _createClass(Credential, [{
    key: "getUsername",
    value: function getUsername() {
      return this.username;
    }
    /**
       * Get password of Credential model
       * @return {String}
       */

  }, {
    key: "getPassword",
    value: function getPassword() {
      return this.password;
    }
  }]);

  return Credential;
}();

var _default = Credential;
exports.default = _default;
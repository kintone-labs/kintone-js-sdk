"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _main = require("../../base/main");

var _fs = _interopRequireDefault(require("fs"));

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

/**
 * Authentication module
 */
var Auth =
/*#__PURE__*/
function (_BaseAuth) {
  _inherits(Auth, _BaseAuth);

  function Auth(basicAuth, passwordAuth, apiToken) {
    var _this;

    _classCallCheck(this, Auth);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Auth).call(this, basicAuth, passwordAuth, apiToken));
    _this.cert = null;
    _this.passwordCert = null;
    return _this;
  }
  /**
   * Set certificate for request by data
   * @param {Object} params
   * @param {fileContent} params.cert
   * @param {String} params.password
   * @return {this}
   */


  _createClass(Auth, [{
    key: "setClientCert",
    value: function setClientCert(_ref) {
      var cert = _ref.cert,
          password = _ref.password;
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

  }, {
    key: "setClientCertByPath",
    value: function setClientCertByPath(_ref2) {
      var filePath = _ref2.filePath,
          password = _ref2.password;

      try {
        var fileContent = _fs.default.readFileSync(filePath);

        this.cert = fileContent;
        this.passwordCert = password;
        return this;
      } catch (err) {
        throw new Error("File path is not valid");
      }
    }
    /**
     * Get the client certificate data
     * @return {cert}
     */

  }, {
    key: "getClientCertData",
    value: function getClientCertData() {
      return this.cert;
    }
    /**
     * Get the password of certificate
     * @return {passwordCert}
     */

  }, {
    key: "getPassWordCert",
    value: function getPassWordCert() {
      return this.passwordCert;
    }
  }]);

  return Auth;
}(_main.Auth);

var _default = Auth;
exports.default = _default;
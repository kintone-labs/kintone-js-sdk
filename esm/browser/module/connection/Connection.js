function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

import * as kintoneBaseJSSDK from '../../../base/main';
/**
 * Connection module
 */

export var Connection =
/*#__PURE__*/
function (_kintoneBaseJSSDK$Con) {
  _inherits(Connection, _kintoneBaseJSSDK$Con);

  /**
     * @param {Object} params
     * @param {kintoneBaseJSSDK.Auth} params.auth
     * @param {Integer} params.guestSpaceID
     */
  function Connection() {
    var _this;

    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        auth = _ref.auth,
        guestSpaceID = _ref.guestSpaceID;

    _classCallCheck(this, Connection);

    if (auth instanceof kintoneBaseJSSDK.Auth) {
      var domain = window.location.host;
      _this = _possibleConstructorReturn(this, _getPrototypeOf(Connection).call(this, {
        domain: domain,
        auth: auth,
        guestSpaceID: guestSpaceID
      }));
      _this.kintoneAuth = auth;
    } else {
      var _domain = window.location.host;
      var basicAuth = new kintoneBaseJSSDK.Auth();
      _this = _possibleConstructorReturn(this, _getPrototypeOf(Connection).call(this, {
        domain: _domain,
        auth: basicAuth,
        guestSpaceID: guestSpaceID
      }));
      _this.kintoneAuth = undefined;
    }

    _this.headers = [];
    return _possibleConstructorReturn(_this);
  }
  /**
     * request to URL
     * @param {String} method
     * @param {String} restAPIName
     * @param {String} body
     * @return {Promise}
     */


  _createClass(Connection, [{
    key: "request",
    value: function request(methodName, restAPIName, body) {
      if (window && window.kintone && !this.kintoneAuth) {
        // use kintone.api
        return kintone.api(_get(_getPrototypeOf(Connection.prototype), "getUri", this).call(this, restAPIName), String(methodName).toUpperCase(), body).then(function (response) {
          return response;
        }).catch(function (err) {
          var error = {
            response: {
              data: err
            }
          };
          throw error;
        });
      }

      return _get(_getPrototypeOf(Connection.prototype), "request", this).call(this, methodName, restAPIName, body);
    }
    /**
     * Upload file from local to kintone environment
     * @param {String} fileName
     * @param {Blob} fileBlob
     * @return {Promise}
     */

  }, {
    key: "upload",
    value: function upload(fileName, fileBlob) {
      var formData = new FormData();

      if (window.kintone !== undefined) {
        formData.append('__REQUEST_TOKEN__', kintone.getRequestToken());
        this.setHeader({
          key: 'X-Requested-With',
          value: 'XMLHttpRequest'
        });
      }

      formData.append('file', fileBlob, fileName);
      return _get(_getPrototypeOf(Connection.prototype), "requestFile", this).call(this, 'POST', 'FILE', formData);
    }
  }]);

  return Connection;
}(kintoneBaseJSSDK.Connection);
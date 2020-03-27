import "core-js/modules/es.array.concat";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.array-buffer.constructor";
import "core-js/modules/es.object.to-string";
import "core-js/modules/es.reflect.construct";
import "core-js/modules/es.regexp.to-string";
import "core-js/modules/es.typed-array.uint8-array";
import "core-js/modules/es.typed-array.copy-within";
import "core-js/modules/es.typed-array.every";
import "core-js/modules/es.typed-array.fill";
import "core-js/modules/es.typed-array.filter";
import "core-js/modules/es.typed-array.find";
import "core-js/modules/es.typed-array.find-index";
import "core-js/modules/es.typed-array.for-each";
import "core-js/modules/es.typed-array.includes";
import "core-js/modules/es.typed-array.index-of";
import "core-js/modules/es.typed-array.iterator";
import "core-js/modules/es.typed-array.join";
import "core-js/modules/es.typed-array.last-index-of";
import "core-js/modules/es.typed-array.map";
import "core-js/modules/es.typed-array.reduce";
import "core-js/modules/es.typed-array.reduce-right";
import "core-js/modules/es.typed-array.reverse";
import "core-js/modules/es.typed-array.set";
import "core-js/modules/es.typed-array.slice";
import "core-js/modules/es.typed-array.some";
import "core-js/modules/es.typed-array.sort";
import "core-js/modules/es.typed-array.subarray";
import "core-js/modules/es.typed-array.to-locale-string";
import "core-js/modules/es.typed-array.to-string";
import "core-js/modules/web.url.to-json";
import _typeof from "@babel/runtime/helpers/typeof";
import _toConsumableArray from "@babel/runtime/helpers/toConsumableArray";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _assertThisInitialized from "@babel/runtime/helpers/assertThisInitialized";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import _wrapNativeSuper from "@babel/runtime/helpers/wrapNativeSuper";

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import KintoneErrorResponseModel from './ErrorResponse';
/**
 * kintone Exception Module
 */

var KintoneAPIException = /*#__PURE__*/function (_Error) {
  _inherits(KintoneAPIException, _Error);

  var _super = _createSuper(KintoneAPIException);

  /**
   * The constructor of KintoneAPIException functions
   * @param {Error} [errors={}]
   * @param {String} [message='']
   * @param {*} args
   * @memberof KintoneAPIException
   */
  function KintoneAPIException() {
    var _this;

    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
    var errors = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, KintoneAPIException);

    for (var _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      args[_key - 2] = arguments[_key];
    }

    _this = _super.call.apply(_super, [this, message].concat(args));

    if (Error.captureStackTrace) {
      Error.captureStackTrace(_assertThisInitialized(_this), KintoneAPIException);
    }

    var errorResponse;
    _this.originError = errors;

    if (!errors.hasOwnProperty('response') || !errors.response) {
      errorResponse = new KintoneErrorResponseModel(0, null, errors.message, errors);
    } else {
      var dataResponse = errors.response.data;
      var errorToCreate;

      if (Buffer.isBuffer(dataResponse)) {
        errorToCreate = dataResponse.toString();
      } else if (dataResponse instanceof ArrayBuffer) {
        errorToCreate = String.fromCharCode.apply(String, _toConsumableArray(new Uint8Array(dataResponse)));
      } else {
        errorToCreate = dataResponse;
      }

      errorResponse = _this._createErrorResponse(errorToCreate);

      if (!(errorResponse instanceof KintoneErrorResponseModel)) {
        errorResponse = new KintoneErrorResponseModel(0, null, errors.response.statusMessage, errorResponse);
      }
    }

    var statusCode = errors.response ? errors.response.status || 0 : 0;
    _this.httpErrorCode = statusCode;
    _this.errorResponse = errorResponse;
    return _this;
  }
  /**
   * get origin errors
   * @return {Error}
   */


  _createClass(KintoneAPIException, [{
    key: "getOriginError",
    value: function getOriginError() {
      return this.originError;
    }
    /**
     * get ErrorResponse
     * @return {ErrorResponse}
     */

  }, {
    key: "get",
    value: function get() {
      return this.getErrorResponse();
    }
    /**
     * get ErrorResponse
     * @return {ErrorResponse}
     */

  }, {
    key: "getErrorResponse",
    value: function getErrorResponse() {
      return this.errorResponse.toJSON();
    }
    /**
     * get HttpErrorCode
     * @return {Number}
     */

  }, {
    key: "getHttpErrorCode",
    value: function getHttpErrorCode() {
      return this.httpErrorCode;
    }
    /**
     * create ErrorResponse
     * @param {Any} bodyResponse
     * @return {ErrorResponse}
     */

  }, {
    key: "_createErrorResponse",
    value: function _createErrorResponse(bodyResponse) {
      var response = null;

      if (_typeof(bodyResponse) === 'object') {
        response = bodyResponse;
      } else {
        // Validate isJSON
        try {
          response = JSON.parse(bodyResponse);
        } catch (error) {
          response = new KintoneErrorResponseModel(0, null, error.message, error);
        }
      }

      return response && response.id ? new KintoneErrorResponseModel(response.id, response.code, response.message, response.errors) : response;
    }
  }]);

  return KintoneAPIException;
}( /*#__PURE__*/_wrapNativeSuper(Error));

export default KintoneAPIException;
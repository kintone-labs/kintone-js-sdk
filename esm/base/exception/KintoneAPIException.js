function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

import _KintoneAPIExceptionModel from "../model/exception/KintoneAPIException";
import _KintoneErrorResponseModel from "../model/exception/ErrorResponse";
var KintoneErrorResponseModel = _KintoneErrorResponseModel;
var KintoneAPIExceptionModel = _KintoneAPIExceptionModel;
/**
 * kintone Exception Module
 */

var KintoneAPIException =
/*#__PURE__*/
function () {
  /**
     * The constructor ofc  KintoneAPIException functions
     * @param {Error} errors
     */
  function KintoneAPIException(errors) {
    _classCallCheck(this, KintoneAPIException);

    var errorResponse;
    this.errorRaw = errors;

    if (!errors.hasOwnProperty('response') || !errors.response) {
      errorResponse = new KintoneErrorResponseModel(0, null, errors.message, errors);
    } else {
      var dataResponse = errors.response.data;
      errorResponse = this.getErrorResponse(dataResponse);

      if (Buffer.isBuffer(dataResponse)) {
        var stringError = errors.response.data.toString();
        errorResponse = this.getErrorResponse(stringError);
      } else if (dataResponse instanceof ArrayBuffer) {
        var _stringError = String.fromCharCode.apply(String, _toConsumableArray(new Uint8Array(dataResponse)));

        errorResponse = this.getErrorResponse(_stringError);
      }
    }

    if (!(errorResponse instanceof KintoneErrorResponseModel)) {
      errorResponse = new KintoneErrorResponseModel(0, null, errors.response.statusMessage, errorResponse);
    }

    var statusCode = errors.response ? errors.response.statusCode || 0 : 0;
    this.error = new KintoneAPIExceptionModel(statusCode, errorResponse);
  }
  /**
     * get origin errors
     * @return {Error}
     */


  _createClass(KintoneAPIException, [{
    key: "getAll",
    value: function getAll() {
      return this.errorRaw;
    }
    /**
       * Show origin error
       */

  }, {
    key: "throwAll",
    value: function throwAll() {
      throw this.getAll();
    }
    /**
       * Show Error
       * @return {Error}
       */

  }, {
    key: "get",
    value: function get() {
      return this.error.getErrorResponse().toJSON();
    }
    /**
       * Show Error
       */

  }, {
    key: "throw",
    value: function _throw() {
      var errorString = "HttpErrorCode: ".concat(this.error.getHttpErrorCode(), "\nDetails:\n  + ID: ").concat(this.error.getErrorResponse().getID() || '(none)', "\n  + Code: ").concat(this.error.getErrorResponse().getCode() || '(none)', "\n  + Message: ").concat(this.error.getErrorResponse().getMessage() || '(none)', "\n  + Errors:") + JSON.stringify(this.error.getErrorResponse().getErrors() || '(none)');
      throw new Error(errorString);
    }
    /**
       * getErrorResponse
       * @param {String} bodyResponse
       * @return {KintoneErrorResponseModel}
       */

  }, {
    key: "getErrorResponse",
    value: function getErrorResponse(bodyResponse) {
      var response = null;

      if (_typeof(bodyResponse) === 'object') {
        response = bodyResponse;
      } else {
        // Validate isJSON
        try {
          response = JSON.parse(bodyResponse);
        } catch (error) {// console.log(error)
        }
      } // Detect the error response from bulkrequest.
      // if (response !== null && response.hasOwnProperty('results')) {
      //     for (let index = 0; index < response.results.length; index++) {
      //         if (response.results[index].hasOwnProperty('code')) {
      //             response = response.results[index];
      //             break;
      //         }
      //     }
      // }


      return response && response.id ? new KintoneErrorResponseModel(response.id, response.code, response.message, response.errors) : response;
    }
  }]);

  return KintoneAPIException;
}();

export default KintoneAPIException;
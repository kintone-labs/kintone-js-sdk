import "core-js/modules/es.array.concat";
import "core-js/modules/es.array.iterator";
import "core-js/modules/es.array-buffer.constructor";
import "core-js/modules/es.array-buffer.slice";
import "core-js/modules/es.object.to-string";
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
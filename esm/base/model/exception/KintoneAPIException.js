import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";

/**
 * KintoneAPIException model
 */
var KintoneAPIException =
/*#__PURE__*/
function () {
  /**
     * @param {String} httpErrCode
     * @param {ErrorResponse} errorResponse
     */
  function KintoneAPIException(httpErrCode, errorResponse) {
    _classCallCheck(this, KintoneAPIException);

    this.httpErrorCode = httpErrCode;
    this.errorResponse = errorResponse;
  }
  /**
     * @return {string}
     */


  _createClass(KintoneAPIException, [{
    key: "getHttpErrorCode",
    value: function getHttpErrorCode() {
      return this.httpErrorCode;
    }
    /**
       * @return {ErrorResponse}
       */

  }, {
    key: "getErrorResponse",
    value: function getErrorResponse() {
      return this.errorResponse;
    }
  }]);

  return KintoneAPIException;
}();

export default KintoneAPIException;
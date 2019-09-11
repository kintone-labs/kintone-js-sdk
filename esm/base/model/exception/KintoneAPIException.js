function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
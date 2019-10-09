"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * KintoneAPIException model
 */
class KintoneAPIException {
  /**
     * @param {String} httpErrCode
     * @param {ErrorResponse} errorResponse
     */
  constructor(httpErrCode, errorResponse) {
    this.httpErrorCode = httpErrCode;
    this.errorResponse = errorResponse;
  }
  /**
     * @return {string}
     */


  getHttpErrorCode() {
    return this.httpErrorCode;
  }
  /**
     * @return {ErrorResponse}
     */


  getErrorResponse() {
    return this.errorResponse;
  }

}

var _default = KintoneAPIException;
exports.default = _default;
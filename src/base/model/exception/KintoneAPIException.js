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
module.exports = KintoneAPIException;

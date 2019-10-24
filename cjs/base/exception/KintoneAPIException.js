"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ErrorResponse = _interopRequireDefault(require("./ErrorResponse"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * kintone Exception Module
 */
class KintoneAPIException extends Error {
  /**
   * The constructor of KintoneAPIException functions
   * @param {Error} [errors={}]
   * @param {String} [message='']
   * @param {*} args
   * @memberof KintoneAPIException
   */
  constructor(message = '', errors = {}, ...args) {
    super(message, ...args);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, KintoneAPIException);
    }

    let errorResponse;
    this.originError = errors;

    if (!errors.hasOwnProperty('response') || !errors.response) {
      errorResponse = new _ErrorResponse.default(0, null, errors.message, errors);
    } else {
      const dataResponse = errors.response.data;
      let errorToCreate;

      if (Buffer.isBuffer(dataResponse)) {
        errorToCreate = dataResponse.toString();
      } else if (dataResponse instanceof ArrayBuffer) {
        errorToCreate = String.fromCharCode(...new Uint8Array(dataResponse));
      } else {
        errorToCreate = dataResponse;
      }

      errorResponse = this._createErrorResponse(errorToCreate);

      if (!(errorResponse instanceof _ErrorResponse.default)) {
        errorResponse = new _ErrorResponse.default(0, null, errors.response.statusMessage, errorResponse);
      }
    }

    const statusCode = errors.response ? errors.response.status || 0 : 0;
    this.httpErrorCode = statusCode;
    this.errorResponse = errorResponse;
  }
  /**
   * get origin errors
   * @return {Error}
   */


  getOriginError() {
    return this.originError;
  }
  /**
   * get ErrorResponse
   * @return {ErrorResponse}
   */


  get() {
    return this.getErrorResponse();
  }
  /**
   * get ErrorResponse
   * @return {ErrorResponse}
   */


  getErrorResponse() {
    return this.errorResponse.toJSON();
  }
  /**
   * get HttpErrorCode
   * @return {Number}
   */


  getHttpErrorCode() {
    return this.httpErrorCode;
  }
  /**
   * create ErrorResponse
   * @param {Any} bodyResponse
   * @return {ErrorResponse}
   */


  _createErrorResponse(bodyResponse) {
    let response = null;

    if (typeof bodyResponse === 'object') {
      response = bodyResponse;
    } else {
      // Validate isJSON
      try {
        response = JSON.parse(bodyResponse);
      } catch (error) {
        response = new _ErrorResponse.default(0, null, error.message, error);
      }
    }

    return response && response.id ? new _ErrorResponse.default(response.id, response.code, response.message, response.errors) : response;
  }

}

var _default = KintoneAPIException;
exports.default = _default;
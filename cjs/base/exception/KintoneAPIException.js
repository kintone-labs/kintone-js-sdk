"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _KintoneAPIException = _interopRequireDefault(require("../model/exception/KintoneAPIException"));

var _ErrorResponse = _interopRequireDefault(require("../model/exception/ErrorResponse"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const KintoneErrorResponseModel = _ErrorResponse.default;
const KintoneAPIExceptionModel = _KintoneAPIException.default;
/**
 * kintone Exception Module
 */

class KintoneAPIException {
  /**
     * The constructor ofc  KintoneAPIException functions
     * @param {Error} errors
     */
  constructor(errors) {
    let errorResponse;
    this.errorRaw = errors;

    if (!errors.hasOwnProperty('response') || !errors.response) {
      errorResponse = new KintoneErrorResponseModel(0, null, errors.message, errors);
    } else {
      const dataResponse = errors.response.data;
      errorResponse = this.getErrorResponse(dataResponse);

      if (Buffer.isBuffer(dataResponse)) {
        const stringError = errors.response.data.toString();
        errorResponse = this.getErrorResponse(stringError);
      } else if (dataResponse instanceof ArrayBuffer) {
        const stringError = String.fromCharCode(...new Uint8Array(dataResponse));
        errorResponse = this.getErrorResponse(stringError);
      }
    }

    if (!(errorResponse instanceof KintoneErrorResponseModel)) {
      errorResponse = new KintoneErrorResponseModel(0, null, errors.response.statusMessage, errorResponse);
    }

    const statusCode = errors.response ? errors.response.statusCode || 0 : 0;
    this.error = new KintoneAPIExceptionModel(statusCode, errorResponse);
  }
  /**
     * get origin errors
     * @return {Error}
     */


  getAll() {
    return this.errorRaw;
  }
  /**
     * Show origin error
     */


  throwAll() {
    throw this.getAll();
  }
  /**
     * Show Error
     * @return {Error}
     */


  get() {
    return this.error.getErrorResponse().toJSON();
  }
  /**
     * Show Error
     */


  throw() {
    const errorString = `HttpErrorCode: ${this.error.getHttpErrorCode()}
Details:
  + ID: ${this.error.getErrorResponse().getID() || '(none)'}
  + Code: ${this.error.getErrorResponse().getCode() || '(none)'}
  + Message: ${this.error.getErrorResponse().getMessage() || '(none)'}
  + Errors:` + JSON.stringify(this.error.getErrorResponse().getErrors() || '(none)');
    throw new Error(errorString);
  }
  /**
     * getErrorResponse
     * @param {String} bodyResponse
     * @return {KintoneErrorResponseModel}
     */


  getErrorResponse(bodyResponse) {
    let response = null;

    if (typeof bodyResponse === 'object') {
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

}

var _default = KintoneAPIException;
exports.default = _default;
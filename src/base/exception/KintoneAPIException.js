import _KintoneErrorResponseModel from './ErrorResponse';
const KintoneErrorResponseModel = _KintoneErrorResponseModel;
/**
 * kintone Exception Module
 */

class KintoneAPIException extends Error {
  /**
   * The constructor ofc  KintoneAPIException functions
   * @param {Error} [errors=null]
   * @param {string} [message='']
   * @param {*} args
   * @memberof KintoneAPIException
   */
  constructor(errors = null, message = '', ...args) {
    console.log('use new Exception');
    super(message, ...args);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, KintoneAPIException);
    }
    let errorResponse;
    this.errorRaw = errors;
    if (!errors.hasOwnProperty('response') || !errors.response) {
      errorResponse = new KintoneErrorResponseModel(0, null, errors.message, errors);
    } else {
      const dataResponse = errors.response.data;
      errorResponse = this._createErrorResponse(dataResponse);

      if (Buffer.isBuffer(dataResponse)) {
        const stringError = dataResponse.toString();
        errorResponse = this._createErrorResponse(stringError);
      } else if (dataResponse instanceof ArrayBuffer) {
        const stringError = String.fromCharCode(...new Uint8Array(dataResponse));
        errorResponse = this._createErrorResponse(stringError);
      }
      if (!(errorResponse instanceof KintoneErrorResponseModel)) {
        errorResponse = new KintoneErrorResponseModel(0, null, errors.response.statusMessage, errorResponse);
      }
    }
    const statusCode = errors.response ? errors.response.statusCode || 0 : 0;
    this.httpErrorCode = statusCode;
    this.errorResponse = errorResponse;
  }
  /**
   * get origin errors
   * @return {Error}
   */
  getAll() {
    return this.errorRaw;
  }
  /**
   * get ErrorResponse
   * @return {ErrorResponse}
   */
  getErrorResponse() {
    return this.errorResponse;
  }

  /**
   * get HttpErrorCode
   * @return {ErrorResponse}
   */
  getHttpErrorCode() {
    return this.httpErrorCode;
  }
  /**
   * create KintoneErrorResponseModel
   * @param {String} bodyResponse
   * @return {KintoneErrorResponseModel}
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
        // console.log(error)
      }
    }
    return response && response.id ? new KintoneErrorResponseModel(
      response.id,
      response.code,
      response.message,
      response.errors) : response;
  }
}

export default KintoneAPIException;

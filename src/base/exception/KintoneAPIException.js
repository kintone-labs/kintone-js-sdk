import KintoneErrorResponseModel from './ErrorResponse';
/**
 * kintone Exception Module
 */

class KintoneAPIException extends Error {
  /**
   * The constructor of KintoneAPIException functions
   * @param {Error} [errors=null]
   * @param {String} [message='']
   * @param {*} args
   * @memberof KintoneAPIException
   */
  constructor(errors = null, message = '', ...args) {
    super(message, ...args);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, KintoneAPIException);
    }
    let errorResponse;
    this.originError = errors;
    if (!errors.hasOwnProperty('response') || !errors.response) {
      errorResponse = new KintoneErrorResponseModel(0, null, errors.message, errors);
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
        response = new KintoneErrorResponseModel(0, null, error.message, error);
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

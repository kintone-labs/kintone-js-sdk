/**
 * Error response model
 */
class ErrorResponse {
  /**
     * constructor
     * @param {String} id
     * @param {String} code
     * @param {String} message
     * @param {String} errors
     */
  constructor(id, code, message, errors) {
    this.setID(id);
    this.setCode(code);
    this.setMessage(message);
    this.setErrors(errors);
  }

  /**
     * @param {Object} errors
     * @return {this}
     */
  setErrors(errors) {
    this.errors = errors;
    return this;
  }
  /**
     * @return {Object}
     */
  getErrors() {
    return this.errors;
  }
  /**
     * @param {String} message
     * @return {this}
     */
  setMessage(message) {
    this.message = message;
    return this;
  }

  /**
     * @return {String}
     */
  getMessage() {
    return this.message;
  }

  /**
     * @param {String} id
     * @return {this}
     */
  setID(id) {
    this.id = id;
    return this;
  }

  /**
     * @return {String}
     */
  getID() {
    return this.id;
  }

  /**
     * @param {String} code
     * @return {this}
     */
  setCode(code) {
    this.code = code;
    return this;
  }

  /**
     * @return {String}
     */
  getCode() {
    return this.code;
  }
  /**
     * @return {Object}
     */
  toJSON() {
    return {
      id: this.getID(),
      code: this.getCode(),
      message: this.getMessage(),
      errors: this.getErrors() || '{}',
    };
  }
}
module.exports = ErrorResponse;

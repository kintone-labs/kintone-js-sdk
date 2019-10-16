import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";

/**
 * Error response model
 */
var ErrorResponse =
/*#__PURE__*/
function () {
  /**
     * constructor
     * @param {String} id
     * @param {String} code
     * @param {String} message
     * @param {String} errors
     */
  function ErrorResponse(id, code, message, errors) {
    _classCallCheck(this, ErrorResponse);

    this.setID(id);
    this.setCode(code);
    this.setMessage(message);
    this.setErrors(errors);
  }
  /**
     * @param {Object} errors
     * @return {this}
     */


  _createClass(ErrorResponse, [{
    key: "setErrors",
    value: function setErrors(errors) {
      this.errors = errors;
      return this;
    }
    /**
       * @return {Object}
       */

  }, {
    key: "getErrors",
    value: function getErrors() {
      return this.errors;
    }
    /**
       * @param {String} message
       * @return {this}
       */

  }, {
    key: "setMessage",
    value: function setMessage(message) {
      this.message = message;
      return this;
    }
    /**
       * @return {String}
       */

  }, {
    key: "getMessage",
    value: function getMessage() {
      return this.message;
    }
    /**
       * @param {String} id
       * @return {this}
       */

  }, {
    key: "setID",
    value: function setID(id) {
      this.id = id;
      return this;
    }
    /**
       * @return {String}
       */

  }, {
    key: "getID",
    value: function getID() {
      return this.id;
    }
    /**
       * @param {String} code
       * @return {this}
       */

  }, {
    key: "setCode",
    value: function setCode(code) {
      this.code = code;
      return this;
    }
    /**
       * @return {String}
       */

  }, {
    key: "getCode",
    value: function getCode() {
      return this.code;
    }
    /**
       * @return {Object}
       */

  }, {
    key: "toJSON",
    value: function toJSON() {
      return {
        id: this.getID(),
        code: this.getCode(),
        message: this.getMessage(),
        errors: this.getErrors() || '{}'
      };
    }
  }]);

  return ErrorResponse;
}();

export default ErrorResponse;
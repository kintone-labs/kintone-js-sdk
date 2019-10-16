import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";

/**
 * HTTPHeader model
 */
var HTTPHeader =
/*#__PURE__*/
function () {
  /**
     * @param {String} keyInput
     * @param {String} valueInput
     */
  function HTTPHeader(keyInput, valueInput) {
    _classCallCheck(this, HTTPHeader);

    this.key = keyInput;
    this.value = valueInput;
  }
  /**
     * get header key
     * @return {this}
     */


  _createClass(HTTPHeader, [{
    key: "getKey",
    value: function getKey() {
      return this.key;
    }
    /**
       * get header value
       * @return {this}
       */

  }, {
    key: "getValue",
    value: function getValue() {
      return this.value;
    }
  }]);

  return HTTPHeader;
}();

export default HTTPHeader;
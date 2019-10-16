import "core-js/modules/web.url.to-json";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";

/**
 * RecordUpdateKey model
 */
var RecordUpdateKey =
/*#__PURE__*/
function () {
  /**
     * constructor
     * @param {String} field
     * @param {String} value
     */
  function RecordUpdateKey(field, value) {
    _classCallCheck(this, RecordUpdateKey);

    this.field = field;
    this.value = value;
  }
  /**
     * Get JSON struct of this model
     * @return {Object}
     */


  _createClass(RecordUpdateKey, [{
    key: "toJSON",
    value: function toJSON() {
      return {
        field: this.field,
        value: this.value
      };
    }
    /**
       * Convert this model to JSON string
       * @return {String}
       */

  }, {
    key: "toJSONString",
    value: function toJSONString() {
      return JSON.stringify(this.toJSON());
    }
  }]);

  return RecordUpdateKey;
}();

export default RecordUpdateKey;
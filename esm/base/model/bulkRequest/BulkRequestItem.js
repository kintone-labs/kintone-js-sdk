import "core-js/modules/web.url.to-json";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";

/**
 * BulkRequestItem model
 */
var BulkRequestItem =
/*#__PURE__*/
function () {
  /**
     * @param {String} method
     * @param {String} api
     * @param {String} payload
     */
  function BulkRequestItem(method, api, payload) {
    _classCallCheck(this, BulkRequestItem);

    this.method = method;
    this.api = api;
    this.payload = payload.toJSON ? payload.toJSON() : payload;
  }
  /**
     * Get JSON struct of this model
     * @return {JSON}
     */


  _createClass(BulkRequestItem, [{
    key: "toJSON",
    value: function toJSON() {
      return {
        method: this.method,
        api: this.api,
        payload: this.payload
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

  return BulkRequestItem;
}();

export default BulkRequestItem;
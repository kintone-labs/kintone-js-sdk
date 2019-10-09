import "core-js/modules/web.url.to-json";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";

/**
 * BulkRequest model
 */
var BulkRequest =
/*#__PURE__*/
function () {
  /**
     * Constructor BulkRequest
     */
  function BulkRequest() {
    _classCallCheck(this, BulkRequest);

    this.requests = [];
  }
  /**
     * Get username of BulkRequest model
     * @param {BulkRequestItem} bulkRequestItem
     * @return {this}
     */


  _createClass(BulkRequest, [{
    key: "addRequest",
    value: function addRequest(bulkRequestItem) {
      var dataRequest = bulkRequestItem.toJSON ? bulkRequestItem.toJSON() : bulkRequestItem;
      this.requests.push(dataRequest);
      return this;
    }
    /**
       * Get JSON struct of this model
       * @return {JSON}
       */

  }, {
    key: "toJSON",
    value: function toJSON() {
      return {
        requests: this.requests
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

  return BulkRequest;
}();

export default BulkRequest;
import "core-js/modules/web.url.to-json";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";

/**
 * UpdateRecordsRequest model
 */
var UpdateRecordsRequest =
/*#__PURE__*/
function () {
  /**
     * constructor
     * @param {String} appID
     * @param {Array<recordsItem>} recordsItem
     */
  function UpdateRecordsRequest(appID, recordsItem) {
    _classCallCheck(this, UpdateRecordsRequest);

    this.appID = appID;
    this.recordsItem = recordsItem;
  }
  /**
     * Get JSON struct of this model
     * @return {integer}
     */


  _createClass(UpdateRecordsRequest, [{
    key: "toJSON",
    value: function toJSON() {
      var data = {
        records: this.recordsItem || []
      };

      if (this.appID) {
        data.app = this.appID;
      }

      return data;
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

  return UpdateRecordsRequest;
}();

export default UpdateRecordsRequest;
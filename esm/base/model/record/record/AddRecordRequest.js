import "core-js/modules/web.url.to-json";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";

/**
 * AddRecordRequest model
 */
var AddRecordRequest =
/*#__PURE__*/
function () {
  /**
     * constructor for AddRecordRequest
     * @param {integer} appID
     * @param {HashTable<String, FieldValue>} recordHashTableData
     */
  function AddRecordRequest(appID, recordHashTableData) {
    _classCallCheck(this, AddRecordRequest);

    this.app = appID;
    this.record = recordHashTableData;
  }
  /**
     * Get app id
     * @return {integer}
     */


  _createClass(AddRecordRequest, [{
    key: "getAppID",
    value: function getAppID() {
      return this.app;
    }
    /**
       * Get record data
       * @return {HashTable<String, FieldValue>}
       */

  }, {
    key: "getRecordData",
    value: function getRecordData() {
      return this.record;
    }
    /**
       * Get JSON struct of this model
       * @return {JSON}
       */

  }, {
    key: "toJSON",
    value: function toJSON() {
      var data = {
        record: this.getRecordData()
      };

      if (this.getAppID() !== undefined) {
        data.app = this.getAppID();
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

  return AddRecordRequest;
}();

export default AddRecordRequest;
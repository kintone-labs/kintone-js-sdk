import "core-js/modules/web.url.to-json";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";

/**
 * AddRecordsRequest model
 */
var AddRecordsRequest =
/*#__PURE__*/
function () {
  /**
     * @param {Integer} appID
     */
  function AddRecordsRequest(appID) {
    _classCallCheck(this, AddRecordsRequest);

    this.app = appID;
    this.records = [];
  }
  /**
     * @return {Integer} appID
     */


  _createClass(AddRecordsRequest, [{
    key: "getAppID",
    value: function getAppID() {
      return this.app;
    }
    /**
       * Add record item to execute the add multi records function
       * @param {Record} record
       * @return {this} AddRecordsRequest
       */

  }, {
    key: "addRecord",
    value: function addRecord(record) {
      this.records.push(record);
      return this;
    }
    /**
       * @param {Array<Record>} recordsData
       * @return {this} AddRecordsRequest
       */

  }, {
    key: "setRecords",
    value: function setRecords(recordsData) {
      this.records = recordsData;
      return this;
    }
    /**
       * @return {Array<Record>} Records
       */

  }, {
    key: "getRecordsData",
    value: function getRecordsData() {
      return this.records;
    }
    /**
       * Get JSON struct of this model
       * @return {JSON}
       */

  }, {
    key: "toJSON",
    value: function toJSON() {
      var data = {
        records: this.getRecordsData()
      };

      if (this.app !== undefined) {
        data.app = this.app;
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

  return AddRecordsRequest;
}();

export default AddRecordsRequest;
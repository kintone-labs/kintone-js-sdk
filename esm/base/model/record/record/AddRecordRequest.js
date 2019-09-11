function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
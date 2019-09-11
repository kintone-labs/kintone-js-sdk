function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
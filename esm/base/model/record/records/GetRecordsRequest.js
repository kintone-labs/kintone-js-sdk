function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * GetRecordsRequest model
 */
var GetRecordsRequest =
/*#__PURE__*/
function () {
  /**
     * @param {Integer} appID
     * @param {String} query
     * @param {Array<String>} fields
     * @param {Boolean} totalCount
     */
  function GetRecordsRequest(appID, query, fields, totalCount) {
    _classCallCheck(this, GetRecordsRequest);

    this.app = appID;
    this.query = query;
    this.fields = fields;
    this.totalCount = totalCount;
  }
  /**
     * Get JSON struct of this model
     * @return {JSON}
     */


  _createClass(GetRecordsRequest, [{
    key: "toJSON",
    value: function toJSON() {
      return {
        app: this.app,
        query: this.query,
        fields: this.fields,
        totalCount: this.totalCount
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

  return GetRecordsRequest;
}();

export default GetRecordsRequest;
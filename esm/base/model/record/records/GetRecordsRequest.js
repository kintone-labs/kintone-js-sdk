import "core-js/modules/web.url.to-json";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";

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
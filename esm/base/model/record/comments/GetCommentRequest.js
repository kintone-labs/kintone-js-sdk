import "core-js/modules/web.url.to-json";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";

/**
 * GetCommentRequest model
 */
var GetCommentRequest =
/*#__PURE__*/
function () {
  /**
     * constructor
     * @param {Integer} appID
     * @param {Integer} recordID
     * @param {String} order
     * @param {Integer} offset
     * @param {Integer} limit
     */
  function GetCommentRequest(appID, recordID, order, offset, limit) {
    _classCallCheck(this, GetCommentRequest);

    this.appID = appID;
    this.recordID = recordID;
    this.order = order;
    this.offset = offset;
    this.limit = limit;
  }
  /**
     * Get JSON struct of this model
     * @return {integer}
     */


  _createClass(GetCommentRequest, [{
    key: "toJSON",
    value: function toJSON() {
      return {
        app: this.appID,
        record: this.recordID,
        order: this.order,
        offset: this.offset,
        limit: this.limit
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

  return GetCommentRequest;
}();

export default GetCommentRequest;
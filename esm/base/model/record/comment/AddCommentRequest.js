import "core-js/modules/web.url.to-json";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";

/**
 * AddCommentRequest model
 */
var AddCommentRequest =
/*#__PURE__*/
function () {
  /**
     * constructor
     * @param {Integer} appID
     * @param {Integer} recordID
     * @param {String} commentContent
     */
  function AddCommentRequest(appID, recordID, commentContent) {
    _classCallCheck(this, AddCommentRequest);

    this.appID = appID;
    this.recordID = recordID;
    this.commentContent = commentContent;
  }
  /**
     * Get JSON struct of this model
     * @return {integer}
     */


  _createClass(AddCommentRequest, [{
    key: "toJSON",
    value: function toJSON() {
      return {
        app: this.appID,
        record: this.recordID,
        comment: this.commentContent
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

  return AddCommentRequest;
}();

export default AddCommentRequest;
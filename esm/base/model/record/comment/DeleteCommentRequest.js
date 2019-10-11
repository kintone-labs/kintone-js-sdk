import "core-js/modules/web.url.to-json";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";

/**
 * DeleteCommentRequest model
 */
var DeleteCommentRequest =
/*#__PURE__*/
function () {
  /**
     * constructor
     * @param {Integer} appID
     * @param {Integer} recordID
     * @param {Integer} commentID
     */
  function DeleteCommentRequest(appID, recordID, commentID) {
    _classCallCheck(this, DeleteCommentRequest);

    this.appID = appID;
    this.recordID = recordID;
    this.commentID = commentID;
  }
  /**
     * Get JSON struct of this model
     * @return {integer}
     */


  _createClass(DeleteCommentRequest, [{
    key: "toJSON",
    value: function toJSON() {
      return {
        app: this.appID,
        record: this.recordID,
        comment: this.commentID
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

  return DeleteCommentRequest;
}();

export default DeleteCommentRequest;
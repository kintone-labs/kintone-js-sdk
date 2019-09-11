"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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

var _default = DeleteCommentRequest;
exports.default = _default;
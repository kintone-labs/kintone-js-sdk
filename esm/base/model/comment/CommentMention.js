import "core-js/modules/web.url.to-json";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";

/**
 * CommentMention model
 */
var CommentMention =
/*#__PURE__*/
function () {
  /**
     * constructor
     * @param {String} code
     * @param {String} type
     */
  function CommentMention(code, type) {
    _classCallCheck(this, CommentMention);

    this.code = code;
    this.type = type;
  }
  /**
     * Get JSON struct of this model
     * @return {integer}
     */


  _createClass(CommentMention, [{
    key: "toJSON",
    value: function toJSON() {
      return {
        code: this.code,
        type: this.type
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

  return CommentMention;
}();

export default CommentMention;
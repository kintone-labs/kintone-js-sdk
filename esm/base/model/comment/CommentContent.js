import "core-js/modules/web.dom-collections.for-each";
import "core-js/modules/web.url.to-json";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";

/**
 * CommentContent model
 */
var CommentContent =
/*#__PURE__*/
function () {
  /**
     * constructor
     * @param {String} text
     * @param {Array<mentions>} mentions
     */
  function CommentContent(text, mentions) {
    _classCallCheck(this, CommentContent);

    this.text = text;
    this.mentions = mentions;
  }
  /**
     * Get JSON struct of this model
     * @return {integer}
     */


  _createClass(CommentContent, [{
    key: "toJSON",
    value: function toJSON() {
      var data = {
        text: this.text,
        mentions: []
      };
      var mentionsArray = this.mentions;

      if (mentionsArray.length > 0 && mentionsArray[0].toJSON) {
        mentionsArray.forEach(function (mention) {
          data.mentions.push(mention.toJSON());
        });
      } else {
        data.mentions = mentionsArray || [];
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

  return CommentContent;
}();

export default CommentContent;
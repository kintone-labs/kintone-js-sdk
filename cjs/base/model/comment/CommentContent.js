"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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

var _default = CommentContent;
exports.default = _default;
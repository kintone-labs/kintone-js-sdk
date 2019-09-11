"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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

var _default = CommentMention;
exports.default = _default;
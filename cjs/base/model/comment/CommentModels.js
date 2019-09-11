"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _CommentMention = _interopRequireDefault(require("./CommentMention"));

var _CommentContent = _interopRequireDefault(require("./CommentContent"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * kintone api - nodejs client
 * Comment model
 */
var _default = {
  CommentContent: _CommentContent.default,
  CommentMention: _CommentMention.default
};
exports.default = _default;
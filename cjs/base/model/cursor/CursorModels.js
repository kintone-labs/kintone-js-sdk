"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _DeleteCursorRequest = _interopRequireDefault(require("./recordCursor/DeleteCursorRequest"));

var _GetRecordCursorRequest = _interopRequireDefault(require("./recordCursor/GetRecordCursorRequest"));

var _CreateRecordCursorRequest = _interopRequireDefault(require("./recordCursor/CreateRecordCursorRequest"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * kintone api - nodejs client
 * Cursor models
 */
var _default = {
  // TODO: Write unit test
  CreateRecordCursorRequest: _CreateRecordCursorRequest.default,
  GetRecordCursorRequest: _GetRecordCursorRequest.default,
  DeleteRecordCursorRequest: _DeleteCursorRequest.default
};
exports.default = _default;
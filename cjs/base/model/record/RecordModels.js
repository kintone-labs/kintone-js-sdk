"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _AddCommentRequest = _interopRequireDefault(require("./comment/AddCommentRequest"));

var _GetCommentRequest = _interopRequireDefault(require("./comments/GetCommentRequest"));

var _DeleteCommentRequest = _interopRequireDefault(require("./comment/DeleteCommentRequest"));

var _RecordUpdateKey = _interopRequireDefault(require("./record/RecordUpdateKey"));

var _UpdateRecordStatusItem = _interopRequireDefault(require("./record/UpdateRecordStatusItem"));

var _RecordUpdateItem = _interopRequireDefault(require("./record/RecordUpdateItem"));

var _UpdateRecordAssigneesRequest = _interopRequireDefault(require("./record/UpdateRecordAssigneesRequest"));

var _UpdateRecordStatusRequest = _interopRequireDefault(require("./record/UpdateRecordStatusRequest"));

var _DeleteRecordsRequest = _interopRequireDefault(require("./records/DeleteRecordsRequest"));

var _UpdateRecordsRequest = _interopRequireDefault(require("./records/UpdateRecordsRequest"));

var _UpdateRecordRequest = _interopRequireDefault(require("./record/UpdateRecordRequest"));

var _AddRecordsRequest = _interopRequireDefault(require("./records/AddRecordsRequest"));

var _AddRecordRequest = _interopRequireDefault(require("./record/AddRecordRequest"));

var _GetRecordsRequest = _interopRequireDefault(require("./records/GetRecordsRequest"));

var _GetRecordRequest = _interopRequireDefault(require("./record/GetRecordRequest"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * kintone api - nodejs client
 * Record model
 */
// TODO,
var _default = {
  // TODO: Write unit test
  GetRecordRequest: _GetRecordRequest.default,
  // TODO: Write unit test
  GetRecordsRequest: _GetRecordsRequest.default,
  // TODO: Write unit test
  AddRecordRequest: _AddRecordRequest.default,
  // TODO: Write unit test
  AddRecordsRequest: _AddRecordsRequest.default,
  // TODO: Write unit test
  UpdateRecordRequest: _UpdateRecordRequest.default,
  // TODO: Write unit test
  UpdateRecordsRequest: _UpdateRecordsRequest.default,
  // TODO: Write unit test
  DeleteRecordsRequest: _DeleteRecordsRequest.default,
  // TODO: Write unit test
  UpdateRecordStatusRequest: _UpdateRecordStatusRequest.default,
  // TODO: Write unit test
  // TODO: Write unit test
  UpdateRecordAssigneesRequest: _UpdateRecordAssigneesRequest.default,
  // TODO: Write unit test
  RecordUpdateStatusItem: _UpdateRecordStatusItem.default,
  // TODO: Write unit test
  RecordsUpdateItem: _RecordUpdateItem.default,
  // TODO: Write unit test
  RecordsUpdateStatusItem: _UpdateRecordStatusItem.default,
  // TODO: Write unit test
  RecordsUpdateKey: _RecordUpdateKey.default,
  // TODO: Write unit test
  DeleteCommentRequest: _DeleteCommentRequest.default,
  // TODO: Write unit test
  GetCommentsRequest: _GetCommentRequest.default,
  // TODO: Write unit test
  AddCommentRequest: _AddCommentRequest.default
};
exports.default = _default;
/**
 * kintone api - nodejs client
 * Record model
 */

module.exports = {
  // TODO: Write unit test
  GetRecordRequest: require('./record/GetRecordRequest'),
  // TODO: Write unit test
  GetRecordsRequest: require('./records/GetRecordsRequest'),

  // TODO: Write unit test
  AddRecordRequest: require('./record/AddRecordRequest'),
  // TODO: Write unit test
  AddRecordsRequest: require('./records/AddRecordsRequest'),

  // TODO: Write unit test
  UpdateRecordRequest: require('./record/UpdateRecordRequest'),
  // TODO: Write unit test
  UpdateRecordsRequest: require('./records/UpdateRecordsRequest'),

  // TODO: Write unit test
  DeleteRecordsRequest: require('./records/DeleteRecordsRequest'),

  // TODO: Write unit test
  UpdateRecordStatusRequest: require('./record/UpdateRecordStatusRequest'),
  // TODO: Write unit test

  // TODO: Write unit test
  UpdateRecordAssigneesRequest: require('./record/UpdateRecordAssigneesRequest'),

  // TODO: Write unit test
  RecordUpdateStatusItem: require('./record/UpdateRecordStatusItem'),
  // TODO: Write unit test
  RecordsUpdateItem: require('./record/RecordUpdateItem'),
  // TODO: Write unit test
  RecordsUpdateStatusItem: require('./record/UpdateRecordStatusItem'),
  // TODO: Write unit test
  RecordsUpdateKey: require('./record/RecordUpdateKey'),

  // TODO: Write unit test
  DeleteCommentRequest: require('./comment/DeleteCommentRequest'),
  // TODO: Write unit test
  GetCommentsRequest: require('./comments/GetCommentRequest'),
  // TODO: Write unit test
  AddCommentRequest: require('./comment/AddCommentRequest'),
};

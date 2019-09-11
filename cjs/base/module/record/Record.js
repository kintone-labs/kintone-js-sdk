"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Common = _interopRequireDefault(require("../../utils/Common"));

var _RecordCursor = _interopRequireDefault(require("../../module/cursor/RecordCursor"));

var _BulkRequest = _interopRequireDefault(require("../../module/bulkRequest/BulkRequest"));

var _RecordModels = _interopRequireDefault(require("../../model/record/RecordModels"));

var _Connection = _interopRequireDefault(require("../../connection/Connection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* eslint-disable no-async-promise-executor, require-atomic-updates */
var LIMIT_UPDATE_RECORD = 100;
var LIMIT_POST_RECORD = 100;
var LIMIT_DELETE_RECORD = 100;
var NUM_BULK_REQUEST = 20;
var LIMIT_RECORD = 500;
var LIMIT_UPSERT_RECORD = 1500;
var DEFAULT_CURSOR_SIZE = 500;
/**
 * Record module
 */

var Record =
/*#__PURE__*/
function () {
  /**
   * The constructor for Record module
   * @param {Object} params
   * @param {Connection} params.connection
   */
  function Record() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        connection = _ref.connection;

    _classCallCheck(this, Record);

    if (!(connection instanceof _Connection.default)) {
      throw new Error("".concat(connection, " not an instance of Connection"));
    }

    this.connection = connection;
  }
  /**
   * @param {String} method
   * @param {String} url
   * @param {RecordModel} model
   * @return {Promise} Promise
   */


  _createClass(Record, [{
    key: "sendRequest",
    value: function sendRequest(method, url, model) {
      return _Common.default.sendRequest(method, url, model, this.connection);
    }
    /**
     * Get record by specific ID
     * TODO: Parse to response model
     * @param {Object} params
     * @param {Number} params.app
     * @param {Number} params.id
     * @return {Promise} Promise
     */

  }, {
    key: "getRecord",
    value: function getRecord(_ref2) {
      var app = _ref2.app,
          id = _ref2.id;
      var getRecordRequest = new _RecordModels.default.GetRecordRequest(app, id);
      return this.sendRequest('GET', 'record', getRecordRequest);
    }
    /**
     * Get multi record with options
     * TODO: Parse to response model
     * @param {Object} params
     * @param {Number} params.app
     * @param {String} params.query
     * @param {Array<String>} fields
     * @param {Boolean} totalCount
     * @return {Promise} Promise
     */

  }, {
    key: "getRecords",
    value: function getRecords() {
      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          app = _ref3.app,
          query = _ref3.query,
          fields = _ref3.fields,
          totalCount = _ref3.totalCount;

      var getRecordsRequest = new _RecordModels.default.GetRecordsRequest(app, query, fields, totalCount);
      return this.sendRequest('GET', 'records', getRecordsRequest);
    }
  }, {
    key: "getAllRecordsByCursor",
    value: function getAllRecordsByCursor() {
      var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          app = _ref4.app,
          query = _ref4.query,
          fields = _ref4.fields;

      var kintoneRC = new _RecordCursor.default({
        connection: this.connection
      });
      var myCursor;
      return kintoneRC.createCursor({
        app: app,
        fields: fields,
        query: query,
        DEFAULT_CURSOR_SIZE: DEFAULT_CURSOR_SIZE
      }).then(function (creatCursorResponse) {
        myCursor = creatCursorResponse;
        return kintoneRC.getAllRecords({
          id: myCursor.id
        });
      }).then(function (allRecords) {
        if (allRecords.totalCount < myCursor.totalCount) {
          kintoneRC.deleteCursor({
            id: myCursor.id
          });
        }

        return allRecords;
      }).catch(function (err) {
        if (myCursor) {
          kintoneRC.deleteCursor({
            id: myCursor.id
          });
        }

        throw err;
      });
    }
    /**
     * Get multi records more than default limitation number by query
     * TODO: Parse to response model
     * @param {Object} params
     * @param {Number} params.app
     * @param {String} params.query
     * @param {Array<String>} params.fields
     * @param {Boolean} params.totalCount
     * @param {Boolean} params.seek
     * @return {Promise} Promise
     */

  }, {
    key: "getAllRecordsByQuery",
    value: function getAllRecordsByQuery() {
      var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          app = _ref5.app,
          query = _ref5.query,
          fields = _ref5.fields,
          totalCount = _ref5.totalCount,
          _ref5$seek = _ref5.seek,
          seek = _ref5$seek === void 0 ? false : _ref5$seek;

      return this.getAllRecordsByQueryRecursive(app, query, fields, totalCount, null, null, seek);
    }
  }, {
    key: "getAllRecordsByQueryRecursive",
    value: function getAllRecordsByQueryRecursive(app, query, fields, totalCount, lastCount, records, seek) {
      var _this = this;

      var allRecords = records || [];
      var validQuery;
      var nextCountNum;
      var limit = LIMIT_RECORD;

      if (seek) {
        validQuery = this.createValidQueryForSeek(query, lastCount, limit);

        if (fields && fields.length > 0 && fields.indexOf('$id') <= -1) {
          fields.push('$id');
        }
      } else {
        validQuery = this.createValidQueryForOffset(query, lastCount, limit);
      }

      var getRecordsRequest = new _RecordModels.default.GetRecordsRequest(app, validQuery, fields, totalCount);
      return this.sendRequest('GET', 'records', getRecordsRequest).then(function (response) {
        allRecords = allRecords.concat(response.records);

        if (response.records.length < limit) {
          return {
            records: allRecords,
            totalCount: totalCount ? allRecords.length : null
          };
        }

        if (seek) {
          nextCountNum = response.records[limit - 1].$id.value;
        } else {
          nextCountNum = lastCount + limit;
        }

        return _this.getAllRecordsByQueryRecursive(app, query, fields, totalCount, nextCountNum, allRecords, seek);
      });
    }
  }, {
    key: "createValidQueryForOffset",
    value: function createValidQueryForOffset(query, offset, limit) {
      var offsetNum = offset || 0;
      return query ? "".concat(query, " limit ").concat(limit, " offset ").concat(offsetNum) : "limit ".concat(limit, " offset ").concat(offsetNum);
    }
  }, {
    key: "createValidQueryForSeek",
    value: function createValidQueryForSeek(query, lastRecord, limit) {
      var lastRecordId = lastRecord || 0;
      return query ? "$id > ".concat(lastRecordId, " and (").concat(query, ") order by $id asc limit ").concat(limit) : "$id > ".concat(lastRecordId, " order by $id asc limit ").concat(limit);
    }
    /**
     * Add the record
     * @param {Object} params
     * @param {Number} params.app
     * @param {Record} params.record
     * @return {Promise} Promise
     */

  }, {
    key: "addRecord",
    value: function addRecord() {
      var _ref6 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          app = _ref6.app,
          record = _ref6.record;

      var addRecordRequest = new _RecordModels.default.AddRecordRequest(app, record);
      return this.sendRequest('POST', 'record', addRecordRequest);
    }
    /**
     * Add multi records
     * @param {Object} params
     * @param {Number} params.app
     * @param {Array<record>} params.records
     * @return {Promise} Promise
     */

  }, {
    key: "addRecords",
    value: function addRecords() {
      var _ref7 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          app = _ref7.app,
          records = _ref7.records;

      var addRecordsRequest = new _RecordModels.default.AddRecordsRequest(app);
      addRecordsRequest.setRecords(records);
      return this.sendRequest('POST', 'records', addRecordsRequest);
    }
    /**
     * Add multi records
     * @param {Number} app
     * @param {Array<record>} records
     * @param {Number} offset
     * @return {Promise} Promise
     */

  }, {
    key: "addAllRecordsRecursive",
    value: function addAllRecordsRecursive(app) {
      var _this2 = this;

      var records = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
      var offset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var results = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
      var numRecordsPerBulk = NUM_BULK_REQUEST * LIMIT_POST_RECORD;
      var begin = offset || 0;
      var length = records.length || 0;
      var end = length - begin < LIMIT_POST_RECORD ? length : begin + numRecordsPerBulk;
      var recordsPerBulk = records.slice(begin, end);
      var allResults = results || [];
      return this.addBulkRecord(app, recordsPerBulk).then(function (response) {
        allResults = allResults.concat(response.results);
        begin += numRecordsPerBulk;

        if (records.length <= begin) {
          return allResults;
        }

        return _this2.addAllRecordsRecursive(app, records, begin, allResults);
      }).catch(function (errors) {
        if (errors.length <= NUM_BULK_REQUEST) {
          errors = allResults.concat(errors);
        }

        throw errors;
      });
    }
    /**
     * Add all records
     * @param {Object} params
     * @param {Number} params.app
     * @param {Record} params.records
     * @return {Promise} Promise
     */

  }, {
    key: "addAllRecords",
    value: function addAllRecords(_ref8) {
      var app = _ref8.app,
          records = _ref8.records;
      return this.addAllRecordsRecursive(app, records).then(function (response) {
        return {
          results: response
        };
      }).catch(function (errors) {
        if (!Array.isArray(errors)) {
          var emptyArray = [];
          errors = emptyArray.concat(errors);
        }

        var errorsResponse = {
          results: errors
        };
        throw errorsResponse;
      });
    }
  }, {
    key: "addBulkRecord",
    value: function addBulkRecord(app, records) {
      var bulkRequest = new _BulkRequest.default({
        connection: this.connection
      });
      var length = records.length;
      var loopTimes = Math.ceil(length / LIMIT_POST_RECORD);

      for (var index = 0; index < loopTimes; index++) {
        var begin = index * LIMIT_POST_RECORD;
        var end = length - begin < LIMIT_POST_RECORD ? length : begin + LIMIT_POST_RECORD;
        var recordsPerRequest = records.slice(begin, end);
        bulkRequest.addRecords({
          app: app,
          records: recordsPerRequest
        });
      }

      return bulkRequest.execute();
    }
    /**
     * Update the specific record by ID
     * @param {Object} params
     * @param {Number} params.app
     * @param {Number} params.id
     * @param {Record} params.record
     * @param {Number} params.revision
     * @return {Promise} Promise
     */

  }, {
    key: "updateRecordByID",
    value: function updateRecordByID() {
      var _ref9 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          app = _ref9.app,
          id = _ref9.id,
          record = _ref9.record,
          revision = _ref9.revision;

      var updateRecordRequest = new _RecordModels.default.UpdateRecordRequest(app);
      updateRecordRequest.setID(id).setRecord(record).setRevision(revision || 0);
      return this.sendRequest('PUT', 'record', updateRecordRequest);
    }
    /**
     * Update the specific record by updateKey
     * @param {Object} params
     * @param {Number} params.app
     * @param {RecordUpdateKey} params.updateKey
     * @param {Record} params.record
     * @param {Number} params.revision
     * @return {Promise} Promise
     */

  }, {
    key: "updateRecordByUpdateKey",
    value: function updateRecordByUpdateKey(_ref10) {
      var app = _ref10.app,
          updateKey = _ref10.updateKey,
          record = _ref10.record,
          revision = _ref10.revision;
      var fieldKey = updateKey ? updateKey.field : undefined;
      var fieldValue = updateKey ? updateKey.value : undefined;
      var updateRecordRequest = new _RecordModels.default.UpdateRecordRequest(app);
      updateRecordRequest.setUpdateKey(fieldKey, fieldValue).setRecord(record).setRevision(revision || 0);
      return this.sendRequest('PUT', 'record', updateRecordRequest);
    }
    /**
     * create record Item With id, use to update multi Record
     * @param {*} id
     * @param {*} recordData
     * @param {*} revision
     * @return {RecordsUpdateItem}
     */

  }, {
    key: "createRecordItemWithID",
    value: function createRecordItemWithID(id, recordData, revision) {
      return new _RecordModels.default.RecordsUpdateItem().setID(id).setRecord(recordData).setRevision(revision || 0);
    }
    /**
     * create record Item With UpdateKey, use to update multi Record
     * @param {*} updateKey
     * @param {*} recordData
     * @param {*} revision
     * @return {RecordsUpdateItem}
     */

  }, {
    key: "createRecordItemWithUpdateKey",
    value: function createRecordItemWithUpdateKey(updateKey, recordData, revision) {
      return new _RecordModels.default.RecordsUpdateItem().setUpdateKey(updateKey.field, updateKey.value).setRecord(recordData).setRevision(revision || 0);
    }
    /**
     * Update multi records
     * @param {Object} params
     * @param {Number} params.app
     * @param {Array<RecordUpdateItem>} params.records
     * @return {Promise} Promise
     */

  }, {
    key: "updateRecords",
    value: function updateRecords() {
      var _ref11 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          app = _ref11.app,
          records = _ref11.records;

      var updateRecordsRequest = new _RecordModels.default.UpdateRecordsRequest(app, records);
      return this.sendRequest('PUT', 'records', updateRecordsRequest);
    }
    /**
     * Delete multi records
     * @param {Object} params
     * @param {Number} params.app
     * @param {Array<Number>} params.ids
     * @return {Promise} Promise
     */

  }, {
    key: "deleteRecords",
    value: function deleteRecords(_ref12) {
      var app = _ref12.app,
          ids = _ref12.ids;
      var deleteRecordsRequest = new _RecordModels.default.DeleteRecordsRequest(app);
      deleteRecordsRequest.setIDs(ids);
      return this.sendRequest('DELETE', 'records', deleteRecordsRequest);
    }
    /**
       * Delete records at the specific revision
       * @param {Object} params
       * @param {Number} params.app
       * @param {Object} params.idsWithRevision
       * @return {Promise}
       */

  }, {
    key: "deleteRecordsWithRevision",
    value: function deleteRecordsWithRevision() {
      var _ref13 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          app = _ref13.app,
          idsWithRevision = _ref13.idsWithRevision;

      var deleteRecordsRequest = new _RecordModels.default.DeleteRecordsRequest(app);
      deleteRecordsRequest.setIDsWithRevision(idsWithRevision);
      return this.sendRequest('DELETE', 'records', deleteRecordsRequest);
    }
  }, {
    key: "deleteBulkRecord",
    value: function deleteBulkRecord(app, ids) {
      var bulkRequest = new _BulkRequest.default({
        connection: this.connection
      });
      var length = ids.length;
      var loopTimes = Math.ceil(length / LIMIT_DELETE_RECORD);

      for (var index = 0; index < loopTimes; index++) {
        var begin = index * LIMIT_DELETE_RECORD;
        var end = length - begin < LIMIT_DELETE_RECORD ? length : begin + LIMIT_DELETE_RECORD;
        var idsPerRequest = ids.slice(begin, end);
        bulkRequest.deleteRecords({
          app: app,
          ids: idsPerRequest
        });
      }

      return bulkRequest.execute();
    }
  }, {
    key: "deleteAllRecords",
    value: function deleteAllRecords(app, ids) {
      var _this3 = this;

      var offset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
      var results = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];
      var numIdsPerBulk = NUM_BULK_REQUEST * LIMIT_DELETE_RECORD;
      var begin = offset || 0;
      var length = ids.length || 0;
      var end = length - begin < LIMIT_DELETE_RECORD ? length : begin + numIdsPerBulk;
      var idsPerBulk = ids.slice(begin, end);
      var allResults = results || [];
      return this.deleteBulkRecord(app, idsPerBulk).then(function (response) {
        allResults = allResults.concat(response.results);
        begin += numIdsPerBulk;

        if (ids.length <= begin) {
          return allResults;
        }

        return _this3.deleteAllRecords(app, ids, begin, allResults);
      }).catch(function (errors) {
        if (errors.length <= NUM_BULK_REQUEST) {
          errors = allResults.concat(errors);
        }

        throw errors;
      });
    }
    /**
       * deleteAllRecordsByQuery for use with update all records
       * @param {Object} params
       * @param {Number} params.app
       * @param {String} params.query
       * @return {}
    **/

  }, {
    key: "deleteAllRecordsByQuery",
    value: function deleteAllRecordsByQuery() {
      var _this4 = this;

      var _ref14 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          app = _ref14.app,
          query = _ref14.query;

      return this.getAllRecordsByQuery({
        app: app,
        query: query
      }).then(function (resp) {
        var ids = [];
        var records = resp.records;

        if (!records || !records.length) {
          return {};
        }

        for (var i = 0; i < records.length; i++) {
          ids.push(records[i].$id.value);
        }

        return _this4.deleteAllRecords(app, ids).then(function (response) {
          return {
            results: response
          };
        });
      }).catch(function (errors) {
        if (!Array.isArray(errors)) {
          var emptyArray = [];
          errors = emptyArray.concat(errors);
        }

        var errorsResponse = {
          results: errors
        };
        throw errorsResponse;
      });
    }
    /**
       * Update assignees of the specific record
       * @param {Object} params
       * @param {Number} params.app
       * @param {Number} params.id
       * @param {Array<String>} params.assignees
       * @param {Number} params.revision
       * @return {Promise}
       */

  }, {
    key: "updateRecordAssignees",
    value: function updateRecordAssignees() {
      var _ref15 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          app = _ref15.app,
          id = _ref15.id,
          assignees = _ref15.assignees,
          revision = _ref15.revision;

      var updateRecordRequest = new _RecordModels.default.UpdateRecordAssigneesRequest(app, id, assignees, revision);
      return this.sendRequest('PUT', 'RECORD_ASSIGNEES', updateRecordRequest);
    }
    /**
       * Update status of the specific record
       * @param {Object} params
       * @param {Number} params.app
       * @param {Number} params.id
       * @param {String} params.action
       * @param {String} params.assignee
       * @param {Number} params.revision
       * @return {Promise}
       */

  }, {
    key: "updateRecordStatus",
    value: function updateRecordStatus() {
      var _ref16 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          app = _ref16.app,
          id = _ref16.id,
          action = _ref16.action,
          assignee = _ref16.assignee,
          revision = _ref16.revision;

      var updateRecordRequest = new _RecordModels.default.UpdateRecordStatusRequest(app, id, action, assignee, revision);
      return this.sendRequest('PUT', 'RECORD_STATUS', updateRecordRequest);
    }
    /**
       * Update status of the multi records
       * @param {Object} params
       * @param {Number} params.app
       * @param {Array <{RecordStatusUpdate}>} records
       * @return {Promise}
       */

  }, {
    key: "updateRecordsStatus",
    value: function updateRecordsStatus() {
      var _ref17 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          app = _ref17.app,
          records = _ref17.records;

      var updateRecordsRequest = new _RecordModels.default.UpdateRecordsRequest(app, records);
      return this.sendRequest('PUT', 'RECORDS_STATUS', updateRecordsRequest);
    }
  }, {
    key: "updateBulkRecord",
    value: function updateBulkRecord(app, records) {
      var bulkRequest = new _BulkRequest.default({
        connection: this.connection
      });
      var length = records.length;
      var loopTimes = Math.ceil(length / LIMIT_UPDATE_RECORD);

      for (var index = 0; index < loopTimes; index++) {
        var begin = index * LIMIT_UPDATE_RECORD;
        var end = length - begin < LIMIT_UPDATE_RECORD ? length : begin + LIMIT_UPDATE_RECORD;
        var recordsPerRequest = records.slice(begin, end);
        bulkRequest.updateRecords({
          app: app,
          records: recordsPerRequest
        });
      }

      return bulkRequest.execute();
    }
    /**
       * updateAllRecords for use with update all records
       * @param {Object} params
       * @param {Number} params.app
       * @param {Object} params.records
       * @return {UpdateRecordsResponse}
    **/

  }, {
    key: "updateAllRecordsRecursive",
    value: function updateAllRecordsRecursive(app, records, offset, results) {
      var _this5 = this;

      var numRecordsPerBulk = NUM_BULK_REQUEST * LIMIT_UPDATE_RECORD;
      var begin = offset || 0;
      var validRecord = Array.isArray(records) ? records : [];
      var length = validRecord.length;
      var end = length - begin < LIMIT_UPDATE_RECORD ? length : begin + numRecordsPerBulk;
      var recordsPerBulk = validRecord.slice(begin, end);
      var allResults = results || [];
      return this.updateBulkRecord(app, recordsPerBulk).then(function (response) {
        allResults = allResults.concat(response.results);
        begin += numRecordsPerBulk;

        if (length <= begin) {
          return allResults;
        }

        return _this5.updateAllRecordsRecursive(app, validRecord, begin, allResults);
      }).catch(function (err) {
        var error = Array.isArray(err) ? err : [err];

        if (err.length <= NUM_BULK_REQUEST) {
          error = allResults.concat(error);
        }

        throw error;
      });
    }
  }, {
    key: "updateAllRecords",
    value: function updateAllRecords() {
      var _ref18 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          app = _ref18.app,
          records = _ref18.records;

      return this.updateAllRecordsRecursive(app, records).then(function (rsp) {
        return {
          'results': rsp
        };
      }).catch(function (err) {
        var errorsResponse = {
          results: err
        };
        throw errorsResponse;
      });
    }
    /**
     * Upsert record by update-key
     * @param {Object} params
     * @param {Number} params.app
     * @param {Object} params.updateKey
     * @param {Object} params.record
     * @param {Number} params.revision
     * @return {Promise}
     */

  }, {
    key: "upsertRecord",
    value: function upsertRecord() {
      var _this6 = this;

      var _ref19 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          app = _ref19.app,
          updateKey = _ref19.updateKey,
          record = _ref19.record,
          revision = _ref19.revision;

      var getRecordsParam = {
        app: app,
        query: "".concat(updateKey.field, " = \"").concat(updateKey.value, "\""),
        fields: [updateKey.field],
        totalCount: false
      };
      return this.getRecords(getRecordsParam).then(function (resp) {
        if (updateKey.value === '' || resp.records.length < 1) {
          record[updateKey.field] = {
            value: updateKey.value
          };
          return _this6.addRecord({
            app: app,
            record: record
          });
        } else if (resp.records.length === 1) {
          return _this6.updateRecordByUpdateKey({
            app: app,
            updateKey: updateKey,
            record: record,
            revision: revision
          });
        }

        throw new Error("".concat(updateKey.field, " is not unique field"));
      });
    }
    /**
     * Upsert records by update-key
     * @param {Object} params
     * @param {Number} params.app
     * @param {Object} params.recordsWithUpdatekey
     * @return {Promise}
     */

  }, {
    key: "upsertRecords",
    value: function upsertRecords() {
      var _this7 = this;

      var _ref20 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          app = _ref20.app,
          records = _ref20.records;

      var validRecords = Array.isArray(records) ? records : [];

      if (validRecords.length > LIMIT_UPSERT_RECORD) {
        throw new Error("upsertRecords can't handle over ".concat(LIMIT_UPSERT_RECORD, " records."));
      }

      var doesExistSameFieldValue = function doesExistSameFieldValue(allRecords, comparedRecord) {
        if (comparedRecord.updateKey.value === '') {
          // updateKey.value is '' => post
          return false;
        }

        for (var i = 0; i < allRecords.length; i++) {
          if (allRecords[i][comparedRecord.updateKey.field].value === comparedRecord.updateKey.value) {
            // exist => put
            return true;
          }
        } // doesn't exist => post


        return false;
      };

      var executeUpsertBulkRequest = function executeUpsertBulkRequest(recordsForPost, recordsForPut) {
        var bulkRequest = new _BulkRequest.default({
          connection: _this7.connection
        });
        bulkRequest = _this7.makeBulkReq(app, bulkRequest, recordsForPost, 'POST');
        bulkRequest = _this7.makeBulkReq(app, bulkRequest, recordsForPut, 'PUT');
        return bulkRequest.execute();
      };

      return this.getAllRecordsByQuery({
        app: app
      }).then(function (resp) {
        var allRecords = resp.records;
        var recordsForPut = [];
        var recordsForPost = [];

        for (var i = 0; i < validRecords.length; i++) {
          if (doesExistSameFieldValue(allRecords, validRecords[i])) {
            recordsForPut.push(validRecords[i]);
          } else {
            var record = validRecords[i].record;
            record[validRecords[i].updateKey.field] = {
              value: validRecords[i].updateKey.value
            };
            recordsForPost.push(record);
          }
        }

        return executeUpsertBulkRequest(recordsForPost, recordsForPut);
      }).catch(function (errors) {
        var errorsArray = Array.isArray(errors) ? errors : [errors];
        var errorsResponse = {
          results: errorsArray
        };
        throw errorsResponse;
      });
    }
  }, {
    key: "makeBulkReq",
    value: function makeBulkReq(app, bulkRequest, records, method) {
      var recordLimit = 0;

      if (method === 'POST') {
        recordLimit = LIMIT_POST_RECORD;
      } else if (method === 'PUT') {
        recordLimit = LIMIT_UPDATE_RECORD;
      }

      var length = records.length;
      var loopTimes = Math.ceil(length / recordLimit);

      for (var index = 0; index < loopTimes; index++) {
        var begin = index * recordLimit;
        var end = length - begin < recordLimit ? length : begin + recordLimit;
        var recordsPerRequest = records.slice(begin, end);

        if (method === 'POST') {
          bulkRequest.addRecords({
            app: app,
            records: recordsPerRequest
          });
        } else if (method === 'PUT') {
          bulkRequest.updateRecords({
            app: app,
            records: recordsPerRequest
          });
        }
      }

      return bulkRequest;
    }
    /**
       * createRecordStatusItem for use with update multi record status
       * @param {Object} params
       * @param {Number} params.recordIDInput
       * @param {String} params.actionNameInput
       * @param {String} params.assigneeIDInput
       * @param {String} params.revisionIDInput
       * @return {RecordsUpdateStatusItem}
       */

  }, {
    key: "createRecordStatusItem",
    value: function createRecordStatusItem(recordIDInput, actionNameInput, assigneeIDInput, revisionIDInput) {
      return new _RecordModels.default.RecordsUpdateStatusItem(recordIDInput, actionNameInput, assigneeIDInput, revisionIDInput);
    }
    /**
       * Get comments of the specific record
       * @param {Object} params
       * @param {Number} params.app
       * @param {Number} params.record
       * @param {string} params.order  {asc|desc}
       * @param {Number} params.offset
       * @param {Number} params.limit
       * @return {Promise}
       */

  }, {
    key: "getComments",
    value: function getComments(_ref21) {
      var app = _ref21.app,
          record = _ref21.record,
          order = _ref21.order,
          offset = _ref21.offset,
          limit = _ref21.limit;
      var getCommentsRequest = new _RecordModels.default.GetCommentsRequest(app, record, order, offset, limit);
      return this.sendRequest('GET', 'RECORD_COMMENTS', getCommentsRequest);
    }
    /**
       * Add new comment to the specific record
       * @param {Object} params
       * @param {Number} params.app
       * @param {Number} params.record
       * @param {CommentContent} comment
       * @return {Promise}
       */

  }, {
    key: "addComment",
    value: function addComment() {
      var _ref22 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          app = _ref22.app,
          record = _ref22.record,
          comment = _ref22.comment;

      var addCommentRequest = new _RecordModels.default.AddCommentRequest(app, record, comment);
      return this.sendRequest('POST', 'RECORD_COMMENT', addCommentRequest);
    }
    /**
       * Delete a comment
       * @param {Object} params
       * @param {Number} params.app
       * @param {Number} params.record
       * @param {Number} params.comment
       * @return {Promise}
       */

  }, {
    key: "deleteComment",
    value: function deleteComment() {
      var _ref23 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          app = _ref23.app,
          record = _ref23.record,
          comment = _ref23.comment;

      var deleteCommentRequest = new _RecordModels.default.DeleteCommentRequest(app, record, comment);
      return this.sendRequest('DELETE', 'RECORD_COMMENT', deleteCommentRequest);
    }
  }]);

  return Record;
}();

var _default = Record;
exports.default = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _RecordModels = _interopRequireDefault(require("../../model/record/RecordModels"));

var _BulkRequestItem = _interopRequireDefault(require("../../model/bulkRequest/BulkRequestItem"));

var _BulkRequest = _interopRequireDefault(require("../../model/bulkRequest/BulkRequest"));

var _Connection = _interopRequireDefault(require("../../connection/Connection"));

var _KintoneAPIException = _interopRequireDefault(require("../../exception/KintoneAPIException"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * BulkRequest module
 */
var BulkRequest =
/*#__PURE__*/
function () {
  /**
   * Constructor function of BulkRequest
   * @param {Object} params
   * @param {Connection} params.connection
   */
  function BulkRequest() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        connection = _ref.connection;

    _classCallCheck(this, BulkRequest);

    if (!(connection instanceof _Connection.default)) {
      throw new Error("".concat(connection, " not an instance of Connection"));
    }

    this.connection = connection;
    this.bulkRequests = new _BulkRequest.default();
  }
  /**
   * Add the record
   * @param {Object} params
   * @param {Number} params.app
   * @param {Record} params.record
   * @return {this}
   */


  _createClass(BulkRequest, [{
    key: "addRecord",
    value: function addRecord() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          app = _ref2.app,
          record = _ref2.record;

      var addRecordRequest = new _RecordModels.default.AddRecordRequest(app, record);
      var bulkRequestItem = new _BulkRequestItem.default('POST', this.connection.getPathURI('RECORD'), addRecordRequest);
      this.bulkRequests.addRequest(bulkRequestItem);
      return this;
    }
    /**
     * Add multi records
     * @param {Object} params
     * @param {Number} params.app
     * @param {Array<record>} params.records
     * @return {this}
     */

  }, {
    key: "addRecords",
    value: function addRecords() {
      var _ref3 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          app = _ref3.app,
          records = _ref3.records;

      var addRecordsRequest = new _RecordModels.default.AddRecordsRequest(app);
      addRecordsRequest.setRecords(records);
      var bulkRequestItem = new _BulkRequestItem.default('POST', this.connection.getPathURI('RECORDS'), addRecordsRequest);
      this.bulkRequests.addRequest(bulkRequestItem);
      return this;
    }
    /**
     * Update the specific record by ID
     * @param {Object} params
     * @param {Number} params.app
     * @param {Number} params.id
     * @param {Record} params.record
     * @param {Number} params.revision
     * @return {this}
     */

  }, {
    key: "updateRecordByID",
    value: function updateRecordByID() {
      var _ref4 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          app = _ref4.app,
          id = _ref4.id,
          record = _ref4.record,
          revision = _ref4.revision;

      var updateRecordRequest = new _RecordModels.default.UpdateRecordRequest(app);
      updateRecordRequest.setID(id).setRecord(record).setRevision(revision || 0);
      var bulkRequestItem = new _BulkRequestItem.default('PUT', this.connection.getPathURI('RECORD'), updateRecordRequest);
      this.bulkRequests.addRequest(bulkRequestItem);
      return this;
    }
    /**
     * Update the specific record by updateKey
     * @param {Object} params
     * @param {Number} params.app
     * @param {RecordUpdateKey} params.updateKey
     * @param {Record} params.record
     * @param {Number} params.revision
     * @return {this}
     */

  }, {
    key: "updateRecordByUpdateKey",
    value: function updateRecordByUpdateKey() {
      var _ref5 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          app = _ref5.app,
          updateKey = _ref5.updateKey,
          record = _ref5.record,
          revision = _ref5.revision;

      var fieldKey = updateKey ? updateKey.field : undefined;
      var fieldValue = updateKey ? updateKey.value : undefined;
      var updateRecordRequest = new _RecordModels.default.UpdateRecordRequest(app);
      updateRecordRequest.setUpdateKey(fieldKey, fieldValue).setRecord(record).setRevision(revision || 0);
      var bulkRequestItem = new _BulkRequestItem.default('PUT', this.connection.getPathURI('RECORD'), updateRecordRequest);
      this.bulkRequests.addRequest(bulkRequestItem);
      return this;
    }
    /**
     * Update multi records
     * @param {Object} params
     * @param {Number} params.app
     * @param {Array<RecordUpdateItem>} params.records
     * @return {this}
     */

  }, {
    key: "updateRecords",
    value: function updateRecords() {
      var _ref6 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          app = _ref6.app,
          records = _ref6.records;

      var updateRecordsRequest = new _RecordModels.default.UpdateRecordsRequest(app, records);
      var bulkRequestItem = new _BulkRequestItem.default('PUT', this.connection.getPathURI('RECORDS'), updateRecordsRequest);
      this.bulkRequests.addRequest(bulkRequestItem);
      return this;
    }
    /**
     * Delete multi records
     * @param {Object} params
     * @param {Number} params.app
     * @param {Array<Number>} params.ids
     * @return {this}
     */

  }, {
    key: "deleteRecords",
    value: function deleteRecords() {
      var _ref7 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          app = _ref7.app,
          ids = _ref7.ids;

      var deleteRecordsRequest = new _RecordModels.default.DeleteRecordsRequest(app);
      deleteRecordsRequest.setIDs(ids);
      var bulkRequestItem = new _BulkRequestItem.default('DELETE', this.connection.getPathURI('RECORDS'), deleteRecordsRequest);
      this.bulkRequests.addRequest(bulkRequestItem);
      return this;
    }
    /**
     * Delete records at the specific revision
     * @param {Object} params
     * @param {Number} params.app
     * @param {Object} params.idsWithRevision
     * @return {this}
     */

  }, {
    key: "deleteRecordsWithRevision",
    value: function deleteRecordsWithRevision() {
      var _ref8 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          app = _ref8.app,
          idsWithRevision = _ref8.idsWithRevision;

      var deleteRecordsRequest = new _RecordModels.default.DeleteRecordsRequest(app);
      deleteRecordsRequest.setIDsWithRevision(idsWithRevision);
      var bulkRequestItem = new _BulkRequestItem.default('DELETE', this.connection.getPathURI('RECORDS'), deleteRecordsRequest);
      this.bulkRequests.addRequest(bulkRequestItem);
      return this;
    }
    /**
     * Update assignees of the specific record
     * @param {Object} params
     * @param {Number} params.app
     * @param {Number} params.record
     * @param {Array<String>} params.assignees
     * @param {Number} params.revision
     * @return {this}
     */

  }, {
    key: "updateRecordAssignees",
    value: function updateRecordAssignees() {
      var _ref9 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          app = _ref9.app,
          record = _ref9.record,
          assignees = _ref9.assignees,
          revision = _ref9.revision;

      var updateRecordRequest = new _RecordModels.default.UpdateRecordAssigneesRequest(app, record, assignees, revision);
      var bulkRequestItem = new _BulkRequestItem.default('PUT', this.connection.getPathURI('RECORD_ASSIGNEES'), updateRecordRequest);
      this.bulkRequests.addRequest(bulkRequestItem);
      return this;
    }
    /**
     * Update status of the specific record
     * @param {Object} params
     * @param {Number} params.app
     * @param {Number} params.id
     * @param {String} params.action
     * @param {String} params.assignee
     * @param {Number} params.revision
     * @return {this}
     */

  }, {
    key: "updateRecordStatus",
    value: function updateRecordStatus() {
      var _ref10 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          app = _ref10.app,
          id = _ref10.id,
          action = _ref10.action,
          assignee = _ref10.assignee,
          revision = _ref10.revision;

      var updateRecordRequest = new _RecordModels.default.UpdateRecordStatusRequest(app, id, action, assignee, revision);
      var bulkRequestItem = new _BulkRequestItem.default('PUT', this.connection.getPathURI('RECORD_STATUS'), updateRecordRequest);
      this.bulkRequests.addRequest(bulkRequestItem);
      return this;
    }
    /**
     * Update status of the multi records
     * @param {Object} params
     * @param {Number} params.app
     * @param {Array<{RecordStatusUpdate}>} params.records
     * @return {this}
     */

  }, {
    key: "updateRecordsStatus",
    value: function updateRecordsStatus() {
      var _ref11 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          app = _ref11.app,
          records = _ref11.records;

      var updateRecordsRequest = new _RecordModels.default.UpdateRecordsRequest(app, records);
      var bulkRequestItem = new _BulkRequestItem.default('PUT', this.connection.getPathURI('RECORDS_STATUS'), updateRecordsRequest);
      this.bulkRequests.addRequest(bulkRequestItem);
      return this;
    }
    /**
     * Execute the BulkRequest and get data which is returned from kintone.
     * @return {Promise}
     */

  }, {
    key: "execute",
    value: function execute() {
      var _this = this;

      return this.connection.addRequestOption('json', true).request('POST', 'BULK_REQUEST', this.bulkRequests.toJSON()).then(function (result) {
        return result;
      }).catch(function (err) {
        if (!err || !err.response || !err.response.data || err.response.data.code) {
          throw new _KintoneAPIException.default(err);
        }

        var errors = err.response.data.results;
        throw _this.bulkRequestException(errors);
      });
    }
  }, {
    key: "bulkRequestException",
    value: function bulkRequestException(errors) {
      var formatErr = JSON.stringify({
        response: {}
      });
      var formatErrors = [];

      for (var key in errors) {
        if (errors[key].hasOwnProperty('code')) {
          var errObject = JSON.parse(formatErr);
          errObject.response.data = errors[key];
          formatErrors.push(new _KintoneAPIException.default(errObject));
        } else {
          formatErrors.push(errors[key]);
        }
      }

      return formatErrors;
    }
  }]);

  return BulkRequest;
}();

var _default = BulkRequest;
exports.default = _default;
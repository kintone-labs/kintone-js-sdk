const KintoneAPIException = require('../../exception/KintoneAPIException');
const Connection = require('../../connection/Connection');
const BulkRequestModel = require('../../model/bulkRequest/BulkRequest');
const BulkRequestItemModel = require('../../model/bulkRequest/BulkRequestItem');
const RecordModel = require('../../model/record/RecordModels');

/**
 * BulkRequest module
 */
class BulkRequest {
  /**
   * Constructor function of BulkRequest
   * @param {Object} params
   * @param {Connection} params.connection
   */
  constructor({connection} = {}) {
    if (!(connection instanceof Connection)) {
      throw new Error(`${connection} not an instance of Connection`);
    }
    this.connection = connection;
    this.bulkRequests = new BulkRequestModel();
  }

  /**
   * Add the record
   * @param {Object} params
   * @param {Number} params.app
   * @param {Record} params.record
   * @return {this}
   */
  addRecord({app, record} = {}) {
    const addRecordRequest = new RecordModel.AddRecordRequest(app, record);
    const bulkRequestItem = new BulkRequestItemModel('POST', this.connection.getPathURI('RECORD'), addRecordRequest);
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
  addRecords({app, records} = {}) {
    const addRecordsRequest = new RecordModel.AddRecordsRequest(app);
    addRecordsRequest.setRecords(records);

    const bulkRequestItem = new BulkRequestItemModel('POST', this.connection.getPathURI('RECORDS'), addRecordsRequest);
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
  updateRecordByID({app, id, record, revision} = {}) {
    const updateRecordRequest = new RecordModel.UpdateRecordRequest(app);
    updateRecordRequest.setID(id).setRecord(record).setRevision(revision || 0);

    const bulkRequestItem = new BulkRequestItemModel('PUT', this.connection.getPathURI('RECORD'), updateRecordRequest);
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
  updateRecordByUpdateKey({app, updateKey, record, revision} = {}) {
    const fieldKey = updateKey ? updateKey.field : undefined;
    const fieldValue = updateKey ? updateKey.value : undefined;

    const updateRecordRequest = new RecordModel.UpdateRecordRequest(app);
    updateRecordRequest.setUpdateKey(fieldKey, fieldValue).setRecord(record).setRevision(revision || 0);

    const bulkRequestItem = new BulkRequestItemModel('PUT', this.connection.getPathURI('RECORD'), updateRecordRequest);
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
  updateRecords({app, records} = {}) {
    const updateRecordsRequest = new RecordModel.UpdateRecordsRequest(app, records);
    const bulkRequestItem = new BulkRequestItemModel('PUT', this.connection.getPathURI('RECORDS'), updateRecordsRequest);
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
  deleteRecords({app, ids} = {}) {
    const deleteRecordsRequest = new RecordModel.DeleteRecordsRequest(app);
    deleteRecordsRequest.setIDs(ids);

    const bulkRequestItem = new BulkRequestItemModel('DELETE', this.connection.getPathURI('RECORDS'), deleteRecordsRequest);
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
  deleteRecordsWithRevision({app, idsWithRevision} = {}) {
    const deleteRecordsRequest = new RecordModel.DeleteRecordsRequest(app);
    deleteRecordsRequest.setIDsWithRevision(idsWithRevision);

    const bulkRequestItem = new BulkRequestItemModel('DELETE', this.connection.getPathURI('RECORDS'), deleteRecordsRequest);
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
  updateRecordAssignees({app, record, assignees, revision} = {}) {
    const updateRecordRequest = new RecordModel.UpdateRecordAssigneesRequest(app, record, assignees, revision);
    const bulkRequestItem = new BulkRequestItemModel('PUT', this.connection.getPathURI('RECORD_ASSIGNEES'), updateRecordRequest);
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
  updateRecordStatus({app, id, action, assignee, revision} = {}) {
    const updateRecordRequest = new RecordModel.UpdateRecordStatusRequest(app, id, action, assignee, revision);
    const bulkRequestItem = new BulkRequestItemModel('PUT', this.connection.getPathURI('RECORD_STATUS'), updateRecordRequest);
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
  updateRecordsStatus({app, records} = {}) {
    const updateRecordsRequest = new RecordModel.UpdateRecordsRequest(app, records);
    const bulkRequestItem = new BulkRequestItemModel('PUT', this.connection.getPathURI('RECORDS_STATUS'), updateRecordsRequest);
    this.bulkRequests.addRequest(bulkRequestItem);
    return this;
  }

  /**
   * Execute the BulkRequest and get data which is returned from kintone.
   * @return {Promise}
   */
  execute() {
    return this.connection.addRequestOption('json', true)
      .request('POST', 'BULK_REQUEST', this.bulkRequests.toJSON())
      .then((result) => {
        return result;
      })
      .catch((err) => {
        if (!err || !err.response || !err.response.data || err.response.data.code) {
          throw new KintoneAPIException(err);
        }
        const errors = err.response.data.results;
        throw this.bulkRequestException(errors);

      });
  }

  bulkRequestException(errors) {
    const formatErr = JSON.stringify({response: {}});

    const formatErrors = [];
    for (const key in errors) {
      if (errors[key].hasOwnProperty('code')) {
        const errObject = JSON.parse(formatErr);
        errObject.response.data = errors[key];
        formatErrors.push(new KintoneAPIException(errObject));
      } else {
        formatErrors.push(errors[key]);
      }
    }
    return formatErrors;

  }
}
module.exports = BulkRequest;

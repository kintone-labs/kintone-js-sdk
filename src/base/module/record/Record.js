/* eslint-disable no-async-promise-executor, require-atomic-updates */
const Connection = require('../../connection/Connection');
const RecordModel = require('../../model/record/RecordModels');
const BulkRequest = require('../../module/bulkRequest/BulkRequest');
const RecordCursor = require('../../module/cursor/RecordCursor');
const common = require('../../utils/Common');

const LIMIT_UPDATE_RECORD = 100;
const LIMIT_POST_RECORD = 100;
const LIMIT_DELETE_RECORD = 100;
const NUM_BULK_REQUEST = 20;
const LIMIT_RECORD = 500;
const LIMIT_UPSERT_RECORD = 1500;

const DEFAULT_CURSOR_SIZE = 500;

/**
 * Record module
 */
class Record {
  /**
   * The constructor for Record module
   * @param {Object} params
   * @param {Connection} params.connection
   */
  constructor({connection} = {}) {
    if (!(connection instanceof Connection)) {
      throw new Error(`${connection} not an instance of Connection`);
    }
    this.connection = connection;
  }

  /**
   * @param {String} method
   * @param {String} url
   * @param {RecordModel} model
   * @return {Promise} Promise
   */
  sendRequest(method, url, model) {
    return common.sendRequest(method, url, model, this.connection);
  }
  /**
   * Get record by specific ID
   * TODO: Parse to response model
   * @param {Object} params
   * @param {Number} params.app
   * @param {Number} params.id
   * @return {Promise} Promise
   */
  getRecord({app, id}) {
    const getRecordRequest = new RecordModel.GetRecordRequest(app, id);
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
  getRecords({app, query, fields, totalCount} = {}) {
    const getRecordsRequest = new RecordModel.GetRecordsRequest(app, query, fields, totalCount);
    return this.sendRequest('GET', 'records', getRecordsRequest);
  }

  getAllRecordsByCursor({app, query, fields} = {}) {
    const kintoneRC = new RecordCursor({connection: this.connection});
    let myCursor;
    return kintoneRC.createCursor({app, fields, query, DEFAULT_CURSOR_SIZE})
      .then((creatCursorResponse)=>{
        myCursor = creatCursorResponse;
        return kintoneRC.getAllRecords({id: myCursor.id});
      })
      .then((allRecords)=>{
        if (allRecords.totalCount < myCursor.totalCount) {
          kintoneRC.deleteCursor({id: myCursor.id});
        }
        return allRecords;
      })
      .catch((err)=>{
        if (myCursor) {
          kintoneRC.deleteCursor({id: myCursor.id});
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
   * @return {Promise} Promise
   */
  getAllRecordsByQuery({app, query, fields, totalCount} = {}) {
    return this.getAllRecordsByQueryRecursive(app, query, fields, totalCount, null, null);
  }

  getAllRecordsByQueryRecursive(app, query, fields, totalCount, offset, records) {
    let allRecords = records || [];
    const offsetNum = offset || 0;
    const limit = LIMIT_RECORD;
    const validQuery = (query) ? `${query} limit ${limit} offset ${offsetNum}` : `limit ${limit} offset ${offsetNum}`;
    const getRecordsRequest = new RecordModel.GetRecordsRequest(app, validQuery, fields, totalCount);
    return this.sendRequest('GET', 'records', getRecordsRequest).then((response) => {
      allRecords = allRecords.concat(response.records);
      if (response.records.length < limit) {
        return {
          records: allRecords,
          totalCount: totalCount ? allRecords.length : null
        };
      }
      return this.getAllRecordsByQueryRecursive(app, query, fields, totalCount, offsetNum + limit, allRecords);
    });
  }

  /**
   * Add the record
   * @param {Object} params
   * @param {Number} params.app
   * @param {Record} params.record
   * @return {Promise} Promise
   */
  addRecord({app, record} = {}) {
    const addRecordRequest = new RecordModel.AddRecordRequest(app, record);
    return this.sendRequest('POST', 'record', addRecordRequest);
  }

  /**
   * Add multi records
   * @param {Object} params
   * @param {Number} params.app
   * @param {Array<record>} params.records
   * @return {Promise} Promise
   */
  addRecords({app, records} = {}) {
    const addRecordsRequest = new RecordModel.AddRecordsRequest(app);
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
  addAllRecordsRecursive(app, records = [], offset = 0, results = []) {
    const numRecordsPerBulk = NUM_BULK_REQUEST * LIMIT_POST_RECORD;
    let begin = offset || 0;
    const length = records.length || 0;
    const end = (length - begin) < LIMIT_POST_RECORD ? length : begin + numRecordsPerBulk;
    const recordsPerBulk = records.slice(begin, end);
    let allResults = results || [];
    return this.addBulkRecord(app, recordsPerBulk).then((response) => {
      allResults = allResults.concat(response.results);
      begin += numRecordsPerBulk;
      if (records.length <= begin) {
        return allResults;
      }
      return this.addAllRecordsRecursive(app, records, begin, allResults);
    }).catch(errors => {
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
  addAllRecords({app, records}) {
    return this.addAllRecordsRecursive(app, records).then((response) => {
      return {
        results: response
      };
    }).catch(errors => {
      if (!Array.isArray(errors)) {
        const emptyArray = [];
        errors = emptyArray.concat(errors);
      }
      const errorsResponse = {results: errors};
      throw errorsResponse;
    });
  }

  addBulkRecord(app, records) {
    const bulkRequest = new BulkRequest({connection: this.connection});
    const length = records.length;
    const loopTimes = Math.ceil(length / LIMIT_POST_RECORD);
    for (let index = 0; index < loopTimes; index++) {
      const begin = index * LIMIT_POST_RECORD;
      const end = (length - begin) < LIMIT_POST_RECORD ? length : begin + LIMIT_POST_RECORD;
      const recordsPerRequest = records.slice(begin, end);
      bulkRequest.addRecords({app: app,records: recordsPerRequest});
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
  updateRecordByID({app, id, record, revision} = {}) {
    const updateRecordRequest = new RecordModel.UpdateRecordRequest(app);

    updateRecordRequest
      .setID(id)
      .setRecord(record)
      .setRevision(revision || 0);

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
  updateRecordByUpdateKey({app, updateKey, record, revision}) {
    const fieldKey = updateKey ? updateKey.field : undefined;
    const fieldValue = updateKey ? updateKey.value : undefined;

    const updateRecordRequest = new RecordModel.UpdateRecordRequest(app);
    updateRecordRequest
      .setUpdateKey(fieldKey, fieldValue)
      .setRecord(record)
      .setRevision(revision || 0);

    return this.sendRequest('PUT', 'record', updateRecordRequest);
  }
  /**
   * create record Item With id, use to update multi Record
   * @param {*} id
   * @param {*} recordData
   * @param {*} revision
   * @return {RecordsUpdateItem}
   */
  createRecordItemWithID(id, recordData, revision) {
    return new RecordModel.RecordsUpdateItem()
      .setID(id)
      .setRecord(recordData)
      .setRevision(revision || 0);
  }
  /**
   * create record Item With UpdateKey, use to update multi Record
   * @param {*} updateKey
   * @param {*} recordData
   * @param {*} revision
   * @return {RecordsUpdateItem}
   */
  createRecordItemWithUpdateKey(updateKey, recordData, revision) {
    return new RecordModel.RecordsUpdateItem()
      .setUpdateKey(updateKey.field, updateKey.value)
      .setRecord(recordData)
      .setRevision(revision || 0);
  }
  /**
   * Update multi records
   * @param {Object} params
   * @param {Number} params.app
   * @param {Array<RecordUpdateItem>} params.records
   * @return {Promise} Promise
   */
  updateRecords({app, records} = {}) {
    const updateRecordsRequest = new RecordModel.UpdateRecordsRequest(app, records);

    return this.sendRequest('PUT', 'records', updateRecordsRequest);
  }

  /**
   * Delete multi records
   * @param {Object} params
   * @param {Number} params.app
   * @param {Array<Number>} params.ids
   * @return {Promise} Promise
   */
  deleteRecords({app, ids}) {
    const deleteRecordsRequest = new RecordModel.DeleteRecordsRequest(app);
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
  deleteRecordsWithRevision({app, idsWithRevision} = {}) {
    const deleteRecordsRequest = new RecordModel.DeleteRecordsRequest(app);
    deleteRecordsRequest.setIDsWithRevision(idsWithRevision);

    return this.sendRequest('DELETE', 'records', deleteRecordsRequest);
  }

  deleteBulkRecord(app, ids) {
    const bulkRequest = new BulkRequest({connection: this.connection});
    const length = ids.length;
    const loopTimes = Math.ceil(length / LIMIT_DELETE_RECORD);
    for (let index = 0; index < loopTimes; index++) {
      const begin = index * LIMIT_DELETE_RECORD;
      const end = (length - begin) < LIMIT_DELETE_RECORD ? length : begin + LIMIT_DELETE_RECORD;
      const idsPerRequest = ids.slice(begin, end);
      bulkRequest.deleteRecords({app: app, ids: idsPerRequest});
    }
    return bulkRequest.execute();
  }

  deleteAllRecords(app, ids, offset = 0, results = []) {
    const numIdsPerBulk = NUM_BULK_REQUEST * LIMIT_DELETE_RECORD;
    let begin = offset || 0;
    const length = ids.length || 0;
    const end = (length - begin) < LIMIT_DELETE_RECORD ? length : begin + numIdsPerBulk;
    const idsPerBulk = ids.slice(begin, end);

    let allResults = results || [];
    return this.deleteBulkRecord(app, idsPerBulk).then((response) => {
      allResults = allResults.concat(response.results);
      begin += numIdsPerBulk;
      if (ids.length <= begin) {
        return allResults;
      }
      return this.deleteAllRecords(app, ids, begin, allResults);
    }).catch(errors => {
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
  deleteAllRecordsByQuery({app, query} = {}) {
    return this.getAllRecordsByQuery({app, query}).then((resp) => {
      const ids = [];
      const records = resp.records;
      if (!records || !records.length) {
        return {};
      }
      for (let i = 0; i < records.length; i++) {
        ids.push(records[i].$id.value);
      }
      return this.deleteAllRecords(app, ids).then((response) => {
        return {results: response};
      });
    }).catch(errors => {
      if (!Array.isArray(errors)) {
        const emptyArray = [];
        errors = emptyArray.concat(errors);
      }
      const errorsResponse = {results: errors};
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
  updateRecordAssignees({app, id, assignees, revision} = {}) {
    const updateRecordRequest = new RecordModel.UpdateRecordAssigneesRequest(app, id, assignees, revision);

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
  updateRecordStatus({app, id, action, assignee, revision} = {}) {
    const updateRecordRequest = new RecordModel.UpdateRecordStatusRequest(app, id, action, assignee, revision);

    return this.sendRequest('PUT', 'RECORD_STATUS', updateRecordRequest);
  }

  /**
     * Update status of the multi records
     * @param {Object} params
     * @param {Number} params.app
     * @param {Array <{RecordStatusUpdate}>} records
     * @return {Promise}
     */
  updateRecordsStatus({app, records} = {}) {
    const updateRecordsRequest = new RecordModel.UpdateRecordsRequest(app, records);

    return this.sendRequest('PUT', 'RECORDS_STATUS', updateRecordsRequest);
  }

  updateBulkRecord(app, records) {
    const bulkRequest = new BulkRequest({connection: this.connection});
    const length = records.length;
    const loopTimes = Math.ceil(length / LIMIT_UPDATE_RECORD);
    for (let index = 0; index < loopTimes; index++) {
      const begin = index * LIMIT_UPDATE_RECORD;
      const end = (length - begin) < LIMIT_UPDATE_RECORD ? length : begin + LIMIT_UPDATE_RECORD;
      const recordsPerRequest = records.slice(begin, end);
      bulkRequest.updateRecords({app: app, records: recordsPerRequest});
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
  updateAllRecordsRecursive(app, records, offset, results) {
    const numRecordsPerBulk = NUM_BULK_REQUEST * LIMIT_UPDATE_RECORD;
    let begin = offset || 0;
    const validRecord = Array.isArray(records) ? records : [];
    const length = validRecord.length;
    const end = (length - begin) < LIMIT_UPDATE_RECORD ? length : begin + numRecordsPerBulk;
    const recordsPerBulk = validRecord.slice(begin, end);
    let allResults = results || [];
    return this.updateBulkRecord(app, recordsPerBulk).then((response) => {
      allResults = allResults.concat(response.results);
      begin += numRecordsPerBulk;
      if (length <= begin) {
        return allResults;
      }
      return this.updateAllRecordsRecursive(app, validRecord, begin, allResults);
    }).catch(err => {
      let error = Array.isArray(err) ? err : [err];
      if (err.length <= NUM_BULK_REQUEST) {
        error = allResults.concat(error);
      }
      throw error;
    });
  }
  updateAllRecords({app, records} = {}) {
    return this.updateAllRecordsRecursive(app, records).then(rsp => {
      return {
        'results': rsp
      };
    }).catch(err => {
      const errorsResponse = {results: err};
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
  upsertRecord({app, updateKey, record, revision} = {}) {
    const getRecordsParam = {
      app: app,
      query: `${updateKey.field} = "${updateKey.value}"`,
      fields: [updateKey.field],
      totalCount: false,
    };
    return this.getRecords(getRecordsParam).then((resp) => {
      if (updateKey.value === '' || resp.records.length < 1) {
        record[updateKey.field] = {value: updateKey.value};
        return this.addRecord({app, record});
      } else if (resp.records.length === 1) {
        return this.updateRecordByUpdateKey({app, updateKey, record, revision});
      }
      throw new Error(`${updateKey.field} is not unique field`);
    });
  }

  /**
   * Upsert records by update-key
   * @param {Object} params
   * @param {Number} params.app
   * @param {Object} params.recordsWithUpdatekey
   * @return {Promise}
   */
  upsertRecords({app, records} = {}) {
    const validRecords = Array.isArray(records) ? records : [];
    if (validRecords.length > LIMIT_UPSERT_RECORD) {
      throw new Error(`upsertRecords can't handle over ${LIMIT_UPSERT_RECORD} records.`);
    }

    const doesExistSameFieldValue = (allRecords, comparedRecord) => {
      if (comparedRecord.updateKey.value === '') {
        // updateKey.value is '' => post
        return false;
      }
      for (let i = 0; i < allRecords.length; i++) {
        if (allRecords[i][comparedRecord.updateKey.field].value === comparedRecord.updateKey.value) {
          // exist => put
          return true;
        }
      }
      // doesn't exist => post
      return false;
    };

    const executeUpsertBulkRequest = (recordsForPost, recordsForPut) => {
      let bulkRequest = new BulkRequest({connection: this.connection});
      bulkRequest = this.makeBulkReq(app, bulkRequest, recordsForPost, 'POST');
      bulkRequest = this.makeBulkReq(app, bulkRequest, recordsForPut, 'PUT');
      return bulkRequest.execute();
    };

    return this.getAllRecordsByQuery({app}).then((resp) => {
      const allRecords = resp.records;
      const recordsForPut = [];
      const recordsForPost = [];
      for (let i = 0; i < validRecords.length; i++) {
        if (doesExistSameFieldValue(allRecords, validRecords[i])) {
          recordsForPut.push(validRecords[i]);
        } else {
          const record = validRecords[i].record;
          record[validRecords[i].updateKey.field] = {
            value: validRecords[i].updateKey.value
          };
          recordsForPost.push(record);
        }
      }
      return executeUpsertBulkRequest(recordsForPost, recordsForPut);
    }).catch(errors => {
      const errorsArray = Array.isArray(errors) ? errors : [errors];
      const errorsResponse = {results: errorsArray};
      throw errorsResponse;
    });
  }

  makeBulkReq(app, bulkRequest, records, method) {
    let recordLimit = 0;
    if (method === 'POST') {
      recordLimit = LIMIT_POST_RECORD;
    } else if (method === 'PUT') {
      recordLimit = LIMIT_UPDATE_RECORD;
    }
    const length = records.length;
    const loopTimes = Math.ceil(length / recordLimit);
    for (let index = 0; index < loopTimes; index++) {
      const begin = index * recordLimit;
      const end = (length - begin) < recordLimit ? length : begin + recordLimit;
      const recordsPerRequest = records.slice(begin, end);
      if (method === 'POST') {
        bulkRequest.addRecords({app: app, records: recordsPerRequest});
      } else if (method === 'PUT') {
        bulkRequest.updateRecords({app: app, records: recordsPerRequest});
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
  createRecordStatusItem(recordIDInput, actionNameInput,
    assigneeIDInput, revisionIDInput) {
    return new RecordModel.RecordsUpdateStatusItem(recordIDInput, actionNameInput, assigneeIDInput, revisionIDInput);
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
  getComments({app, record, order, offset, limit}) {
    const getCommentsRequest = new RecordModel.GetCommentsRequest(app, record, order, offset, limit);
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
  addComment({app, record, comment} = {}) {
    const addCommentRequest = new RecordModel.AddCommentRequest(app, record, comment);
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
  deleteComment({app, record, comment} = {}) {
    const deleteCommentRequest = new RecordModel.DeleteCommentRequest(app, record, comment);
    return this.sendRequest('DELETE', 'RECORD_COMMENT', deleteCommentRequest);
  }
}
module.exports = Record;

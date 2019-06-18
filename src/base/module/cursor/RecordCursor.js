/* eslint-disable no-loop-func */
/* eslint-disable no-async-promise-executor, require-atomic-updates */
const Connection = require('../../connection/Connection');
const common = require('../../utils/Common');
const CursorModel = require('../../model/cursor/CursorModels');
const KintoneAPIException = require('../../model/exception/KintoneAPIException');

/**
 * RecordCursor module
 */
class RecordCursor {
  /**
   * The constructor for RecordCursor module
   * @param {Connection} connection
   */
  constructor(connection) {
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
   * Create a new record cursor
   * @param {Integer} app
   * @param {Array<String>} fields
   * @param {String} query
   * @param {Integer} size
   * @return {Promise}
   */
  createCursor(app, fields, query, size) {
    const createCursorRequest = new CursorModel.CreateRecordCursorRequest(app, fields, query, size);
    return this.sendRequest('POST', 'RECORD_CURSOR', createCursorRequest);
  }
  /**
   * Get 1 block of records
   * @param {String} cursorID
   * @return {Promise}
   */
  getRecords(cursorID) {
    const getRecordCursorRequest = new CursorModel.GetRecordCursorRequest(cursorID);
    return this.sendRequest('GET', 'RECORD_CURSOR', getRecordCursorRequest);
  }
  /**
   * Get all records
   * @param {String} cursorID
   * @return {Promise}
   */
  async getAllRecords(cursorID) {
    let next = true;
    let allRecords = [];
    while (next) {
      try {
        const recordBlockResponse = await this.getRecords(cursorID);
        if (!(recordBlockResponse instanceof KintoneAPIException)) {
          allRecords = allRecords.concat(recordBlockResponse.records);
          next = recordBlockResponse.next;
        } else {
          next = false;
        }
      } catch (error) {
        next = false;
        throw error;
      }
    }
    return allRecords;
  }
  /**
   * Delete cursor
   * @param {String} cursorID
   * @return {Promise}
   */
  deleteCursor(cursorID) {
    const deleteRecordCursorRequest = new CursorModel.DeleteRecordCursroRequest(cursorID);
    return this.sendRequest('DELETE', 'RECORD_CURSOR', deleteRecordCursorRequest);
  }
}

module.exports = RecordCursor;
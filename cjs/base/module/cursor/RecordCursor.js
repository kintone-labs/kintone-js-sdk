"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _KintoneAPIException = _interopRequireDefault(require("../../model/exception/KintoneAPIException"));

var _CursorModels = _interopRequireDefault(require("../../model/cursor/CursorModels"));

var _Common = _interopRequireDefault(require("../../utils/Common"));

var _Connection = _interopRequireDefault(require("../../connection/Connection"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable no-loop-func */

/* eslint-disable no-async-promise-executor, require-atomic-updates */

/**
 * RecordCursor module
 */
class RecordCursor {
  /**
   * The constructor for RecordCursor module
   * @param {Object} params
   * @param {Connection} params.connection
   */
  constructor({
    connection
  } = {}) {
    if (!(connection instanceof _Connection.default)) {
      throw new Error(`${connection} not an instance of Connection`);
    }

    this.connection = connection;
    Promise.resolve().finally();
  }
  /**
   * @param {Object} params
   * @param {String} params.method
   * @param {String} params.url
   * @param {RecordModel} params.model
   * @return {Promise} Promise
   */


  sendRequest({
    method,
    url,
    model
  }) {
    return _Common.default.sendRequest(method, url, model, this.connection);
  }
  /**
   * Create a new record cursor
   * @param {Object} params
   * @param {Integer} params.app
   * @param {Array<String>} fields
   * @param {String} params.query
   * @param {Integer} params.size
   * @return {Promise}
   */


  createCursor({
    app,
    fields,
    query,
    size
  } = {}) {
    const createCursorRequest = new _CursorModels.default.CreateRecordCursorRequest({
      app,
      fields,
      query,
      size
    });
    return this.sendRequest({
      method: 'POST',
      url: 'RECORD_CURSOR',
      model: createCursorRequest
    });
  }
  /**
   * Get 1 block of records
   * @param {Object} params
   * @param {String} params.id cursor id
   * @return {Promise}
   */


  getRecords({
    id
  }) {
    const getRecordCursorRequest = new _CursorModels.default.GetRecordCursorRequest(id);
    return this.sendRequest({
      method: 'GET',
      url: 'RECORD_CURSOR',
      model: getRecordCursorRequest
    });
  }
  /**
   * Get all records
   * @param {Object} params
   * @param {String} params.id cursor id
   * @return {Promise}
   */


  async getAllRecords({
    id
  } = {}) {
    let next = true;
    let allRecords = [];

    while (next) {
      try {
        const recordBlockResponse = await this.getRecords({
          id
        });

        if (!(recordBlockResponse instanceof _KintoneAPIException.default)) {
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

    return {
      records: allRecords,
      totalCount: allRecords.length
    };
  }
  /**
   * Delete cursor
   * @param {Object} params
   * @param {String} params.id
   * @return {Promise}
   */


  deleteCursor({
    id
  } = {}) {
    const deleteRecordCursorRequest = new _CursorModels.default.DeleteRecordCursorRequest(id);
    return this.sendRequest({
      method: 'DELETE',
      url: 'RECORD_CURSOR',
      model: deleteRecordCursorRequest
    });
  }

}

var _default = RecordCursor;
exports.default = _default;
/* eslint-disable no-async-promise-executor, require-atomic-updates */
/**
 * CreateRecordCursorRequest model
 */
class CreateRecordCursorRequest {
  /**
   * constructor for CreateRecordCursorRequest
   * @param {Integer} app
   * @param {Array<String>} fields
   * @param {String} query
   * @param {Integer} size
   */
  constructor({app, fields, query, size}) {
    this.app = app;
    this.fields = fields;
    this.query = query;
    this.size = size;
  }
  /**
   * Get app id
   * @return {Integer}
   */
  getAppID() {
    return this.app;
  }
  /**
   * Get fields
   * @return {Array<String>}
   */
  getFields() {
    return this.fields;
  }
  /**
   * Get query
   * @return {String}
   */
  getQuery() {
    return this.query;
  }
  /**
   * Get size
   * @return {Integer}
   */
  getSize() {
    return this.size;
  }
  /**
   * Get JSON struct of this model
   * @return {JSON}
   */
  toJSON() {
    const data = {};

    if (this.getAppID() !== undefined) {
      data.app = this.getAppID();
    }
    if (this.getFields() !== undefined) {
      data.fields = this.getFields();
    }
    if (this.getQuery() !== undefined) {
      data.query = this.getQuery();
    }
    if (this.getSize() !== undefined) {
      data.size = this.getSize();
    }
    return data;
  }
  /**
   * Convert this model to JSON string
   * @return {String}
   */
  toJSONString() {
    return JSON.stringify(this.toJSON());
  }
}
module.exports = CreateRecordCursorRequest;

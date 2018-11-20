const RecordUpdateKey = require('./RecordUpdateKey');

/**
 * RecordUpdateItem model
 */
class RecordUpdateItem {
  /**
     * constructor
     */
  constructor() {
    this.id = null;
    this.revision = null;
    this.updateKey = null;
    this.record = null;
  }
  /**
     * set ID of record to update
     * @param {String} id
     * @return {this}
     */
  setID(id) {
    this.id = id;
    return this;
  }
  /**
     * set revision of record to update
     * @param {String} revision
     * @return {this}
     */
  setRevision(revision) {
    this.revision = revision;
    return this;
  }
  /**
     * set updateKey to update record
     * @param {String} field
     * @param {String} value
     * @return {this}
     */
  setUpdateKey(field, value) {
    this.updateKey = new RecordUpdateKey(field, value);
    return this;
  }
  /**
     * set record data to update
     * @param {String} record
     * @return {this}
     */
  setRecord(record) {
    this.record = record;
    return this;
  }
  /**
     * Get JSON struct of this model
     * @return {Object}
     */
  toJSON() {
    const updateKeyPriv = this.updateKey;
    const data = {
      revision: this.revision || null,
      record: this.record
    };
    if (updateKeyPriv) {
      data.updateKey = updateKeyPriv.toJSON();
    } else {
      data.id = this.id;
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
module.exports = RecordUpdateItem;

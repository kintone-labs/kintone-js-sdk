"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _RecordUpdateKey = _interopRequireDefault(require("./RecordUpdateKey"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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
    this.updateKey = new _RecordUpdateKey.default(field, value);
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

var _default = RecordUpdateItem;
exports.default = _default;
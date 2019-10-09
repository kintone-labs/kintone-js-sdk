"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * RecordUpdateKey model
 */
class RecordUpdateKey {
  /**
     * constructor
     * @param {String} field
     * @param {String} value
     */
  constructor(field, value) {
    this.field = field;
    this.value = value;
  }
  /**
     * Get JSON struct of this model
     * @return {Object}
     */


  toJSON() {
    return {
      field: this.field,
      value: this.value
    };
  }
  /**
     * Convert this model to JSON string
     * @return {String}
     */


  toJSONString() {
    return JSON.stringify(this.toJSON());
  }

}

var _default = RecordUpdateKey;
exports.default = _default;
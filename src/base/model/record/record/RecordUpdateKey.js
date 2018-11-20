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
module.exports = RecordUpdateKey;

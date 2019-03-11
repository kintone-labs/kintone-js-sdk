/**
 * AddRecordRequest model
 */
class AddRecordRequest {
  /**
     * constructor for AddRecordRequest
     * @param {integer} appID
     * @param {HashTable<String, FieldValue>} recordHashTableData
     */
  constructor(appID, recordHashTableData) {
    this.app = appID;
    this.record = recordHashTableData;
  }
  /**
     * Get app id
     * @return {integer}
     */
  getAppID() {
    return this.app;
  }
  /**
     * Get record data
     * @return {HashTable<String, FieldValue>}
     */
  getRecordData() {
    return this.record;
  }
  /**
     * Get JSON struct of this model
     * @return {JSON}
     */
  toJSON() {
    const data = {
      record: this.getRecordData(),
    };

    if (this.getAppID() !== undefined) {
      data.app = this.getAppID();
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
module.exports = AddRecordRequest;

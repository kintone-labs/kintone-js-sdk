/**
 * GetRecordsRequest model
 */
class GetRecordsRequest {
  /**
     * @param {Integer} appID
     * @param {String} query
     * @param {Array<String>} fields
     * @param {Boolean} totalCount
     */
  constructor(appID, query, fields, totalCount) {
    this.app = appID;
    this.query = query;
    this.fields = fields;
    this.totalCount = totalCount;
  }
  /**
     * Get JSON struct of this model
     * @return {JSON}
     */
  toJSON() {
    return {
      app: this.app,
      query: this.query,
      fields: this.fields,
      totalCount: this.totalCount
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
module.exports = GetRecordsRequest;

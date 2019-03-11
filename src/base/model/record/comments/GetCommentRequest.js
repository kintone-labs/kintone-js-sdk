/**
 * GetCommentRequest model
 */
class GetCommentRequest {
  /**
     * constructor
     * @param {Integer} appID
     * @param {Integer} recordID
     * @param {String} order
     * @param {Integer} offset
     * @param {Integer} limit
     */
  constructor(appID, recordID, order, offset, limit) {
    this.appID = appID;
    this.recordID = recordID;
    this.order = order;
    this.offset = offset;
    this.limit = limit;
  }
  /**
     * Get JSON struct of this model
     * @return {integer}
     */
  toJSON() {
    return {
      app: this.appID,
      record: this.recordID,
      order: this.order,
      offset: this.offset,
      limit: this.limit
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
module.exports = GetCommentRequest;

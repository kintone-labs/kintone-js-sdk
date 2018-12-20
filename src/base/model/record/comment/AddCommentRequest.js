/**
 * AddCommentRequest model
 */
class AddCommentRequest {
  /**
     * constructor
     * @param {Integer} appID
     * @param {Integer} recordID
     * @param {String} commentContent
     */
  constructor(appID, recordID, commentContent) {
    this.appID = appID;
    this.recordID = recordID;
    this.commentContent = commentContent;
  }
  /**
     * Get JSON struct of this model
     * @return {integer}
     */
  toJSON() {
    return {
      app: this.appID,
      record: this.recordID,
      comment: this.commentContent
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
module.exports = AddCommentRequest;

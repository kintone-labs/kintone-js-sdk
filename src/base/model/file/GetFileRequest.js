/**
 * GetFileRequest model
 */
class GetFileRequest {
  /**
     * @param {String} fileKey
     */
  constructor(fileKey) {
    this.fileKey = fileKey;
  }
  /**
     * Get JSON struct of this model
     * @return {JSON}
     */
  toJSON() {
    return {
      fileKey: this.fileKey
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
module.exports = GetFileRequest;

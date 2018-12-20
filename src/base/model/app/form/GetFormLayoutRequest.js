/**
 * GetFormLayoutRequest model
 */
class GetFormLayoutRequest {
  /**
     * @param {String} appID
     */
  constructor(appID) {
    this.appID = appID;
  }
  /**
     * Get JSON struct of this model
     * @return {JSON}
     */
  toJSON() {
    return {
      app: this.appID,
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
module.exports = GetFormLayoutRequest;

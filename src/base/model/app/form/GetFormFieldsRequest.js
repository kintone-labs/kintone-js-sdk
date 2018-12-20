/**
 * GetFormFieldsRequest model
 */
class GetFormFieldsRequest {
  /**
     * @param {Integer} appID
     * @param {String} lang
     */
  constructor(appID, lang) {
    this.appID = appID;
    this.lang = lang;
  }
  /**
     * Get JSON struct of this model
     * @return {JSON}
     */
  toJSON() {
    const data = {
      app: this.appID
    };
    if (this.lang) {
      data.lang = this.lang;
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
module.exports = GetFormFieldsRequest;

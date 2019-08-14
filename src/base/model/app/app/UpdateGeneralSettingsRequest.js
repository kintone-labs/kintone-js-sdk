/**
 * UpdateGeneralSettingsRequest model
 */
class UpdateGeneralSettingsRequest {
  /**
     * @param {Integer} app
     * @param {GeneralSettings } generalSettings
     * @param {Integer} revision
     */
  constructor(params = {}) {
    this.params = params;
  }
  /**
     * Get JSON struct of this model
     * @return {JSON}
     */
  toJSON() {
    return this.params;
  }
  /**
     * Convert this model to JSON string
     * @return {String}
     */
  toJSONString() {
    return JSON.stringify(this.toJSON());
  }
}
module.exports = UpdateGeneralSettingsRequest;

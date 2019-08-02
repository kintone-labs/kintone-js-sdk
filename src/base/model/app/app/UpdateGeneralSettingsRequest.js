/**
 * UpdateGeneralSettingsRequest model
 */
class UpdateGeneralSettingsRequest {
  /**
     * @param {Integer} app
     * @param {GeneralSettings } generalSettings
     * @param {Integer} revision
     */
  constructor(app, generalSettings, revision) {
    this.app = app;
    this.generalSettings = generalSettings;
    this.revision = revision;
  }
  /**
     * Get JSON struct of this model
     * @return {JSON}
     */
  toJSON() {
    const settings = JSON.stringify(this.generalSettings);
    const data = this.generalSettings && typeof this.generalSettings === 'object' ? JSON.parse(settings) : {};
    data.app = this.app;
    data.revision = this.revision;
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
module.exports = UpdateGeneralSettingsRequest;

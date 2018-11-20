/**
 * DeployAppSettingsRequest model
 */
class DeployAppSettingsRequest {
  /**
     * constructor for DeployAppSettingsRequest
     * @param {Array} apps
     * @param {Boolean} revert
     */
  constructor(apps, revert) {
    this.apps = apps;
    this.revert = revert;
  }
  /**
     * Get apps
     * @return {Array}
     */
  getApps() {
    return this.apps;
  }
  /**
     * @param {Array} apps
     * @return {this} DeployAppSettingsRequest
     */
  setApps(apps) {
    this.apps = apps;
    return this;
  }
  /**
     * Get reviert
     * @return {Boolean}
     */
  getRevert() {
    return this.revert;
  }
  /**
     * @param {Boolean} revert
     * @return {this} DeployAppSettingsRequest
     */
  setRevert(revert) {
    this.revert = revert;
    return this;
  }
  /**
     * Get JSON struct of this model
     * @return {JSON}
     */
  toJSON() {
    return {
      apps: this.getApps(),
      revert: this.getRevert()
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
module.exports = DeployAppSettingsRequest;

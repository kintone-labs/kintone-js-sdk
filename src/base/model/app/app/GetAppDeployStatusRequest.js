/**
 * GetAppDeployStatusRequest model
 */
class GetAppDeployStatusRequest {
  /**
     * @param {Array} apps
     */
  constructor(apps) {
    this.apps = apps;
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
     * @return {this}
     */
  setApps(apps) {
    this.apps = apps;
    return this;
  }
  /**
     * Get JSON struct of this model
     * @return {JSON}
     */
  toJSON() {
    const data = {
      apps: this.apps
    };
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
module.exports = GetAppDeployStatusRequest;

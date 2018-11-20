/**
 * GetAppsRequest model
 */
class GetAppsRequest {
  /**
     * @param {String} offset
     * @param {String} limit
     */
  constructor(offset, limit) {
    this.offset = offset;
    this.limit = limit;
  }
  /**
     * Set app ids
     * @param {Array} appIDs
     * @return {this}
     */
  setAppIDs(appIDs) {
    this.appIDs = appIDs;
    return this;
  }
  /**
     * Set app codes
     * @param {Array} appCodes
     * @return {this}
     */
  setAppCodes(appCodes) {
    this.appCodes = appCodes;
    return this;
  }
  /**
     * Set app name
     * @param {Array} appName
     * @return {this}
     */
  setAppName(appName) {
    this.appName = appName;
    return this;
  }
  /**
     * Set app space ids
     * @param {Array} appSpaceIDs
     * @return {this}
     */
  setAppSpaceIDs(appSpaceIDs) {
    this.appSpaceIDs = appSpaceIDs;
    return this;
  }
  /**
     * Get JSON struct of this model
     * @return {JSON}
     */
  toJSON() {
    const data = {
      offset: this.offset,
      limit: this.limit,
    };
    if (this.appIDs) {
      data.ids = this.appIDs;
    }
    if (this.appCodes) {
      data.codes = this.appCodes;
    }
    if (this.appName) {
      data.name = this.appName;
    }
    if (this.appSpaceIDs) {
      data.spaceIds = this.appSpaceIDs;
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
module.exports = GetAppsRequest;

"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * GetAppRequest model
 */
class GetAppRequest {
  /**
     * @param {String} appID
     */
  constructor(appID) {
    this.appID = appID;
  }
  /**
   * Get apps
   * @return {Array}
   */


  getAppID() {
    return this.appID;
  }
  /**
     * @param {Number} appID
     * @return {this}
     */


  setAppID(appID) {
    this.appID = appID;
    return this;
  }
  /**
     * Get JSON struct of this model
     * @return {JSON}
     */


  toJSON() {
    return {
      id: this.appID
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

var _default = GetAppRequest;
exports.default = _default;
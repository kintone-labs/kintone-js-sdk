"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

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

var _default = UpdateGeneralSettingsRequest;
exports.default = _default;
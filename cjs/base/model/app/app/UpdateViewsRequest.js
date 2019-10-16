"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * UpdateViewsRequest model
 */
class UpdateViewsRequest {
  /**
     * @param {Integer} app
     * @param {HashTable<String, View>} views
     * @param {Integer} revision
     */
  constructor(app, views, revision) {
    this.app = app;
    this.views = views;
    this.revision = revision;
  }
  /**
     * Get JSON struct of this model
     * @return {JSON}
     */


  toJSON() {
    const data = {
      app: this.app,
      views: this.views,
      revision: this.revision
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

var _default = UpdateViewsRequest;
exports.default = _default;
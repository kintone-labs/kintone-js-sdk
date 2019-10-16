"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * BulkRequestItem model
 */
class BulkRequestItem {
  /**
     * @param {String} method
     * @param {String} api
     * @param {String} payload
     */
  constructor(method, api, payload) {
    this.method = method;
    this.api = api;
    this.payload = payload.toJSON ? payload.toJSON() : payload;
  }
  /**
     * Get JSON struct of this model
     * @return {JSON}
     */


  toJSON() {
    return {
      method: this.method,
      api: this.api,
      payload: this.payload
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

var _default = BulkRequestItem;
exports.default = _default;
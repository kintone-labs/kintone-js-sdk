"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * BulkRequest model
 */
class BulkRequest {
  /**
     * Constructor BulkRequest
     */
  constructor() {
    this.requests = [];
  }
  /**
     * Get username of BulkRequest model
     * @param {BulkRequestItem} bulkRequestItem
     * @return {this}
     */


  addRequest(bulkRequestItem) {
    const dataRequest = bulkRequestItem.toJSON ? bulkRequestItem.toJSON() : bulkRequestItem;
    this.requests.push(dataRequest);
    return this;
  }
  /**
     * Get JSON struct of this model
     * @return {JSON}
     */


  toJSON() {
    return {
      requests: this.requests
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

var _default = BulkRequest;
exports.default = _default;
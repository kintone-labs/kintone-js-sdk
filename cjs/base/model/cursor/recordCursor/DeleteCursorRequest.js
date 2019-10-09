"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/**
 * DeleteCursorRequest model
 */
class DeleteCursorRequest {
  /**
   * constructor for DeleteCursorRequest
   * @param {String} cursorID
   */
  constructor(cursorID) {
    this.cursorID = cursorID;
  }
  /**
   * Get cursor id
   * @return {String}
   */


  getCursorID() {
    return this.cursorID;
  }
  /**
   * Get JSON struct of this model
   * @return {JSON}
   */


  toJSON() {
    const data = {};

    if (this.getCursorID() !== undefined) {
      data.id = this.getCursorID();
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

var _default = DeleteCursorRequest;
exports.default = _default;
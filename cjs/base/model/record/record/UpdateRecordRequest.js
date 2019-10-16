"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _RecordUpdateItem = _interopRequireDefault(require("./RecordUpdateItem"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * UpdateRecordRequest model
 */
class UpdateRecordRequest extends _RecordUpdateItem.default {
  /**
     * @param {String} appID
     */
  constructor(appID) {
    super();
    this.app = appID;
  }
  /**
     * Get JSON struct of this model
     * @return {Object}
     */


  toJSON() {
    const data = super.toJSON();

    if (this.app) {
      data.app = this.app;
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

var _default = UpdateRecordRequest;
exports.default = _default;
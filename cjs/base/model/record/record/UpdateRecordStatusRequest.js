"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _UpdateRecordStatusItem = _interopRequireDefault(require("./UpdateRecordStatusItem"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * UpdateRecordStatusRequest model
 */
class UpdateRecordStatusRequest extends _UpdateRecordStatusItem.default {
  /**
     * constructor
     * @param {Number} appID
     * @param {String} recordID
     * @param {String} actionName
     * @param {String} assigneeID
     * @param {Number} revisionID
     */
  constructor(appID, recordID, actionName, assigneeID, revisionID) {
    super(recordID, actionName, assigneeID, revisionID);
    this.appID = appID;
  }
  /**
     * Get JSON struct of this model
     * @return {Object}
     */


  toJSON() {
    const data = super.toJSON();
    data.app = this.appID;
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

var _default = UpdateRecordStatusRequest;
exports.default = _default;
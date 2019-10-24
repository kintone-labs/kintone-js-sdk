"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _KintoneAPIException = _interopRequireDefault(require("../exception/KintoneAPIException"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Common function
 */
class Common {
  /**
   * @param {String} method
   * @param {String} url
   * @param {RecordModel} model
   * @param {Connection} connection
   * @return {Promise} Promise
   */
  sendRequest(method, url, model, connection) {
    const body = model.toJSON ? model.toJSON() : model;
    return connection.request(method, url, body).then(result => {
      return result;
    }).catch(err => {
      throw new _KintoneAPIException.default(err.message, err);
    });
  }
  /**
   * check required arguments
   *
   * @param {Object} params
   * @returns {Boolean}
   */


  validateRequiredArgs(params) {
    Object.keys(params).forEach(key => {
      if (params[key] === undefined || params[key] === null) {
        throw new _KintoneAPIException.default(`${key} is a required argument.`);
      }
    });
    return true;
  }

}

var _default = new Common();

exports.default = _default;
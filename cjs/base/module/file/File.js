"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Common = _interopRequireDefault(require("../../utils/Common"));

var _FileModels = _interopRequireDefault(require("../../model/file/FileModels"));

var _Connection = _interopRequireDefault(require("../../connection/Connection"));

var _KintoneAPIException = _interopRequireDefault(require("../../exception/KintoneAPIException"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * File module
 */
class File {
  /**
   * The constructor for this module
   * @param {Object} params
   * @param {Connection} params.connection
   */
  constructor({
    connection
  } = {}) {
    if (!(connection instanceof _Connection.default)) {
      throw new _KintoneAPIException.default(`${connection} is not an instance of Connection`);
    }

    this.connection = connection;
  }
  /**
   * check required arguments
   *
   * @param {Object} params
   * @returns {Promise<Boolean>}
   */


  _validateRequiredArgs(params) {
    return new Promise((resolve, reject) => {
      try {
        _Common.default.validateRequiredArgs(params);

        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }
  /**
   * Download file from kintone
   * @param {Object} params
   * @param {String} params.fileKey
   * @return {Promise}
   */


  download({
    fileKey
  }) {
    const dataRequest = new _FileModels.default.GetFileRequest(fileKey);
    return this.connection.download(dataRequest.toJSON());
  }
  /**
   * upload file to kintone
   * @param {Object} params
   * @param {String} params.fileName
   * @param {String} params.fileContent
   * @return {Promise}
   */


  upload({
    fileName,
    fileContent
  }) {
    return this._validateRequiredArgs({
      fileName,
      fileContent
    }).then(() => {
      return this.connection.upload(fileName, fileContent);
    });
  }

}

var _default = File;
exports.default = _default;
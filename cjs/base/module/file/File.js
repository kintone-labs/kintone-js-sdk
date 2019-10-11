"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _FileModels = _interopRequireDefault(require("../../model/file/FileModels"));

var _Connection = _interopRequireDefault(require("../../connection/Connection"));

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
      throw new Error(`${connection} not an instance of Connection`);
    }

    this.connection = connection;
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
    return this.connection.upload(fileName, fileContent);
  }

}

var _default = File;
exports.default = _default;
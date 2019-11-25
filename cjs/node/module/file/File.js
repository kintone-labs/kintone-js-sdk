"use strict";
'use-strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _main = require("../../../base/main");

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * File module for NodeJS
 */
class File extends _main.File {
  /**
   * The constructor for this module
   * @param {Object} params
   * @param {Connection} params.connection
   */
  constructor({
    connection
  } = {}) {
    if (!(connection instanceof _main.Connection)) {
      throw new _main.KintoneAPIException(`${connection} is not an instance of Connection`);
    }

    super({
      connection
    });
  }
  /**
   * Download file from kintone
   * @param {Object} params
   * @param {String} params.fileKey
   * @param {String} params.outPutFilePath
   * @return {Promise}
   */


  download({
    fileKey,
    outPutFilePath
  }) {
    return super.download({
      fileKey
    }).then(fileContent => {
      try {
        const options = {
          encoding: 'utf16le'
        };

        _fs.default.writeFileSync(outPutFilePath, fileContent, options);
      } catch (err) {
        throw new _main.KintoneAPIException(err.message, err);
      }
    });
  }
  /**
   * Upload file from local to kintone environment
   * @param {Object} params
   * @param {String} params.filePath
   * @param {String} params.fileName
   * @param {String} params.fileContent
   * @return {Promise}
   */


  upload({
    filePath,
    fileName,
    fileContent
  } = {}) {
    let validFilecontent = fileContent;
    let validFilename = fileName;
    return new Promise((resolve, reject) => {
      if (filePath) {
        try {
          validFilecontent = _fs.default.createReadStream(filePath);
          validFilename = _path.default.basename(filePath);
        } catch (error) {
          reject(new _main.KintoneAPIException(error.message, error));
        }
      }

      resolve(super.upload({
        fileName: validFilename,
        fileContent: validFilecontent
      }));
    });
  }

}

var _default = File;
exports.default = _default;
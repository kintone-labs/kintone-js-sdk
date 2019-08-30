const Connection = require('../../connection/Connection');
const FileModel = require('../../model/file/FileModels');

/**
 * File module
 */
class File {
  /**
   * The constructor for this module
   * @param {Object} params
   * @param {Connection} params.connection
   */
  constructor({connection} = {}) {
    if (!(connection instanceof Connection)) {
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
  download({fileKey}) {
    const dataRequest =
              new FileModel.GetFileRequest(fileKey);
    return this.connection.download(dataRequest.toJSON());
  }
  /**
   * upload file to kintone
   * @param {Object} params
   * @param {String} params.fileName
   * @param {String} params.fileContent
   * @return {Promise}
   */
  upload({fileName, fileContent}) {
    return this.connection.upload(fileName, fileContent);
  }
}
module.exports = File;

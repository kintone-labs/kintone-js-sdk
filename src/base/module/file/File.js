const Connection = require('../../connection/Connection');
const FileModel = require('../../model/file/FileModels');

const RESPONSE_TYPE_KEY = 'responseType';
const RESPONSE_TYPE_VALUE = 'arraybuffer';

/**
 * File module
 */
class File {
  /**
   * The constructor for this module
   * @param {Object} fileData
   * @param {Connection} fileData.connection
   */
  constructor({connection}) {
    if (!(connection instanceof Connection)) {
      throw new Error(`${connection} not an instance of Connection`);
    }
    this.connection = connection;
  }
  /**
   * Download file from kintone
   * @param {String} fileKey
   * @return {Promise}
   */
  download(fileKey) {

    const dataRequest =
              new FileModel.GetFileRequest(fileKey);
    return this.connection.download(dataRequest.toJSON());
  }
  /**
   * upload file to kintone
   * @param {Object} fileData
   * @param {String} fileData.fileName
   * @param {String} fileData.fileContent
   * @return {Promise}
   */
  upload({fileName, fileContent}) {
    return this.connection.upload(fileName, fileContent);
  }
}
module.exports = File;

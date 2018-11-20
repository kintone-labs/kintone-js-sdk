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
   * @param {Connection} connection
   */
  constructor(connection) {
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
    this.connection.addRequestOption(RESPONSE_TYPE_KEY, RESPONSE_TYPE_VALUE);
    return this.connection.download(dataRequest.toJSON());
  }
  /**
   * upload file to kintone
   * @param {String} fileName
   * @param {String} fileContent
   * @return {Promise}
   */
  upload(fileName, fileContent) {
    return this.connection.upload(fileName, fileContent);
  }
}
module.exports = File;

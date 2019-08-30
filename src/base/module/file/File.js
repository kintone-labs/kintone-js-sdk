import _FileModel from "../../model/file/FileModels";
import _Connection from "../../connection/Connection";
const Connection = _Connection;
const FileModel = _FileModel;
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
    const dataRequest = new FileModel.GetFileRequest(fileKey);
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

export default File;
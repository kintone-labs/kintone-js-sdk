/**
 * kintone api - js client
 */
import {Connection} from '../connection/Connection';
/**
 * File module
 */

import FileModel from '../../../base/model/file/FileModels';

export class File {
  /**
     * The constructor for this module
     * @param {Connection} connection
     */
  constructor(conn) {
    let connection = conn;
    if (!connection) {
      connection = new Connection();
    }
    if (!(connection instanceof Connection)) {
      throw new Error(`${connection}` +
                  `not an instance of kintoneConnection`);
    }
    this.connection = connection;
  }
  /**
     * Download file from kintone
     * @param {String} fileKey
     * @return {Promise}
     */
  download(fileKey) {
    if (window.kintone !== undefined) {
      this.connection.setHeader('X-Requested-With', 'XMLHttpRequest');
    }
    const dataRequest =
              new FileModel.GetFileRequest(fileKey);
    return this.connection.download(dataRequest.toJSON());
  }
  /**
     * Upload file from local to kintone environment
     * @param {String} fileName
     * @param {Blob} fileBlob
     * @return {Promise}
     */
  upload(fileName, fileBlob) {
    return this.connection.upload(fileName, fileBlob);
  }
}

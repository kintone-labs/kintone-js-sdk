/**
 * kintone api - js client
 */
import {Connection} from '../connection/Connection';
/**
 * File module
 */

import FileModel from '../../../base/model/file/FileModels';
const RESPONSE_TYPE_KEY = 'responseType';
const RESPONSE_TYPE_VALUE = 'blob';

export class File {
  /**
     * The constructor for this module
     * @param {Connection} connection
     */
  constructor(connection) {
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
    this.connection.addRequestOption(RESPONSE_TYPE_KEY, RESPONSE_TYPE_VALUE);
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

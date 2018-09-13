/**
 * kintone api - js client
 * File module
 */

'use-strict';

/**
 * File module for JS
 */
import {File as FileModule} from 'kintone-basejs-sdk';

export class File extends FileModule{
  /**
     * The constructor for this module
     * @param {Connection} connection
     */
  constructor(connection) {
    if (!(connection instanceof Connection)) {
      throw new Error(`${connection}` +
                  `not an instance of kintoneConnection`);
    }
    super(connection);
  }
  /**
     * Download file from kintone
     * @param {String} fileKey
     * @return {Promise}
     */
  download(fileKey) {
    return super.download(fileKey);
  }
  /**
     * Upload file from local to kintone environment
     * @param {String} fileName
     * @param {Blob} fileBlob
     * @return {Promise}
     */
  upload(fileName, fileBlob) {
    let formData = new FormData();
    if(window.kintone !== undefined) {
      formData.append("__REQUEST_TOKEN__", kintone.getRequestToken());
    }
    formData.append("file", fileBlob, fileName);
    return super.upload(formData);
  }
}
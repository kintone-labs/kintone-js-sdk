/**
 * kintone api - js client
 */
import {Connection} from '../connection/Connection';
/**
 * File module
 */
import {File as FileModule} from '../../../base/main';

export class File extends FileModule {
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
    if (window.kintone !== undefined) {
      this.connection.setHeader('X-Requested-With', 'XMLHttpRequest');
    }
    return super.download(fileKey);
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

import common from '../../../base/utils/Common';
import {Connection} from '../connection/Connection';
import FileModel from '../../../base/model/file/FileModels';
import KintoneAPIException from '../../../base/main';

/**
 * File module
 */
export class File {
  /**
     * The constructor for this module
     * @param {Object} params
     * @param {Connection} params.connection
     */
  constructor({connection: conn} = {}) {
    let connection = conn;
    if (!connection) {
      connection = new Connection();
    }
    if (!(connection instanceof Connection)) {
      throw new KintoneAPIException(`${connection} is not an instance of Connection`);
    }
    this.connection = connection;
  }

  /**
   * check required arguments
   *
   * @param {Object} params
   * @returns {Promise<Boolean>}
   */
  _validateRequiredArgs(params) {
    return new Promise((resolve, reject) => {
      try {
        common.validateRequiredArgs(params);
        resolve();
      } catch (error) {
        reject(error);
      }
    });
  }

  /**
   * Download file from kintone
   * @param {Object} params
   * @param {String} params.fileKey
   * @return {Promise}
   */
  download({fileKey}) {
    if (window.kintone !== undefined) {
      this.connection._setLocalHeaders({key: 'X-Requested-With', value: 'XMLHttpRequest'});
    }
    const dataRequest =
              new FileModel.GetFileRequest(fileKey);
    return this.connection.download(dataRequest.toJSON());
  }
  /**
   * Upload file from local to kintone environment
   * @param {Object} params
   * @param {String} params.fileName
   * @param {Blob} params.fileBlob
   * @return {Promise}
   */
  upload({fileName, fileBlob}) {
    return this._validateRequiredArgs({fileName, fileBlob}).then(() => {
      return this.connection.upload(fileName, fileBlob);
    });
  }
}

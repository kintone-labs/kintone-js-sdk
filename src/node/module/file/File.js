/**
 * kintone api - nodejs client
 * File module
 */

'use-strict';
import {File as FileModule, Connection, KintoneAPIException} from '../../../base/main';
import path from 'path';
import fs from 'fs';


/**
 * File module for NodeJS
 */
class File extends FileModule {
  /**
     * The constructor for this module
     * @param {Object} params
     * @param {Connection} params.connection
     */
  constructor({connection} = {}) {
    if (!(connection instanceof Connection)) {
      throw new KintoneAPIException(`${connection} is not an instance of Connection`);
    }
    super({connection});
  }
  /**
     * Download file from kintone
     * @param {Object} params
     * @param {String} params.fileKey
     * @param {String} params.outPutFilePath
     * @return {Promise}
     */
  download({fileKey, outPutFilePath}) {
    return super.download({fileKey}).then((fileContent) => {
      try {
        const options = {
          encoding: 'utf16le'
        };
        fs.writeFileSync(outPutFilePath, fileContent, options);
      } catch (err) {
        throw new KintoneAPIException(err.message, err);
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
  upload({filePath, fileName, fileContent} = {}) {  
    let validFilecontent = fileContent;
    let validFilename = fileName;
    if (filePath) {
      validFilecontent = fs.createReadStream(filePath);
      validFilename = path.basename(filePath);
    }
    return super.upload({fileName: validFilename, fileContent: validFilecontent});
  }
}
export default File;

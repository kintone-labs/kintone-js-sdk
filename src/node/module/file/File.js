/**
 * kintone api - nodejs client
 * File module
 */

'use-strict';
import { File as FileModule } from "../../../base/main";
import path from "path";
import fs from "fs";
import { Connection, KintoneAPIException } from "../../../base/main";

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
      throw new Error(`${connection}` +
                  `not an instance of kintoneConnection`);
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
        throw new KintoneAPIException(err);
      }
    });
  }
  /**
     * Upload file from local to kintone environment
     * @param {Object} params
     * @param {String} params.filePath
     * @return {Promise}
     */
  upload({filePath}) {
    const fileContent = fs.createReadStream(filePath);
    const fileName = path.basename(filePath);
    return super.upload({fileName: fileName, fileContent: fileContent});
  }
}
export default File;

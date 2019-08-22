import * as kintoneBaseJSSDK from '../../../base/main';
import {Connection} from '../connection/Connection';
/**
 * Connection module
 */
export class BulkRequest extends kintoneBaseJSSDK.BulkRequest {

  /**
   * @param {Object} params
   * @param {Connection} params.connection
   */
  constructor({connection: conn} = {}) {
    let connection = conn;
    if (!connection) {
      connection = new Connection();
    }
    super({connection});
  }
}

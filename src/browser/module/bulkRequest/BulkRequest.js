import * as kintoneBaseJSSDK from '../../../base/main';
import {Connection} from '../connection/Connection';
/**
 * Connection module
 */
export class BulkRequest extends kintoneBaseJSSDK.BulkRequest {

  /**
     * @param {conn} Connection
     */
  constructor(conn) {
    let connection = conn;
    if (!connection) {
      connection = new Connection();
    }
    super(connection);
  }
}

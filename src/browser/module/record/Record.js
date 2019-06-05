import * as kintoneBaseJSSDK from '../../../base/main';
import {Connection} from '../connection/Connection';
/**
 * Connection module
 */
export class Record extends kintoneBaseJSSDK.Record {

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

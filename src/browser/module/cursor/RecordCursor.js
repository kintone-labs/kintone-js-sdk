import * as kintoneBaseJSSDK from '../../../base/main';
import {Connection} from '../connection/Connection';
/**
 * RecordCursor module
 */
export class RecordCursor extends kintoneBaseJSSDK.RecordCursor {

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

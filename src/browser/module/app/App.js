import * as kintoneBaseJSSDK from '../../../base/main';
import {Connection} from '../connection/Connection';
/**
 * Connection module
 */
export class App extends kintoneBaseJSSDK.App {

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

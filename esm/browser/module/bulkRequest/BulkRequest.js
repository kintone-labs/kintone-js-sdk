import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import * as kintoneBaseJSSDK from '../../../base/main';
import { Connection } from '../connection/Connection';
/**
 * Connection module
 */

export var BulkRequest =
/*#__PURE__*/
function (_kintoneBaseJSSDK$Bul) {
  _inherits(BulkRequest, _kintoneBaseJSSDK$Bul);

  /**
   * @param {Object} params
   * @param {Connection} params.connection
   */
  function BulkRequest() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        conn = _ref.connection;

    _classCallCheck(this, BulkRequest);

    var connection = conn;

    if (!connection) {
      connection = new Connection();
    }

    return _possibleConstructorReturn(this, _getPrototypeOf(BulkRequest).call(this, {
      connection: connection
    }));
  }

  return BulkRequest;
}(kintoneBaseJSSDK.BulkRequest);
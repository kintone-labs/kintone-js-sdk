import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import * as kintoneBaseJSSDK from '../../../base/main';
import { Connection } from '../connection/Connection';
/**
 * RecordCursor module
 */

export var RecordCursor =
/*#__PURE__*/
function (_kintoneBaseJSSDK$Rec) {
  _inherits(RecordCursor, _kintoneBaseJSSDK$Rec);

  /**
     * @param {Object} params
     * @param {Connection} params.connection
     */
  function RecordCursor() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        conn = _ref.connection;

    _classCallCheck(this, RecordCursor);

    var connection = conn;

    if (!connection) {
      connection = new Connection();
    }

    return _possibleConstructorReturn(this, _getPrototypeOf(RecordCursor).call(this, {
      connection: connection
    }));
  }

  return RecordCursor;
}(kintoneBaseJSSDK.RecordCursor);
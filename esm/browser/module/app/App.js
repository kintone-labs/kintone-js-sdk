import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";
import * as kintoneBaseJSSDK from '../../../base/main';
import { Connection } from '../connection/Connection';
/**
 * Connection module
 */

export var App =
/*#__PURE__*/
function (_kintoneBaseJSSDK$App) {
  _inherits(App, _kintoneBaseJSSDK$App);

  /**
   * @param {Object} params
   * @param {Connection} params.connection
     */
  function App() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        conn = _ref.connection;

    _classCallCheck(this, App);

    var connection = conn;

    if (!connection) {
      connection = new Connection();
    }

    return _possibleConstructorReturn(this, _getPrototypeOf(App).call(this, {
      connection: connection
    }));
  }

  return App;
}(kintoneBaseJSSDK.App);
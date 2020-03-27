import "core-js/modules/es.object.to-string";
import "core-js/modules/es.reflect.construct";
import "core-js/modules/es.regexp.to-string";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import * as kintoneBaseJSSDK from '../../../base/main';
import { Connection } from '../connection/Connection';
/**
 * RecordCursor module
 */

export var RecordCursor = /*#__PURE__*/function (_kintoneBaseJSSDK$Rec) {
  _inherits(RecordCursor, _kintoneBaseJSSDK$Rec);

  var _super = _createSuper(RecordCursor);

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

    return _super.call(this, {
      connection: connection
    });
  }

  return RecordCursor;
}(kintoneBaseJSSDK.RecordCursor);
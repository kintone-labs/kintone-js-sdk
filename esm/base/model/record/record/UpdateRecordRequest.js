import "core-js/modules/es.object.to-string";
import "core-js/modules/es.reflect.construct";
import "core-js/modules/es.regexp.to-string";
import "core-js/modules/web.url.to-json";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _get from "@babel/runtime/helpers/get";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/inherits";

function _createSuper(Derived) { return function () { var Super = _getPrototypeOf(Derived), result; if (_isNativeReflectConstruct()) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

import RecordUpdateItem from "./RecordUpdateItem";
/**
 * UpdateRecordRequest model
 */

var UpdateRecordRequest = /*#__PURE__*/function (_RecordUpdateItem) {
  _inherits(UpdateRecordRequest, _RecordUpdateItem);

  var _super = _createSuper(UpdateRecordRequest);

  /**
     * @param {String} appID
     */
  function UpdateRecordRequest(appID) {
    var _this;

    _classCallCheck(this, UpdateRecordRequest);

    _this = _super.call(this);
    _this.app = appID;
    return _this;
  }
  /**
     * Get JSON struct of this model
     * @return {Object}
     */


  _createClass(UpdateRecordRequest, [{
    key: "toJSON",
    value: function toJSON() {
      var data = _get(_getPrototypeOf(UpdateRecordRequest.prototype), "toJSON", this).call(this);

      if (this.app) {
        data.app = this.app;
      }

      return data;
    }
    /**
       * Convert this model to JSON string
       * @return {String}
       */

  }, {
    key: "toJSONString",
    value: function toJSONString() {
      return JSON.stringify(this.toJSON());
    }
  }]);

  return UpdateRecordRequest;
}(RecordUpdateItem);

export default UpdateRecordRequest;
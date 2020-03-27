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

import UpdateRecordStatusItem from "./UpdateRecordStatusItem";
/**
 * UpdateRecordStatusRequest model
 */

var UpdateRecordStatusRequest = /*#__PURE__*/function (_UpdateRecordStatusIt) {
  _inherits(UpdateRecordStatusRequest, _UpdateRecordStatusIt);

  var _super = _createSuper(UpdateRecordStatusRequest);

  /**
     * constructor
     * @param {Number} appID
     * @param {String} recordID
     * @param {String} actionName
     * @param {String} assigneeID
     * @param {Number} revisionID
     */
  function UpdateRecordStatusRequest(appID, recordID, actionName, assigneeID, revisionID) {
    var _this;

    _classCallCheck(this, UpdateRecordStatusRequest);

    _this = _super.call(this, recordID, actionName, assigneeID, revisionID);
    _this.appID = appID;
    return _this;
  }
  /**
     * Get JSON struct of this model
     * @return {Object}
     */


  _createClass(UpdateRecordStatusRequest, [{
    key: "toJSON",
    value: function toJSON() {
      var data = _get(_getPrototypeOf(UpdateRecordStatusRequest.prototype), "toJSON", this).call(this);

      data.app = this.appID;
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

  return UpdateRecordStatusRequest;
}(UpdateRecordStatusItem);

export default UpdateRecordStatusRequest;
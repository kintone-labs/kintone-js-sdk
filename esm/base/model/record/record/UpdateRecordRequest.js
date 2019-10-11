import "core-js/modules/web.url.to-json";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _get from "@babel/runtime/helpers/get";
import _inherits from "@babel/runtime/helpers/inherits";
import RecordUpdateItem from "./RecordUpdateItem";
/**
 * UpdateRecordRequest model
 */

var UpdateRecordRequest =
/*#__PURE__*/
function (_RecordUpdateItem) {
  _inherits(UpdateRecordRequest, _RecordUpdateItem);

  /**
     * @param {String} appID
     */
  function UpdateRecordRequest(appID) {
    var _this;

    _classCallCheck(this, UpdateRecordRequest);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(UpdateRecordRequest).call(this));
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
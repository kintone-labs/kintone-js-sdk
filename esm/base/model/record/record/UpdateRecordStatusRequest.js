import "core-js/modules/web.url.to-json";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/getPrototypeOf";
import _get from "@babel/runtime/helpers/get";
import _inherits from "@babel/runtime/helpers/inherits";
import UpdateRecordStatusItem from "./UpdateRecordStatusItem";
/**
 * UpdateRecordStatusRequest model
 */

var UpdateRecordStatusRequest =
/*#__PURE__*/
function (_UpdateRecordStatusIt) {
  _inherits(UpdateRecordStatusRequest, _UpdateRecordStatusIt);

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

    _this = _possibleConstructorReturn(this, _getPrototypeOf(UpdateRecordStatusRequest).call(this, recordID, actionName, assigneeID, revisionID));
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
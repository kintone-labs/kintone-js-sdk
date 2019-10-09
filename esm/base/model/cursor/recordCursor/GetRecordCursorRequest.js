import "core-js/modules/web.url.to-json";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";

/**
 * GetRecordCursorRequest model
 */
var GetRecordCursorRequest =
/*#__PURE__*/
function () {
  /**
   * constructor for GetRecordCursorRequest
   * @param {String} cursorID
   */
  function GetRecordCursorRequest(cursorID) {
    _classCallCheck(this, GetRecordCursorRequest);

    this.cursorID = cursorID;
  }
  /**
   * Get cursor id
   * @return {String}
   */


  _createClass(GetRecordCursorRequest, [{
    key: "getCursorID",
    value: function getCursorID() {
      return this.cursorID;
    }
    /**
     * Get JSON struct of this model
     * @return {JSON}
     */

  }, {
    key: "toJSON",
    value: function toJSON() {
      var data = {};

      if (this.getCursorID() !== undefined) {
        data.id = this.getCursorID();
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

  return GetRecordCursorRequest;
}();

export default GetRecordCursorRequest;
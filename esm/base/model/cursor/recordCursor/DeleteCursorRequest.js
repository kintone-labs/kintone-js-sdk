import "core-js/modules/web.url.to-json";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";

/**
 * DeleteCursorRequest model
 */
var DeleteCursorRequest =
/*#__PURE__*/
function () {
  /**
   * constructor for DeleteCursorRequest
   * @param {String} cursorID
   */
  function DeleteCursorRequest(cursorID) {
    _classCallCheck(this, DeleteCursorRequest);

    this.cursorID = cursorID;
  }
  /**
   * Get cursor id
   * @return {String}
   */


  _createClass(DeleteCursorRequest, [{
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

  return DeleteCursorRequest;
}();

export default DeleteCursorRequest;
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
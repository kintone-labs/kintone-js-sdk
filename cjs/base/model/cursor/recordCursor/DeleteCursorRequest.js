"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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

var _default = DeleteCursorRequest;
exports.default = _default;
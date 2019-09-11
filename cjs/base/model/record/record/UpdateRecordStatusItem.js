"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * UpdateRecordStatusRequest model
 */
var UpdateRecordStatusItem =
/*#__PURE__*/
function () {
  /**
     * constructor
     * @param {String} recordID
     * @param {String} actionName
     * @param {String} assignee
     * @param {String} revision
     */
  function UpdateRecordStatusItem(recordID, actionName, assignee, revision) {
    _classCallCheck(this, UpdateRecordStatusItem);

    this.recordID = recordID;
    this.action = actionName;
    this.assignee = assignee;
    this.revision = revision;
  }
  /**
     * Get JSON struct of this model
     * @return {Object}
     */


  _createClass(UpdateRecordStatusItem, [{
    key: "toJSON",
    value: function toJSON() {
      return {
        id: this.recordID,
        action: this.action,
        assignee: this.assignee,
        revision: this.revision
      };
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

  return UpdateRecordStatusItem;
}();

var _default = UpdateRecordStatusItem;
exports.default = _default;
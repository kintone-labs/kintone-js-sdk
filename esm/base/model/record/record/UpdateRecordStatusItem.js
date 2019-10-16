import "core-js/modules/web.url.to-json";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";

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

export default UpdateRecordStatusItem;
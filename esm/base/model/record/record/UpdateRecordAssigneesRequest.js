import "core-js/modules/web.url.to-json";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";

/**
 * UpdateRecordAssigneesRequest model
 */
var UpdateRecordAssigneesRequest =
/*#__PURE__*/
function () {
  /**
     * constructor
     * @param {String} appID
     * @param {String} recordID
     * @param {Array<String>} assigneesID
     * @param {String} revisionID
     */
  function UpdateRecordAssigneesRequest(appID, recordID, assigneesID, revisionID) {
    _classCallCheck(this, UpdateRecordAssigneesRequest);

    this.appID = appID;
    this.recordID = recordID;
    this.assignees = assigneesID;
    this.revision = revisionID;
  }
  /**
     * Get JSON struct of this model
     * @return {Object}
     */


  _createClass(UpdateRecordAssigneesRequest, [{
    key: "toJSON",
    value: function toJSON() {
      return {
        app: this.appID,
        id: this.recordID,
        assignees: this.assignees,
        revision: this.revision || null
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

  return UpdateRecordAssigneesRequest;
}();

export default UpdateRecordAssigneesRequest;
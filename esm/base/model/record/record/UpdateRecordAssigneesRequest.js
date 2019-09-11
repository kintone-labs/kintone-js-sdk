function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
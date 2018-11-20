/**
 * UpdateRecordAssigneesRequest model
 */
class UpdateRecordAssigneesRequest {
  /**
     * constructor
     * @param {String} appID
     * @param {String} recordID
     * @param {Array<String>} assigneesID
     * @param {String} revisionID
     */
  constructor(appID, recordID, assigneesID, revisionID) {
    this.appID = appID;
    this.recordID = recordID;
    this.assignees = assigneesID;
    this.revision = revisionID;
  }
  /**
     * Get JSON struct of this model
     * @return {Object}
     */
  toJSON() {
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
  toJSONString() {
    return JSON.stringify(this.toJSON());
  }
}
module.exports = UpdateRecordAssigneesRequest;

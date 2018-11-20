/**
 * UpdateRecordStatusRequest model
 */
class UpdateRecordStatusItem {
  /**
     * constructor
     * @param {String} recordID
     * @param {String} actionName
     * @param {String} assignee
     * @param {String} revision
     */
  constructor(recordID, actionName, assignee, revision) {
    this.recordID = recordID;
    this.action = actionName;
    this.assignee = assignee;
    this.revision = revision;
  }
  /**
     * Get JSON struct of this model
     * @return {Object}
     */
  toJSON() {
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
  toJSONString() {
    return JSON.stringify(this.toJSON());
  }
}
module.exports = UpdateRecordStatusItem;

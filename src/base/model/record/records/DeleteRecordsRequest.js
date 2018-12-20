/**
 * DeleteRecordsRequest model
 */
class DeleteRecordsRequest {
  /**
     * @param {String} appID
     */
  constructor(appID) {
    this.app = appID;
  }
  /**
     * set the ids to be deleted
     * @param {Array<Integer>} idsInput
     * @return {this}
     */
  setIDs(ids) {
    this.ids = ids;
    return this;
  }
  /**
     * set ids with revision
     * @param {HashTable<id, revision>} idsWithRevision
     * @return {this}
     */
  setIDsWithRevision(idsWithRevision) {
    this.idsWithRevision = idsWithRevision;
    return this;
  }
  /**
     * Get JSON struct of this model
     * @return {JSON}
     */
  toJSON() {
    const data = {
      app: this.app,
    };
    if (this.ids) {
      data.ids = this.ids;
    } else {
      const idsRequest = [];
      const revisions = [];
      const idsWithRevisionInput = this.idsWithRevision;
      for (const id in idsWithRevisionInput) {
        if (!idsWithRevisionInput.hasOwnProperty(id)) {
          continue;
        }
        idsRequest.push(id);
        revisions.push(idsWithRevisionInput[id]);
      }
      data.ids = idsRequest;
      data.revisions = revisions;
    }
    return data;
  }
  /**
     * Convert this model to JSON string
     * @return {String}
     */
  toJSONString() {
    return JSON.stringify(this.toJSON());
  }
}
module.exports = DeleteRecordsRequest;

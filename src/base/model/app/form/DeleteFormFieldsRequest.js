/**
 * DeleteFormFieldsRequest model
 */
class DeleteFormFieldsRequest {
  /**
     * @param {Integer} app
     * @param {Array<String>} fields
     * @param {Integer} revision
     */
  constructor(app, fields, revision) {
    this.app = app;
    this.fields = fields === undefined ? [] : fields;
    this.revision = revision;
  }
  /**
     * Get JSON struct of this model
     * @return {JSON}
     */
  toJSON() {
    const data = {
      app: this.app,
      fields: this.fields,
      revision: this.revision

    };
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
module.exports = DeleteFormFieldsRequest;

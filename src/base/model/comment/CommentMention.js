/**
 * CommentMention model
 */
class CommentMention {
  /**
     * constructor
     * @param {String} code
     * @param {String} type
     */
  constructor(code, type) {
    this.code = code;
    this.type = type;
  }
  /**
     * Get JSON struct of this model
     * @return {integer}
     */
  toJSON() {
    return {
      code: this.code,
      type: this.type,
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
module.exports = CommentMention;

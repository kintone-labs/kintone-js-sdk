/**
 * CommentContent model
 */
class CommentContent {
  /**
     * constructor
     * @param {String} text
     * @param {Array<mentions>} mentions
     */
  constructor(text, mentions) {
    this.text = text;
    this.mentions = mentions;
  }
  /**
     * Get JSON struct of this model
     * @return {integer}
     */
  toJSON() {
    const data = {
      text: this.text,
      mentions: [],
    };
    const mentionsArray = this.mentions;
    if (mentionsArray.length > 0 && mentionsArray[0].toJSON) {
      mentionsArray.forEach((mention) => {
        data.mentions.push(mention.toJSON());
      });
    } else {
      data.mentions = mentionsArray || [];
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
module.exports = CommentContent;

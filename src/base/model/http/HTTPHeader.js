/**
 * HTTPHeader model
 */
class HTTPHeader {
  /**
     * @param {String} keyInput
     * @param {String} valueInput
     */
  constructor(keyInput, valueInput) {
    this.key = keyInput;
    this.value = valueInput;
  }
  /**
     * get header key
     * @return {this}
     */
  getKey() {
    return this.key;
  }
  /**
     * get header value
     * @return {this}
     */
  getValue() {
    return this.value;
  }
}
module.exports = HTTPHeader;

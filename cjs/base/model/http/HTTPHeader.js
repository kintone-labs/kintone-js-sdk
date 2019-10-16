"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

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

var _default = HTTPHeader;
exports.default = _default;
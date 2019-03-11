/**
 * UserBase model
 */
class UserBase {
  /**
     * @param {String} name
     * @param {String} code
     */
  constructor(name, code) {
    this.name = name;
    this.code = code;
  }
  /**
     * Get the name of user
     * @return {String} The name of usee
     */
  getName() {
    return this.name;
  }
  /**
     * Get the code of user
     * @return {String} the user ccode
     */
  getCode() {
    return this.code;
  }
}
module.exports = UserBase;

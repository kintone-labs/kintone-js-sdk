/**
 * Credential model
 */
class Credential {
  /**
     * @param {String} username
     * @param {String} password
     */
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }
  /**
     * Get username of Credential model
     * @return {String}
     */
  getUsername() {
    return this.username;
  }
  /**
     * Get password of Credential model
     * @return {String}
     */
  getPassword() {
    return this.password;
  }
}
module.exports = Credential;

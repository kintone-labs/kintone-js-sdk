import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";

/**
 * Credential model
 */
var Credential =
/*#__PURE__*/
function () {
  /**
     * @param {String} username
     * @param {String} password
     */
  function Credential(username, password) {
    _classCallCheck(this, Credential);

    this.username = username;
    this.password = password;
  }
  /**
     * Get username of Credential model
     * @return {String}
     */


  _createClass(Credential, [{
    key: "getUsername",
    value: function getUsername() {
      return this.username;
    }
    /**
       * Get password of Credential model
       * @return {String}
       */

  }, {
    key: "getPassword",
    value: function getPassword() {
      return this.password;
    }
  }]);

  return Credential;
}();

export default Credential;
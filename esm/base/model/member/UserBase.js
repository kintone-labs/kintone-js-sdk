import "core-js/modules/es.function.name";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";

/**
 * UserBase model
 */
var UserBase =
/*#__PURE__*/
function () {
  /**
     * @param {String} name
     * @param {String} code
     */
  function UserBase(name, code) {
    _classCallCheck(this, UserBase);

    this.name = name;
    this.code = code;
  }
  /**
     * Get the name of user
     * @return {String} The name of usee
     */


  _createClass(UserBase, [{
    key: "getName",
    value: function getName() {
      return this.name;
    }
    /**
       * Get the code of user
       * @return {String} the user ccode
       */

  }, {
    key: "getCode",
    value: function getCode() {
      return this.code;
    }
  }]);

  return UserBase;
}();

export default UserBase;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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

var _default = UserBase;
exports.default = _default;
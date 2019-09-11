"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * RecordUpdateKey model
 */
var RecordUpdateKey =
/*#__PURE__*/
function () {
  /**
     * constructor
     * @param {String} field
     * @param {String} value
     */
  function RecordUpdateKey(field, value) {
    _classCallCheck(this, RecordUpdateKey);

    this.field = field;
    this.value = value;
  }
  /**
     * Get JSON struct of this model
     * @return {Object}
     */


  _createClass(RecordUpdateKey, [{
    key: "toJSON",
    value: function toJSON() {
      return {
        field: this.field,
        value: this.value
      };
    }
    /**
       * Convert this model to JSON string
       * @return {String}
       */

  }, {
    key: "toJSONString",
    value: function toJSONString() {
      return JSON.stringify(this.toJSON());
    }
  }]);

  return RecordUpdateKey;
}();

var _default = RecordUpdateKey;
exports.default = _default;
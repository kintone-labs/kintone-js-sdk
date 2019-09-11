"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * BulkRequestItem model
 */
var BulkRequestItem =
/*#__PURE__*/
function () {
  /**
     * @param {String} method
     * @param {String} api
     * @param {String} payload
     */
  function BulkRequestItem(method, api, payload) {
    _classCallCheck(this, BulkRequestItem);

    this.method = method;
    this.api = api;
    this.payload = payload.toJSON ? payload.toJSON() : payload;
  }
  /**
     * Get JSON struct of this model
     * @return {JSON}
     */


  _createClass(BulkRequestItem, [{
    key: "toJSON",
    value: function toJSON() {
      return {
        method: this.method,
        api: this.api,
        payload: this.payload
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

  return BulkRequestItem;
}();

var _default = BulkRequestItem;
exports.default = _default;
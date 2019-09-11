"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * BulkRequest model
 */
var BulkRequest =
/*#__PURE__*/
function () {
  /**
     * Constructor BulkRequest
     */
  function BulkRequest() {
    _classCallCheck(this, BulkRequest);

    this.requests = [];
  }
  /**
     * Get username of BulkRequest model
     * @param {BulkRequestItem} bulkRequestItem
     * @return {this}
     */


  _createClass(BulkRequest, [{
    key: "addRequest",
    value: function addRequest(bulkRequestItem) {
      var dataRequest = bulkRequestItem.toJSON ? bulkRequestItem.toJSON() : bulkRequestItem;
      this.requests.push(dataRequest);
      return this;
    }
    /**
       * Get JSON struct of this model
       * @return {JSON}
       */

  }, {
    key: "toJSON",
    value: function toJSON() {
      return {
        requests: this.requests
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

  return BulkRequest;
}();

var _default = BulkRequest;
exports.default = _default;
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * GetCommentRequest model
 */
var GetCommentRequest =
/*#__PURE__*/
function () {
  /**
     * constructor
     * @param {Integer} appID
     * @param {Integer} recordID
     * @param {String} order
     * @param {Integer} offset
     * @param {Integer} limit
     */
  function GetCommentRequest(appID, recordID, order, offset, limit) {
    _classCallCheck(this, GetCommentRequest);

    this.appID = appID;
    this.recordID = recordID;
    this.order = order;
    this.offset = offset;
    this.limit = limit;
  }
  /**
     * Get JSON struct of this model
     * @return {integer}
     */


  _createClass(GetCommentRequest, [{
    key: "toJSON",
    value: function toJSON() {
      return {
        app: this.appID,
        record: this.recordID,
        order: this.order,
        offset: this.offset,
        limit: this.limit
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

  return GetCommentRequest;
}();

export default GetCommentRequest;
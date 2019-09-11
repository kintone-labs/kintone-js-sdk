function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/* eslint-disable no-async-promise-executor, require-atomic-updates */

/**
 * CreateRecordCursorRequest model
 */
var CreateRecordCursorRequest =
/*#__PURE__*/
function () {
  /**
   * constructor for CreateRecordCursorRequest
   * @param {Integer} app
   * @param {Array<String>} fields
   * @param {String} query
   * @param {Integer} size
   */
  function CreateRecordCursorRequest(_ref) {
    var app = _ref.app,
        fields = _ref.fields,
        query = _ref.query,
        size = _ref.size;

    _classCallCheck(this, CreateRecordCursorRequest);

    this.app = app;
    this.fields = fields;
    this.query = query;
    this.size = size;
  }
  /**
   * Get app id
   * @return {Integer}
   */


  _createClass(CreateRecordCursorRequest, [{
    key: "getAppID",
    value: function getAppID() {
      return this.app;
    }
    /**
     * Get fields
     * @return {Array<String>}
     */

  }, {
    key: "getFields",
    value: function getFields() {
      return this.fields;
    }
    /**
     * Get query
     * @return {String}
     */

  }, {
    key: "getQuery",
    value: function getQuery() {
      return this.query;
    }
    /**
     * Get size
     * @return {Integer}
     */

  }, {
    key: "getSize",
    value: function getSize() {
      return this.size;
    }
    /**
     * Get JSON struct of this model
     * @return {JSON}
     */

  }, {
    key: "toJSON",
    value: function toJSON() {
      var data = {};

      if (this.getAppID() !== undefined) {
        data.app = this.getAppID();
      }

      if (this.getFields() !== undefined) {
        data.fields = this.getFields();
      }

      if (this.getQuery() !== undefined) {
        data.query = this.getQuery();
      }

      if (this.getSize() !== undefined) {
        data.size = this.getSize();
      }

      return data;
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

  return CreateRecordCursorRequest;
}();

export default CreateRecordCursorRequest;
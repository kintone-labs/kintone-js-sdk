function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * UpdateFormFieldsRequest model
 */
var UpdateFormFieldsRequest =
/*#__PURE__*/
function () {
  /**
     * @param {Integer} app
     * @param {Array<HashTable<String, Field>>} fields
     * @param {Integer} revision
     */
  function UpdateFormFieldsRequest(app, fields, revision) {
    _classCallCheck(this, UpdateFormFieldsRequest);

    this.app = app;
    this.fields = fields;
    this.revision = revision;
  }
  /**
     * Get JSON struct of this model
     * @return {JSON}
     */


  _createClass(UpdateFormFieldsRequest, [{
    key: "toJSON",
    value: function toJSON() {
      var data = {
        app: this.app,
        properties: this.fields,
        revision: this.revision
      };
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

  return UpdateFormFieldsRequest;
}();

export default UpdateFormFieldsRequest;
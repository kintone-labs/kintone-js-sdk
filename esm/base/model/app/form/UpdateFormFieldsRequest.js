import "core-js/modules/web.url.to-json";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";

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
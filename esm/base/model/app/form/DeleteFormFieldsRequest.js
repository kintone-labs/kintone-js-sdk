import "core-js/modules/web.url.to-json";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";

/**
 * DeleteFormFieldsRequest model
 */
var DeleteFormFieldsRequest =
/*#__PURE__*/
function () {
  /**
     * @param {Integer} app
     * @param {Array<String>} fields
     * @param {Integer} revision
     */
  function DeleteFormFieldsRequest(app, fields, revision) {
    _classCallCheck(this, DeleteFormFieldsRequest);

    this.app = app;
    this.fields = fields === undefined ? [] : fields;
    this.revision = revision;
  }
  /**
     * Get JSON struct of this model
     * @return {JSON}
     */


  _createClass(DeleteFormFieldsRequest, [{
    key: "toJSON",
    value: function toJSON() {
      var data = {
        app: this.app,
        fields: this.fields,
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

  return DeleteFormFieldsRequest;
}();

export default DeleteFormFieldsRequest;
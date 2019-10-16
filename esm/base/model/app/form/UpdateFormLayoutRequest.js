import "core-js/modules/web.url.to-json";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";

/**
 * UpdateFormLayoutRequest model
 */
var UpdateFormLayoutRequest =
/*#__PURE__*/
function () {
  /**
     * @param {Integer} app
     * @param {Array<HashTable<String, Field>>} fields
     * @param {Integer} revision
     */
  function UpdateFormLayoutRequest(app, fields, revision) {
    _classCallCheck(this, UpdateFormLayoutRequest);

    this.app = app;
    this.fields = fields;
    this.revision = revision;
  }
  /**
     * Get JSON struct of this model
     * @return {JSON}
     */


  _createClass(UpdateFormLayoutRequest, [{
    key: "toJSON",
    value: function toJSON() {
      var data = {
        app: this.app,
        layout: this.fields,
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

  return UpdateFormLayoutRequest;
}();

export default UpdateFormLayoutRequest;
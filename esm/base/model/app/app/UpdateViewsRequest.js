import "core-js/modules/web.url.to-json";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";

/**
 * UpdateViewsRequest model
 */
var UpdateViewsRequest =
/*#__PURE__*/
function () {
  /**
     * @param {Integer} app
     * @param {HashTable<String, View>} views
     * @param {Integer} revision
     */
  function UpdateViewsRequest(app, views, revision) {
    _classCallCheck(this, UpdateViewsRequest);

    this.app = app;
    this.views = views;
    this.revision = revision;
  }
  /**
     * Get JSON struct of this model
     * @return {JSON}
     */


  _createClass(UpdateViewsRequest, [{
    key: "toJSON",
    value: function toJSON() {
      var data = {
        app: this.app,
        views: this.views,
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

  return UpdateViewsRequest;
}();

export default UpdateViewsRequest;
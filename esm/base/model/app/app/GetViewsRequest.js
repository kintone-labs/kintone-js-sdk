import "core-js/modules/web.url.to-json";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";

/**
 * GetViewsRequest model
 */
var GetViewsRequest =
/*#__PURE__*/
function () {
  /**
     * @param {Integer} app
     * @param {String} lang
     */
  function GetViewsRequest(app, lang) {
    _classCallCheck(this, GetViewsRequest);

    this.app = app;
    this.lang = lang;
  }
  /**
     * Get JSON struct of this model
     * @return {JSON}
     */


  _createClass(GetViewsRequest, [{
    key: "toJSON",
    value: function toJSON() {
      var data = {
        app: this.app,
        lang: this.lang
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

  return GetViewsRequest;
}();

export default GetViewsRequest;
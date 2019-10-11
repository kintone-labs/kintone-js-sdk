import "core-js/modules/web.url.to-json";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";

/**
 * GetGeneralSettingsRequest model
 */
var GetGeneralSettingsRequest =
/*#__PURE__*/
function () {
  /**
     * @param {Integer} app
     * @param {String} lang
     */
  function GetGeneralSettingsRequest(app, lang) {
    _classCallCheck(this, GetGeneralSettingsRequest);

    this.app = app;
    this.lang = lang;
  }
  /**
   * Get JSON struct of this model
   * @return {JSON}
   */


  _createClass(GetGeneralSettingsRequest, [{
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

  return GetGeneralSettingsRequest;
}();

export default GetGeneralSettingsRequest;
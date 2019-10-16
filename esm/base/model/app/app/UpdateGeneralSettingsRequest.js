import "core-js/modules/web.url.to-json";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";

/**
 * UpdateGeneralSettingsRequest model
 */
var UpdateGeneralSettingsRequest =
/*#__PURE__*/
function () {
  /**
     * @param {Integer} app
     * @param {GeneralSettings } generalSettings
     * @param {Integer} revision
     */
  function UpdateGeneralSettingsRequest() {
    var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, UpdateGeneralSettingsRequest);

    this.params = params;
  }
  /**
     * Get JSON struct of this model
     * @return {JSON}
     */


  _createClass(UpdateGeneralSettingsRequest, [{
    key: "toJSON",
    value: function toJSON() {
      return this.params;
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

  return UpdateGeneralSettingsRequest;
}();

export default UpdateGeneralSettingsRequest;
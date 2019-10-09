import "core-js/modules/web.url.to-json";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";

/**
 * GetFormFieldsRequest model
 */
var GetFormFieldsRequest =
/*#__PURE__*/
function () {
  /**
     * @param {Integer} appID
     * @param {String} lang
     */
  function GetFormFieldsRequest(appID, lang) {
    _classCallCheck(this, GetFormFieldsRequest);

    this.appID = appID;
    this.lang = lang;
  }
  /**
     * Get JSON struct of this model
     * @return {JSON}
     */


  _createClass(GetFormFieldsRequest, [{
    key: "toJSON",
    value: function toJSON() {
      var data = {
        app: this.appID
      };

      if (this.lang) {
        data.lang = this.lang;
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

  return GetFormFieldsRequest;
}();

export default GetFormFieldsRequest;
import "core-js/modules/web.url.to-json";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";

/**
 * GetFormLayoutRequest model
 */
var GetFormLayoutRequest =
/*#__PURE__*/
function () {
  /**
     * @param {String} appID
     */
  function GetFormLayoutRequest(appID) {
    _classCallCheck(this, GetFormLayoutRequest);

    this.appID = appID;
  }
  /**
     * Get JSON struct of this model
     * @return {JSON}
     */


  _createClass(GetFormLayoutRequest, [{
    key: "toJSON",
    value: function toJSON() {
      return {
        app: this.appID
      };
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

  return GetFormLayoutRequest;
}();

export default GetFormLayoutRequest;
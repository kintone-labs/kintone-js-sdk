import "core-js/modules/web.url.to-json";
import _classCallCheck from "@babel/runtime/helpers/classCallCheck";
import _createClass from "@babel/runtime/helpers/createClass";

/**
 * GetAppRequest model
 */
var GetAppRequest =
/*#__PURE__*/
function () {
  /**
     * @param {String} appID
     */
  function GetAppRequest(appID) {
    _classCallCheck(this, GetAppRequest);

    this.appID = appID;
  }
  /**
   * Get apps
   * @return {Array}
   */


  _createClass(GetAppRequest, [{
    key: "getAppID",
    value: function getAppID() {
      return this.appID;
    }
    /**
       * @param {Number} appID
       * @return {this}
       */

  }, {
    key: "setAppID",
    value: function setAppID(appID) {
      this.appID = appID;
      return this;
    }
    /**
       * Get JSON struct of this model
       * @return {JSON}
       */

  }, {
    key: "toJSON",
    value: function toJSON() {
      return {
        id: this.appID
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

  return GetAppRequest;
}();

export default GetAppRequest;